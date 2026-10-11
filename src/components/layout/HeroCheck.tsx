'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { en } from '@/lib/copy/en'
import { quickCheck } from '@/lib/queries'
import type { QuickCheckOptions, QuickCheckAnswers } from '@/types'

const SELECT_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A6270' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 0.5rem center',
}

const SELECT_CLASS =
  'h-10 w-full rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--surface)] ps-3 pe-8 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors duration-[var(--dur-fast)] appearance-none'

interface HeroCheckProps {
  options: QuickCheckOptions
  isMock?: boolean
}

export function HeroCheck({ options, isMock = false }: HeroCheckProps) {
  const [answers, setAnswers] = useState<QuickCheckAnswers>({
    sectorSlug: null,
    licenceType: null,
    listed: null,
  })
  const [result, setResult] = useState<{ applies: number; mayApply: number } | null>(null)

  const hasAnswer = Boolean(answers.sectorSlug || answers.licenceType)

  const filteredLicenceTypes = answers.sectorSlug
    ? options.licenceTypes.filter((lt) =>
        lt.sectorSlugs.some(
          (s) => s === answers.sectorSlug || s === answers.sectorSlug + '-services',
        ),
      )
    : options.licenceTypes

  const handleChange = useCallback(
    async (patch: Partial<QuickCheckAnswers>) => {
      const next = { ...answers, ...patch }
      setAnswers(next)
      if (next.sectorSlug || next.licenceType) {
        const res = await quickCheck(next)
        setResult(res)
      } else {
        setResult(null)
      }
    },
    [answers],
  )

  const checkUrl = `/check?sector=${answers.sectorSlug ?? ''}&licence=${answers.licenceType ?? ''}&listed=${answers.listed ?? ''}`

  return (
    <div className="mt-8 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--r-md)] p-5 max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Sector */}
        <div>
          <label htmlFor="hero-sector" className="block text-sm font-medium text-[var(--text)] mb-1">
            {en.hero.selectSector}
          </label>
          <select
            id="hero-sector"
            value={answers.sectorSlug ?? ''}
            onChange={(e) =>
              handleChange({ sectorSlug: e.target.value || null, licenceType: null })
            }
            className={SELECT_CLASS}
            style={SELECT_STYLE}
          >
            <option value="">{en.hero.selectSector}</option>
            {options.sectors.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Licence type */}
        <div>
          <label htmlFor="hero-licence" className="block text-sm font-medium text-[var(--text)] mb-1">
            {en.hero.selectLicence}
          </label>
          <select
            id="hero-licence"
            value={answers.licenceType ?? ''}
            onChange={(e) => handleChange({ licenceType: e.target.value || null })}
            className={SELECT_CLASS}
            style={SELECT_STYLE}
          >
            <option value="">{en.hero.selectLicence}</option>
            {filteredLicenceTypes.map((lt) => (
              <option key={lt.value} value={lt.value}>
                {lt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Listed question */}
      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-[var(--text)] mb-2">
          {en.hero.listedLabel}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: 'yes', label: en.hero.listedYes },
              { value: 'no', label: en.hero.listedNo },
              { value: 'not_sure', label: en.hero.listedNotSure },
            ] as const
          ).map(({ value, label }) => (
            <label
              key={value}
              className={`inline-flex items-center h-8 px-3 rounded-[var(--r-full)] border text-sm cursor-pointer transition-colors duration-[var(--dur-fast)] ${
                answers.listed === value
                  ? 'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
              }`}
            >
              <input
                type="radio"
                name="listed"
                value={value}
                checked={answers.listed === value}
                onChange={() => handleChange({ listed: value })}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Result */}
      {(isMock ? hasAnswer : result && (result.applies > 0 || result.mayApply > 0)) && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          {isMock ? (
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[var(--text)]">
                  {en.hero.exampleResult}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  {en.hero.exampleResultNote}
                </p>
              </div>
              <Link
                href={checkUrl}
                className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-[var(--r-sm)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)] transition-colors duration-[var(--dur-fast)]"
              >
                {en.hero.checkCta}
              </Link>
            </div>
          ) : (
            result && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-[var(--text)]">
                  {en.hero.countBoth(result.applies, result.mayApply)}
                </p>
                <Link
                  href={checkUrl}
                  className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-[var(--r-sm)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)] transition-colors duration-[var(--dur-fast)]"
                >
                  {en.hero.checkCta}
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
