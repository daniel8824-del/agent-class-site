// Design Reference: Stitch Screen ID: cd9a4b3c1efb425a80a70719371bfae2
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { appleEase } from '@/lib/motion'

export function HeroSection() {
  // Split headline into words for staggered animation
  const headline = "AI 에이전트로 시작하는 커리어 전환"
  const headlineWords = headline.split(' ')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Purple orb - top-right */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-[10%] -right-[5%] w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(106,37,244,0.3), transparent 70%)',
            filter: 'blur(80px)'
          }}
        />

        {/* Cyan orb - bottom-left */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute -bottom-[8%] -left-[5%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.2), transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline - Word-by-word reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
          className="flex flex-wrap justify-center gap-x-[0.35em] mb-6"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: '800px',
            margin: '0 auto 1.5rem'
          }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: appleEase
                  }
                }
              }}
              className="gradient-text"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Stats line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: appleEase }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(14px, 3.5vw, 20px)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}
        >
          8개 챕터 · 6개 프로젝트 · 33시간
        </motion.p>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: appleEase }}
          viewport={{ once: true }}
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: '0 auto 3rem'
          }}
        >
          스스로 생각하고, 도구를 사용하며, 문제를 해결하는 에이전트를 만드세요. LangChain, n8n, MCP 프로토콜까지, 가장 주목받는 AI 기술 스택을 직접 다룹니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: appleEase }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-6"
        >
          <Link to="/chapters/chapter-1">
            <button className="btn-primary shimmer-btn inline-flex items-center gap-2">
              지금 무료로 시작하기
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/showcase">
            <button className="btn-secondary inline-flex items-center gap-2">
              쇼케이스 체험하기
            </button>
          </Link>
        </motion.div>

        {/* Guarantee line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: appleEase }}
          viewport={{ once: true }}
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--text-muted)'
          }}
        >
          ✓ Chapter 1 무료 체험  ✓ 무기한 접근  ✓ 커뮤니티 Q&A 지원
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: [0, 8, 0]
        }}
        transition={{
          opacity: { delay: 1.1, duration: 0.4 },
          y: { delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <ChevronDown
          className="w-6 h-6"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        />
      </motion.div>

    </section>
  )
}
