import { ShowcaseLanding } from '../ShowcaseLanding'
import { showcaseDataMap } from '@/data/showcases'

export default function GoogleCalendarPage() {
  return <ShowcaseLanding data={showcaseDataMap['google-calendar']} />
}
