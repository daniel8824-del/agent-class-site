import { useState } from 'react'
import { cn } from '@/lib/utils'
import { List, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TocItem } from '@/types'

interface MobileTocProps {
  headings: TocItem[]
  activeId: string
}

export function MobileToc({ headings, activeId }: MobileTocProps) {
  const [open, setOpen] = useState(false)

  const tocHeadings = headings.filter((h) => h.level === 2 || h.level === 3)
  if (tocHeadings.length === 0) return null

  return (
    <div className="lg:hidden mb-6 rounded-xl overflow-hidden glass">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        <span className="flex items-center gap-2">
          <List className="w-4 h-4" />
          목차
        </span>
        <ChevronDown
          className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-3 space-y-0.5 max-h-80 overflow-y-auto scrollbar-thin"
          >
            {tocHeadings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                    setOpen(false)
                  }}
                  className={cn(
                    'block text-sm py-1.5 transition-colors rounded-md px-2',
                    heading.level === 3 ? 'pl-5 text-xs' : 'pl-2',
                    activeId === heading.id
                      ? 'font-medium'
                      : 'hover:text-foreground'
                  )}
                  style={{
                    color: activeId === heading.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    background: activeId === heading.id ? 'var(--accent-primary)08' : undefined,
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
