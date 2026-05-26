import { motion } from 'framer-motion'

const color = (s) => s >= 75 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444'

export default function SectionBar({ name, score, feedback }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-start mb-1.5">
        <div>
          <span className="text-sm font-medium">{name}</span>
          {feedback && <p className="text-xs text-muted mt-0.5">{feedback}</p>}
        </div>
        <span className="text-sm font-bold ml-4 flex-shrink-0" style={{ color: color(score) }}>{score}%</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color(score) }}
          initial={{ width: 0 }} animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  )
}
