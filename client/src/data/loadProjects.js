import consultancyCsv from './consultancy-projects.csv?raw'
import grantsCsv from './grant-calls.csv?raw'
import sponsoredCsv from './sponsored-projects.csv?raw'

export function parseCsv(text) {
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

const exactMoney = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const crores = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
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
  grants: {
    title: 'Grant Calls',
    noun: 'calls',
    summary: '{count} grant calls and proposals from the CSRC announcements page.',
    rowKey: 'id',
    rows: parseCsv(grantsCsv),
    columns: [
      { key: 'Title', label: 'Title', wide: true },
      { key: 'Funding Agency', label: 'Funding Agency', wide: true },
      { key: 'Deadline', label: 'Deadline' },
      { key: 'Link', label: 'Link', format: 'link' },
    ],
  },
}

function sumRupees(rows, key) {
  const paise = rows.reduce((total, row) => {
    const amount = Number(row[key])
    return total + (Number.isFinite(amount) ? Math.round(amount * 100) : 0)
  }, 0)
  return paise / 100
}

function countIndustryPartners(rows) {
  const partners = new Set()
  for (const row of rows) {
    const name = (row['Funding Agency'] ?? '').trim().replace(/\s+/g, ' ')
    if (name) partners.add(name.toLowerCase())
  }
  return partners.size
}

const sponsoredRows = projectSets.sponsored.rows
const consultancyRows = projectSets.consultancy.rows
const sanctionedAmount = sumRupees(sponsoredRows, 'Project Cost')
const mouCount = sponsoredRows.filter((row) => row['MOU/NDA'] === 'MOU').length
const industryPartners = countIndustryPartners(consultancyRows)

export const homepageStats = [
  {
    value: String(sponsoredRows.length),
    label: 'Sponsored Projects',
    hoverTitle: 'Sponsored Projects',
    hoverText: `${sponsoredRows.length} sponsored projects in the CSRC records.`,
  },
  {
    value: `₹${crores.format(sanctionedAmount / 1e7)} Cr`,
    label: 'Sanctioned Amount',
    hoverTitle: 'Sanctioned Amount',
    hoverText: `Total sanctioned amount for sponsored projects is ${exactMoney.format(sanctionedAmount)}.`,
  },
  {
    value: String(mouCount),
    label: 'MOUs',
    hoverTitle: 'MOUs',
    hoverText: `${mouCount} sponsored projects have an MOU on record.`,
  },
  {
    value: String(industryPartners),
    label: 'Industry Partners',
    hoverTitle: 'Industry Partners',
    hoverText: `${industryPartners} funding agencies across the consultancy projects.`,
  },
]
