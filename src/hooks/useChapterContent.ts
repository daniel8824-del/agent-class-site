import { useState, useEffect } from 'react'

export function useChapterContent(slug: string) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    setContent('') // Clear previous chapter content to prevent race conditions

    async function load() {
      try {
        const modules = import.meta.glob('/src/content/chapters/*.md', {
          query: '?raw',
          import: 'default',
        })
        const path = `/src/content/chapters/${slug}.md`
        const loader = modules[path]
        if (!loader) {
          throw new Error(`Chapter not found: ${slug}`)
        }
        const raw = (await loader()) as string
        if (!cancelled) {
          setContent(raw)
          setLoading(false)
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [slug])

  return { content, loading, error }
}
