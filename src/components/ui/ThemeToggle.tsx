'use client'

import { useEffect, useState } from 'react'
import { cx } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem('qanun-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable
  }
  return 'system'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light')
  } else if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

interface ThemeState {
  mounted: boolean
  theme: Theme
}

export function ThemeToggle({ className }: { className?: string }) {
  const [state, setState] = useState<ThemeState>({ mounted: false, theme: 'system' })

  useEffect(() => {
    const theme = getStoredTheme()
    applyTheme(theme)
    // Standard SSR hydration pattern: defer localStorage/DOM read until mount.
    // The single synchronous call here intentionally updates state once and
    // causes one extra render to switch from the server placeholder to the
    // real theme icon. This is the canonical approach for client-only state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ mounted: true, theme })
  }, [])

  function toggle() {
    const next = state.theme === 'dark' ? 'light' : 'dark'
    setState((prev) => ({ ...prev, theme: next }))
    applyTheme(next)
    try {
      localStorage.setItem('qanun-theme', next)
    } catch {
      // localStorage unavailable
    }
  }

  if (!state.mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cx(
          'p-2 rounded-[var(--r-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]',
          'transition-colors duration-[var(--dur-fast)] min-h-[44px] min-w-[44px] flex items-center justify-center',
          className,
        )}
      >
        <span className="w-4 h-4" />
      </button>
    )
  }

  const isDark =
    state.theme === 'dark' ||
    (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cx(
        'p-2 rounded-[var(--r-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]',
        'transition-colors duration-[var(--dur-fast)] min-h-[44px] min-w-[44px] flex items-center justify-center',
        className,
      )}
    >
      {isDark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
