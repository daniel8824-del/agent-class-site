import { useState, useEffect, useRef } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { microSpring } from '@/lib/motion'

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

// Strip whitespace between <code> and first <span>, and last </span> and </code>
function cleanShikiHtml(html: string): string {
  return html
    .replace(/<code>\s+/g, '<code>')
    .replace(/\s+<\/code>/g, '</code>')
}

// Add line numbers to highlighted code
function addLineNumbers(html: string): string {
  // Find the <code> content and wrap each line with a line number
  return html.replace(/<code>([\s\S]*?)<\/code>/, (_match, codeContent: string) => {
    const lines = codeContent.split('\n')
    // Remove trailing empty line if present
    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop()
    }
    const numberedLines = lines.map((line: string, i: number) => {
      const lineNum = i + 1
      return `<span class="code-line"><span class="line-number">${lineNum}</span><span class="line-content">${line}</span></span>`
    }).join('')
    return `<code>${numberedLines}</code>`
  })
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

  // Language display name mapping
  const langDisplayNames: Record<string, string> = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    py: 'Python',
    python: 'Python',
    bash: 'Bash',
    shell: 'Shell',
    powershell: 'PowerShell',
    json: 'JSON',
    css: 'CSS',
    html: 'HTML',
    sql: 'SQL',
    yaml: 'YAML',
    xml: 'XML',
    markdown: 'Markdown',
    docker: 'Docker',
    text: 'Text',
  }
  const displayLang = langDisplayNames[lang] || lang.toUpperCase()

  useEffect(() => {
    let cancelled = false
    async function highlight() {
      try {
        const highlighter = await getHighlighter()
        const loadedLangs = highlighter.getLoadedLanguages()
        const targetLang = lang === 'powershell' ? 'powershell' : lang
        if (loadedLangs.includes(targetLang as any)) {
          const html = highlighter.codeToHtml(code, {
            lang: targetLang,
            theme: 'github-dark',
          })
          if (!cancelled) setHighlighted(addLineNumbers(cleanShikiHtml(html)))
        } else {
          const html = highlighter.codeToHtml(code, {
            lang: 'text',
            theme: 'github-dark',
          })
          if (!cancelled) setHighlighted(addLineNumbers(cleanShikiHtml(html)))
        }
      } catch {
        if (!cancelled) setHighlighted('')
      }
    }
    highlight()
    return () => { cancelled = true }
  }, [code, lang])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="not-prose group relative my-6 overflow-hidden"
      style={{
        borderRadius: 'var(--radius-xl)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Glass header bar with language badge and controls */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: 'var(--surface-1)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        {/* Left side: traffic lights + terminal icon */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.65 0.22 25 / 60%)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.75 0.18 85 / 60%)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.72 0.19 145 / 60%)' }} />
          </div>
          <Terminal className="w-3 h-3" style={{ color: 'var(--text-subtle)', opacity: 0.6 }} />
        </div>

        {/* Right side: language badge + copy button */}
        <div className="flex items-center gap-2">
          {/* Language badge */}
          <span
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--text-primary)',
              opacity: 0.85,
            }}
          >
            {displayLang}
          </span>

          {/* Copy button with animation */}
          <motion.button
            onClick={handleCopy}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', ...microSpring }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-all duration-200"
            style={{
              color: 'var(--text-muted)',
              background: 'transparent',
            }}
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', ...microSpring }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" style={{ color: 'var(--accent-tertiary)' }} />
                  <span style={{ color: 'var(--accent-tertiary)' }}>Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', ...microSpring }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Code content with line numbers */}
      {highlighted ? (
        <div
          ref={codeRef as any}
          className="px-0 py-3 text-[13px] overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!border-0 [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!rounded-none [&_code]:!text-inherit [&_.code-line]:flex [&_.code-line]:leading-[1.45] [&_.code-line]:px-4 [&_.line-number]:select-none [&_.line-number]:w-8 [&_.line-number]:shrink-0 [&_.line-number]:text-right [&_.line-number]:pr-3 [&_.line-number]:text-[11px] [&_.line-number]:opacity-30 [&_.line-content]:flex-1 [&_.line-content]:whitespace-pre-wrap [&_.line-content]:break-words"
          style={{
            background: '#0d1117',
            '--line-number-color': 'var(--text-subtle)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <pre className="!p-4 text-sm whitespace-pre-wrap break-words !m-0 !border-0" style={{ background: '#0d1117' }}>
          <code className="text-gray-300 !p-0 !rounded-none !bg-transparent">{code}</code>
        </pre>
      )}
    </div>
  )
}
