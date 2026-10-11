'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { en } from '@/lib/copy/en'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="mt-4 flex gap-2 max-w-2xl">
      <label htmlFor="hero-search" className="sr-only">
        {en.hero.searchPlaceholder}
      </label>
      <input
        id="hero-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={en.hero.searchPlaceholder}
        className="flex-1 h-10 rounded-[var(--r-sm)] border border-[var(--border)] bg-[var(--surface)] ps-3 pe-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors duration-[var(--dur-fast)]"
      />
      <button
        type="submit"
        className="h-10 px-4 text-sm font-medium rounded-[var(--r-sm)] bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--border-strong)] transition-colors duration-[var(--dur-fast)]"
      >
        Search
      </button>
    </form>
  )
}
