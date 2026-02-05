import { cn } from '@/lib/utils'
import type { TocItem } from '@/types'

interface TableOfContentsProps {
  headings: TocItem[]
  activeId: string
}

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  if (headings.length === 0) return null

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        목차
      </p>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={cn(
                'block text-sm py-1 transition-colors border-l-2 hover:text-foreground',
                heading.level === 2 && 'pl-3',
                heading.level === 3 && 'pl-6',
                heading.level === 4 && 'pl-9',
                activeId === heading.id
                  ? 'text-primary border-l-primary font-medium'
                  : 'text-muted-foreground border-l-transparent hover:border-l-border'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
