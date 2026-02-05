import { useEffect, useRef } from 'react'
import DOMPurify from 'dompurify'

interface HtmlBlockProps {
  html: string
}

export function HtmlBlock({ html }: HtmlBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Convert onmouseover/onmouseout to CSS hover effects
    const elements = containerRef.current.querySelectorAll('[style]')
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement
      // Add transition for smooth hover effects
      if (htmlEl.style.cssText.includes('transition') === false) {
        htmlEl.style.transition = 'all 0.2s ease'
      }
    })
  }, [html])

  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'img', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u',
      'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'figure', 'figcaption', 'blockquote', 'code', 'pre',
      'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
    ],
    ALLOWED_ATTR: [
      'style', 'class', 'id', 'href', 'src', 'alt', 'title', 'target',
      'width', 'height', 'colspan', 'rowspan', 'viewBox', 'fill', 'stroke',
      'd', 'cx', 'cy', 'r', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'points',
    ],
    ADD_ATTR: ['target'],
  })

  return (
    <div
      ref={containerRef}
      className="my-6 showcase-html"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
