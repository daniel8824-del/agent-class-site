import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { chapters } from '@/content'
import { motion } from 'framer-motion'

const chapterColors: Record<number, { from: string; to: string }> = {
  1: { from: 'oklch(0.55 0.23 285)', to: 'oklch(0.45 0.2 295)' },
  2: { from: 'oklch(0.55 0.23 260)', to: 'oklch(0.45 0.2 270)' },
  3: { from: 'oklch(0.65 0.15 195)', to: 'oklch(0.55 0.18 205)' },
  4: { from: 'oklch(0.6 0.17 160)', to: 'oklch(0.5 0.15 165)' },
  5: { from: 'oklch(0.7 0.16 80)', to: 'oklch(0.6 0.18 70)' },
  6: { from: 'oklch(0.6 0.2 15)', to: 'oklch(0.5 0.22 5)' },
  7: { from: 'oklch(0.6 0.12 180)', to: 'oklch(0.5 0.14 175)' },
  8: { from: 'oklch(0.5 0.25 300)', to: 'oklch(0.4 0.22 310)' },
}

interface ChapterNavProps {
  currentId: number
}

export function ChapterNav({ currentId }: ChapterNavProps) {
  const prevChapter = chapters.find((c) => c.id === currentId - 1)
  const nextChapter = chapters.find((c) => c.id === currentId + 1)

  return (
    <div className="flex items-stretch gap-4 mt-16 pt-8 border-t border-border">
      {prevChapter ? (
        <NavCard chapter={prevChapter} direction="prev" />
      ) : (
        <div className="flex-1" />
      )}
      {nextChapter ? (
        <NavCard chapter={nextChapter} direction="next" />
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}

function NavCard({ chapter, direction }: { chapter: (typeof chapters)[0]; direction: 'prev' | 'next' }) {
  const colors = chapterColors[chapter.id] || chapterColors[1]
  const isPrev = direction === 'prev'
  // Strip "Chapter N : " prefix for short title
  const shortTitle = chapter.title.replace(/^Chapter\s+\d+\s*:\s*/, '')

  return (
    <Link to={`/chapters/${chapter.slug}`} className="flex-1 group">
      <motion.div
        whileHover={{
          y: -4,
          boxShadow: `0 12px 32px oklch(0 0 0 / 25%), 0 4px 16px ${colors.from}20`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative h-full p-px rounded-xl overflow-hidden"
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity"
          style={{
            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          }}
        />

        {/* Inner content - glass card */}
        <div
          className="relative h-full rounded-xl px-5 py-4 flex items-center gap-3"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur))',
          }}
        >
          {isPrev && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:-translate-x-1"
              style={{ background: `${colors.from}15` }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: colors.from }} />
            </div>
          )}
          <div className={isPrev ? 'text-left flex-1 min-w-0' : 'text-right flex-1 min-w-0'}>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
              {isPrev ? '이전 챕터' : '다음 챕터'}
            </div>
            <div className="flex items-center gap-2" style={{ justifyContent: isPrev ? 'flex-start' : 'flex-end' }}>
              <span className="text-lg">{chapter.icon}</span>
              <div className="min-w-0">
                <div className="text-[10px] font-mono" style={{ color: 'var(--text-subtle)' }}>
                  {String(chapter.id).padStart(2, '0')}
                </div>
                <div className="text-sm font-semibold truncate group-hover:text-foreground transition-colors">
                  {shortTitle}
                </div>
              </div>
            </div>
          </div>
          {!isPrev && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1"
              style={{ background: `${colors.from}15` }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: colors.from }} />
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
