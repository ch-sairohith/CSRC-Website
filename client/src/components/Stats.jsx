import { homepageStats as stats } from '../data/loadProjects.js'

export default function Stats() {
  return (
    <section className="stats" aria-label="Key figures">
      <div className="stats-row">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label} tabIndex={0}>
            <div className="stat-face">
              <strong>{stat.value}</strong>
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
