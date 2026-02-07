import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { appleEase } from '@/lib/motion'
import { ctaContent } from '@/data/homepage'

export function FinalCTA() {
  return (
    <section
      className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden w-full px-6"
      style={{ background: 'var(--surface-0)' }}
    >
      {/* Subtle gradient orb background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.35 0.15 280 / 25%), transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: appleEase }}
          className="gradient-text mb-6 text-center"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
        >
          {ctaContent.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: appleEase }}
          className="mb-10 text-center max-w-2xl"
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
          }}
        >
          {ctaContent.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5, ease: appleEase }}
        >
          <Link to="/chapters/chapter-1">
            <button className="btn-primary shimmer-btn cursor-pointer inline-flex items-center gap-2 text-lg">
              {ctaContent.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link to="/chapters">
            <button className="btn-secondary cursor-pointer inline-flex items-center gap-2">
              {ctaContent.ctaSecondary}
            </button>
          </Link>
        </motion.div>

        {/* Guarantee text */}
        <motion.p
          className="text-center"
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-muted)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5, ease: appleEase }}
        >
          {ctaContent.guarantee}
        </motion.p>
      </div>
    </section>
  )
}
