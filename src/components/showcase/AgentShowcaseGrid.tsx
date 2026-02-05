import { showcases } from '@/content'
import { AgentShowcaseCard } from './AgentShowcaseCard'
import { useEffect } from 'react'

export function AgentShowcaseGrid() {
  useEffect(() => {
    document.title = '에이전트 쇼케이스 | 에이전트 클래스'
  }, [])

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">에이전트 쇼케이스</h1>
        <p className="text-muted-foreground">
          실무에서 활용 가능한 AI 에이전트 프로젝트를 확인해보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcases.map((sc) => (
          <AgentShowcaseCard key={sc.id} showcase={sc} />
        ))}
      </div>
    </div>
  )
}
