import { useParams } from 'react-router-dom'
import { useChapterContent } from '@/hooks/useChapterContent'
import { useTableOfContents } from '@/hooks/useTableOfContents'
import { getChapterBySlug } from '@/content'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { TableOfContents } from './TableOfContents'
import { ChapterNav } from './ChapterNav'
import { TagBadge } from '@/components/common/TagBadge'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

export function ChapterPage() {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  const slug = routeSlug || ''
  const chapter = getChapterBySlug(slug)
  const { content, loading, error } = useChapterContent(slug)
  const { headings, activeId, updateHeadings } = useTableOfContents()

  useEffect(() => {
    if (chapter) {
      document.title = `${chapter.title} | 에이전트 클래스`
    }
    window.scrollTo(0, 0)
  }, [chapter])

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">챕터를 찾을 수 없습니다.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="flex gap-6">
      <article className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 py-8 max-w-4xl">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{chapter.icon}</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: chapter.color }}>
                {chapter.title}
              </h1>
              <p className="text-muted-foreground mt-1">{chapter.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {chapter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ) : (
          <MarkdownRenderer content={content} slug={slug} onHeadings={updateHeadings} />
        )}

        <ChapterNav currentId={chapter.id} />
      </article>

      {/* Table of Contents - Desktop only */}
      <div className="hidden xl:block w-64 shrink-0 py-8 pr-4">
        <TableOfContents headings={headings} activeId={activeId} />
      </div>
    </div>
  )
}
