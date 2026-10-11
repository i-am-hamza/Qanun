import type { Metadata } from 'next'
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  Source_Serif_4,
  Noto_Naskh_Arabic,
} from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-ibm-plex-arabic',
})

const sourceSerif = Source_Serif_4({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
})

const notoNaskh = Noto_Naskh_Arabic({
  weight: ['400', '600'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-naskh',
})

const isIndexing = process.env.NEXT_PUBLIC_SITE_INDEXING === 'true'

export const metadata: Metadata = {
  title: {
    default: 'Qanun — Qatar regulatory library',
    template: '%s — Qanun',
  },
  description:
    'Laws, circulars, rulebooks and frameworks for financial services, real estate, energy and telecom in Qatar — broken into individual requirements linked to the official clause.',
  metadataBase: new URL('https://qanun.qa'),
  robots: isIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    siteName: 'Qanun',
    locale: 'en_QA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexArabic.variable} ${sourceSerif.variable} ${notoNaskh.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
