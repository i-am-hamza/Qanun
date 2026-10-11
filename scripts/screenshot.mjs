import { chromium } from '@playwright/test'
import { mkdir } from 'fs/promises'

const BASE = 'http://localhost:3000'
const OUT = 'screenshots'

const PAGES = [
  { path: '/', name: 'landing' },
  { path: '/library', name: 'coming-soon-library' },
]
const WIDTHS = [390, 1440]
const THEMES = ['light', 'dark']

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

for (const { path, name } of PAGES) {
  for (const width of WIDTHS) {
    for (const theme of THEMES) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 900 },
        colorScheme: theme === 'dark' ? 'dark' : 'light',
      })
      const page = await context.newPage()

      // Inject theme override so the toggle state matches
      await page.addInitScript((t) => {
        localStorage.setItem('qanun-theme', t)
      }, theme)

      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })

      // Apply data-theme attr via page eval after hydration
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t)
      }, theme)

      await page.waitForTimeout(400)

      const file = `${OUT}/${name}-${width}w-${theme}.png`
      await page.screenshot({ path: file, fullPage: true })
      console.log(`  ✓ ${file}`)

      await context.close()
    }
  }
}

await browser.close()
console.log('Done.')
