'use client'

import { useEffect, type ReactNode } from 'react'
import { cx } from '@/lib/utils'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function Drawer({ open, onClose, children, title }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
          onClick={onClose}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          'fixed inset-y-0 end-0 z-50 w-72 bg-[var(--surface)] shadow-[var(--shadow-pop)]',
          'flex flex-col transition-transform duration-[var(--dur)] ease-[var(--ease)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          {title && <span className="font-semibold text-[var(--text)]">{title}</span>}
          <button
            type="button"
            onClick={onClose}
            className="ms-auto p-2 rounded-[var(--r-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors duration-[var(--dur-fast)]"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </>
  )
}
