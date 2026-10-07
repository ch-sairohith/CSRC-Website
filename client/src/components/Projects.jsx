import { useEffect, useMemo, useState } from 'react'
import { formatCell, projectSets } from '../data/loadProjects.js'

const PAGE_SIZE = 8
const DEFAULT_SEARCH_FIELDS = ['Funding Agency', 'Status', 'Department', 'Principal Invg', 'CO PI 1 Inst']
const DEFAULT_SEARCH_LABEL = 'Search by funding agency, status, department, or professor name'

function statusClass(value) {
  const key = value.toLowerCase()
  if (key === 'approved' || key === 'completed' || key === 'hold') return `is-${key}`
  return ''
}

function matchesSearch(row, query, fields) {
  return fields.some((field) => (row[field] ?? '').toLowerCase().includes(query))
}

export default function Projects({ kind }) {
  const set = projectSets[kind]
  const searchFields = set.searchFields ?? DEFAULT_SEARCH_FIELDS
  const searchLabel = set.searchLabel ?? DEFAULT_SEARCH_LABEL
  const noun = set.noun ?? 'projects'
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const needle = query.trim().toLowerCase()
  const filtered = useMemo(
    () => (needle ? set.rows.filter((row) => matchesSearch(row, needle, searchFields)) : set.rows),
    [needle, searchFields, set.rows],
  )
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const start = page * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)
  const end = start + visible.length

  function showPage(next) {
    setPage(Math.min(pageCount - 1, Math.max(0, next)))
  }

  function updateQuery(value) {
    setQuery(value)
    setPage(0)
  }

  useEffect(() => {
    document.getElementById('projects-heading')?.focus({ preventScroll: true })
  }, [])

  return (
    <section className="projects-page" aria-labelledby="projects-heading">
      <div className="section-wrap">
        <h1 id="projects-heading" tabIndex={-1}>{set.title}</h1>
        <p className="projects-lead">
          {needle
            ? `${filtered.length} of ${set.rows.length} ${noun} match your search.`
            : (set.summary ?? `${set.rows.length} projects from the 31 March 2026 records.`).replace('{count}', set.rows.length)}
        </p>

        <form className="projects-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="projects-query">{searchLabel}</label>
          <input
            id="projects-query"
            type="search"
            value={query}
            placeholder={searchLabel}
            onChange={(event) => updateQuery(event.target.value)}
          />
          {query ? (
            <button type="button" onClick={() => updateQuery('')}>
              Clear
            </button>
          ) : null}
        </form>

        <div className="projects-controls">
          <p className="projects-range">
            Rows {filtered.length === 0 ? 0 : start + 1}–{end} of {filtered.length}
          </p>
          <div className="projects-arrows">
            <button
              type="button"
              aria-label="Show previous rows"
              disabled={page === 0}
              onClick={() => showPage(page - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 6.5 9 12l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Show next rows"
              disabled={page >= pageCount - 1}
              onClick={() => showPage(page + 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 6.5 15 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="projects-table-wrap">
          <table className="projects-table">
            <thead>
              <tr>
                {set.columns.map((column) => (
                  <th key={column.key} scope="col" className={column.wide ? 'is-wide' : undefined}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td className="projects-empty" colSpan={set.columns.length}>
                    {set.emptyMessage ?? 'No projects match that funding agency, status, department, or professor name.'}
                  </td>
                </tr>
              ) : (
                visible.map((row) => (
                  <tr key={row[set.rowKey ?? 'Proj No.']}>
                    {set.columns.map((column) => (
                      <td key={column.key} className={column.wide ? 'is-wide' : undefined}>
                        {column.format === 'link' && row[column.key] ? (
                          <a
                            href={row[column.key]}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${row.Title || 'details'}`}
                          >
                            View
                          </a>
                        ) : column.key === 'Status' && row[column.key] ? (
                          <span className={`project-status ${statusClass(row[column.key])}`}>{row[column.key]}</span>
                        ) : (
                          formatCell(row[column.key], column.format)
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
