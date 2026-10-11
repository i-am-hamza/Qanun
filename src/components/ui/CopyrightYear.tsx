'use client'
import { useState, useEffect } from 'react'

export function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Date unavailable server-side; useEffect is the correct SSR hydration pattern
    setYear(new Date().getFullYear())
  }, [])
  return <>{year}</>
}
