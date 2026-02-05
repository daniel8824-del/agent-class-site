import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  code: string
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          securityLevel: 'loose',
        })
        const id = `mermaid-${Math.random().toString(36).slice(2)}`
        const { svg: rendered } = await mermaid.render(id, code)
        if (!cancelled) setSvg(rendered)
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Failed to render diagram')
      }
    }
    render()
    return () => { cancelled = true }
  }, [code])

  if (error) {
    return (
      <div className="my-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-sm">
        <p className="font-semibold text-destructive">Mermaid Error</p>
        <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto">{error}</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
