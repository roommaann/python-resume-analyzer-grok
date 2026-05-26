import { motion } from 'framer-motion'

const getColor   = (s) => s >= 75 ? '#22c55e' : s >= 50 ? '#f59e0b' : '#ef4444'
const getVerdict = (s) => s >= 75 ? 'Excellent Match' : s >= 55 ? 'Good Match' : s >= 35 ? 'Partial Match' : 'Weak Match'

export default function ScoreRing({ score = 0 }) {
  const r    = 54
  const circ = 2 * Math.PI * r
  const color = getColor(score)

  return (
    <div className="flex flex-col items-center py-5 gap-2">
      <div className="relative w-36 h-36">
        <svg width="144" height="144" viewBox="0 0 144 144" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="72" cy="72" r={r} fill="none" stroke="#2a2a3a" strokeWidth="10" />
          <motion.circle cx="72" cy="72" r={r}
            fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - (score / 100) * circ }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="font-display font-extrabold text-4xl leading-none" style={{ color }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {score}
          </motion.span>
          <span className="text-xs text-muted mt-0.5">/ 100</span>
        </div>
      </div>
      <span className="font-display font-bold text-sm tracking-wide" style={{ color }}>
        {getVerdict(score)}
      </span>
    </div>
  )
}
