'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Drawer } from '@/components/ui/Drawer'
import { LangBlock } from '@/components/ui/LangBlock'
import { en } from '@/lib/copy/en'

const NAV_LINKS = [
  { label: en.nav.library, href: '/library' },
  { label: en.nav.check, href: '/check' },
  { label: en.nav.updates, href: '/updates' },
  { label: en.nav.about, href: '/about' },
]

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${en.siteName} — ${en.tagline}`}
      className={`inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className ?? ''}`}
    >
      <LangBlock lang="en" className="text-xl font-semibold text-[var(--text)] tracking-tight">
        {en.siteName}
      </LangBlock>
      <span className="w-px h-5 bg-[var(--border-strong)]" aria-hidden="true" />
      <LangBlock
        lang="ar"
        className="text-xl font-semibold text-[var(--accent)] leading-none"
      >
        {en.siteNameAr}
      </LangBlock>
    </Link>
  )
}

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-[var(--surface)] border-b border-[var(--border)] pt-[var(--safe-top)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 ms-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] rounded-[var(--r-sm)] hover:bg-[var(--surface-2)] transition-colors duration-[var(--dur-fast)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1">
          <ThemeToggle />
          <div className="hidden md:block ms-1">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium rounded-[var(--r-sm)] bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)] border border-[var(--border)] transition-colors duration-[var(--dur-fast)]"
            >
              {en.nav.signIn}
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={en.nav.menu}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 rounded-[var(--r-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors duration-[var(--dur-fast)] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={en.siteName}>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="px-3 py-3 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--r-sm)] transition-colors duration-[var(--dur-fast)] min-h-[44px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[var(--border)] mt-4">
            <Link
              href="/sign-in"
              onClick={() => setDrawerOpen(false)}
              className="block px-3 py-3 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--r-sm)] transition-colors duration-[var(--dur-fast)]"
            >
              {en.nav.signIn}
            </Link>
          </div>
        </nav>
      </Drawer>
    </header>
  )
}
