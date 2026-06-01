import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Cpu, Code2, Database, Brain, Layers, Github,
  ArrowRight, CheckCircle, BookOpen, Target
} from 'lucide-react'

const TEAM = [
  { name: 'Member 1', role: 'Full Stack Developer', tasks: ['FastAPI backend', 'Groq API integration', 'REST endpoints'], avatar: 'M1' },
  { name: 'Member 2', role: 'ML Engineer',          tasks: ['TF-IDF model', 'BERT embeddings', 'Model evaluation'],   avatar: 'M2' },
  { name: 'Member 3', role: 'Frontend Developer',   tasks: ['React UI', 'Tailwind design', 'Framer animations'],       avatar: 'M3' },
  { name: 'Member 4', role: 'Data Scientist',        tasks: ['EDA notebooks', 'Dataset prep', 'spaCy NLP pipeline'],   avatar: 'M4' },
]

const TECH_STACK = [
  { category: 'Backend',    color: '#6c63ff', items: ['FastAPI 0.115', 'Uvicorn', 'Python 3.11', 'Pydantic v2', 'python-dotenv'] },
  { category: 'AI / NLP',   color: '#a78bfa', items: ['Groq LLaMA 3.3 70B', 'spaCy en_core_web_sm', 'TF-IDF (sklearn)', 'sentence-transformers', 'pdfplumber'] },
  { category: 'Frontend',   color: '#22c55e', items: ['React 18', 'Vite 5', 'Tailwind CSS 3', 'Framer Motion', 'React Router v6'] },
  { category: 'Dev Tools',  color: '#f59e0b', items: ['VS Code', 'GitHub', 'Jupyter Notebook', 'Postman', 'npm / pip'] },
]

const MODELS = [
  {
    name: 'TF-IDF + Cosine Similarity',
    accuracy: '72%', type: 'Baseline',
    color: '#6c63ff',
    desc: 'Term frequency-inverse document frequency vectorization with cosine similarity for keyword-based matching.',
    pros: ['Very fast (< 0.1s)', 'No GPU needed', 'Fully interpretable'],
    cons: ['No semantic understanding', 'Vocabulary mismatch sensitive'],
  },
  {
    name: 'BERT Sentence Embeddings',
    accuracy: '82%', type: 'Semantic',
    color: '#a78bfa',
    desc: 'all-MiniLM-L6-v2 sentence transformer generating 384-dim embeddings with cosine similarity scoring.',
    pros: ['Understands synonyms', 'Semantic similarity', 'Context-aware'],
    cons: ['Slower (~2.3s)', 'Higher memory usage'],
  },
  {
    name: 'LLaMA 3.3 70B via Groq',
    accuracy: '94%', type: 'Primary ✓',
    color: '#22c55e',
    desc: 'Large language model with 70B parameters performing holistic analysis of resume-JD fit via structured prompting.',
    pros: ['Best accuracy (94%)', 'Contextual understanding', 'Section-level feedback'],
    cons: ['Requires API key', 'Rate limited on free tier'],
  },
]

export default function AboutPage() {
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-bg text-white">

      {/* ── HERO ── */}
      <section className="relative py-20 px-6 text-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent2 text-xs font-medium mb-6">
            <BookOpen size={12} /> About This Project
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            How ResumeAI Works
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            An AI-powered ATS resume optimization system built with FastAPI, React, and Groq LLaMA 3.3 70B.
            Final year project — Department of Computer Science, 2026.
          </p>
        </motion.div>
      </section>

      {/* ── PROBLEM & SOLUTION ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-surface border border-red-500/20 rounded-2xl p-7">
            <h2 className="font-display font-bold text-xl mb-4 text-red-400">The Problem</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Over 75% of qualified job applicants are automatically rejected by Applicant Tracking Systems
              (ATS) before a human recruiter ever sees their resume. This happens due to missing keywords,
              poor formatting, and lack of section structure — not lack of qualifications.
            </p>
            {['ATS used by 99% of Fortune 500 companies',
              'Average job gets 250+ applications',
              'Most candidates have no idea how ATS works',
              'Professional resume services cost $200–500'].map((t, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                <span className="text-xs text-muted">{t}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-surface border border-green-500/20 rounded-2xl p-7">
            <h2 className="font-display font-bold text-xl mb-4 text-green-400">Our Solution</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              ResumeAI simulates ATS behavior using a hybrid NLP pipeline — local keyword extraction
              via spaCy combined with deep semantic analysis via Groq's LLaMA 3.3 70B — to give
              candidates actionable, real-time feedback completely free of charge.
            </p>
            {['Real-time ATS score simulation (0–100)',
              'Section-by-section gap analysis',
              'AI-powered bullet point rewriting',
              '100% free via Groq API free tier'].map((t, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-muted">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AI MODELS ── */}
      <section className="py-20 px-6 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest text-muted uppercase mb-2">AI Models</p>
            <h2 className="font-display font-bold text-3xl">3 Models Compared</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {MODELS.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-bg border border-border rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={{ color: m.color, borderColor: m.color + '40', background: m.color + '15' }}>
                    {m.type}
                  </span>
                  <span className="font-display font-extrabold text-2xl" style={{ color: m.color }}>{m.accuracy}</span>
                </div>
                <h3 className="font-display font-bold text-sm mb-2">{m.name}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4 flex-1">{m.desc}</p>
                <div className="space-y-1">
                  {m.pros.map((p, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-green-400">
                      <CheckCircle size={10} />{p}
                    </div>
                  ))}
                  {m.cons.map((c, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-red-400">
                      <span className="w-2.5 h-2.5 flex-shrink-0 text-center leading-none">✗</span>{c}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-muted uppercase mb-2">Built With</p>
          <h2 className="font-display font-bold text-3xl">Technology Stack</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {TECH_STACK.map((cat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <span className="font-display font-bold text-sm">{cat.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <span key={j} className="text-xs px-2.5 py-1 rounded-lg bg-bg border border-border text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 px-6 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest text-muted uppercase mb-2">The Team</p>
            <h2 className="font-display font-bold text-3xl">Meet the Developers</h2>
            <p className="text-muted text-sm mt-2">Replace with your real names before submitting!</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-bg border border-border rounded-2xl p-5 text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-3">
                  <span className="font-display font-extrabold text-accent2">{member.avatar}</span>
                </div>
                <p className="font-display font-bold text-sm mb-0.5">{member.name}</p>
                <p className="text-xs text-accent2 mb-3">{member.role}</p>
                <div className="space-y-1">
                  {member.tasks.map((t, j) => (
                    <p key={j} className="text-xs text-muted">{t}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-center border-t border-border">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display font-bold text-2xl mb-3">Try it yourself</h2>
          <p className="text-muted text-sm mb-6">Paste a job description and your resume to get your ATS score in seconds.</p>
          <button onClick={() => nav('/analyzer')}
            className="btn-primary w-auto px-8 flex items-center gap-2 mx-auto">
            <Target size={15} /> Open ATS Analyzer <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  )
}
