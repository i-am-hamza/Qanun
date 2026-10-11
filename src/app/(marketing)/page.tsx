import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyrightYear } from '@/components/ui/CopyrightYear'
import { IS_MOCK } from '@/data/mock'
import {
  getSectors,
  getRegulators,
  getFeaturedInstruments,
  getRecentChanges,
  getPlatformStats,
  getFaqs,
  getQuickCheckOptions,
} from '@/lib/queries'
import { en } from '@/lib/copy/en'
import { LangBlock } from '@/components/ui/LangBlock'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { HeroCheck } from '@/components/layout/HeroCheck'
import { SearchBar } from '@/components/layout/SearchBar'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Qanun — Qatar regulatory library',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [sectors, regulators, featuredInstruments, recentChanges, stats, faqs, checkOptions] =
    await Promise.all([
      getSectors(),
      getRegulators(),
      getFeaturedInstruments(6),
      getRecentChanges(4),
      getPlatformStats(),
      getFaqs(5),
      getQuickCheckOptions(),
    ])

  const topSectors = sectors.filter((s) => s.parentSlug === null)
  const childSectorMap = sectors.reduce<Record<string, typeof sectors>>(
    (acc, s) => {
      if (s.parentSlug) {
        acc[s.parentSlug] = acc[s.parentSlug] ?? []
        acc[s.parentSlug].push(s)
      }
      return acc
    },
    {},
  )

  const changeKindVariant = {
    new: 'new',
    amended: 'amended',
    repealed: 'repealed',
  } as const

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Qanun',
        description:
          'Qatar regulatory library for financial services, real estate, energy and telecom.',
        url: 'https://qanun.qa',
      },
      {
        '@type': 'WebSite',
        url: 'https://qanun.qa',
        name: 'Qanun',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://qanun.qa/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Preview data ribbon */}
      <div
        role="status"
        aria-live="polite"
        className="bg-[var(--status-amended)] text-white text-xs font-medium text-center py-1.5 px-4"
      >
        {en.preview.ribbon}
      </div>

      {/* HERO */}
      <section
        aria-labelledby="hero-heading"
        className="border-b border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {stats.instruments > 0 && (
            <p className="text-sm text-[var(--text-muted)] tabular-nums mb-4">
              {stats.instruments} instruments · {stats.requirements} requirements ·{' '}
              {stats.regulators} regulators
            </p>
          )}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl font-semibold text-[var(--text)] leading-tight max-w-[var(--measure)]"
          >
            {en.hero.h1}
          </h1>
          <p className="mt-3 text-base text-[var(--text-muted)] max-w-[var(--measure)]">
            {en.hero.sub}
          </p>
          <HeroCheck options={checkOptions} isMock={IS_MOCK} />
          <SearchBar />
        </div>
      </section>

      {/* SECTORS */}
      {topSectors.length > 0 && (
        <section aria-labelledby="sectors-heading" className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2
              id="sectors-heading"
              className="text-xl font-semibold text-[var(--text)] mb-8"
            >
              {en.sectors.heading}
            </h2>
            <div className="divide-y divide-[var(--border)]">
              {topSectors.map((sector) => {
                const children = childSectorMap[sector.slug] ?? []
                const regulatorNames = regulators
                  .filter((r) => r.sectorSlugs.some((s) => s === sector.slug || children.some((c) => c.slug === s)))
                  .map((r) => r.shortName)
                  .slice(0, 4)

                return (
                  <div
                    key={sector.slug}
                    className="py-5 grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 items-start"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <LangBlock lang="en" className="text-base font-semibold text-[var(--text)]">
                          {sector.nameEn}
                        </LangBlock>
                        <LangBlock
                          lang="ar"
                          className="text-sm text-[var(--text-muted)] font-[var(--font-noto-naskh)]"
                        >
                          {sector.nameAr}
                        </LangBlock>
                      </div>
                      {children.length > 0 && (
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {en.sectors.childSectors}:{' '}
                          {children.map((c) => c.nameEn).join(', ')}
                        </p>
                      )}
                      {regulatorNames.length > 0 && (
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          {en.sectors.regulators}: {regulatorNames.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 text-sm tabular-nums text-[var(--text-muted)]">
                      {sector.instrumentCount > 0 ? (
                        <span>
                          {sector.instrumentCount}{' '}
                          {sector.instrumentCount === 1 ? 'instrument' : 'instruments'}
                        </span>
                      ) : (
                        <span className="text-xs">{en.sectors.comingSoon}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* RECENT CHANGES */}
      {recentChanges.length > 0 && (
        <section aria-labelledby="changes-heading" className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 id="changes-heading" className="text-xl font-semibold text-[var(--text)]">
                {en.recentChanges.heading}
              </h2>
              <Link
                href="/updates"
                className="text-sm text-[var(--accent)] hover:underline underline-offset-2"
              >
                {en.recentChanges.linkAll}
              </Link>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {recentChanges.map((change) => {
                const instrument = featuredInstruments.find(
                  (i) => i.slug === change.instrumentSlug,
                )
                return (
                  <div key={change.id} className="py-4 flex flex-wrap items-start gap-3">
                    <Badge variant={changeKindVariant[change.kind]}>
                      {change.kind === 'new'
                        ? en.recentChanges.new
                        : change.kind === 'amended'
                          ? en.recentChanges.amended
                          : en.recentChanges.repealed}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text)]">
                        {instrument?.titleEn ?? change.instrumentSlug}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {change.summaryEn}
                      </p>
                    </div>
                    <time
                      dateTime={change.confirmedAt}
                      className="text-xs text-[var(--text-muted)] tabular-nums shrink-0"
                    >
                      {formatDate(change.confirmedAt)}
                    </time>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* HOW A REQUIREMENT GETS HERE */}
      <section
        aria-labelledby="pipeline-heading"
        className="border-b border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2
            id="pipeline-heading"
            className="text-xl font-semibold text-[var(--text)] mb-8"
          >
            {en.pipeline.heading}
          </h2>
          <ol className="relative">
            {en.pipeline.steps.map((step, i) => (
              <li key={i} className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)] text-xs font-semibold text-[var(--accent)] tabular-nums">
                    {i + 1}
                  </span>
                  {i < en.pipeline.steps.length - 1 && (
                    <span className="mt-1 flex-1 w-px bg-[var(--border)]" aria-hidden="true" />
                  )}
                </div>
                <div className="pt-0.5 pb-1">
                  <p className="text-sm font-semibold text-[var(--text)]">{step.label}</p>
                  <p className="mt-0.5 text-sm text-[var(--text-muted)]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* REGULATORS COVERED */}
      {regulators.length > 0 && (
        <section aria-labelledby="regulators-heading" className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2
              id="regulators-heading"
              className="text-xl font-semibold text-[var(--text)] mb-8"
            >
              {en.regulators.heading}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {regulators.map((reg) => (
                <li
                  key={reg.id}
                  className="flex flex-col gap-0.5 py-3 px-4 border border-[var(--border)] rounded-[var(--r-md)] bg-[var(--surface)]"
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[var(--accent)] tabular-nums">
                      {reg.shortName}
                    </span>
                    <LangBlock lang="en" className="text-sm font-medium text-[var(--text)]">
                      {reg.nameEn}
                    </LangBlock>
                  </div>
                  {reg.nameAr && (
                    <LangBlock
                      lang="ar"
                      className="text-xs text-[var(--text-muted)] font-[var(--font-noto-naskh)]"
                    >
                      {reg.nameAr}
                    </LangBlock>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* TWO AUDIENCES */}
      <section
        aria-labelledby="audiences-heading"
        className="border-b border-[var(--border)] bg-[var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2
            id="audiences-heading"
            className="text-xl font-semibold text-[var(--text)] mb-8"
          >
            {en.audiences.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[en.audiences.consultants, en.audiences.businesses].map((audience) => (
              <div
                key={audience.title}
                className="p-5 border border-[var(--border)] rounded-[var(--r-md)]"
              >
                <h3 className="text-base font-semibold text-[var(--text)] mb-3">
                  {audience.title}
                </h3>
                <ul className="space-y-2">
                  {audience.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                    >
                      <span className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 id="faq-heading" className="text-xl font-semibold text-[var(--text)] mb-8">
              {en.faq.heading}
            </h2>
            <div className="max-w-2xl">
              <Accordion
                items={faqs.map((faq) => ({
                  id: faq.id,
                  trigger: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LangBlock lang="en" className="text-base font-semibold text-[var(--text)]">
                  {en.siteName}
                </LangBlock>
                <span className="w-px h-4 bg-[var(--border-strong)]" aria-hidden="true" />
                <LangBlock lang="ar" className="text-base font-semibold text-[var(--accent)]">
                  {en.siteNameAr}
                </LangBlock>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{en.tagline}</p>
            </div>

            {/* Navigate */}
            <nav aria-label="Footer navigation">
              <p className="text-xs font-semibold text-[var(--text)] uppercase tracking-wide mb-3">
                Navigate
              </p>
              <ul className="space-y-2">
                {[
                  { label: en.nav.library, href: '/library' },
                  { label: en.nav.check, href: '/check' },
                  { label: en.nav.updates, href: '/updates' },
                  { label: en.nav.about, href: '/about' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[var(--dur-fast)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sectors */}
            <nav aria-label="Sector navigation">
              <p className="text-xs font-semibold text-[var(--text)] uppercase tracking-wide mb-3">
                Sectors
              </p>
              <ul className="space-y-2">
                {topSectors.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/library?sector=${s.slug}`}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[var(--dur-fast)]"
                    >
                      {s.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal */}
            <nav aria-label="Legal navigation">
              <p className="text-xs font-semibold text-[var(--text)] uppercase tracking-wide mb-3">
                Legal
              </p>
              <ul className="space-y-2">
                {[
                  { label: en.footer.legal.privacy, href: '/privacy' },
                  { label: en.footer.legal.terms, href: '/terms' },
                  { label: en.footer.legal.contact, href: '/contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[var(--dur-fast)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-[var(--text-muted)] max-w-[var(--measure)] mb-6 leading-relaxed">
            {en.disclaimer}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-muted)]">
              © <CopyrightYear /> Qanun
            </p>
            <p className="text-xs text-[var(--text-muted)]">{en.footer.product}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
