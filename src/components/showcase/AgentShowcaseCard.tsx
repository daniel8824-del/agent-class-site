import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import type { ShowcaseMeta } from '@/types'
import { chapters } from '@/content'
import { showcaseDataMap } from '@/data/showcases'
import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'

interface AgentShowcaseCardProps {
  showcase: ShowcaseMeta
}

export function AgentShowcaseCard({ showcase }: AgentShowcaseCardProps) {
  const chapter = showcase.chapterRef
    ? chapters.find((c) => c.id === showcase.chapterRef)
    : null
  const data = showcaseDataMap[showcase.slug]
  const themeColor = data?.theme.primary || '#7c3aed'
  const gradient = data?.theme.gradient || 'linear-gradient(135deg, #7c3aed, #a78bfa)'
  const pills = data?.featurePills?.slice(0, 3) || []

  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 8, y: x * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return (
    <Link to={`/showcase/${showcase.slug}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full overflow-hidden rounded-2xl"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          border: '1px solid var(--glass-border)',
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease',
        }}
      >
        {/* Gradient top area with icon */}
        <div className="h-44 relative overflow-hidden flex items-center justify-center" style={{ background: gradient }}>
          <div className="absolute inset-0 bg-black/20" />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Icon with glow ring */}
          <div className="relative">
            <div
              className="absolute inset-0 w-20 h-20 -m-2 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
              style={{ background: themeColor }}
            />
            <span className="relative text-6xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-300 block">
              {showcase.icon}
            </span>
          </div>

          {/* Glass overlay on hover with description */}
          <div
            className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to top, ${themeColor}80, transparent)`,
            }}
          >
            <p className="text-white text-sm font-medium pb-4 px-4 text-center">
              {showcase.subtitle}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold group-hover:text-foreground transition-colors">
              {showcase.title}
            </h3>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-all shrink-0 mt-1"
              style={{ color: themeColor }}
            />
          </div>
          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
            {showcase.subtitle}
          </p>

          {/* Feature Pills */}
          {pills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="text-[10px] px-2.5 py-1 rounded-full border font-medium"
                  style={{
                    color: data?.theme.primaryLight,
                    background: `${themeColor}10`,
                    borderColor: `${themeColor}25`,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {chapter && (
            <Badge
              variant="outline"
              className="text-xs"
              style={{ borderColor: 'var(--glass-border-hover)' }}
            >
              {chapter.icon} Chapter {chapter.id}
            </Badge>
          )}
        </div>

        {/* Gradient border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${themeColor}30, 0 8px 32px ${themeColor}15`,
          }}
        />
      </motion.div>
    </Link>
  )
}
