// Design Reference: Stitch Screen ID: 89d5ea73238e4a64aec49dd9e2a0b7f3

import { motion } from 'framer-motion'
import { appleEase, staggerContainer, staggerItem, fadeInUp } from '@/lib/motion'

export function WhySection() {
  // Problem cards data
  const problems = [
    {
      icon: '🤔',
      title: '진입 장벽',
      description:
        'ChatGPT API 호출과 자율 에이전트 설계는 완전히 다릅니다. RAG, 벡터DB, MCP — 이 기술들 없이는 진정한 AI 제품을 만들 수 없습니다.',
    },
    {
      icon: '💼',
      title: '실무 갭',
      description:
        '단순 API 호출만으로는 실무에서 통하지 않습니다. 복잡한 워크플로우 자동화와 외부 도구 연동이 필요합니다.',
    },
    {
      icon: '⏰',
      title: '시간 부족',
      description:
        '혼자서 공부하려면 6개월이 걸립니다. 체계적 커리큘럼 없이는 시간만 낭비합니다.',
    },
  ]

  // Solution cards data
  const solutions = [
    {
      icon: '📚',
      title: '체계적 커리큘럼',
      description:
        '기초부터 배포까지, 8개 챕터. Chapter 1 환경 설정 → Chapter 8 GIS 시스템',
    },
    {
      icon: '🛠️',
      title: '실전 프로젝트',
      description:
        '6개 실전 프로젝트. CRM 자동화, 주식 분석, Calendar 연동, GIS 시스템',
    },
    {
      icon: '⚡',
      title: '최신 기술 스택',
      description:
        'LangChain, n8n, Supabase, MCP 프로토콜 — 이력서가 바뀝니다',
    },
  ]

  return (
    <section
      className="relative py-20 md:py-32"
      style={{ background: 'var(--surface-1)' }}
    >
      <div className="relative max-w-[var(--max-w-content)] mx-auto px-6">
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
            왜 지금 AI 에이전트인가?
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-muted)' }}>
            대부분의 개발자는 아직 챗봇 수준에 머물러 있습니다
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={staggerItem}
              className="glass-card p-4 sm:p-6 md:p-8 text-center"
            >
              <span className="text-4xl mb-4 block">{problem.icon}</span>
              <h3
                className="mb-3"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                {problem.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered arrow divider */}
        <motion.div
          className="flex justify-center my-8"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          <span
            className="text-4xl gradient-text"
            style={{ fontWeight: 300 }}
          >
            ↓
          </span>
        </motion.div>

        {/* Solution cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.title}
              variants={staggerItem}
              className="glass-card p-4 sm:p-6 md:p-8 text-center"
              style={{
                background: 'rgba(106,37,244,0.04)',
                borderColor: 'rgba(106,37,244,0.12)',
              }}
            >
              <span className="text-4xl mb-4 block">{solution.icon}</span>
              <h3
                className="mb-3"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                {solution.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {solution.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
