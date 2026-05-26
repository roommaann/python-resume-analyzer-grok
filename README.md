# ResumeAI — Gemini Edition (100% Free)

> AI-powered ATS Resume Builder using Google Gemini — no credit card, no cost ever.

---

## How to Get Your FREE Gemini API Key (2 minutes)

1. Go to → https://aistudio.google.com/app/apikey
2. Sign in with any Google account
3. Click "Create API Key"
4. Copy the key (starts with AIza...)
5. Paste it in backend/.env (see Step 3 below)

Free tier limits (more than enough for this project):
- 15 requests per minute
- 1,500 requests per day
- Completely free, no card needed

---

## Full Setup Guide

### Step 1 — Install Python (if not done)
Download from https://www.python.org/downloads
IMPORTANT: Check "Add python.exe to PATH" during install!

Verify:
  python --version   ← should show Python 3.11+

### Step 2 — Install Node.js (if not done)
Download LTS from https://nodejs.org
Verify:
  node --version
  npm --version

### Step 3 — Set up Backend

Open VS Code terminal and run:

  cd backend

  # Create virtual environment
  python -m venv venv

  # Activate it:
  # Windows:
  venv\Scripts\activate
  # Mac/Linux:
  source venv/bin/activate

  # Install packages
  pip install -r requirements.txt

  # Download spaCy model
  python -m spacy download en_core_web_sm

  # Create .env file
  # Windows:
  copy .env.example .env
  # Mac/Linux:
  cp .env.example .env

  # Open .env in VS Code and set your key:
  # GEMINI_API_KEY=AIzaSy...your-key-here

  # Start the server
  uvicorn main:app --reload --port 8000

  ✅ Backend running at http://localhost:8000
  ✅ Test it: open http://localhost:8000/health in browser

### Step 4 — Set up Frontend

Open a NEW terminal in VS Code (click + in terminal panel):

  cd frontend
  npm install
  npm run dev

  ✅ Frontend running at http://localhost:3000

### Step 5 — Open the app

Go to http://localhost:3000 in your browser. Done!

---

## Project Structure

  resume-ai-gemini/
  ├── backend/
  │   ├── main.py              ← FastAPI + Gemini API
  │   ├── requirements.txt
  │   └── .env.example
  └── frontend/
      ├── src/
      │   ├── App.jsx
      │   ├── components/
      │   │   ├── Navbar.jsx
      │   │   ├── ScoreRing.jsx
      │   │   ├── SectionBar.jsx
      │   │   └── DropZone.jsx
      │   ├── pages/
      │   │   ├── AnalyzerPage.jsx
      │   │   ├── RewriterPage.jsx
      │   │   └── BuilderPage.jsx
      │   └── utils/api.js
      ├── package.json
      └── vite.config.js

---

## Common Errors

"python not recognized"
→ Reinstall Python, check "Add to PATH"

"pip not recognized"
→ Try: python -m pip install -r requirements.txt

"(venv) not showing"
→ Run: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
→ Then: venv\Scripts\activate

"CORS error in browser"
→ Make sure backend is running on port 8000
→ Make sure frontend proxy in vite.config.js points to port 8000

"400 API key not valid"
→ Open backend/.env and check the key is correct (starts with AIza)
→ Make sure there are no spaces or quotes around the key

Port already in use:
→ uvicorn main:app --reload --port 8001
→ Update vite.config.js: target: 'http://localhost:8001'
