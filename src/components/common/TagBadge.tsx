import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

interface TagBadgeProps {
  tag: string
  linked?: boolean
}

export function TagBadge({ tag, linked = true }: TagBadgeProps) {
  const badge = (
    <Badge variant="secondary" className="text-xs hover:bg-accent cursor-pointer">
      {tag}
    </Badge>
  )

  if (linked) {
    return <Link to={`/tags/${encodeURIComponent(tag)}`}>{badge}</Link>
  }
  return badge
}
