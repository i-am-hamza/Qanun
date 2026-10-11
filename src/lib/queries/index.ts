import type {
  Sector,
  Regulator,
  Instrument,
  ChangeItem,
  Faq,
  PlatformStats,
  QuickCheckOptions,
  QuickCheckAnswers,
  QuickCheckResult,
} from '@/types'
import {
  SECTORS,
  REGULATORS,
  INSTRUMENTS,
  RECENT_CHANGES,
  FAQS,
  PLATFORM_STATS,
  LICENCE_TYPES,
  MOCK_RULES,
} from '@/data/mock'

export async function getSectors(): Promise<Sector[]> {
  return SECTORS
}

export async function getRegulators(): Promise<Regulator[]> {
  return REGULATORS
}

export async function getFeaturedInstruments(limit: number): Promise<Instrument[]> {
  return INSTRUMENTS.slice(0, limit)
}

export async function getRecentChanges(limit: number): Promise<ChangeItem[]> {
  return RECENT_CHANGES.slice(0, limit)
}

export async function getPlatformStats(): Promise<PlatformStats> {
  return PLATFORM_STATS
}

export async function getFaqs(limit: number): Promise<Faq[]> {
  return FAQS.sort((a, b) => a.sortOrder - b.sortOrder).slice(0, limit)
}

export async function getQuickCheckOptions(): Promise<QuickCheckOptions> {
  const topLevel = SECTORS.filter((s) => s.parentSlug === null)
  return {
    sectors: topLevel.map((s) => ({ slug: s.slug, nameEn: s.nameEn })),
    licenceTypes: LICENCE_TYPES,
  }
}

export async function quickCheck(answers: QuickCheckAnswers): Promise<QuickCheckResult> {
  const { sectorSlug, licenceType, listed } = answers

  if (!sectorSlug && !licenceType) {
    return { applies: 0, mayApply: 0 }
  }

  const rule = MOCK_RULES.find((r) => {
    const sectorMatch = sectorSlug
      ? r.sectorSlug === sectorSlug ||
        SECTORS.some(
          (s) =>
            s.slug === sectorSlug &&
            s.parentSlug === null &&
            SECTORS.some(
              (child) => child.parentSlug === sectorSlug && child.slug === r.sectorSlug,
            ),
        )
      : true
    const licenceMatch = licenceType ? r.licenceType === licenceType : true
    return sectorMatch && licenceMatch
  })

  if (!rule) {
    return { applies: 3, mayApply: 3 }
  }

  const listedBonus = listed === 'yes' ? rule.listedBonus : listed === 'not_sure' ? 0 : 0
  const mayApplyExtra = listed === 'not_sure' ? rule.listedBonus : 0

  return {
    applies: rule.applies + listedBonus,
    mayApply: rule.mayApply + mayApplyExtra,
  }
}
