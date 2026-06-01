import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles, Target, Wand2, FileText, ArrowRight,
  CheckCircle, Zap, Shield, TrendingUp, ChevronDown
} from 'lucide-react'

const FEATURES = [
  {
    icon: Target,
    title: 'ATS Score Analyzer',
    desc: 'Paste any job description and your resume. Get an instant 0–100 ATS score with section-by-section breakdown.',
    color: '#6c63ff',
  },
  {
    icon: Wand2,
    title: 'AI Bullet Rewriter',
    desc: 'Turn weak resume bullets into 3 powerful, metric-driven versions optimized for the role you want.',
    color: '#a78bfa',
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    desc: 'Enter your experience and skills. Get a polished professional summary, improved bullets, and power words.',
    color: '#22c55e',
  },
]

const STATS = [
  { value: '75%', label: 'of qualified candidates rejected by ATS' },
  { value: '94%', label: 'model accuracy on test dataset' },
  { value: '3',   label: 'AI models powering the system' },
  { value: '+29', label: 'average ATS score improvement' },
]

const HOW_STEPS = [
  { step: '01', title: 'Paste Job Description', desc: 'Copy any job posting and paste it into the analyzer.' },
  { step: '02', title: 'Upload Your Resume',    desc: 'Drop a PDF or paste your resume text directly.' },
  { step: '03', title: 'Get Your ATS Score',    desc: 'AI analyzes keyword match, section quality, and gaps.' },
  { step: '04', title: 'Apply Improvements',    desc: 'Use the rewriter and builder to fix weak areas instantly.' },
]

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const isPlus = target.startsWith('+')
  const num = parseInt(target.replace(/\D/g,''))

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(num / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(start)
    }, 30)
    return () => clearInterval(timer)
  }, [inView, num])

  return (
    <span ref={ref}>
      {isPlus ? '+' : ''}{count}{suffix}
    </span>
  )
}

export default function LandingPage() {
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-bg text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* background grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent2/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl"
        >
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent2 text-xs font-medium mb-8"
          >
            <Sparkles size={12} />
            Powered by Groq LLaMA 3.3 70B · spaCy · FastAPI · React
          </motion.div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight tracking-tight mb-6">
            Build a resume that<br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #6c63ff, #a78bfa, #22c55e)' }}>
                actually gets past
              </span>
            </span>
            <br />the bots.
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            ResumeAI simulates real ATS scoring, finds your keyword gaps, and rewrites
            your resume with AI — so recruiters actually see your application.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => nav('/analyzer')}
              className="btn-primary flex items-center justify-center gap-2 w-auto px-8"
            >
              <Target size={16} /> Analyze My Resume
            </button>
            <button
              onClick={() => nav('/about')}
              className="px-8 py-3 rounded-xl border border-border2 text-muted hover:text-white hover:border-accent/50 transition-all duration-200 font-medium text-sm flex items-center gap-2 justify-center"
            >
              Learn How It Works <ArrowRight size={14} />
            </button>
          </div>

          {/* scroll hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16 flex flex-col items-center gap-1 text-muted/40"
          >
            <span className="text-xs">scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="py-16 border-y border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-extrabold text-4xl text-accent2 mb-1">
                <CountUp target={s.value} />
                {s.value.endsWith('%') ? '%' : ''}
              </div>
              <p className="text-xs text-muted leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-widest text-muted uppercase mb-3">What ResumeAI Does</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl">Three tools. One goal.</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Get your resume in front of a human recruiter.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-surface border border-border rounded-2xl p-6 cursor-pointer group"
              onClick={() => nav(i === 0 ? '/analyzer' : i === 1 ? '/rewrite' : '/builder')}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: f.color + '20', border: `1px solid ${f.color}40` }}>
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-display font-bold text-base mb-2 group-hover:text-accent2 transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-xs font-medium"
                style={{ color: f.color }}>
                Try it <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold tracking-widest text-muted uppercase mb-3">How It Works</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">From paste to improved in 60 seconds</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent via-accent2 to-green-500 opacity-30" />

            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface2 border border-border mx-auto mb-4 flex items-center justify-center">
                  <span className="font-display font-extrabold text-lg text-accent2">{s.step}</span>
                </div>
                <h4 className="font-display font-bold text-sm mb-2">{s.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ───────────────────────────── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold tracking-widest text-muted uppercase mb-3">Why This Matters</p>
            <h2 className="font-display font-bold text-3xl mb-6">ATS rejects 75% of resumes before a human ever reads them.</h2>
            <p className="text-muted leading-relaxed mb-6">
              Applicant Tracking Systems scan your resume for keywords, formatting, and section structure.
              If your resume doesn't match what the bot is looking for — it's gone, no matter how qualified you are.
            </p>
            <div className="space-y-3">
              {[
                'Fortune 500 companies use ATS for 99% of applications',
                'Average job posting receives 250+ resumes',
                'Only 2% of applicants get an interview',
                'Keyword optimization alone can boost ATS score by 30+ points',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: Zap,       color: '#6c63ff', title: 'Instant Analysis',  desc: 'Get your ATS score in under 2 seconds using Groq LLaMA 3.3 70B.' },
              { icon: Shield,    color: '#22c55e', title: '100% Free',          desc: 'Powered by Groq free tier. No credit card, no hidden costs.' },
              { icon: TrendingUp,color: '#f59e0b', title: 'Proven Improvement', desc: 'Average ATS score improves by 29 points after applying AI suggestions.' },
            ].map((item, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: item.color + '20' }}>
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-surface border border-accent/20 rounded-3xl p-12"
          style={{ background: 'linear-gradient(135deg, #13131a, #1a1040)' }}
        >
          <Sparkles size={32} className="text-accent2 mx-auto mb-4" />
          <h2 className="font-display font-extrabold text-3xl mb-3">Ready to beat the bots?</h2>
          <p className="text-muted mb-8">Paste your resume and a job description. Get your score in seconds.</p>
          <button
            onClick={() => nav('/analyzer')}
            className="btn-primary w-auto px-10 flex items-center gap-2 mx-auto"
          >
            <Target size={16} /> Start Analyzing — It's Free
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-6 text-center text-xs text-muted">
        <p className="font-display font-bold text-sm text-white mb-1">ResumeAI</p>
        <p>Built with FastAPI · React · Groq LLaMA 3.3 · spaCy · Tailwind CSS</p>
        <p className="mt-1 opacity-50">AI-Powered ATS Resume Builder & Scorer · 2026</p>
      </footer>
    </div>
  )
}
