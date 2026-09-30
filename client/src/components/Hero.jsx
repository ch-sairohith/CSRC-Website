import { useEffect, useState } from 'react'

const slides = [
  {
    title: 'Lorem ipsum dolor sit amet consectetur',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Sed ut perspiciatis unde omnis iste natus',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
  },
  {
    title: 'Nemo enim ipsam voluptatem quia voluptas',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Highlights">
      <div className="hero-window">
        <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <article className="hero-slide" key={slide.title} aria-hidden={slideIndex !== index}>
              <div className="hero-copy">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <div className="hero-actions">
                  <a className="btn" href="#">
                    Explore Active Grants
                  </a>
                  <a className="btn" href="#">
                    Our Facilities
                  </a>
                </div>
              </div>
              <div className="hero-visual">
                <img src="/react.svg" alt="React logo" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Slides">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
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
