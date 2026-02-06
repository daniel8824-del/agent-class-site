import { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, List } from 'lucide-react'
import { useReadingProgress } from '@/hooks/useProgress'
import type { TocItem } from '@/types'

interface TableOfContentsProps {
  headings: TocItem[]
  activeId: string
}

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  const [collapsed, setCollapsed] = useState(false)
  const readingProgress = useReadingProgress()
  const tocHeadings = headings.filter((h) => h.level === 2 || h.level === 3)

  if (tocHeadings.length === 0) return null

  const progressPercent = Math.round(readingProgress * 100)

  return (
    <nav
      className={cn(
        'hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30 transition-all duration-300',
        collapsed ? 'w-10' : 'w-[220px]'
      )}
      aria-label="Table of contents"
    >
      {/* Collapse/expand toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-4 top-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-muted)',
          boxShadow: 'var(--shadow-sm)',
        }}
        aria-label={collapsed ? 'Expand TOC' : 'Collapse TOC'}
      >
        {collapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="scrollbar-thin max-h-[60vh] overflow-y-auto overscroll-contain"
            style={{
              borderRadius: 'var(--radius-xl)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--glass-border)',
              padding: '20px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Header with icon */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <List className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
                  <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    목차
                  </p>
                </div>
                <span
                  className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded"
                  style={{
                    color: 'var(--accent-primary)',
                    background: 'var(--accent-primary)',
                    opacity: 0.15,
                  }}
                >
                  <span style={{ opacity: 1 }}>{progressPercent}%</span>
                </span>
              </div>
              {/* Reading progress bar */}
              <div
                className="h-[3px] rounded-full overflow-hidden"
                style={{ background: 'var(--surface-1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-progress)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            <ul className="space-y-0.5">
              {tocHeadings.map((heading) => {
                const isActive = activeId === heading.id
                return (
                  <li key={heading.id} className="relative">
                    {/* Active indicator: gradient left bar + subtle background */}
                    {isActive && (
                      <motion.div
                        layoutId="toc-active"
                        className="absolute inset-0 rounded-md overflow-hidden"
                        style={{
                          background: 'var(--accent-primary)',
                          opacity: 0.08,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      >
                        {/* Gradient left border accent */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px]"
                          style={{
                            background: 'var(--gradient-progress)',
                            borderRadius: '3px 0 0 3px',
                          }}
                        />
                      </motion.div>
                    )}
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={cn(
                        'relative block text-xs leading-5 py-1.5 px-3 rounded-md transition-all duration-200',
                        heading.level === 3 ? 'pl-6' : 'pl-3',
                        isActive
                          ? 'font-medium'
                          : 'hover:text-foreground hover:bg-[var(--surface-1)]'
                      )}
                      style={{
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed state: vertical progress rail */}
      {collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-2 pt-10"
        >
          <div
            className="w-[3px] rounded-full overflow-hidden relative"
            style={{ height: '80px', background: 'var(--surface-1)' }}
          >
            <motion.div
              className="w-full rounded-full"
              style={{
                background: 'var(--gradient-progress)',
              }}
              initial={{ height: 0 }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span
            className="text-[9px] font-mono tabular-nums"
            style={{ color: 'var(--text-muted)' }}
          >
            {progressPercent}%
          </span>
        </motion.div>
      )}
    </nav>
  )
}
