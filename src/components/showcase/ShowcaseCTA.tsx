import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, BookOpen, Sparkles, ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PasswordDialog } from './PasswordDialog'
import { Link } from 'react-router-dom'
import { appleEase } from '@/lib/motion'
import type { ShowcaseTheme } from '@/types'

interface ShowcaseCTAProps {
  title: string
  chatUrl: string
  passwordHash: string
  theme: ShowcaseTheme
  chapterRef: number | null
}

export function ShowcaseCTA({
  title,
  chatUrl,
  passwordHash,
  theme,
  chapterRef,
}: ShowcaseCTAProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <section className="py-28 md:py-36 px-4 relative overflow-hidden">
        {/* Gradient background -- more intense */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ background: theme.gradient }}
        />

        {/* Background decoration -- layered glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[220px] opacity-[0.1]"
          style={{ background: theme.primary }}
        />

        {/* Secondary glow orb -- animated */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[180px]"
          style={{ background: theme.primaryLight }}
        />

        {/* Tertiary glow for bottom-left depth */}
        <motion.div
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[150px]"
          style={{ background: theme.primary }}
        />

        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="relative"
          >
            {/* Animated border gradient container */}
            <div className="relative p-px rounded-3xl overflow-hidden">
              {/* Rotating gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-50%] origin-center"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${theme.primary}, ${theme.primaryLight}, transparent, transparent, ${theme.primary}, transparent)`,
                  opacity: 0.5,
                }}
              />

              {/* Inner glass content */}
              <div
                className="relative rounded-3xl p-12 md:p-20"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Gradient bg fill */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-[0.06]"
                  style={{ background: theme.gradient }}
                />

                {/* Dot pattern overlay */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(${theme.primaryLight} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
                    style={{
                      background: `${theme.primary}15`,
                      boxShadow: `0 0 60px ${theme.primary}20, 0 0 0 1px ${theme.primary}20`,
                      borderRadius: '18px',
                    }}
                  >
                    <Sparkles className="w-8 h-8" style={{ color: theme.primaryLight }} />
                  </motion.div>

                  <h2
                    className="text-3xl md:text-5xl font-bold mb-5 tracking-tight"
                    style={{
                      fontFamily: "'Space Grotesk', var(--font-display)",
                      color: 'var(--text-primary)',
                    }}
                  >
                    직접 체험해보세요
                  </h2>
                  <p className="text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    AI 에이전트와 실시간으로 대화하고,
                    <br className="hidden sm:block" />
                    {title}의 가능성을 확인하세요
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Primary CTA - shimmer button with glow */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        size="lg"
                        onClick={() => setDialogOpen(true)}
                        className="shimmer-btn gap-2.5 text-white border-0 px-12 py-7 text-base font-semibold"
                        style={{
                          borderRadius: '16px',
                          boxShadow: `0 8px 40px ${theme.primary}40, 0 0 0 1px ${theme.primary}30`,
                        }}
                      >
                        <MessageSquare className="w-5 h-5" />
                        데모 시작하기
                      </Button>
                    </motion.div>

                    {/* Secondary button - back to showcase list or chapter */}
                    {chapterRef ? (
                      <Link to={`/chapters/chapter-${chapterRef}`}>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 w-full px-10 py-7 text-base"
                            style={{
                              borderRadius: '16px',
                              borderColor: 'var(--glass-border)',
                              background: 'var(--glass-bg)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <BookOpen className="w-5 h-5" />
                            관련 챕터 보기
                          </Button>
                        </motion.div>
                      </Link>
                    ) : (
                      <Link to="/showcase">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 w-full px-10 py-7 text-base"
                            style={{
                              borderRadius: '16px',
                              borderColor: 'var(--glass-border)',
                              background: 'var(--glass-bg)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <ArrowLeft className="w-5 h-5" />
                            쇼케이스 목록
                          </Button>
                        </motion.div>
                      </Link>
                    )}
                  </div>

                  {/* Guarantee microcopy */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.4, ease: appleEase }}
                    className="flex items-center justify-center gap-2 mt-8"
                  >
                    <Shield className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      비밀번호로 안전하게 보호됩니다 &middot; 무료 데모 체험
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PasswordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        passwordHash={passwordHash}
        chatUrl={chatUrl}
        showcaseTitle={title}
        themeColor={theme.primary}
      />
    </>
  )
}
