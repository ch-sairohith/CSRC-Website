import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const port = Number(process.env.PORT) || 5000
const clientDist = path.resolve(__dirname, '../../client/dist')

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'csrc-website' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDist))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
