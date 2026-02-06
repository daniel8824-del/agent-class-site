export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ChapterMeta {
  id: number
  slug: string
  title: string
  tags: string[]
  description: string
  icon: string
  color: string
  difficulty: Difficulty
  estimatedTime: string
  learnings: string[]
  tools: string[]
}

export interface Persona {
  icon: string
  title: string
  description: string
  recommendedChapters: number[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface Outcome {
  before: string
  after: string
  description: string
}

export interface ValueProp {
  icon: string
  title: string
  description: string
  stat: string
  statLabel: string
}

export interface WhySection {
  problem: string[]
  solution: string[]
  values: ValueProp[]
}

export interface ShowcaseMeta {
  id: string
  slug: string
  title: string
  subtitle: string
  chapterRef: number | null
  gradient: string
  icon: string
}

export interface ShowcaseFeature {
  icon: string
  title: string
  description: string
}

export interface ShowcaseStat {
  value: string
  label: string
}

export interface ShowcaseStep {
  step: number
  title: string
  description: string
}

export interface ShowcaseTheme {
  primary: string
  primaryLight: string
  gradient: string
  bgGradient: string
}

export interface ShowcaseData extends ShowcaseMeta {
  tagline: string
  description: string
  heroImage?: string
  theme: ShowcaseTheme
  chatUrl: string
  chatPasswordHash: string
  features: ShowcaseFeature[]
  stats: ShowcaseStat[]
  steps: ShowcaseStep[]
  featurePills: string[]
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface SearchItem {
  title: string
  type: 'chapter' | 'showcase'
  slug: string
  tags: string[]
  content: string
}
