import type { LegalStatus } from '@/types'
import { statusLabel } from '@/lib/utils'
import { cx } from '@/lib/utils'

interface StatusChipProps {
  status: LegalStatus
  className?: string
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center h-5 px-2 text-xs font-medium rounded-[var(--r-sm)]',
        status === 'in_force' &&
          'bg-[color-mix(in_srgb,var(--status-in-force)_12%,transparent)] text-[var(--status-in-force)]',
        status === 'amended' &&
          'bg-[color-mix(in_srgb,var(--status-amended)_12%,transparent)] text-[var(--status-amended)]',
        status === 'partially_repealed' &&
          'bg-[color-mix(in_srgb,var(--status-repealed)_12%,transparent)] text-[var(--status-repealed)]',
        status === 'repealed' &&
          'bg-[color-mix(in_srgb,var(--status-repealed)_12%,transparent)] text-[var(--status-repealed)]',
        status === 'not_yet_in_force' &&
          'bg-[color-mix(in_srgb,var(--status-upcoming)_12%,transparent)] text-[var(--status-upcoming)]',
        className,
      )}
    >
      {statusLabel(status)}
    </span>
  )
}
