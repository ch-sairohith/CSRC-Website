import positionsCsv from '../data/project-positions.csv?raw'
import { parseCsv } from '../data/loadProjects.js'

const jobs = parseCsv(positionsCsv).filter((job) => job.title && job.applyUrl)

function AnnouncementList({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined} inert={hidden || undefined}>
      {jobs.map((job) => (
        <li key={`${hidden ? 'copy' : 'live'}-${job.id}`}>
          <a href={job.applyUrl} target="_blank" rel="noreferrer">
            {job.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Announcements() {
  if (jobs.length === 0) return null

  const duration = Math.max(36, jobs.reduce((total, job) => total + job.title.length, 0) * 0.14)

  return (
    <section className="announce-bar" aria-label="Announcements" style={{ '--announce-duration': `${duration}s` }}>
      <p className="announce-label">Announcements</p>
      <div className="announce-viewport">
        <div className="announce-track">
          <AnnouncementList />
          <AnnouncementList hidden />
        </div>
      </div>
    </section>
  )
}
