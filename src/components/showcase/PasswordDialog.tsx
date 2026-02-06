import { useState, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  passwordHash: string
  chatUrl: string
  showcaseTitle: string
  themeColor: string
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function PasswordDialog({
  open,
  onOpenChange,
  passwordHash,
  chatUrl,
  showcaseTitle,
  themeColor,
}: PasswordDialogProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError(false)

      const hashed = await hashPassword(password)
      if (hashed === passwordHash) {
        window.open(chatUrl, '_blank')
        onOpenChange(false)
        setPassword('')
      } else {
        setError(true)
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
      setLoading(false)
    },
    [password, passwordHash, chatUrl, onOpenChange]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-white/10 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: themeColor }}
            >
              <Lock className="w-4 h-4 text-white" />
            </div>
            {showcaseTitle}
          </DialogTitle>
          <DialogDescription>
            채팅을 시작하려면 비밀번호를 입력하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`relative ${shake ? 'animate-shake' : ''}`}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="비밀번호 입력"
              autoFocus
              className="w-full px-4 py-3 pr-10 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: error ? '#EF4444' : undefined,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-400">비밀번호가 올바르지 않습니다.</p>
          )}

          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full text-white border-0"
            style={{ background: themeColor }}
          >
            {loading ? '확인 중...' : '채팅 시작하기'}
          </Button>
        </form>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
          }
          .animate-shake { animation: shake 0.3s ease-in-out; }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}
