import type { Instrument } from '@/types'
import { StatusChip } from '@/components/ui/StatusChip'
import { LangBlock } from '@/components/ui/LangBlock'
import { instrumentTypeLabel, formatDate } from '@/lib/utils'
import { REGULATORS } from '@/data/mock'

interface InstrumentRowProps {
  instrument: Instrument
}

export function InstrumentRow({ instrument }: InstrumentRowProps) {
  const regulator = REGULATORS.find((r) => r.slug === instrument.regulatorSlug)
  const typeLabel = instrumentTypeLabel(instrument.type)
  const numberYear = [
    instrument.number ? `No. ${instrument.number}` : null,
    instrument.year ? String(instrument.year) : null,
  ]
    .filter(Boolean)
    .join(' of ')

  return (
    <div className="py-4 flex flex-col gap-1 border-b border-[var(--border)] last:border-0">
      <div className="flex flex-wrap items-start gap-2">
        <div className="flex-1 min-w-0">
          <LangBlock lang="en" as="p" className="text-sm font-medium text-[var(--text)] leading-snug">
            {instrument.titleEn}
          </LangBlock>
          {instrument.titleAr && (
            <LangBlock
              lang="ar"
              as="p"
              className="mt-0.5 text-sm text-[var(--text-muted)] leading-snug font-[var(--font-naskh)]"
            >
              {instrument.titleAr}
            </LangBlock>
          )}
        </div>
        <StatusChip status={instrument.legalStatus} />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)] tabular-nums">
        {regulator && (
          <span>{regulator.shortName}</span>
        )}
        {typeLabel && <span>{typeLabel}</span>}
        {numberYear && <span>{numberYear}</span>}
        {instrument.requirementCount > 0 && (
          <span>
            {instrument.requirementCount} requirement{instrument.requirementCount === 1 ? '' : 's'}
          </span>
        )}
        {instrument.lastVerifiedAt && (
          <span>Verified {formatDate(instrument.lastVerifiedAt)}</span>
        )}
      </div>
    </div>
  )
}
