// Design Reference: Stitch Screen ID: 4f2f25f9059f436d9ee77b4f7bc6c3aa

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { staggerContainerSlow, staggerItem, fadeInUp, appleEase } from '@/lib/motion'

interface OutcomeData {
  before: string
  after: string
  description: string
}

const outcomes: OutcomeData[] = [
  {
    before: 'API 호출만 할 줄 아는 개발자',
    after: '자율 에이전트를 설계하는 AI 엔지니어',
    description: '이력서 한 줄이 바뀌고, 연봉 협상력이 달라집니다.',
  },
  {
    before: '반복 업무에 시간을 쏟는 팀',
    after: '워크플로우 자동화로 생산성 3배 향상',
    description: '하루 2시간씩 아껴지는 시간 = 한 달 40시간 절약.',
  },
  {
    before: '포트폴리오가 부족한 취준생',
    after: '실전 프로젝트 6개를 보유한 AI 전문가',
    description: '면접에서 자신 있게 답할 수 있습니다.',
  },
]

function OutcomeCounter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1000
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function LearningOutcomes() {
  const [statsStarted, setStatsStarted] = useState(false)

  return (
    <section className="py-20 md:py-32" style={{ background: 'var(--surface-1)' }}>
      <div className="max-w-[var(--max-w-content)] mx-auto px-6">
        {/* Section header */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2
            className="gradient-text mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            학습 성과
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-muted)' }}>
            수강 전과 후, 당신의 변화를 확인하세요
          </p>
        </motion.div>

        {/* Before/After cards */}
        <motion.div
          className="flex flex-col gap-6 mb-12"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {outcomes.map((outcome, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border"
              style={{ borderColor: 'var(--glass-border)' }}
            >
              {/* Before side (darker) */}
              <div
                className="p-5 sm:p-6 md:p-8 flex flex-col justify-center"
                style={{ background: 'var(--surface-0)' }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Before
                </p>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  {outcome.before}
                </h3>
              </div>

              {/* After side (gradient overlay with violet tint) */}
              <div
                className="p-5 sm:p-6 md:p-8 flex flex-col justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--surface-2), var(--surface-1))',
                }}
              >
                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <ArrowRight className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      After
                    </p>
                  </div>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {outcome.after}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {outcome.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary stats row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: appleEase, delay: 0.2 }}
          onViewportEnter={() => {
            setTimeout(() => setStatsStarted(true), 400)
          }}
        >
          {[
            { value: 8, suffix: '개', label: '챕터' },
            { value: 6, suffix: '개', label: '실전 프로젝트' },
            { value: 33, suffix: '시간', label: '총 학습 시간' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 rounded-xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                className="gradient-text mb-1"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                <OutcomeCounter target={stat.value} suffix={stat.suffix} started={statsStarted} />
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
