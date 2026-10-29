import { useEffect, useMemo, useState } from 'react'
import { formatCell, projectSets } from '../data/loadProjects.js'

const PAGE_SIZE = 8
const BLANK = '__blank__'

function statusClass(value) {
  const key = value.toLowerCase()
  if (key === 'approved' || key === 'completed' || key === 'hold') return `is-${key}`
  return ''
}

function cellValue(row, key) {
  return (row[key] ?? '').trim()
}

export default function Projects({ kind }) {
  const set = projectSets[kind]
  const noun = set.noun ?? 'projects'
  const filterColumns = set.columns.filter((column) => column.format !== 'link')
  const [filterColumn, setFilterColumn] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [page, setPage] = useState(0)
  const activeColumn = filterColumns.find((column) => column.key === filterColumn)
  const valueOptions = useMemo(() => {
    if (!activeColumn) return []
    const values = new Set()
    let hasBlank = false
    for (const row of set.rows) {
      const value = cellValue(row, activeColumn.key)
      if (value) values.add(value)
      else hasBlank = true
    }
    const options = [...values].sort((left, right) =>
      left.localeCompare(right, 'en', { numeric: true, sensitivity: 'base' }),
    )
    if (hasBlank) options.unshift(BLANK)
    return options
  }, [activeColumn, set.rows])
  const filtering = Boolean(activeColumn && filterValue)
  const filtered = useMemo(() => {
    if (!filtering) return set.rows
    return set.rows.filter((row) => {
      const value = cellValue(row, activeColumn.key)
      return filterValue === BLANK ? value === '' : value === filterValue
    })
  }, [activeColumn, filterValue, filtering, set.rows])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const start = page * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)
  const end = start + visible.length

  function showPage(next) {
    setPage(Math.min(pageCount - 1, Math.max(0, next)))
  }

  function chooseColumn(value) {
    setFilterColumn(value)
    setFilterValue('')
    setPage(0)
  }

  function chooseValue(value) {
    setFilterValue(value)
    setPage(0)
  }

  function clearFilter() {
    setFilterColumn('')
    setFilterValue('')
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
          {filtering
            ? `${filtered.length} of ${set.rows.length} ${noun} match ${activeColumn.label}.`
            : (set.summary ?? `${set.rows.length} projects from the 31 March 2026 records.`).replace('{count}', set.rows.length)}
        </p>

        <form className="projects-search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="projects-filter-column">Column</label>
          <select
            id="projects-filter-column"
            value={filterColumn}
            onChange={(event) => chooseColumn(event.target.value)}
          >
            <option value="">All columns</option>
            {filterColumns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.label}
              </option>
            ))}
          </select>
          <label htmlFor="projects-filter-value">Value</label>
          <select
            id="projects-filter-value"
            value={filterValue}
            disabled={!activeColumn}
            onChange={(event) => chooseValue(event.target.value)}
          >
            <option value="">{activeColumn ? 'All values' : 'Choose a column first'}</option>
            {valueOptions.map((value) => (
              <option key={value} value={value}>
                {value === BLANK ? 'Blank' : formatCell(value, activeColumn.format)}
              </option>
            ))}
          </select>
          {filterColumn || filterValue ? (
            <button type="button" onClick={clearFilter}>
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
                    {activeColumn
                      ? `No ${noun} match that ${activeColumn.label}.`
                      : `No ${noun} to show.`}
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
