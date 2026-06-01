import { NavLink } from 'react-router-dom'
import { BarChart2, Wand2, FileText, Cpu } from 'lucide-react'

const links = [
  { to: '/',        icon: BarChart2, label: 'ATS Analyzer'   },
  { to: '/rewrite', icon: Wand2,     label: 'AI Rewriter'    },
  { to: '/builder', icon: FileText,  label: 'Resume Builder' },
]

export default function Navbar() {
  return (
    <header className="bg-surface border-b border-border px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Cpu size={20} className="text-accent2" />
        <span className="font-display font-extrabold text-lg tracking-tight">
          Resume<span className="text-accent2">AI</span>
        </span>
      </div>

      <nav className="flex gap-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
               ${isActive ? 'bg-surface2 text-white border border-border' : 'text-muted hover:text-white hover:bg-surface2/50'}`
            }
          >
            <Icon size={14} />{label}
          </NavLink>
        ))}
      </nav>

      <span className="text-xs px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-medium">
        ✦ GROK
      </span>
    </header>
  )
}
