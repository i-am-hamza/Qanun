import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const indexing = process.env.NEXT_PUBLIC_SITE_INDEXING === 'true'

  if (!indexing) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://qanun.qa/sitemap.xml',
  }
}
