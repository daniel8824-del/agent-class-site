// Design Reference: Stitch Screen ID: 77e9ce580d00482bbb058430f6c1f42e

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, staggerItem, fadeInUp, appleEase } from '@/lib/motion'

interface Project {
  emoji: string
  title: string
  description: string
  tags: string[]
  gradient: string
  slug: string
}

const featuredProjects: Project[] = [
  {
    emoji: '🤖',
    title: '스마트 비서 솔루션',
    description: 'Gmail, Calendar, SMS 통합 자동화 AI 비서',
    tags: ['Claude AI', 'n8n', 'Gmail'],
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    slug: 'smart-assistant',
  },
  {
    emoji: '🌍',
    title: 'GIS 분석 시스템',
    description: '공공데이터 API와 PostGIS 기반 지리 정보 분석',
    tags: ['PostGIS', '공공데이터', 'Python'],
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
    slug: 'gis-analysis',
  },
]

const smallProjects: Project[] = [
  {
    emoji: '📊',
    title: '주식 분석 리포트',
    description: '실시간 금융 분석 및 Telegram 발송',
    tags: ['MCP', 'Gemini'],
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    slug: 'stock-analysis',
  },
  {
    emoji: '📅',
    title: '캘린더 자동화',
    description: 'Google Calendar 연동 AI 일정 관리',
    tags: ['n8n', 'Google API'],
    gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    slug: 'calendar-automation',
  },
  {
    emoji: '📦',
    title: '재고 관리 시스템',
    description: '실시간 재고 추적 및 자동 발주',
    tags: ['n8n', 'Supabase'],
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    slug: 'inventory-management',
  },
  {
    emoji: '📄',
    title: '문서 분석기',
    description: 'PDF 자동 분석 및 요약 AI',
    tags: ['RAG', 'LangChain'],
    gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    slug: 'document-analyzer',
  },
]

function LargeFeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div variants={staggerItem} className="md:col-span-3">
      <Link to={`/showcase/${project.slug}`} className="block h-full">
        <div
          className="glass-card group relative overflow-hidden h-full flex flex-col"
          style={{ padding: '36px', minHeight: '300px' }}
        >
          {/* Gradient accent stripe at top */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: project.gradient }}
          />

          {/* Large emoji icon */}
          <span className="text-4xl mb-4 block">{project.emoji}</span>

          {/* Title */}
          <h3
            className="mb-3"
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="mb-6 leading-relaxed"
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {project.description}
          </p>

          {/* Tech tags row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-muted)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <div className="mt-auto flex items-center gap-2" style={{ color: 'var(--accent-primary)' }}>
            <span className="font-medium">데모 체험하기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SmallCard({ project }: { project: Project }) {
  return (
    <motion.div variants={staggerItem}>
      <Link to={`/showcase/${project.slug}`} className="block h-full">
        <div
          className="glass-card group relative overflow-hidden flex flex-col"
          style={{ padding: '24px', minHeight: '145px' }}
        >
          {/* Gradient accent stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: project.gradient }}
          />

          {/* Emoji + title */}
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{project.emoji}</span>
            <h3
              className="flex-1"
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* 1-line description */}
          <p
            className="text-sm mb-3 line-clamp-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedShowcases() {
  return (
    <section className="py-20 md:py-32" style={{ background: 'var(--surface-0)' }}>
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
            실제 작동하는 AI 에이전트를 체험하세요
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-muted)' }}>
            6개 쇼케이스는 수강생들이 직접 만든 실전 프로젝트입니다
          </p>
        </motion.div>

        {/* Asymmetric Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-5"
        >
          {/* Row 1: Large card (60%) + 2 stacked small cards (40%) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <LargeFeaturedCard project={featuredProjects[0]} />
            <div className="md:col-span-2 grid grid-cols-1 gap-5">
              <SmallCard project={smallProjects[0]} />
              <SmallCard project={smallProjects[1]} />
            </div>
          </div>

          {/* Row 2: 2 stacked small cards (40%) + Large card (60%) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="md:col-span-2 grid grid-cols-1 gap-5">
              <SmallCard project={smallProjects[2]} />
              <SmallCard project={smallProjects[3]} />
            </div>
            <LargeFeaturedCard project={featuredProjects[1]} />
          </div>
        </motion.div>

        {/* Bottom link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: appleEase, delay: 0.3 }}
        >
          <Link
            to="/showcase"
            className="inline-flex items-center gap-2 text-base font-medium"
            style={{ color: 'var(--accent-primary)' }}
          >
            <span>모든 프로젝트 보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
