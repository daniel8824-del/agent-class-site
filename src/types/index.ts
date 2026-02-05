export interface ChapterMeta {
  id: number
  slug: string
  title: string
  tags: string[]
  description: string
  icon: string
  color: string
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
