import { useState, useEffect, useCallback } from 'react'
import { ShowcaseHero } from './ShowcaseHero'
import { ShowcaseFeatures } from './ShowcaseFeatures'
import { ShowcaseHowItWorks } from './ShowcaseHowItWorks'
import { ShowcaseStats } from './ShowcaseStats'
import { ShowcaseCTA } from './ShowcaseCTA'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, BookOpen, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { ShowcaseData } from '@/types'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

interface ShowcaseLandingProps {
  data: ShowcaseData
}

export function ShowcaseLanding({ data }: ShowcaseLandingProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    document.title = `${data.title} | 에이전트 클래스`
    window.scrollTo(0, 0)
  }, [data.title])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError(false)
      const hashed = await hashPassword(password)
      if (hashed === data.chatPasswordHash) {
        window.open(data.chatUrl, '_blank')
        setDialogOpen(false)
        setPassword('')
      } else {
        setError(true)
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
      setLoading(false)
    },
    [password, data.chatPasswordHash, data.chatUrl]
  )

  const { theme } = data

  return (
    <div data-showcase={data.slug} className="min-w-0">
      {/* Top bar: back button only */}
      <div className="px-4 md:px-8 pt-3">
        <Link to="/showcase">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            쇼케이스 목록
          </Button>
        </Link>
      </div>

      {/* Hero with CTA buttons inside */}
      <ShowcaseHero
        icon={data.icon}
        tagline={data.tagline}
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        theme={data.theme}
        featurePills={data.featurePills}
        heroImage={data.heroImage}
        stats={data.stats}
      >
        <Button
          onClick={() => setDialogOpen(true)}
          className="gap-2 text-white border-0 shadow-lg px-6 py-2.5"
          style={{ background: theme.gradient }}
        >
          <MessageSquare className="w-4 h-4" />
          채팅 시작하기
        </Button>
        {data.chapterRef && (
          <Link to={`/chapters/chapter-${data.chapterRef}`}>
            <Button variant="outline" className="gap-2 border-white/20 backdrop-blur-sm px-6 py-2.5">
              <BookOpen className="w-4 h-4" />
              Chapter {data.chapterRef}
            </Button>
          </Link>
        )}
      </ShowcaseHero>

      {/* Features Section */}
      <ShowcaseFeatures features={data.features} theme={data.theme} />

      {/* How It Works Section */}
      <ShowcaseHowItWorks steps={data.steps} theme={data.theme} />

      {/* Stats Section */}
      <ShowcaseStats stats={data.stats} theme={data.theme} />

      {/* Bottom CTA Section (includes its own PasswordDialog) */}
      <ShowcaseCTA
        title={data.title}
        chatUrl={data.chatUrl}
        passwordHash={data.chatPasswordHash}
        theme={data.theme}
        chapterRef={data.chapterRef}
      />

      {/* Hero button Password Dialog (separate from CTA's dialog) */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md border-white/10 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: theme.primary }}
              >
                <Lock className="w-4 h-4 text-white" />
              </div>
              {data.title}
            </DialogTitle>
            <DialogDescription>
              채팅을 시작하려면 비밀번호를 입력하세요.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={shake ? 'animate-shake' : ''}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  placeholder="비밀번호 입력"
                  autoFocus
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-background border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: error ? '#EF4444' : 'var(--border)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400">비밀번호가 올바르지 않습니다.</p>
            )}

            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full text-white border-0"
              style={{ background: theme.primary }}
            >
              {loading ? '확인 중...' : '채팅 시작하기'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  )
}
