import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import type { ShowcaseMeta } from '@/types'
import { chapters } from '@/content'

interface AgentShowcaseCardProps {
  showcase: ShowcaseMeta
}

export function AgentShowcaseCard({ showcase }: AgentShowcaseCardProps) {
  const chapter = showcase.chapterRef
    ? chapters.find((c) => c.id === showcase.chapterRef)
    : null

  return (
    <Link to={`/showcase/${showcase.slug}`}>
      <Card className="group h-full overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className={`h-32 bg-gradient-to-br ${showcase.gradient} flex items-center justify-center`}>
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {showcase.icon}
          </span>
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {showcase.title}
            </h3>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {showcase.subtitle}
          </p>
          {chapter && (
            <Badge variant="outline" className="text-xs">
              {chapter.icon} Chapter {chapter.id}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
