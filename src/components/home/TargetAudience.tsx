// Design Reference: Stitch Screen ID: 77e9ce580d00482bbb058430f6c1f42e

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/motion'

interface PersonaData {
  icon: string
  title: string
  description: string
  path: string
  result: string
}

const personas: PersonaData[] = [
  {
    icon: '👨‍💻',
    title: '주니어 개발자',
    description: 'AI 에이전트 기술로 역량을 확장하고 싶은 개발자',
    path: 'Ch.1 → Ch.4 → Ch.5 → Ch.7',
    result: 'API 호출 → 자율 에이전트 설계',
  },
  {
    icon: '📋',
    title: '기획자/PM',
    description: 'AI 자동화 프로젝트를 리드해야 하는 기획자',
    path: 'Ch.1 → Ch.2 → Ch.3 → Ch.6',
    result: '팀 생산성 3배 향상',
  },
  {
    icon: '🎓',
    title: '학생/취준생',
    description: '차별화된 포트폴리오가 필요한 학생',
    path: 'Ch.1 → Ch.2 → Ch.4 → Ch.8',
    result: '6개 실전 프로젝트',
  },
  {
    icon: '🚀',
    title: '창업자',
    description: 'AI 기반 MVP를 빠르게 만들고 싶은 창업자',
    path: 'Ch.4 → Ch.5 → Ch.6 → Ch.7',
    result: 'MVP 2주 완성',
  },
]

export function TargetAudience() {
  return (
    <section className="py-20 md:py-32" style={{ background: 'var(--surface-1)' }}>
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
            당신의 상황에 맞는 학습 경로
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-muted)' }}>
            개발자, 기획자, 학생, 창업자 — 각자의 목표에 맞는 추천 챕터를 확인하세요
          </p>
        </motion.div>

        {/* 4 Persona Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {personas.map((persona) => (
            <motion.div
              key={persona.title}
              variants={staggerItem}
              className="glass-card text-center flex flex-col"
              style={{ padding: '28px' }}
            >
              {/* Icon */}
              <span className="text-4xl mb-4 block">{persona.icon}</span>

              {/* Title */}
              <h3
                className="mb-2"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {persona.title}
              </h3>

              {/* Description */}
              <p
                className="mb-4"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {persona.description}
              </p>

              {/* Recommended path (glass pill) */}
              <div
                className="mb-4 px-3 py-2 rounded-lg text-center"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <p
                  className="text-xs mb-1"
                  style={{ color: 'var(--text-muted)', fontWeight: 500 }}
                >
                  추천 경로
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-muted)', fontWeight: 600, fontFamily: 'monospace' }}
                >
                  {persona.path}
                </p>
              </div>

              {/* Result (gradient-text) */}
              <p
                className="gradient-text mb-4"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {persona.result}
              </p>

              {/* Bottom CTA link */}
              <button
                className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-lg transition-colors"
                style={{
                  color: 'var(--accent-primary)',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                <span>추천 경로 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
