import type { Metadata } from 'next'
import Link from 'next/link'
import { en } from '@/lib/copy/en'

interface Props {
  params: Promise<{ slug: string[] }>
}

function getDescription(slug: string[]): string {
  const first = slug[0] ?? ''
  const key = slug.length === 1 ? first : (first as keyof typeof en.comingSoon.descriptions)

  if (key in en.comingSoon.descriptions) {
    return en.comingSoon.descriptions[key]
  }

  if (first === 'regulations') return en.comingSoon.descriptions.regulations
  if (first === 'sectors') return en.comingSoon.descriptions.sectors

  return en.comingSoon.fallback
}

function getTitle(slug: string[]): string {
  const first = slug[0] ?? ''
  const titleMap: Record<string, string> = {
    library: 'Library',
    check: 'Check what applies',
    search: 'Search',
    updates: 'Updates',
    about: 'About',
    'sign-in': 'Sign in',
    regulations: 'Regulations',
    sectors: 'Sectors',
  }
  return titleMap[first] ?? first.replace(/-/g, ' ')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = getTitle(slug)
  return {
    title,
    robots: { index: false, follow: false },
  }
}

export default async function ComingSoonPage({ params }: Props) {
  const { slug } = await params
  const title = getTitle(slug)
  const description = getDescription(slug)

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide mb-3">
          {en.comingSoon.heading}
        </p>
        <h1 className="text-2xl font-semibold text-[var(--text)] mb-3 capitalize">
          {title}
        </h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed mb-8">
          {description}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-[var(--dur-fast)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {en.comingSoon.backHome}
        </Link>
      </div>
    </div>
  )
}
