import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { chapters } from '@/content'

interface ChapterNavProps {
  currentId: number
}

export function ChapterNav({ currentId }: ChapterNavProps) {
  const prevChapter = chapters.find((c) => c.id === currentId - 1)
  const nextChapter = chapters.find((c) => c.id === currentId + 1)

  return (
    <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
      {prevChapter ? (
        <Link to={`/chapters/${prevChapter.slug}`}>
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">이전</div>
              <div className="text-sm font-medium">{prevChapter.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div />
      )}
      {nextChapter ? (
        <Link to={`/chapters/${nextChapter.slug}`}>
          <Button variant="ghost" className="gap-2">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">다음</div>
              <div className="text-sm font-medium">{nextChapter.title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
