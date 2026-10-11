'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cx } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(
        'inline-flex items-center justify-center font-medium transition-colors duration-[var(--dur-fast)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' && 'h-8 px-3 text-sm rounded-[var(--r-sm)]',
        size === 'md' && 'h-10 px-4 text-sm rounded-[var(--r-sm)]',
        size === 'lg' && 'h-12 px-6 text-base rounded-[var(--r-md)]',
        variant === 'primary' &&
          'bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]',
        variant === 'secondary' &&
          'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)] border border-[var(--border)]',
        variant === 'ghost' &&
          'bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
