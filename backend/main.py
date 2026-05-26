"""
ResumeAI Backend - FastAPI + Groq (FREE)
Endpoints: /analyze, /rewrite, /generate-summary, /extract-pdf, /health
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from groq import Groq
import json
import io
import os
from dotenv import load_dotenv

load_dotenv()

# ── Optional NLP ─────────────────────────────────────────────────────────────
try:
    import spacy
    nlp = spacy.load("en_core_web_sm")
    SPACY_AVAILABLE = True
except Exception:
    SPACY_AVAILABLE = False

try:
    import pdfplumber
    PDF_AVAILABLE = True
except Exception:
    PDF_AVAILABLE = False

# ── Groq setup ────────────────────────────────────────────────────────────────
client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))
GROQ_MODEL = "llama-3.3-70b-versatile"   # free, fast, very capable

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="ResumeAI API (Groq)", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic models ───────────────────────────────────────────────────────────
class AnalyzeRequest(BaseModel):
    job_description: str
    resume_text: str

class RewriteRequest(BaseModel):
    bullet: str
    target_role: Optional[str] = ""

class SummaryRequest(BaseModel):
    name: Optional[str] = ""
    experience: str
    skills: str
    target_role: Optional[str] = ""

# ── Helpers ───────────────────────────────────────────────────────────────────
def extract_keywords_spacy(text: str) -> List[str]:
    if not SPACY_AVAILABLE:
        words = [w.strip().lower() for w in text.replace(",", " ").split() if len(w) > 3]
        return list(set(words))[:30]
    doc = nlp(text[:5000])
    keywords = list({chunk.text.lower() for chunk in doc.noun_chunks if len(chunk.text) > 2})
    return keywords[:40]

def call_groq(system: str, user: str) -> str:
    """Call Groq LLaMA and return text response."""
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user",   "content": user},
        ],
        temperature=0.3,
        max_tokens=1500,
    )
    return response.choices[0].message.content

def parse_json(raw: str) -> dict:
    """Strip markdown fences and parse JSON."""
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1]
        if cleaned.startswith("json"):
            cleaned = cleaned[4:]
    cleaned = cleaned.strip().rstrip("```").strip()
    return json.loads(cleaned)

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "ai_provider": "Groq (Free)",
        "model": GROQ_MODEL,
        "spacy": SPACY_AVAILABLE,
        "pdf_support": PDF_AVAILABLE,
    }


@app.post("/analyze")
async def analyze_resume(req: AnalyzeRequest):
    jd_keywords   = extract_keywords_spacy(req.job_description)
    res_keywords  = extract_keywords_spacy(req.resume_text)
    local_matched = list(set(jd_keywords) & set(res_keywords))[:15]
    local_missing = list(set(jd_keywords) - set(res_keywords))[:15]

    system = "You are an expert ATS analyst and senior recruiter. Return ONLY valid JSON — no markdown, no commentary, no extra text."
    user = f"""Analyze this resume against the job description.

JOB DESCRIPTION:
{req.job_description[:2000]}

RESUME:
{req.resume_text[:2500]}

Locally detected matched keywords: {local_matched}
Locally detected missing keywords: {local_missing}

Return exactly this JSON structure:
{{
  "ats_score": <integer 0-100>,
  "verdict": "<Excellent Match|Good Match|Partial Match|Weak Match>",
  "sections": [
    {{"name": "Keywords",   "score": <0-100>, "feedback": "<one sentence>"}},
    {{"name": "Experience", "score": <0-100>, "feedback": "<one sentence>"}},
    {{"name": "Skills",     "score": <0-100>, "feedback": "<one sentence>"}},
    {{"name": "Education",  "score": <0-100>, "feedback": "<one sentence>"}},
    {{"name": "Formatting", "score": <0-100>, "feedback": "<one sentence>"}}
  ],
  "matched_keywords": ["keyword1","keyword2","keyword3"],
  "missing_keywords": ["keyword1","keyword2","keyword3"],
  "improvements": [
    {{"title": "...", "body": "...", "priority": "high|medium|low"}},
    {{"title": "...", "body": "...", "priority": "high|medium|low"}},
    {{"title": "...", "body": "...", "priority": "high|medium|low"}}
  ]
}}"""

    try:
        raw  = call_groq(system, user)
        data = parse_json(raw)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq error: {e}")

    return data


@app.post("/rewrite")
async def rewrite_bullet(req: RewriteRequest):
    system = "You are an expert resume writer. Return ONLY valid JSON — no markdown, no extra text."
    user = f"""Rewrite this weak resume bullet into 3 powerful ATS-optimized versions.
{"Target role: " + req.target_role if req.target_role else ""}
Original: "{req.bullet}"

Return ONLY this JSON:
{{
  "original": "{req.bullet.replace('"', "'")}",
  "rewrites": [
    {{"version": "Impact-focused",    "text": "...", "why": "..."}},
    {{"version": "Leadership-focused","text": "...", "why": "..."}},
    {{"version": "Technical-focused", "text": "...", "why": "..."}}
  ],
  "tips": ["tip1","tip2","tip3"],
  "power_words": ["word1","word2","word3"]
}}"""

    try:
        raw  = call_groq(system, user)
        data = parse_json(raw)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return data


@app.post("/generate-summary")
async def generate_summary(req: SummaryRequest):
    system = "You are an expert resume writer. Return ONLY valid JSON — no markdown, no extra text."
    user = f"""Generate resume content for this person.

Name: {req.name or "Candidate"}
Experience: {req.experience}
Skills: {req.skills}
{"Target Role: " + req.target_role if req.target_role else ""}

Return ONLY this JSON:
{{
  "summary": "<2-3 sentence professional summary>",
  "improved_bullets": ["• bullet1","• bullet2","• bullet3","• bullet4"],
  "power_words": ["word1","word2","word3","word4","word5"],
  "recommended_skills": ["skill1","skill2","skill3"]
}}"""

    try:
        raw  = call_groq(system, user)
        data = parse_json(raw)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return data


@app.post("/extract-pdf")
async def extract_pdf(file: UploadFile = File(...)):
    if not PDF_AVAILABLE:
        raise HTTPException(status_code=501, detail="pdfplumber not installed. Run: pip install pdfplumber")
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted")

    contents = await file.read()
    text = ""
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            text += (page.extract_text() or "") + "\n"

    return {"text": text.strip(), "pages": len(pdf.pages)}