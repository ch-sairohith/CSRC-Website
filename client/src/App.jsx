import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import About from './components/About.jsx'
import Contacts from './components/Contacts.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Stats from './components/Stats.jsx'
import NewsAndJobs from './components/Newsandjobs.jsx'
import IpIncubation from './components/IpIncubation.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return (
    <main className="projects-page">
      <p className="projects-lead">Redirecting…</p>
    </main>
  )
}

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Stats />
      </main>
      <NewsAndJobs />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<main><Contacts /></main>} />
        <Route path="/sponsored" element={<main><Projects kind="sponsored" /></main>} />
        <Route path="/consultancy" element={<main><Projects kind="consultancy" /></main>} />
        <Route path="/grants" element={<main><Projects kind="grants" /></main>} />
        <Route path="/ip" element={<main><IpIncubation /></main>} />
        <Route path="/research-facilities" element={<ExternalRedirect to="https://iittp.ac.in/istem" />} />
        <Route
          path="/ip/ipr-policy"
          element={<ExternalRedirect to="https://files.iittp.ac.in/pdfs/IPR%20Policy.pdf" />}
        />
        <Route
          path="/ip/business-incubation-policy"
          element={<ExternalRedirect to="https://files.iittp.ac.in/pdfs/csrc/Business%20Incubation%20Policy.pdf" />}
        />
        <Route
          path="/ip/patent-technology-transfer"
          element={<ExternalRedirect to="https://iittp.ac.in/patent-technology-transfer" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
