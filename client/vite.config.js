import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const appRoutes = [
  'contacts',
  'sponsored',
  'consultancy',
  'grants',
  'faculty-expertise',
  'ip',
  'ip/ipr-policy',
  'ip/business-incubation-policy',
  'ip/patent-technology-transfer',
  'research-facilities',
]

function githubPagesSpaFallback() {
  let outDir = ''
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const indexFile = resolve(outDir, 'index.html')
      if (!existsSync(indexFile)) return
      copyFileSync(indexFile, resolve(outDir, '404.html'))
      for (const route of appRoutes) {
        const routeIndex = resolve(outDir, route, 'index.html')
        mkdirSync(dirname(routeIndex), { recursive: true })
        copyFileSync(indexFile, routeIndex)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  base: '/CSRC-Website/',
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
