import { useEffect, useState } from 'react'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Stats from './components/Stats.jsx'
import NewsAndJobs from './components/Newsandjobs.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <>
      <Header page={page} onNavigate={setPage} />
      {page === 'home' ? (
        <>
          <main>
            <Hero />
            <About />
            <Stats />
          </main>
          <NewsAndJobs />
        </>
      ) : (
        <main>
          <Projects key={page} kind={page} />
        </main>
      )}
      <Footer />
    </>
  )
}
