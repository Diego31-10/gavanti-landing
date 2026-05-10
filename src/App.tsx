import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Forge } from './components/Forge'
import { Footer } from './components/Footer'
import { History } from './pages/History'

function Landing() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#E1E0CC' }}>
      <Hero />
      <About />
      <Forge />
      <Footer />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}
