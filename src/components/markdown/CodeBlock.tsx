import { useState, useEffect, useRef } from 'react'
import { Check, Copy } from 'lucide-react'

// Singleton highlighter with only the languages we actually use
let highlighterPromise: Promise<any> | null = null
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['github-dark'],
        langs: [
          'python', 'javascript', 'typescript', 'json', 'bash', 'shell',
          'powershell', 'css', 'sql', 'markdown', 'html', 'yaml', 'xml',
          'docker', 'text',
        ],
      })
    )
  }
  return highlighterPromise
}

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState<string>('')
  const codeRef = useRef<HTMLPreElement>(null)

  const lang = language || className?.replace('language-', '') || 'text'

  useEffect(() => {
    let cancelled = false
    async function highlight() {
      try {
        const highlighter = await getHighlighter()
        const loadedLangs = highlighter.getLoadedLanguages()
        const targetLang = lang === 'powershell' ? 'powershell' : lang
        // Only highlight if the language is loaded
        if (loadedLangs.includes(targetLang as any)) {
          const html = highlighter.codeToHtml(code, {
            lang: targetLang,
            theme: 'github-dark',
          })
          if (!cancelled) setHighlighted(html)
        } else {
          // Try with 'text' fallback
          const html = highlighter.codeToHtml(code, {
            lang: 'text',
            theme: 'github-dark',
          })
          if (!cancelled) setHighlighted(html)
        }
      } catch {
        if (!cancelled) setHighlighted('')
      }
    }
    highlight()
    return () => { cancelled = true }
  }, [code, lang])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-4 rounded-lg overflow-hidden border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border">
        <span className="text-xs text-muted-foreground font-mono uppercase">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground rounded transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {highlighted ? (
        <div
          ref={codeRef as any}
          className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="text-gray-300">{code}</code>
        </pre>
      )}
    </div>
  )
}
