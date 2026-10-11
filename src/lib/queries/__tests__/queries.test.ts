import { describe, it, expect } from 'vitest'
import {
  getSectors,
  getRegulators,
  getFeaturedInstruments,
  getRecentChanges,
  getPlatformStats,
  getFaqs,
  getQuickCheckOptions,
  quickCheck,
} from '../index'

describe('getSectors', () => {
  it('returns sectors including top-level and child sectors', async () => {
    const sectors = await getSectors()
    expect(sectors.length).toBeGreaterThan(0)
    const topLevel = sectors.filter((s) => s.parentSlug === null)
    expect(topLevel.length).toBeGreaterThan(0)
  })
})

describe('getRegulators', () => {
  it('returns all regulators', async () => {
    const regs = await getRegulators()
    expect(regs.length).toBeGreaterThan(0)
    expect(regs.every((r) => r.id && r.nameEn)).toBe(true)
  })
})

describe('getFeaturedInstruments', () => {
  it('respects the limit', async () => {
    const instruments = await getFeaturedInstruments(3)
    expect(instruments.length).toBeLessThanOrEqual(3)
  })
})

describe('getRecentChanges', () => {
  it('respects the limit', async () => {
    const changes = await getRecentChanges(2)
    expect(changes.length).toBeLessThanOrEqual(2)
  })
})

describe('getPlatformStats', () => {
  it('returns non-negative counts', async () => {
    const stats = await getPlatformStats()
    expect(stats.instruments).toBeGreaterThanOrEqual(0)
    expect(stats.requirements).toBeGreaterThanOrEqual(0)
    expect(stats.regulators).toBeGreaterThanOrEqual(0)
  })
})

describe('getFaqs', () => {
  it('returns faqs sorted by sortOrder', async () => {
    const faqs = await getFaqs(5)
    for (let i = 1; i < faqs.length; i++) {
      expect(faqs[i].sortOrder).toBeGreaterThanOrEqual(faqs[i - 1].sortOrder)
    }
  })
})

describe('getQuickCheckOptions', () => {
  it('returns sectors and licence types', async () => {
    const opts = await getQuickCheckOptions()
    expect(opts.sectors.length).toBeGreaterThan(0)
    expect(opts.licenceTypes.length).toBeGreaterThan(0)
  })
})

describe('quickCheck', () => {
  it('returns zeros when no answers given', async () => {
    const result = await quickCheck({ sectorSlug: null, licenceType: null, listed: null })
    expect(result.applies).toBe(0)
    expect(result.mayApply).toBe(0)
  })

  it('returns positive counts for a known sector+licence combo', async () => {
    const result = await quickCheck({
      sectorSlug: 'banking',
      licenceType: 'bank',
      listed: 'no',
    })
    expect(result.applies).toBeGreaterThan(0)
  })

  it('adds bonus for listed = yes', async () => {
    const noListed = await quickCheck({ sectorSlug: 'banking', licenceType: 'bank', listed: 'no' })
    const listed = await quickCheck({ sectorSlug: 'banking', licenceType: 'bank', listed: 'yes' })
    expect(listed.applies).toBeGreaterThanOrEqual(noListed.applies)
  })

  it('adds mayApply for listed = not_sure', async () => {
    const notSure = await quickCheck({
      sectorSlug: 'banking',
      licenceType: 'bank',
      listed: 'not_sure',
    })
    expect(notSure.mayApply).toBeGreaterThan(0)
  })
})
