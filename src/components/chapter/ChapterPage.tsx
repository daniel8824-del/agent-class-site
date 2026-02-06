import { useParams } from 'react-router-dom'
import { useChapterContent } from '@/hooks/useChapterContent'
import { useTableOfContents } from '@/hooks/useTableOfContents'
import { useProgress, useReadingProgress } from '@/hooks/useProgress'
import { getChapterBySlug, showcases } from '@/content'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { TableOfContents } from './TableOfContents'
import { MobileToc } from './MobileToc'
import { ChapterNav } from './ChapterNav'
import { TagBadge } from '@/components/common/TagBadge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { Check, Circle, Sparkles, ArrowRight, ArrowUp, Clock, BookOpen, GraduationCap, Wrench, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { appleEase, fadeInUp, scrollProgressSpring } from '@/lib/motion'
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

const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string }> = {
  beginner: { label: '입문', color: 'oklch(0.72 0.19 145)', bg: 'oklch(0.72 0.19 145 / 15%)' },
  intermediate: { label: '중급', color: 'oklch(0.75 0.18 85)', bg: 'oklch(0.75 0.18 85 / 15%)' },
  advanced: { label: '고급', color: 'oklch(0.65 0.22 25)', bg: 'oklch(0.65 0.22 25 / 15%)' },
}

export function ChapterPage() {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  const slug = routeSlug || ''
  const chapter = getChapterBySlug(slug)
  const { content, loading, error } = useChapterContent(slug)
  const { headings, activeId, updateHeadings } = useTableOfContents()
  const { isCompleted, toggleCompleted, updateLastVisited } = useProgress()
  const readingProgress = useReadingProgress()
  const completed = chapter ? isCompleted(chapter.id) : false
  const [showBackToTop, setShowBackToTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, scrollProgressSpring)
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1])

  useEffect(() => {
    if (chapter) {
      document.title = `${chapter.title} | 에이전트 클래스`
    }
    window.scrollTo(0, 0)
  }, [chapter])

  // Show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Save last visited position periodically
  useEffect(() => {
    if (!slug) return
    const interval = setInterval(() => {
      updateLastVisited(slug, window.scrollY)
    }, 5000)
    return () => clearInterval(interval)
  }, [slug, updateLastVisited])

  // Save on unmount
  useEffect(() => {
    if (!slug) return
    return () => {
      updateLastVisited(slug, window.scrollY)
    }
  }, [slug, updateLastVisited])

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">챕터를 찾을 수 없습니다.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  const colors = chapterColors[chapter.id] || chapterColors[1]
  const heroGradient = `linear-gradient(135deg, ${colors.from}25, ${colors.to}10, transparent 70%)`
  const difficulty = difficultyConfig[chapter.difficulty]

  return (
    <>
      {/* Smoothed Gradient Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
          boxShadow: `0 0 16px ${colors.from}50, 0 0 4px ${colors.from}30`,
        }}
      />

      {/* Chapter Hero Banner */}
      <section
        className="relative overflow-hidden"
        style={{ background: heroGradient }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 75% 50%, ${colors.from}12, transparent 70%)`,
          }}
        />

        {/* Subtle watermark number */}
        <div
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{
            fontSize: 'clamp(5rem, 10vw, 8rem)',
            fontWeight: 800,
            lineHeight: 1,
            color: colors.from,
            opacity: 0.12,
            fontFamily: 'var(--font-display)',
          }}
        >
          {String(chapter.id).padStart(2, '0')}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: appleEase }}
          >
            {/* Chapter label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{chapter.icon}</span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                style={{
                  color: colors.from,
                  background: `${colors.from}12`,
                  border: `1px solid ${colors.from}20`,
                }}
              >
                Chapter {String(chapter.id).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h1
              className="tracking-tight mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
              }}
            >
              {chapter.title}
            </h1>

            {/* Description */}
            <p
              className="max-w-2xl mb-6"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              {chapter.description}
            </p>

            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge
                className="text-xs font-semibold px-3 py-1.5 border-0 rounded-full"
                style={{ background: difficulty.bg, color: difficulty.color }}
              >
                {difficulty.label}
              </Badge>
              <span
                className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                {chapter.estimatedTime}
              </span>
              <span
                className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                {chapter.learnings.length}개 학습 목표
              </span>
            </div>

            {/* Tags + completion button */}
            <div className="flex flex-wrap items-center gap-3">
              {chapter.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
              <Button
                variant={completed ? 'default' : 'outline'}
                size="sm"
                className="gap-1.5 ml-auto rounded-full"
                onClick={() => toggleCompleted(chapter.id)}
              >
                {completed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    완료됨
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" />
                    완료 표시
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* What you'll learn section */}
      {chapter.learnings.length > 0 && (
        <motion.section
          {...fadeInUp}
          className="max-w-4xl mx-auto px-6 md:px-12 pt-0 pb-8"
        >
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--glass-blur))',
              WebkitBackdropFilter: 'blur(var(--glass-blur))',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h3
              className="text-lg font-semibold mb-5 flex items-center gap-2.5"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              <BookOpen className="w-4 h-4 shrink-0" style={{ color: colors.from }} />
              이 챕터에서 배우는 것
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {chapter.learnings.map((learning, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: appleEase }}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: colors.from }}
                  />
                  {learning}
                </motion.li>
              ))}
            </ul>

            {/* Tools section */}
            {chapter.tools.length > 0 && (
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>사용 도구</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chapter.tools.map((tool) => (
                    <Badge
                      key={tool}
                      variant="secondary"
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: `${colors.from}10`,
                        borderColor: `${colors.from}20`,
                        color: colors.from,
                      }}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Content Area with TracingBeam */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-12">
        {/* Mobile Table of Contents */}
        <MobileToc headings={headings} activeId={activeId} />

        {/* Main Content with TracingBeam */}
        <TracingBeam className="hidden md:block">
          <article className="min-w-0 overflow-x-hidden">
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-5 w-4/6" />
                <Skeleton className="h-5 w-full" />
              </div>
            ) : (
              <MarkdownRenderer content={content} slug={slug} onHeadings={updateHeadings} />
            )}

            {/* Related Showcases */}
            {(() => {
              const related = showcases.filter((s) => s.chapterRef === chapter.id)
              if (related.length === 0) return null
              return (
                <section className="mt-20 pt-10" style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <h3
                    className="text-lg font-semibold mb-6 flex items-center gap-2.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${colors.from}15` }}
                    >
                      <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    이 챕터의 프로젝트
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map((sc) => (
                      <Link key={sc.id} to={`/showcase/${sc.slug}`}>
                        <motion.div
                          className="group relative overflow-hidden rounded-xl"
                          style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            backdropFilter: 'blur(12px)',
                          }}
                          whileHover={{
                            y: -3,
                            transition: { type: 'spring', stiffness: 400, damping: 30 },
                          }}
                        >
                          {/* Top gradient stripe */}
                          <div
                            className="h-16"
                            style={{
                              background: `linear-gradient(135deg, ${colors.from}35, ${colors.to}15)`,
                            }}
                          />
                          <div className="p-5 flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{sc.title}</h4>
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{sc.subtitle}</p>
                            </div>
                            <ArrowRight
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0"
                              style={{ color: 'var(--text-muted)' }}
                            />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })()}

            <ChapterNav currentId={chapter.id} />
          </article>
        </TracingBeam>

        {/* Mobile: No TracingBeam */}
        <article className="min-w-0 overflow-x-hidden md:hidden">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-5 w-4/6" />
            </div>
          ) : (
            <MarkdownRenderer content={content} slug={slug} onHeadings={updateHeadings} />
          )}
          <ChapterNav currentId={chapter.id} />
        </article>
      </div>

      {/* Floating TOC - Desktop only */}
      <TableOfContents headings={headings} activeId={activeId} />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-md)',
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
