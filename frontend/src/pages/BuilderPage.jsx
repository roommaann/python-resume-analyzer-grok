import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, Copy, FileText, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { generateSummary } from '../utils/api'

function CopyBtn({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true); toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="btn-secondary mt-3">
      {copied ? <Check size={12} /> : <Copy size={12} />}{copied ? 'Copied' : label}
    </button>
  )
}

export default function BuilderPage() {
  const [form,    setForm]    = useState({ name: '', experience: '', skills: '', target_role: '' })
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handle = async () => {
    if (!form.experience.trim() && !form.skills.trim()) { toast.error('Fill in experience or skills'); return }
    setLoading(true); setResult(null)
    try {
      const data = await generateSummary(form)
      setResult(data)
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Generation failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-57px)]">
      <div className="overflow-y-auto p-6 bg-surface border-r border-border space-y-4">
        <div>
          <p className="section-label">Your Name</p>
          <input className="input-field" placeholder="e.g. Alex Johnson" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <p className="section-label">Target Role (optional)</p>
          <input className="input-field" placeholder="e.g. Senior Data Scientist" value={form.target_role} onChange={set('target_role')} />
        </div>
        <div>
          <p className="section-label">Work Experience</p>
          <textarea className="input-field" rows={6}
            placeholder={"Senior Dev at TechCorp (2021–now)\n• Built React dashboards\n• Led AWS migration\n\nJunior Dev at StartupX (2019–2021)\n• Built REST APIs in Node.js"}
            value={form.experience} onChange={set('experience')} />
        </div>
        <div>
          <p className="section-label">Skills</p>
          <textarea className="input-field" rows={2}
            placeholder="React, Node.js, Python, AWS, Docker, PostgreSQL"
            value={form.skills} onChange={set('skills')} />
        </div>
        <button className="btn-primary" onClick={handle} disabled={loading}>
          {loading
            ? <><Loader2  size={15} className="inline animate-spin mr-2" />Generating…</>
            : <><Sparkles size={15} className="inline mr-2" />Generate AI Content</>}
        </button>
      </div>

      <div className="overflow-y-auto p-6 bg-surface2">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-4 text-muted">
              <Loader2 size={40} className="animate-spin text-accent2" />
              <p className="text-sm">Crafting your resume content…</p>
            </motion.div>
          )}
          {!loading && !result && (
            <motion.div key="ph" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-3 text-muted">
              <FileText size={48} className="opacity-20" />
              <p className="text-sm opacity-50 text-center max-w-xs">Fill in your details to generate AI-powered resume content</p>
            </motion.div>
          )}
          {!loading && result && (
            <motion.div key="res" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="card border-accent/20">
                <p className="section-label text-accent2">Professional Summary</p>
                <p className="text-sm leading-relaxed">{result.summary}</p>
                <CopyBtn text={result.summary} label="Copy Summary" />
              </div>
              {result.improved_bullets?.length > 0 && (
                <div className="card">
                  <p className="section-label">Improved Bullets</p>
                  {result.improved_bullets.map((b, i) => (
                    <div key={i} className="flex gap-2 py-2 border-b border-border last:border-0 text-sm leading-relaxed">
                      <span className="text-green-400 flex-shrink-0 mt-0.5">→</span>
                      <span>{b.replace('• ', '')}</span>
                    </div>
                  ))}
                  <CopyBtn text={result.improved_bullets.join('\n')} label="Copy All" />
                </div>
              )}
              {result.power_words?.length > 0 && (
                <div className="card">
                  <p className="section-label">Power Words</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.power_words.map(w => <span key={w} className="tag-matched">{w}</span>)}
                  </div>
                </div>
              )}
              {result.recommended_skills?.length > 0 && (
                <div className="card">
                  <p className="section-label">Skills to Highlight</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.recommended_skills.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent2 border border-accent/20">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
