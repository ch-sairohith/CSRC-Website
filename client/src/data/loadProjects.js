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

function formatDuration(startValue, endValue) {
  function parseDate(value) {
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
    if (!match) return null
    const [, dayValue, monthValue, yearValue] = match
    const day = Number(dayValue)
    const month = Number(monthValue) - 1
    const year = Number(yearValue)
    const timestamp = Date.UTC(year, month, day)
    const date = new Date(timestamp)
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
      return null
    }
    return date
  }

  const start = parseDate(startValue)
  const end = parseDate(endValue)
  if (!start || !end || end < start) return ''

  function addMonths(months) {
    const monthIndex = start.getUTCMonth() + months
    const year = start.getUTCFullYear() + Math.floor(monthIndex / 12)
    const month = monthIndex % 12
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    return new Date(Date.UTC(year, month, Math.min(start.getUTCDate(), lastDay)))
  }

  let months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth()
  if (addMonths(months) > end) months -= 1
  const remainingDays = Math.round((end - addMonths(months)) / 86400000)
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  const parts = []

  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  if (remainingMonths) parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`)
  if (remainingDays || parts.length === 0) {
    parts.push(`${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`)
  }
  return parts.join(', ')
}

export const projectSets = {
  consultancy: {
    title: 'Consultancy Projects',
    rows: parseCsv(consultancyCsv).map((row) => ({
      ...row,
      Duration: formatDuration(row['Start Date'], row['End Date']),
    })),
    columns: [
      { key: 'Principal Invg', label: 'Principal Investigator' },
      { key: 'CO PI 1 Inst', label: 'Co-PI' },
      { key: 'Department', label: 'Department' },
      { key: 'Proj Title', label: 'Project Title', wide: true },
      { key: 'Financial Year', label: 'Financial Year' },
      { key: 'Duration', label: 'Duration' },
      { key: 'Funding Agency', label: 'Funding Agency', wide: true },
      { key: 'Status', label: 'Status' },
    ],
  },
  sponsored: {
    title: 'Sponsored Projects',
    rows: parseCsv(sponsoredCsv),
    columns: [
      { key: 'Principal Invg', label: 'Principal Investigator' },
      { key: 'CO PI 1 Inst', label: 'Co-PI' },
      { key: 'Department', label: 'Department' },
      { key: 'Proj Title', label: 'Project Title', wide: true },
      { key: 'Financial Year', label: 'Financial Year' },
      { key: 'Duration of Project(Years)', label: 'Duration' },
      { key: 'Funding Agency', label: 'Funding Agency', wide: true },
      { key: 'Status', label: 'Status' },
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
