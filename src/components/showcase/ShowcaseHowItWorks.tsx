import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { appleEase } from '@/lib/motion'
import type { ShowcaseStep, ShowcaseTheme } from '@/types'

interface ShowcaseHowItWorksProps {
  steps: ShowcaseStep[]
  theme: ShowcaseTheme
}

export function ShowcaseHowItWorks({ steps, theme }: ShowcaseHowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  // Timeline "draws" as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])

  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04]"
        style={{ background: theme.primary }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[150px] opacity-[0.03]"
        style={{ background: theme.primaryLight }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
            작동 방식
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            간단한 {steps.length}단계로 시작하세요
          </p>
        </motion.div>

        <div className="relative">
          {/* Scroll-linked vertical timeline line */}
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            {/* Track background */}
            <div
              className="absolute inset-0"
              style={{ background: 'var(--glass-border)' }}
            />
            {/* Animated gradient fill */}
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: `linear-gradient(to bottom, ${theme.primary}, ${theme.primaryLight})`,
                boxShadow: `0 0 16px ${theme.primary}50, 0 0 4px ${theme.primary}30`,
              }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: appleEase }}
                className="relative flex gap-6 md:gap-8 items-start group"
              >
                {/* Step number circle with gradient background */}
                <div className="relative shrink-0">
                  {/* Glow dot on timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden md:block"
                    style={{
                      background: theme.primary,
                      boxShadow: `0 0 20px ${theme.primary}60, 0 0 40px ${theme.primary}30`,
                    }}
                  />

                  {/* Gradient circle with step number */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full text-xl md:text-2xl font-bold text-white"
                    style={{
                      background: theme.gradient,
                      boxShadow: `0 12px 40px ${theme.primary}35`,
                    }}
                  >
                    {step.step}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex-1 p-7 rounded-2xl transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '20px',
                  }}
                >
                  {/* Top gradient accent on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: theme.gradient }}
                  />

                  {/* Left accent bar on hover */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: theme.gradient }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 50%, ${theme.primary}08, transparent 60%)` }}
                  />

                  <div className="relative z-10">
                    <h3
                      className="text-lg md:text-xl font-semibold mb-2.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
