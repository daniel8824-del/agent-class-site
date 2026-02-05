import { useEffect, useState, useMemo, useCallback, type ReactNode } from 'react'
import { parseMarkdownCached, type ParsedMarkdown } from '@/lib/markdown/pipeline'
import { CodeBlock } from './CodeBlock'
import { CalloutBlock } from './CalloutBlock'
import { ObsidianImage } from './ObsidianImage'
import { YouTubeEmbed } from './YouTubeEmbed'
import { MermaidDiagram } from './MermaidDiagram'
import { HtmlBlock } from './HtmlBlock'

interface MarkdownRendererProps {
  content: string
  slug: string
  onHeadings?: (headings: { id: string; text: string; level: number }[]) => void
}

export function MarkdownRenderer({ content, slug, onHeadings }: MarkdownRendererProps) {
  const [parsed, setParsed] = useState<ParsedMarkdown | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    parseMarkdownCached(slug, content)
      .then((result) => {
        if (!cancelled) {
          setParsed(result)
          onHeadings?.(result.headings)
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message)
      })
    return () => { cancelled = true }
  }, [content, slug, onHeadings])

  const processedHtml = useMemo(() => {
    if (!parsed) return ''
    return postProcessHtml(parsed.html)
  }, [parsed])

  if (error) {
    return <div className="p-4 text-destructive">Error parsing markdown: {error}</div>
  }

  if (!parsed) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>
    )
  }

  return (
    <div className="markdown-content">
      <RenderedContent html={processedHtml} />
    </div>
  )
}

// Post-process HTML to handle special elements
function postProcessHtml(html: string): string {
  // Convert <font color="xxx"> to <span style="color:xxx"> for proper rendering
  let processed = html.replace(
    /<font\s+color=["']([^"']+)["']\s*>/gi,
    '<span style="color:$1">'
  )
  processed = processed.replace(/<\/font>/gi, '</span>')

  // Convert [[Note Name]] or [[Note|Display]] links that survived HTML processing
  processed = processed.replace(
    /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
    (_match, target, display) => {
      const text = display || target
      // Try to resolve to a chapter link
      const slug = resolveInternalLink(target)
      return `<a href="${slug}" class="text-primary hover:underline">${text}</a>`
    }
  )

  return processed
}

function resolveInternalLink(target: string): string {
  const lower = target.toLowerCase()
  // Match "에이전트 클래스 Chapter N" or "Chapter N"
  const chapterMatch = lower.match(/chapter\s*(\d+)/)
  if (chapterMatch) {
    return `/chapters/chapter-${chapterMatch[1]}`
  }
  return `#${encodeURIComponent(target)}`
}

// Render processed HTML with React component replacements
function RenderedContent({ html }: { html: string }) {
  const segments = useMemo(() => splitIntoSegments(html), [html])

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
      prose-headings:scroll-mt-20
      prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
      prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2
      prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-code:before:hidden prose-code:after:hidden
      prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:bg-muted prose-code:text-sm
      prose-img:rounded-lg prose-img:shadow-md
      prose-table:overflow-x-auto
      prose-li:marker:text-muted-foreground
    ">
      {segments.map((seg, i) => (
        <SegmentRenderer key={i} segment={seg} />
      ))}
    </div>
  )
}

type Segment =
  | { type: 'html'; content: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'callout'; calloutType: string; title: string; content: string }
  | { type: 'mermaid'; code: string }
  | { type: 'youtube'; src: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'showcase-html'; content: string }

function splitIntoSegments(html: string): Segment[] {
  const segments: Segment[] = []
  let remaining = html

  while (remaining.length > 0) {
    // Find code blocks: <pre><code class="language-xxx">...</code></pre>
    const codeMatch = remaining.match(
      /<pre><code\s+class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/
    )

    // Find callout blocks
    const calloutMatch = remaining.match(
      /<blockquote\s+[^>]*data-callout="(\w+)"[^>]*data-callout-title="([^"]*)"[^>]*>([\s\S]*?)<\/blockquote>/
    )

    // Find YouTube iframes
    const youtubeMatch = remaining.match(
      /<iframe[^>]*src="(https?:\/\/(?:www\.)?youtube\.com\/embed\/[^"]*)"[^>]*><\/iframe>/
    )

    // Find images (both obsidian and regular)
    const imgMatch = remaining.match(
      /<img\s+[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/
    )

    // Find showcase HTML blocks (divs with complex inline styles)
    const showcaseMatch = remaining.match(
      /<div\s+style="[^"]*(?:linear-gradient|background)[^"]*"[^>]*>[\s\S]*?<\/div>\s*(?:<\/div>)*/
    )

    // Determine which match comes first
    const matches = [
      codeMatch ? { type: 'code' as const, index: remaining.indexOf(codeMatch[0]), match: codeMatch } : null,
      calloutMatch ? { type: 'callout' as const, index: remaining.indexOf(calloutMatch[0]), match: calloutMatch } : null,
      youtubeMatch ? { type: 'youtube' as const, index: remaining.indexOf(youtubeMatch[0]), match: youtubeMatch } : null,
      imgMatch ? { type: 'image' as const, index: remaining.indexOf(imgMatch[0]), match: imgMatch } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index)

    const firstMatch = matches[0]

    if (!firstMatch || firstMatch.index === -1) {
      // No more special elements
      if (remaining.trim()) {
        segments.push({ type: 'html', content: remaining })
      }
      break
    }

    // Add HTML before the match
    if (firstMatch.index > 0) {
      const before = remaining.slice(0, firstMatch.index)
      if (before.trim()) {
        segments.push({ type: 'html', content: before })
      }
    }

    const m = firstMatch.match
    switch (firstMatch.type) {
      case 'code': {
        const lang = m[1]
        const code = decodeHtmlEntities(m[2])
        if (lang === 'mermaid') {
          segments.push({ type: 'mermaid', code })
        } else {
          segments.push({ type: 'code', language: lang, code })
        }
        remaining = remaining.slice(firstMatch.index + m[0].length)
        break
      }
      case 'callout': {
        segments.push({
          type: 'callout',
          calloutType: m[1],
          title: m[2],
          content: m[3],
        })
        remaining = remaining.slice(firstMatch.index + m[0].length)
        break
      }
      case 'youtube': {
        segments.push({ type: 'youtube', src: m[1] })
        remaining = remaining.slice(firstMatch.index + m[0].length)
        break
      }
      case 'image': {
        segments.push({ type: 'image', src: m[1], alt: m[2] })
        remaining = remaining.slice(firstMatch.index + m[0].length)
        break
      }
    }
  }

  return segments
}

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

function SegmentRenderer({ segment }: { segment: Segment }) {
  switch (segment.type) {
    case 'code':
      return <CodeBlock code={segment.code} language={segment.language} />
    case 'callout':
      return (
        <CalloutBlock type={segment.calloutType} title={segment.title}>
          <div dangerouslySetInnerHTML={{ __html: segment.content }} />
        </CalloutBlock>
      )
    case 'mermaid':
      return <MermaidDiagram code={segment.code} />
    case 'youtube':
      return <YouTubeEmbed src={segment.src} />
    case 'image':
      return <ObsidianImage src={segment.src} alt={segment.alt} />
    case 'showcase-html':
      return <HtmlBlock html={segment.content} />
    case 'html':
      return <div dangerouslySetInnerHTML={{ __html: segment.content }} />
    default:
      return null
  }
}
