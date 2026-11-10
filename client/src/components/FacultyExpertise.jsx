import { useMemo, useState } from 'react'
import { parseCsv } from '../data/loadProjects.js'

const facultyFiles = import.meta.glob('../data/IIT_Tirupati_*_Faculty.csv', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const faculty = Object.entries(facultyFiles)
  .sort(([left], [right]) => left.localeCompare(right))
  .flatMap(([file, csv]) =>
    parseCsv(csv).map((row, index) => ({
      ...row,
      id: `${file}-${row['S. No.'] || index}`,
      name: row['Faculty Name']?.trim() ?? '',
      department: row.Department?.trim() ?? '',
      designation: row.Designation?.trim() ?? '',
      almaMater: row['Alma Mater']?.trim() ?? '',
      interests: (row['Areas of Interest'] ?? row['Area of Interest'] ?? '').trim(),
      webpage: (row['WebPage link'] ?? row['Web Page link'] ?? '').trim(),
      email: row['Email ID']?.trim() ?? '',
      image: row['Image Link']?.trim() ?? '',
    })),
  )
  .filter((member) => member.name)

const departments = [...new Set(faculty.map((member) => member.department).filter(Boolean))]
  .sort((left, right) => left.localeCompare(right))

function searchable(value) {
  return value.toLocaleLowerCase()
}

function displayText(value) {
  return value.replace(/&amp;/g, '&')
}

export default function FacultyExpertise() {
  const [nameQuery, setNameQuery] = useState('')
  const [department, setDepartment] = useState('')
  const [interestQuery, setInterestQuery] = useState('')
  const filteredFaculty = useMemo(() => {
    const nameSearch = searchable(nameQuery.trim())
    const departmentSearch = searchable(department.trim())
    const interestSearch = searchable(interestQuery.trim())
    return faculty.filter((member) =>
      (!nameSearch || searchable(member.name).includes(nameSearch)) &&
      (!departmentSearch || searchable(member.department).includes(departmentSearch)) &&
      (!interestSearch || searchable(member.interests).includes(interestSearch)),
    )
  }, [department, interestQuery, nameQuery])

  function clearFilters() {
    setNameQuery('')
    setDepartment('')
    setInterestQuery('')
  }

  return (
    <section className="projects-page faculty-page" aria-labelledby="faculty-heading">
      <div className="section-wrap">
        <h1 id="faculty-heading" tabIndex={-1}>Faculty Expertise</h1>
        <p className="projects-lead">
          Search IIT Tirupati faculty by name, department, or area of interest.
        </p>

        <form className="faculty-filters" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="faculty-name">
            Faculty name
            <input
              id="faculty-name"
              type="search"
              value={nameQuery}
              onChange={(event) => setNameQuery(event.target.value)}
              placeholder="Search faculty name"
            />
          </label>
          <label htmlFor="faculty-department">
            Department
            <input
              id="faculty-department"
              type="search"
              list="faculty-departments"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              placeholder="Search department"
            />
            <datalist id="faculty-departments">
              {departments.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </label>
          <label htmlFor="faculty-interest">
            Area of interest
            <input
              id="faculty-interest"
              type="search"
              value={interestQuery}
              onChange={(event) => setInterestQuery(event.target.value)}
              placeholder="Search areas of interest"
            />
          </label>
          {nameQuery || department || interestQuery ? (
            <button type="button" onClick={clearFilters}>Clear filters</button>
          ) : null}
        </form>

        {filteredFaculty.length ? (
          <div className="faculty-grid">
            {filteredFaculty.map((member) => (
              <article className="faculty-card" key={member.id}>
                {member.image ? (
                  <img className="faculty-image" src={member.image} alt="" loading="lazy" />
                ) : null}
                <div className="faculty-card-content">
                  <h2>{displayText(member.name)}</h2>
                  {member.designation ? <p className="faculty-designation">{displayText(member.designation)}</p> : null}
                  {member.department ? <p className="faculty-department">{displayText(member.department)}</p> : null}
                  {member.interests ? (
                    <p><strong>Areas of interest:</strong> {displayText(member.interests)}</p>
                  ) : null}
                  {member.almaMater ? <p><strong>Alma mater:</strong> {displayText(member.almaMater)}</p> : null}
                  <div className="faculty-links">
                    {member.webpage ? (
                      <a href={member.webpage} target="_blank" rel="noreferrer">Faculty profile</a>
                    ) : null}
                    {member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="faculty-empty">No faculty match these filters.</p>
        )}
      </div>
    </section>
  )
}
