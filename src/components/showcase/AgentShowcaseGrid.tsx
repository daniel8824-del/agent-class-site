// Design Reference: Stitch Screen ID: 77e9ce580d00482bbb058430f6c1f42e
import { showcases } from '@/content'
import { showcaseDataMap } from '@/data/showcases'
import { AgentShowcaseCard } from './AgentShowcaseCard'
import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { appleEase, staggerContainer, staggerItem, fadeInUp } from '@/lib/motion'

const ALL_CATEGORY = '전체'

function getCategories(showcaseList: typeof showcases): string[] {
  const tags = new Set<string>()
  showcaseList.forEach((sc) => {
    const data = showcaseDataMap[sc.slug]
    if (data?.featurePills) {
      // Use first pill as category proxy
      tags.add(data.featurePills[0])
    }
  })
  return [ALL_CATEGORY, ...Array.from(tags)]
}

export function AgentShowcaseGrid() {
  useEffect(() => {
    document.title = '에이전트 쇼케이스 | 에이전트 클래스'
  }, [])

  const categories = useMemo(() => getCategories(showcases), [])
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)

  const filtered = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return showcases
    return showcases.filter((sc) => {
      const data = showcaseDataMap[sc.slug]
      return data?.featurePills?.includes(activeCategory)
    })
  }, [activeCategory])

  return (
    <div className="relative overflow-hidden px-6 md:px-12 py-16 md:py-24" style={{ maxWidth: 'var(--max-w-content)', margin: '0 auto' }}>
      {/* Background ambient glow orbs */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04]"
        style={{ background: 'linear-gradient(135deg, #a78bfa, #6a25f4)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.03]"
        style={{ background: 'linear-gradient(135deg, #6a25f4, #00f0ff)' }}
      />

      {/* Page Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: appleEase }}
        className="mb-16 text-center relative z-10"
      >
        {/* Decorative accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
          className="h-1 rounded-full mx-auto mb-8"
          style={{ background: 'linear-gradient(135deg, #a78bfa, #6a25f4, #00f0ff)' }}
        />

        <h1
          className="mb-5"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontFamily: "'Space Grotesk', var(--font-display)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #a78bfa, #6a25f4, #00f0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          에이전트 쇼케이스
        </h1>
        <p
          className="max-w-lg mx-auto"
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}
        >
          실무에서 활용 가능한 AI 에이전트 프로젝트를 확인해보세요.
          <br className="hidden md:block" />
          각 쇼케이스에서 실시간 데모를 체험할 수 있습니다.
        </p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: appleEase }}
          className="flex justify-center gap-8 md:gap-12 mt-8"
        >
          {[
            { value: `${showcases.length}`, label: '쇼케이스' },
            { value: `${categories.length - 1}`, label: '카테고리' },
            { value: '실시간', label: '데모 체험' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-xl md:text-2xl font-bold mb-0.5"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #6a25f4, #00f0ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Category Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: appleEase }}
        className="flex justify-center gap-2.5 flex-wrap mb-14 relative z-10"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--surface-2)' : 'transparent',
                backdropFilter: isActive ? 'blur(12px)' : 'none',
                border: `1px solid ${isActive ? 'var(--glass-border-hover)' : 'var(--glass-border)'}`,
                boxShadow: isActive ? '0 0 20px rgba(106,37,244,0.15)' : 'none',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'var(--surface-2)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border-hover)',
                    boxShadow: '0 0 20px rgba(106,37,244,0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Showcase Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 relative z-10"
        >
          {filtered.map((sc, idx) => (
            <motion.div
              key={sc.id}
              variants={staggerItem}
              custom={idx}
            >
              <AgentShowcaseCard showcase={sc} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
          style={{ color: 'var(--text-muted)' }}
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{
              background: 'var(--surface-2)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <span className="text-3xl">🔍</span>
          </div>
          <p style={{ fontSize: 'var(--text-body-lg)' }}>해당 카테고리에 쇼케이스가 없습니다.</p>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            다른 카테고리를 선택해보세요.
          </p>
        </motion.div>
      )}
    </div>
  )
}
