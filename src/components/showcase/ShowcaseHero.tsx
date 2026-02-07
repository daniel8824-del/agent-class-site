import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { wordReveal, appleEase } from '@/lib/motion'
import type { ShowcaseTheme } from '@/types'

interface ShowcaseHeroProps {
  icon: string
  tagline: string
  title: string
  subtitle: string
  description: string
  theme: ShowcaseTheme
  featurePills: string[]
  heroImage?: string
  stats?: { value: string; label: string }[]
  children?: ReactNode
}

export function ShowcaseHero({
  icon,
  tagline,
  title,
  subtitle,
  description,
  theme,
  featurePills,
  heroImage,
  stats,
  children,
}: ShowcaseHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Multi-layer parallax — reduced on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const bgY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 150])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 15 : 40])
  const iconY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 20 : 60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // 3D tilt on icon
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateX: -y * 20, rotateY: x * 20 })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  // Word-by-word title reveal
  const subtitleWords = subtitle.split(' ')
  const titleWords = title.split(' ')

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[90vh] flex items-center justify-center py-28 md:py-36 px-4">
      {/* Hero image background with parallax */}
      {heroImage && (
        <motion.img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
          style={{ y: bgY }}
        />
      )}

      {/* Gradient background with parallax -- stronger intensity */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: theme.bgGradient,
          y: bgY,
        }}
      />

      {/* Secondary gradient layer for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${theme.primary}20, transparent 70%)`,
        }}
      />

      {/* Tertiary gradient for extra richness */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 70% 80%, ${theme.primaryLight}08, transparent 60%)`,
        }}
      />

      {/* Animated dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(${theme.primaryLight} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Large glow orbs -- enhanced with more layers and deeper animations */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] md:blur-[180px]"
        style={{ background: theme.primary, y: bgY }}
      />
      <motion.div
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.1, 0.2, 0.1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 -left-20 w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full blur-[80px] md:blur-[150px]"
        style={{ background: theme.primaryLight, y: bgY }}
      />
      {/* Third orb for richer depth -- larger, more diffuse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-1/3 left-1/4 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] md:blur-[160px]"
        style={{ background: theme.primaryLight, y: bgY }}
      />
      {/* Fourth orb -- accent color for depth variation */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute bottom-1/4 right-1/3 w-[150px] h-[150px] md:w-[350px] md:h-[350px] rounded-full blur-[70px] md:blur-[140px]"
        style={{ background: `color-mix(in srgb, ${theme.primary} 50%, ${theme.primaryLight})` }}
      />

      {/* Floating decorative rings -- enhanced with more subtle variations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border opacity-[0.06]"
        style={{ borderColor: theme.primary }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-dashed opacity-[0.04]"
        style={{ borderColor: theme.primaryLight }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border opacity-[0.02]"
        style={{ borderColor: theme.primary }}
      />

      <motion.div style={{ y: titleY, opacity }} className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Badge
            variant="outline"
            className="mb-8 px-5 py-2 text-sm backdrop-blur-md"
            style={{
              color: theme.primaryLight,
              borderColor: 'var(--glass-border)',
              background: 'var(--glass-bg)',
            }}
          >
            {tagline}
          </Badge>
        </motion.div>

        {/* Icon with 3D tilt and glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{ y: iconY, perspective: 600 }}
          className="relative inline-flex items-center justify-center mb-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-[1.8]"
            style={{ background: theme.primary }}
          />
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center border-2"
            style={{
              borderColor: `${theme.primary}40`,
              background: `${theme.primary}10`,
              boxShadow: `0 0 60px ${theme.primary}25, inset 0 0 40px ${theme.primary}10`,
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <span className="text-6xl">{icon}</span>
          </motion.div>
        </motion.div>

        {/* Title -- word-by-word reveal, responsive clamp sizing */}
        <motion.h1
          className="font-bold mb-5 tracking-tight leading-[1.1]"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontFamily: "'Space Grotesk', var(--font-display)",
          }}
          variants={wordReveal.container}
          initial="hidden"
          animate="visible"
        >
          <span className="block mb-2">
            {subtitleWords.map((word, i) => (
              <motion.span key={i} variants={wordReveal.word} className="inline-block mr-[0.3em]" style={{ color: 'var(--text-primary)' }}>
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordReveal.word}
                className="inline-block mr-[0.3em] bg-clip-text text-transparent"
                style={{ backgroundImage: theme.gradient }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Description -- larger, better spacing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </motion.p>

        {/* Feature Pills with subtle hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-3 flex-wrap mb-12"
        >
          {featurePills.map((pill, idx) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.08, duration: 0.4, ease: appleEase }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold border cursor-default"
              style={{
                color: theme.primaryLight,
                background: `${theme.primary}15`,
                borderColor: `${theme.primary}30`,
                boxShadow: `0 0 24px ${theme.primary}10`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* Animated Stats Preview -- glass cards with dividers */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: appleEase }}
            className="inline-flex items-center gap-0 rounded-2xl overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {stats.slice(0, 4).map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="text-center px-6 md:px-8 py-5 relative"
              >
                {idx > 0 && (
                  <div
                    className="absolute left-0 top-1/4 bottom-1/4 w-px"
                    style={{ background: 'var(--glass-border)' }}
                  />
                )}
                <div
                  className="text-2xl md:text-3xl font-bold mb-1 bg-clip-text text-transparent"
                  style={{ backgroundImage: theme.gradient }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Action buttons */}
      {children && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-12 right-6 z-20 flex items-center gap-2"
        >
          {children}
        </motion.div>
      )}

      {/* Bottom fade to page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--surface-0, #0a0a0b), transparent)' }}
      />
    </section>
  )
}
