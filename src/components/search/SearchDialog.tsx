import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Search, FileText, Sparkles } from 'lucide-react'
import { chapters, showcases } from '@/content'
import Fuse from 'fuse.js'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

interface SearchResult {
  title: string
  type: 'chapter' | 'showcase'
  slug: string
  icon: string
  description: string
}

const allItems: SearchResult[] = [
  ...chapters.map((c) => ({
    title: c.title,
    type: 'chapter' as const,
    slug: `/chapters/${c.slug}`,
    icon: c.icon,
    description: c.description,
  })),
  ...showcases.map((s) => ({
    title: s.title,
    type: 'showcase' as const,
    slug: `/showcase/${s.slug}`,
    icon: s.icon,
    description: s.subtitle,
  })),
]

const fuse = new Fuse(allItems, {
  keys: ['title', 'description'],
  threshold: 0.3,
  includeScore: true,
})

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return allItems
    return fuse.search(query).map((r) => r.item)
  }, [query])

  const handleSelect = useCallback((slug: string) => {
    navigate(slug)
    onClose()
    setQuery('')
  }, [navigate, onClose])

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="챕터 또는 쇼케이스 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              검색 결과가 없습니다.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.slug}
                onClick={() => handleSelect(item.slug)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left hover:bg-accent transition-colors"
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                </div>
                <span className="shrink-0">
                  {item.type === 'chapter' ? (
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
