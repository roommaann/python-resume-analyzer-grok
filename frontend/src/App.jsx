import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar        from './components/Navbar'
import LandingPage   from './pages/LandingPage'
import AnalyzerPage  from './pages/AnalyzerPage'
import RewriterPage  from './pages/RewriterPage'
import BuilderPage   from './pages/BuilderPage'
import AboutPage     from './pages/AboutPage'
import AnalyticsPage from './pages/AnalyticsPage'

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: { background:'#1c1c26', color:'#e8e8f0', border:'1px solid #2a2a3a', fontSize:'13px' },
      }} />
      <Navbar />
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/analyzer"  element={<AnalyzerPage />} />
        <Route path="/rewrite"   element={<RewriterPage />} />
        <Route path="/builder"   element={<BuilderPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/about"     element={<AboutPage />} />
      </Routes>
    </>
  )
}