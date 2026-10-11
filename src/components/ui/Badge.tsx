import { type ReactNode } from 'react'
import { cx } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'sample' | 'new' | 'amended' | 'repealed'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center h-5 px-2 text-xs font-medium rounded-[var(--r-sm)]',
        variant === 'default' && 'bg-[var(--surface-2)] text-[var(--text-muted)]',
        variant === 'sample' &&
          'bg-[var(--mark)] text-[var(--accent)] border border-[var(--accent)]/20',
        variant === 'new' && 'bg-[color-mix(in_srgb,var(--status-in-force)_12%,transparent)] text-[var(--status-in-force)]',
        variant === 'amended' && 'bg-[color-mix(in_srgb,var(--status-amended)_12%,transparent)] text-[var(--status-amended)]',
        variant === 'repealed' && 'bg-[color-mix(in_srgb,var(--status-repealed)_12%,transparent)] text-[var(--status-repealed)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
