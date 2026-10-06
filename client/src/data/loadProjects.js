import consultancyCsv from './consultancy-projects.csv?raw'
import sponsoredCsv from './sponsored-projects.csv?raw'

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false
  const source = text.replace(/^\uFEFF/, '')

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i]
    if (inQuotes) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  if (cell.length || row.length) {
    row.push(cell)
    rows.push(row)
  }

  const [headers, ...body] = rows.filter((entry) => entry.some((value) => value.trim()))
  return body.map((entry) =>
    Object.fromEntries(headers.map((header, index) => [header, (entry[index] ?? '').trim()])),
  )
}

const money = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatCell(value, kind) {
  if (!value) return '—'
  if (kind === 'money') {
    const amount = Number(value)
    return Number.isFinite(amount) ? money.format(amount) : value
  }
  return value
}

export const projectSets = {
  consultancy: {
    title: 'Consultancy Projects',
    rows: parseCsv(consultancyCsv),
    columns: [
      { key: 'Principal Invg', label: 'Principal Investigator' },
      { key: 'CO PI 1 Inst', label: 'Co-PI' },
      { key: 'Consultancy Type', label: 'Consultancy Type' },
      { key: 'Proj No.', label: 'Project No.' },
      { key: 'Proj Title', label: 'Project Title', wide: true },
      { key: 'Type of Consultancy', label: 'Type' },
      { key: 'Financial Year', label: 'Financial Year' },
      { key: 'Start Date', label: 'Start Date' },
      { key: 'End Date', label: 'End Date' },
      { key: 'Funding Agency', label: 'Funding Agency', wide: true },
      { key: 'Department', label: 'Department' },
      { key: 'Status', label: 'Status' },
      { key: 'International Project', label: 'International' },
      { key: 'Project Cost Excluding GST', label: 'Project Cost (excl. GST)', format: 'money' },
    ],
  },
  sponsored: {
    title: 'Sponsored Projects',
    rows: parseCsv(sponsoredCsv),
    columns: [
      { key: 'SlNo', label: 'Sl. No.' },
      { key: 'Principal Invg', label: 'Principal Investigator' },
      { key: 'CO PI 1 Inst', label: 'Co-PI' },
      { key: 'Proj No.', label: 'Project No.' },
      { key: 'Proj Title', label: 'Project Title', wide: true },
      { key: 'Department', label: 'Department' },
      { key: 'Arear of Research', label: 'Area of Research', wide: true },
      { key: 'Financial Year', label: 'Financial Year' },
      { key: 'Start Date', label: 'Start Date' },
      { key: 'End Date', label: 'End Date' },
      { key: 'Duration of Project(Years)', label: 'Duration' },
      { key: 'MOU/NDA', label: 'MOU/NDA' },
      { key: 'Funding Agency', label: 'Funding Agency', wide: true },
      { key: 'Status', label: 'Status' },
      { key: 'Project Cost', label: 'Project Cost', format: 'money' },
    ],
  },
}
