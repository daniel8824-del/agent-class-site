// Design Reference: Stitch Screen ID: 89d5ea73238e4a64aec49dd9e2a0b7f3

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { staggerContainer, staggerItem, fadeInUp, appleEase } from '@/lib/motion'

function AnimatedCounter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0)
  const [blur, setBlur] = useState(6)

  useEffect(() => {
    if (!started) return
    const duration = 1400
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      setBlur(6 * (1 - eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, target])

  return (
    <span style={{ filter: blur > 0.1 ? `blur(${blur}px)` : 'none' }}>
      {count}{suffix}
    </span>
  )
}

export function ValueProps() {
  const [counterStarted, setCounterStarted] = useState(false)

  const values = [
    {
      icon: '🧠',
      stat: 8,
      suffix: '',
      statLabel: '챕터',
      title: '단 하나의 커리큘럼이면 충분합니다',
      description: 'Chapter 1부터 Chapter 8까지, 33시간이면 AI 에이전트 개발의 모든 것을 배웁니다.',
    },
    {
      icon: '🛠️',
      stat: 6,
      suffix: '',
      statLabel: '프로젝트',
      title: '포트폴리오가 바로 만들어집니다',
      description: 'CRM 자동화, 주식 분석, GIS 시스템 등 실무급 프로젝트를 GitHub에 올려보세요.',
    },
    {
      icon: '⚡',
      stat: 50,
      suffix: '+',
      statLabel: '실습',
      title: '가장 주목받는 기술',
      description: 'LangChain, n8n, MCP 프로토콜 — 50개 이상의 실습으로 최신 기술을 직접 다룹니다.',
    },
  ]

  return (
    <section
      className="py-20 md:py-32"
      style={{ background: 'var(--surface-0)' }}
    >
      <div className="max-w-[var(--max-w-content)] mx-auto px-6">
        {/* Section header */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2
            className="gradient-text mb-4"
            style={{
              fontSize: 'var(--text-display)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            핵심 가치
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-muted)' }}>
            실전 중심의 커리큘럼으로 진짜 실력을 만듭니다
          </p>
        </motion.div>

        {/* Value cards with animated counters */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap-grid)]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          onViewportEnter={() => {
            setTimeout(() => setCounterStarted(true), 400)
          }}
        >
          {values.map((value) => {
            return (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="glass-card relative p-8 flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <span className="text-5xl mb-6 block">{value.icon}</span>

                {/* Animated stat */}
                <div
                  className="gradient-text mb-2"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  <AnimatedCounter target={value.stat} suffix={value.suffix} started={counterStarted} />
                </div>
                <p
                  className="text-sm mb-4"
                  style={{ color: 'var(--text-muted)', fontWeight: 500 }}
                >
                  {value.statLabel}
                </p>

                {/* Title */}
                <h3
                  className="mb-3"
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {value.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {value.description}
                </p>

                {/* Hover gradient border glow */}
                <motion.div
                  className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                    borderRadius: 'inherit',
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
