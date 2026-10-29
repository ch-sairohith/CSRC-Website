import { useEffect, useState } from 'react'
import newsCsv from '../data/news.csv?raw'
import { parseCsv } from '../data/loadProjects.js'

const slides = parseCsv(newsCsv).filter((item) => item.title)

function imageSrc(path) {
  if (!path || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const relative = path.replace(/^\/?public\//, '').replace(/^\//, '')
  const encoded = relative
    .split('/')
    .map((part) => encodeURI(part))
    .join('/')
  return `${base}/${encoded}`
}

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return undefined
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [index])

  if (slides.length === 0) return null

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="News">
      <div className="hero-window">
        <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <article className="hero-slide" key={slide.id || slide.title} aria-hidden={slideIndex !== index}>
              <div className="hero-copy">
                <h1>{slide.title}</h1>
                {slide.body_text?.trim() ? <p>{slide.body_text.trim()}</p> : null}
                {slide.button?.trim() ? (
                  <div className="hero-actions">
                    <a className="btn" href={slide.link?.trim() || '#'}>
                      {slide.button.trim()}
                    </a>
                  </div>
                ) : null}
              </div>
              <div className="hero-visual">
                {slide.image ? <img src={imageSrc(slide.image)} alt="" /> : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Slides">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id || slide.title}
            type="button"
            role="tab"
            aria-label={`Show slide ${slideIndex + 1}`}
            aria-selected={slideIndex === index}
            className={slideIndex === index ? 'is-active' : undefined}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  )
}
