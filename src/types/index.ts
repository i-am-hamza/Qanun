export type Jurisdiction = 'national' | 'onshore' | 'qfc' | 'qfz'

export type InstrumentType =
  | 'law'
  | 'decree_law'
  | 'amiri_decision'
  | 'ministerial_resolution'
  | 'executive_regulation'
  | 'circular'
  | 'instruction'
  | 'rulebook'
  | 'rule'
  | 'standard'
  | 'framework'
  | 'guideline'
  | 'code'

export type LegalStatus =
  | 'in_force'
  | 'amended'
  | 'partially_repealed'
  | 'repealed'
  | 'not_yet_in_force'

export type ReusePolicy = 'full_text' | 'excerpt' | 'link_only'

export type RequirementKind =
  | 'obligation'
  | 'prohibition'
  | 'reporting'
  | 'notification'
  | 'record_keeping'
  | 'approval'
  | 'disclosure'
  | 'governance'

export interface Regulator {
  id: string
  slug: string
  nameEn: string
  nameAr: string | null
  shortName: string
  jurisdiction: Jurisdiction
  websiteUrl: string | null
  sectorSlugs: string[]
}

export interface Sector {
  slug: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  parentSlug: string | null
  regulatorCount: number
  instrumentCount: number
}

export interface Instrument {
  id: string
  slug: string
  regulatorSlug: string
  type: InstrumentType
  number: string | null
  year: number | null
  titleEn: string
  titleAr: string | null
  officialLanguage: 'ar' | 'en'
  englishIsOfficial: boolean
  legalStatus: LegalStatus
  issuedOn: string | null
  effectiveFrom: string | null
  lastVerifiedAt: string | null
  sectorSlugs: string[]
  sourceUrlAr: string | null
  sourceUrlEn: string | null
  reusePolicy: ReusePolicy
  requirementCount: number
  summaryEn: string | null
}

export interface Provision {
  id: string
  instrumentId: string
  path: string
  sortKey: string
  headingEn: string | null
  headingAr: string | null
  textAr: string | null
  textEn: string | null
  textEnOrigin: 'official' | 'machine' | null
}

export interface Requirement {
  id: string
  ref: string
  instrumentId: string
  provisionIds: string[]
  statementEn: string
  statementAr: string | null
  kind: RequirementKind
  subject: string
  trigger: string | null
  frequency: string | null
  deadline: string | null
  penaltyRef: string | null
  lastVerifiedAt: string | null
  isSample: boolean
}

export interface ChangeItem {
  id: string
  instrumentSlug: string
  kind: 'new' | 'amended' | 'repealed'
  summaryEn: string
  confirmedAt: string
}

export interface Faq {
  id: string
  category: string
  question: string
  answer: string
  sortOrder: number
}

export interface PlatformStats {
  instruments: number
  requirements: number
  regulators: number
  lastVerifiedAt: string | null
}

export interface QuickCheckOptions {
  sectors: Array<{ slug: string; nameEn: string }>
  licenceTypes: Array<{ value: string; label: string; sectorSlugs: string[] }>
}

export interface QuickCheckAnswers {
  sectorSlug: string | null
  licenceType: string | null
  listed: 'yes' | 'no' | 'not_sure' | null
}

export interface QuickCheckResult {
  applies: number
  mayApply: number
}
