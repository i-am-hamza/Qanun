'use client'

import { useState, type ReactNode } from 'react'
import { cx } from '@/lib/utils'

interface AccordionItem {
  id: string
  trigger: ReactNode
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cx('divide-y divide-[var(--border)]', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between py-4 text-start text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-[var(--dur-fast)]"
            >
              <span className="font-medium">{item.trigger}</span>
              <span
                className={cx(
                  'ms-4 shrink-0 text-[var(--text-muted)] transition-transform duration-[var(--dur)]',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className="pb-4 text-[var(--text-muted)] text-sm leading-relaxed"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
