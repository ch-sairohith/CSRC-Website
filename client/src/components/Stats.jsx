import { useEffect, useRef, useState } from 'react'
import { homepageStats as stats } from '../data/loadProjects.js'

function countValue(value, progress) {
  const match = /^(\D*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value)
  if (!match) return value

  const [, prefix, numberText, suffix] = match
  const target = Number(numberText.replace(/,/g, ''))
  if (!Number.isFinite(target)) return value

  const decimals = numberText.includes('.') ? numberText.split('.')[1].length : 0
  const current = target * progress
  return `${prefix}${current.toFixed(decimals)}${suffix}`
}

export default function Stats() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    let animationFrame
    let started = false
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function startCounting() {
      if (started) return
      started = true
      if (prefersReducedMotion) {
        setProgress(1)
        return
      }

      const duration = 1600
      const startTime = performance.now()
      function animate(now) {
        const elapsed = Math.min((now - startTime) / duration, 1)
        setProgress(1 - (1 - elapsed) ** 3)
        if (elapsed < 1) animationFrame = requestAnimationFrame(animate)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    if (!('IntersectionObserver' in window)) {
      startCounting()
      return () => cancelAnimationFrame(animationFrame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        startCounting()
      },
      { threshold: 0.2 },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section ref={sectionRef} className="stats" aria-label="Key figures">
      <div className="stats-row">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label} tabIndex={0}>
            <div className="stat-face">
              <strong aria-label={stat.value}>{countValue(stat.value, progress)}</strong>
              <span>{stat.label}</span>
            </div>
            <div className="stat-cover">
              <strong>{stat.hoverTitle}</strong>
              <span>{stat.hoverText}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
