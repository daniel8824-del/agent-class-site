import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { appleEase, staggerContainer, staggerItem } from '@/lib/motion'
import type { ShowcaseFeature, ShowcaseTheme } from '@/types'

interface ShowcaseFeaturesProps {
  features: ShowcaseFeature[]
  theme: ShowcaseTheme
}

export function ShowcaseFeatures({ features, theme }: ShowcaseFeaturesProps) {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Subtle background glow -- dual layer */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px] opacity-[0.05]"
        style={{ background: theme.primary }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.03]"
        style={{ background: theme.primaryLight }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-1 rounded-full mx-auto mb-6"
            style={{ background: theme.gradient }}
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', var(--font-display)",
              color: 'var(--text-primary)',
            }}
          >
            주요 기능
          </h2>
          <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            핵심 기능을 확인해보세요
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <GlassFeatureCard feature={feature} theme={theme} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function GlassFeatureCard({ feature, theme }: { feature: ShowcaseFeature; theme: ShowcaseTheme }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
      mouseX: x * 100,
      mouseY: y * 100,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative p-8 rounded-2xl overflow-hidden h-full"
      style={{
        perspective: 600,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        borderRadius: '20px',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
    >
      {/* Light reflection following mouse */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${tilt.mouseX}% ${tilt.mouseY}%, ${theme.primary}18, transparent 60%)`,
        }}
      />

      {/* Top gradient accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: theme.gradient }}
      />

      {/* Bottom edge glow */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: theme.gradient }}
      />

      <div className="relative z-10">
        {/* Icon with hover animation: scale + rotate + glow */}
        <motion.div
          animate={isHovered
            ? { scale: 1.18, rotate: 8, y: -2 }
            : { scale: 1, rotate: 0, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl relative"
          style={{
            background: isHovered ? `${theme.primary}25` : `${theme.primary}12`,
            boxShadow: isHovered
              ? `0 0 30px ${theme.primary}35, 0 0 0 1px ${theme.primary}30`
              : `0 0 0 1px ${theme.primary}15`,
            borderRadius: '14px',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {/* Icon glow ring on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1.5 }}
              className="absolute inset-0 rounded-xl blur-md"
              style={{ background: theme.primary }}
            />
          )}
          <span className="relative z-10">{feature.icon}</span>
        </motion.div>

        <h3
          className="text-base font-semibold mb-2.5"
          style={{ color: 'var(--text-primary)' }}
        >
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {feature.description}
        </p>
      </div>

      {/* Outer border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${theme.primary}20, 0 8px 32px ${theme.primary}08`,
        }}
      />
    </motion.div>
  )
}
