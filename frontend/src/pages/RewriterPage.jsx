import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Loader2, Copy, Check, Pencil } from 'lucide-react'
import toast from 'react-hot-toast'
import { rewriteBullet } from '../utils/api'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true); toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="btn-secondary mt-3">
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function RewriterPage() {
  const [bullet,  setBullet]  = useState('')
  const [role,    setRole]    = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)

  const handle = async () => {
    if (!bullet.trim()) { toast.error('Enter a bullet point'); return }
    setLoading(true); setResult(null)
    try {
      const data = await rewriteBullet({ bullet, target_role: role })
      setResult(data)
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Rewrite failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-57px)]">
      <div className="overflow-y-auto p-6 bg-surface border-r border-border space-y-5">
        <div>
          <p className="section-label">Weak Bullet Point</p>
          <textarea className="input-field" rows={4}
            placeholder={"e.g. 'Worked on the website and fixed some bugs'"}
            value={bullet} onChange={e => setBullet(e.target.value)} />
        </div>
        <div>
          <p className="section-label">Target Role (optional)</p>
          <input className="input-field" style={{ resize: 'none' }}
            placeholder="e.g. Senior Software Engineer at a fintech startup"
            value={role} onChange={e => setRole(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={handle} disabled={loading}>
          {loading
            ? <><Loader2 size={15} className="inline animate-spin mr-2" />Rewriting…</>
            : <><Wand2   size={15} className="inline mr-2" />Rewrite with AI</>}
        </button>
        <div className="card">
          <p className="section-label">Quick Tips</p>
          {['Start with a strong action verb','Include specific numbers or %','Mention tools/technologies used','Show impact, not just tasks'].map(t => (
            <p key={t} className="text-xs text-muted py-1.5 border-b border-border last:border-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2 flex-shrink-0" />{t}
            </p>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto p-6 bg-surface2">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-4 text-muted">
              <Loader2 size={40} className="animate-spin text-accent2" />
              <p className="text-sm">Crafting impactful rewrites…</p>
            </motion.div>
          )}
          {!loading && !result && (
            <motion.div key="ph" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-3 text-muted">
              <Pencil size={48} className="opacity-20" />
              <p className="text-sm opacity-50 text-center max-w-xs">Enter a weak bullet and AI will craft 3 powerful rewrites</p>
            </motion.div>
          )}
          {!loading && result && (
            <motion.div key="res" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="card border-red-500/20">
                <p className="section-label text-red-400">Original (Weak)</p>
                <p className="text-sm text-muted leading-relaxed">{result.original}</p>
              </div>
              <p className="section-label">AI-Powered Rewrites</p>
              {result.rewrites?.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }} className="card border-accent/20">
                  <p className="section-label text-accent2">Option {i + 1}: {r.version}</p>
                  <p className="text-sm leading-relaxed">{r.text}</p>
                  {r.why && <p className="text-xs text-muted mt-2 italic">{r.why}</p>}
                  <CopyBtn text={r.text} />
                </motion.div>
              ))}
              {result.power_words?.length > 0 && (
                <div className="card">
                  <p className="section-label">Power Words</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.power_words.map(w => <span key={w} className="tag-matched">{w}</span>)}
                  </div>
                </div>
              )}
              {result.tips?.length > 0 && (
                <div className="card">
                  <p className="section-label">Pro Tips</p>
                  {result.tips.map(t => (
                    <p key={t} className="text-xs text-muted py-1.5 border-b border-border last:border-0 flex gap-2">
                      <span className="text-accent2 flex-shrink-0">→</span>{t}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
