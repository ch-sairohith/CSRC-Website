import { useEffect, useRef, useState } from 'react'

export default function About() {
  const directorHeadingRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const directorHeading = directorHeadingRef.current
    if (!directorHeading) return undefined

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0 },
    )
    observer.observe(directorHeading)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`about${visible ? ' is-visible' : ''}`} id="about">
      <div className="section-wrap">
        <h2>About Us</h2>

        <p>
          CSRC actively fosters interactions with industries, research organizations,
          academic institutions, and government agencies. We provide central
          administrative support to manage sponsored projects, consulting
          assignments, and technology licensing effortlessly.
        </p>

        <div className="mission-vision">
          <article>
            <h3 ref={directorHeadingRef} className="about-reveal">Director, IIT Tirupati</h3>
            <p className="about-reveal">
              Innovation flourishes at the intersection of academia and
              industry. The Centre for Sponsored Research and Consultancy
              (CSRC) at IIT Tirupati is committed to translating world-class
              research into real-world impact. Through collaborative R&D,
              consultancy, and technology transfer, we empower our faculty
              and students to solve complex industry problems. We welcome
              you to partner with us in shaping a sustainable, tech-driven
              future.
            </p>

            <div className="leadership-image about-reveal">
              <img
                src={`${import.meta.env.BASE_URL}director-iit-tirupati.jpg`}
                alt="Director, IIT Tirupati"
              />
            </div>
          </article>

          <article>
            <h3 className="about-reveal">Dean (CSRC), IIT Tirupati</h3>
            <p className="about-reveal">
              At CSRC, our vision is to transform innovative research into
              actionable technological solutions. By fostering strong
              academia-industry partnerships, we facilitate high-impact
              consultancy, sponsored R&D, and technology commercialization
              that address critical societal and industrial challenges. We
              invite researchers, industry leaders, and public institutions
              to explore collaborative opportunities with IIT Tirupati as
              we continue to advance frontier science and technology.
            </p>

            <div className="leadership-image about-reveal">
              <img
                src={`${import.meta.env.BASE_URL}dean-cif-iit-tirupati.png`}
                alt="Dean (CSRC), IIT Tirupati"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
