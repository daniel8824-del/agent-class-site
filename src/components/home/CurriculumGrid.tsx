// Design Reference: Stitch Screen ID: 2c734baf4ad14293abd779bfbfe1c85d

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { staggerContainer, staggerItem, fadeInUp, appleEase } from '@/lib/motion'

type Difficulty = '초급' | '중급' | '고급'

interface ChapterCard {
  id: number
  icon: string
  title: string
  description: string
  difficulty: Difficulty
  time: string
  tools: string[]
  slug: string
}

const difficultyColors: Record<Difficulty, string> = {
  초급: '#10b981',
  중급: '#f59e0b',
  고급: '#ef4444',
}

const chapters: ChapterCard[] = [
  {
    id: 1,
    icon: '🎯',
    title: '오리엔테이션',
    description: 'Python 환경 설정부터 LangChain 기초까지, AI 에이전트 개발의 첫 걸음',
    difficulty: '초급',
    time: '2시간',
    tools: ['Python', 'LangChain'],
    slug: 'chapter-1',
  },
  {
    id: 2,
    icon: '💬',
    title: '텍스트 LLM',
    description: 'ChatGPT와 Gemini를 활용한 텍스트 생성 및 대화형 AI 구축',
    difficulty: '초급',
    time: '3시간',
    tools: ['ChatGPT', 'Gemini', 'Prompt'],
    slug: 'chapter-2',
  },
  {
    id: 3,
    icon: '🎨',
    title: '이미지 LLM',
    description: 'GPT-4V와 Gemini Vision으로 이미지 인식 및 생성',
    difficulty: '초급',
    time: '3시간',
    tools: ['GPT-4V', 'Gemini Vision'],
    slug: 'chapter-3',
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'n8n 기초',
    description: 'Docker로 n8n 설치하고 워크플로우 자동화 구축',
    difficulty: '중급',
    time: '4시간',
    tools: ['n8n', 'Docker'],
    slug: 'chapter-4',
  },
  {
    id: 5,
    icon: '🔍',
    title: 'n8n RAG',
    description: 'Supabase와 pgvector를 활용한 벡터 검색 및 RAG 시스템',
    difficulty: '중급',
    time: '5시간',
    tools: ['Supabase', 'pgvector', 'RAG'],
    slug: 'chapter-5',
  },
  {
    id: 6,
    icon: '📊',
    title: 'CRM & MCP',
    description: 'MCP 프로토콜로 CRM 시스템과 AI 에이전트 연동',
    difficulty: '중급',
    time: '5시간',
    tools: ['MCP', 'CRM', 'Claude'],
    slug: 'chapter-6',
  },
  {
    id: 7,
    icon: '📈',
    title: '주식 MCP',
    description: 'Alpha Vantage API와 Telegram으로 주식 분석 에이전트',
    difficulty: '고급',
    time: '6시간',
    tools: ['Alpha Vantage', 'Telegram', 'MCP'],
    slug: 'chapter-7',
  },
  {
    id: 8,
    icon: '🌍',
    title: 'GIS 에이전트',
    description: 'PostGIS와 QGIS를 활용한 공간 데이터 분석 시스템',
    difficulty: '고급',
    time: '5시간',
    tools: ['PostGIS', 'QGIS', 'Supabase'],
    slug: 'chapter-8',
  },
]

export function CurriculumGrid() {
  return (
    <section
      className="py-20 md:py-32"
      style={{ background: 'var(--surface-1)' }}
    >
      <div className="max-w-[var(--max-w-wide)] mx-auto px-6">
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
            기초부터 실전까지, 단계별 학습 여정
          </h2>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-muted)' }}>
            Python 환경 설정부터 MCP 서버 구축까지, 33시간 분량의 커리큘럼
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {chapters.map((chapter) => {
            const isLarge = chapter.id === 1 || chapter.id === 8
            const difficultyColor = difficultyColors[chapter.difficulty]

            return (
              <motion.div
                key={chapter.id}
                variants={staggerItem}
                className={isLarge ? 'md:col-span-2' : 'col-span-1'}
              >
                <Link
                  to={`/chapters/${chapter.slug}`}
                  className="block h-full group"
                >
                  <motion.div
                    className="relative h-full overflow-hidden rounded-2xl p-4 sm:p-6 md:p-7 flex flex-col glass-card"
                    whileHover={{
                      y: -4,
                      transition: { type: 'spring', stiffness: 400, damping: 30 },
                    }}
                  >
                    {/* Hover gradient border glow */}
                    <div
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

                    {/* Top row: icon + chapter badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{chapter.icon}</span>
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(106,37,244,0.1)',
                          color: 'var(--accent-primary)',
                          border: '1px solid rgba(106,37,244,0.2)',
                        }}
                      >
                        Ch.{chapter.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="mb-2 line-clamp-1"
                      style={{
                        fontSize: '1.125rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {chapter.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {chapter.description}
                    </p>

                    {/* Meta: difficulty + time + tools */}
                    <div className="mt-auto flex flex-col gap-3">
                      {/* Difficulty + Time */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{
                            color: difficultyColor,
                            background: `${difficultyColor}15`,
                            border: `1px solid ${difficultyColor}30`,
                          }}
                        >
                          {chapter.difficulty}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {chapter.time}
                          </span>
                        </div>
                      </div>

                      {/* Tool tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {chapter.tools.slice(0, isLarge ? 4 : 3).map((tool) => (
                          <span
                            key={tool}
                            className="text-xs px-2 py-0.5 rounded-md"
                            style={{
                              background: 'var(--surface-2)',
                              color: 'var(--text-muted)',
                              border: '1px solid var(--glass-border)',
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
