import { useParams } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const pages: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  'smart-assistant': lazy(() => import('./pages/SmartAssistantPage')),
  'stock-analysis': lazy(() => import('./pages/StockAnalysisPage')),
  'business-solution': lazy(() => import('./pages/BusinessSolutionPage')),
  'google-calendar': lazy(() => import('./pages/GoogleCalendarPage')),
  'inventory-management': lazy(() => import('./pages/InventoryManagementPage')),
  'disaster-status': lazy(() => import('./pages/DisasterStatusPage')),
}

export function AgentShowcasePage() {
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const PageComponent = id ? pages[id] : undefined

  if (!PageComponent) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">쇼케이스를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 space-y-6 max-w-5xl mx-auto">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      }
    >
      <PageComponent />
    </Suspense>
  )
}
