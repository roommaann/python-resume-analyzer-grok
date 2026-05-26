import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, CheckCircle, XCircle, Lightbulb, Target } from 'lucide-react'
import toast from 'react-hot-toast'
import { analyzeResume } from '../utils/api'
import ScoreRing from '../components/ScoreRing'
import SectionBar from '../components/SectionBar'
import DropZone from '../components/DropZone'

const priorityColor = { high: 'text-red-400', medium: 'text-amber-400', low: 'text-green-400' }

export default function AnalyzerPage() {
  const [jd,      setJd]      = useState('')
  const [resume,  setResume]  = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)

  const handleAnalyze = async () => {
    if (!jd.trim() || !resume.trim()) { toast.error('Paste both a job description and your resume'); return }
    setLoading(true); setResult(null)
    try {
      const data = await analyzeResume({ job_description: jd, resume_text: resume })
      setResult(data)
      toast.success('Analysis complete!')
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Analysis failed — check backend is running')
    } finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-57px)]">

      {/* LEFT */}
      <div className="overflow-y-auto p-6 bg-surface border-r border-border space-y-5">
        <div>
          <p className="section-label">Job Description</p>
          <textarea className="input-field" rows={8}
            placeholder="Paste the full job description here…"
            value={jd} onChange={e => setJd(e.target.value)} />
        </div>
        <div>
          <p className="section-label">Your Resume</p>
          <DropZone onText={setResume} />
          <textarea className="input-field mt-2" rows={10}
            placeholder="Or paste your resume text here…"
            value={resume} onChange={e => setResume(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={handleAnalyze} disabled={loading}>
          {loading
            ? <><Loader2 size={15} className="inline animate-spin mr-2" />Analyzing…</>
            : <><Sparkles size={15} className="inline mr-2" />Analyze My Resume</>}
        </button>
      </div>

      {/* RIGHT */}
      <div className="overflow-y-auto p-6 bg-surface2">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-4 text-muted">
              <Loader2 size={40} className="animate-spin text-accent2" />
              <p className="text-sm">Gemini is scoring your resume…</p>
            </motion.div>
          )}

          {!loading && !result && (
            <motion.div key="ph" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-3 text-muted">
              <Target size={48} className="opacity-20" />
              <p className="text-sm text-center max-w-xs opacity-50">
                Paste a job description and your resume, then click Analyze
              </p>
            </motion.div>
          )}

          {!loading && result && (
            <motion.div key="res" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <ScoreRing score={result.ats_score} />

              <div className="card">
                <p className="section-label">Section Breakdown</p>
                {result.sections?.map(s => <SectionBar key={s.name} {...s} />)}
              </div>

              <div className="card">
                <p className="section-label">Matched Keywords</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {result.matched_keywords?.map(k => (
                    <span key={k} className="tag-matched"><CheckCircle size={10} className="inline mr-1" />{k}</span>
                  ))}
                </div>
                <p className="section-label">Missing Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missing_keywords?.map(k => (
                    <span key={k} className="tag-missing"><XCircle size={10} className="inline mr-1" />{k}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="section-label">Suggested Improvements</p>
                {result.improvements?.map((imp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }} className="card mb-3">
                    <div className="flex items-start gap-2 mb-1.5">
                      <Lightbulb size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">{imp.title}</p>
                        {imp.priority && (
                          <span className={`text-xs font-medium uppercase tracking-wide ${priorityColor[imp.priority] || 'text-muted'}`}>
                            {imp.priority} priority
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted leading-relaxed ml-5">{imp.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
