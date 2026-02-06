import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { appleEase, staggerContainer, staggerItem } from '@/lib/motion'
import type { ShowcaseStat, ShowcaseTheme } from '@/types'

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const numericMatch = value.match(/^(\d+)(.*)$/)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || !numericMatch) return
    const target = parseInt(numericMatch[1])
    const duration = 1800
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo for a more dramatic reveal
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, numericMatch])

  if (!numericMatch) return <>{value}</>
  return <>{display}{numericMatch[2]}</>
}

interface ShowcaseStatsProps {
  stats: ShowcaseStat[]
  theme: ShowcaseTheme
}

export function ShowcaseStats({ stats, theme }: ShowcaseStatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background accent dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${theme.primary} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Centered glow -- larger, more diffuse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[200px] opacity-[0.06]"
        style={{ background: theme.primary }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[160px] opacity-[0.03]"
        style={{ background: theme.primaryLight }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-center mb-14"
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
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', var(--font-display)",
              color: 'var(--text-primary)',
            }}
          >
            핵심 지표
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="relative p-7 rounded-2xl text-center overflow-hidden group"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
              }}
            >
              {/* Glow on hover -- radial from center */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${theme.primary}12, transparent 70%)` }}
              />

              {/* Gradient top border -- always visible with hover intensify */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: theme.gradient }}
              />

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: theme.gradient }}
              />

              <div className="relative z-10">
                {/* Stat value with pulse glow */}
                <motion.div
                  animate={inView ? {
                    textShadow: [
                      `0 0 20px ${theme.primary}00`,
                      `0 0 30px ${theme.primary}40`,
                      `0 0 20px ${theme.primary}00`,
                    ],
                  } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                  className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent"
                  style={{ backgroundImage: theme.gradient }}
                >
                  <AnimatedNumber value={stat.value} inView={inView} />
                </motion.div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>

              {/* Outer border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${theme.primary}15, 0 8px 32px ${theme.primary}08`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
