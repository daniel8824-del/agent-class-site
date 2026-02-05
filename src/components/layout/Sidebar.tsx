import { Link, useLocation } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { chapters, showcases } from '@/content'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar hidden lg:block">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Chapters
          </p>
          {chapters.map((ch) => {
            const isActive = location.pathname === `/chapters/${ch.slug}`
            return (
              <Link
                key={ch.id}
                to={`/chapters/${ch.slug}`}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <span className="text-base">{ch.icon}</span>
                <span className="truncate">{ch.title.replace('Chapter ', 'Ch ')}</span>
              </Link>
            )
          })}

          <Separator className="my-4" />

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Showcase
          </p>
          {showcases.map((sc) => {
            const isActive = location.pathname === `/showcase/${sc.slug}`
            return (
              <Link
                key={sc.id}
                to={`/showcase/${sc.slug}`}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <span className="text-base">{sc.icon}</span>
                <span className="truncate">{sc.title}</span>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </aside>
  )
}
