'use client'

import { type InputHTMLAttributes, forwardRef } from 'react'
import { cx } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, className, id, ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cx(
          'h-10 w-full rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--surface)]',
          'px-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]',
          'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
          'transition-colors duration-[var(--dur-fast)]',
          className,
        )}
        {...props}
      />
    </div>
  )
})
