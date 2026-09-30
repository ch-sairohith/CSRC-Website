import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import NewsAndJobs from './components/Newsandjobs.jsx'
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
      </main>
      <NewsAndJobs />
      <Footer />
    </>
  )
}
