import { useParams, Link } from 'react-router-dom'
import { useShowcaseContent } from '@/hooks/useChapterContent'
import { getShowcaseBySlug, chapters } from '@/content'
import { HtmlBlock } from '@/components/markdown/HtmlBlock'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

function processShowcaseContent(raw: string): string {
  // Convert [[Note Name]] or [[Note|Display]] to links
  return raw.replace(
    /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
    (_match, target, display) => {
      const text = display || target
      const lower = target.toLowerCase()
      const chapterMatch = lower.match(/chapter\s*(\d+)/)
      const href = chapterMatch
        ? `/chapters/chapter-${chapterMatch[1]}`
        : `#${encodeURIComponent(target)}`
      return `<a href="${href}" style="color:#7c3aed;text-decoration:underline">${text}</a>`
    }
  )
}

export function AgentShowcasePage() {
  const { id } = useParams<{ id: string }>()
  const showcase = getShowcaseBySlug(id || '')
  const { content, loading, error } = useShowcaseContent(id || '')

  useEffect(() => {
    if (showcase) {
      document.title = `${showcase.title} | 에이전트 클래스`
    }
    window.scrollTo(0, 0)
  }, [showcase])

  if (!showcase) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">쇼케이스를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const chapter = showcase.chapterRef
    ? chapters.find((c) => c.id === showcase.chapterRef)
    : null

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 max-w-4xl">
      <Link to="/showcase">
        <Button variant="ghost" size="sm" className="gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          쇼케이스 목록
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{showcase.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{showcase.title}</h1>
            <p className="text-muted-foreground">{showcase.subtitle}</p>
          </div>
        </div>
        {chapter && (
          <Link to={`/chapters/${chapter.slug}`}>
            <Badge variant="outline" className="mt-3">
              {chapter.icon} 관련: {chapter.title}
            </Badge>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      ) : error ? (
        <p className="text-destructive">Error: {error}</p>
      ) : (
        <HtmlBlock html={processShowcaseContent(content)} />
      )}
    </div>
  )
}
