import { ShowcaseLanding } from '../ShowcaseLanding'
import { showcaseDataMap } from '@/data/showcases'

export default function StockAnalysisPage() {
  return <ShowcaseLanding data={showcaseDataMap['stock-analysis']} />
}
