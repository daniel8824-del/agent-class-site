// Design Reference: Stitch Screen ID: 2c734baf4ad14293abd779bfbfe1c85d
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, Layers } from 'lucide-react'
import { chapters } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { appleEase, staggerContainer, staggerItem } from '@/lib/motion'
import type { Difficulty } from '@/types'

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

const chapterIcons: Record<number, string> = {
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
}

const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string }> = {
  beginner: { label: '입문', color: 'oklch(0.72 0.19 145)', bg: 'oklch(0.72 0.19 145 / 15%)' },
  intermediate: { label: '중급', color: 'oklch(0.75 0.18 85)', bg: 'oklch(0.75 0.18 85 / 15%)' },
  advanced: { label: '고급', color: 'oklch(0.65 0.22 25)', bg: 'oklch(0.65 0.22 25 / 15%)' },
}

// Chapters 1 and 8 get col-span-2 (large cards)
function getSpanClass(chapterId: number) {
  return chapterId === 1 || chapterId === 8 ? 'col-span-2 md:col-span-2' : 'col-span-2 md:col-span-1'
}

export function ChaptersOverview() {
  const { isCompleted, completedCount } = useProgress()

  useEffect(() => {
    document.title = '챕터 목록 | 에이전트 클래스'
  }, [])

  return (
    <div className="px-6 md:px-12 py-16 md:py-24" style={{ maxWidth: 'var(--max-w-content)', margin: '0 auto' }}>
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: appleEase }}
        className="mb-16 text-center"
      >
        {/* Decorative label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: appleEase, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Layers className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
            {chapters.length} Chapters
          </span>
        </motion.div>

        <h1
          className="gradient-text mb-5"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          AI 에이전트 러닝 패스
        </h1>
        <p
          className="max-w-xl mx-auto"
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}
        >
          8개 챕터를 통해 AI 에이전트 개발의 A부터 Z까지 배워보세요.
        </p>

        {/* Progress indicator */}
        {completedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / chapters.length) * 100}%` }}
                transition={{ duration: 0.8, ease: appleEase, delay: 0.5 }}
                style={{ background: 'var(--gradient-progress)' }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums" style={{ color: 'var(--accent-tertiary)' }}>
              {completedCount} / {chapters.length} 챕터 완료
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
      >
        {chapters.map((ch) => {
          const colors = chapterColors[ch.id] || chapterColors[1]
          const difficulty = difficultyConfig[ch.difficulty]
          const completed = isCompleted(ch.id)
          const isLarge = ch.id === 1 || ch.id === 8
          const displayTitle = ch.title.replace(/^Chapter\s+\d+\s*:\s*/, '')

          return (
            <motion.div key={ch.id} variants={staggerItem} className={getSpanClass(ch.id)}>
              <Link to={`/chapters/${ch.slug}`} className="block h-full">
                <motion.div
                  className="group relative h-full overflow-hidden"
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--glass-border)',
                    padding: isLarge ? 'var(--pad-card-lg)' : 'var(--pad-card)',
                  }}
                  whileHover={{
                    y: -4,
                    transition: { type: 'spring', stiffness: 400, damping: 30 },
                  }}
                >
                  {/* Hover gradient border overlay */}
                  <div
                    className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}18, transparent 50%, ${colors.to}12)`,
                    }}
                  />

                  {/* Top gradient accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                    }}
                  />

                  {/* Hover border glow */}
                  <div
                    className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${colors.from}30, 0 8px 32px ${colors.from}15, 0 0 0 1px ${colors.from}20`,
                    }}
                  />

                  {/* Watermark number */}
                  <div
                    className="absolute select-none pointer-events-none"
                    style={{
                      bottom: isLarge ? '12px' : '8px',
                      right: isLarge ? '12px' : '6px',
                      fontSize: isLarge ? '48px' : '32px',
                      fontWeight: 800,
                      lineHeight: 1,
                      opacity: 0.12,
                      color: colors.from,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {chapterIcons[ch.id]}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top row: chapter emoji + badges */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={isLarge ? 'text-3xl' : 'text-2xl'}>{ch.icon}</span>
                      <Badge
                        className="text-[10px] font-semibold px-2 py-0.5 border-0 rounded-full"
                        style={{
                          background: difficulty.bg,
                          color: difficulty.color,
                        }}
                      >
                        {difficulty.label}
                      </Badge>
                      <span className="flex items-center gap-1 text-[11px] ml-auto" style={{ color: 'var(--text-muted)' }}>
                        <Clock className="w-3 h-3" />
                        {ch.estimatedTime}
                      </span>
                    </div>

                    {/* Chapter number label */}
                    <div
                      className="text-[10px] font-mono font-semibold tracking-widest uppercase mb-1"
                      style={{ color: colors.from }}
                    >
                      Chapter {String(ch.id).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-semibold mb-2 group-hover:text-foreground transition-colors"
                      style={{
                        fontSize: isLarge ? 'var(--text-heading-4)' : 'var(--text-body)',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.01em',
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                      }}
                    >
                      {displayTitle}
                    </h3>

                    {/* Description */}
                    <p
                      className={isLarge ? 'text-sm mb-4 line-clamp-2' : 'text-xs mb-3 line-clamp-1'}
                      style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}
                    >
                      {ch.description}
                    </p>

                    {/* Spacer to push bottom content down */}
                    <div className="flex-1" />

                    {/* Tool tags + arrow */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {ch.tools.slice(0, isLarge ? 4 : 3).map((tool) => (
                        <Badge
                          key={tool}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 rounded-full border"
                          style={{
                            background: `${colors.from}08`,
                            borderColor: `${colors.from}18`,
                            color: colors.from,
                          }}
                        >
                          {tool}
                        </Badge>
                      ))}
                      {completed && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium" style={{ color: 'var(--accent-tertiary)' }}>
                          <BookOpen className="w-3 h-3" />
                          완료
                        </span>
                      )}
                    </div>

                    {/* Completion progress bar */}
                    {completed && (
                      <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: '100%',
                            background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
