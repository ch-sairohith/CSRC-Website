const stats = [
  {
    value: 'Excelling',
    label: 'in Research',
    hoverTitle: 'Excelling in Research',
    hoverText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
  {
    value: '120+',
    label: 'Active Projects',
    hoverTitle: 'Active Projects',
    hoverText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
  },
  {
    value: '45 Cr+',
    label: 'R&D Outlay',
    hoverTitle: 'R&D Outlay',
    hoverText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
  },
  {
    value: '50+',
    label: 'Industry Partners',
    hoverTitle: 'Industry Partners',
    hoverText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  },
]

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
