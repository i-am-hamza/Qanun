import type { LegalStatus } from '@/types'

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function statusLabel(status: LegalStatus): string {
  const map: Record<LegalStatus, string> = {
    in_force: 'In force',
    amended: 'Amended',
    partially_repealed: 'Partially repealed',
    repealed: 'Repealed',
    not_yet_in_force: 'Not yet in force',
  }
  return map[status]
}

export function instrumentTypeLabel(type: string): string {
  const map: Record<string, string> = {
    law: 'Law',
    decree_law: 'Decree-Law',
    amiri_decision: 'Amiri Decision',
    ministerial_resolution: 'Ministerial Resolution',
    executive_regulation: 'Executive Regulation',
    circular: 'Circular',
    instruction: 'Instruction',
    rulebook: 'Rulebook',
    rule: 'Rules',
    standard: 'Standard',
    framework: 'Framework',
    guideline: 'Guideline',
    code: 'Code',
  }
  return map[type] ?? type
}

export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
