import { type ReactNode, type ElementType } from 'react'

interface LangBlockProps {
  lang: 'en' | 'ar'
  children: ReactNode
  className?: string
  as?: ElementType
}

export function LangBlock({ lang, children, className, as: Tag = 'span' }: LangBlockProps) {
  if (lang === 'ar') {
    return (
      <Tag lang="ar" dir="rtl" className={className}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag lang="en" className={className}>
      {children}
    </Tag>
  )
}
