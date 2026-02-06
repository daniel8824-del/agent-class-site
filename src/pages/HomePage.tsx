import { HeroSection } from '@/components/home/HeroSection'
import { WhySection } from '@/components/home/WhySection'
import { ValueProps } from '@/components/home/ValueProps'
import { CurriculumGrid } from '@/components/home/CurriculumGrid'
import { FeaturedShowcases } from '@/components/home/FeaturedShowcases'
import { TargetAudience } from '@/components/home/TargetAudience'
import { LearningOutcomes } from '@/components/home/LearningOutcomes'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { useEffect } from 'react'

export function HomePage() {
  useEffect(() => {
    document.title = '에이전트 클래스 | AI Agent Development Course'
  }, [])

  return (
    <div style={{ background: 'var(--surface-0)' }}>
      <HeroSection />
      <WhySection />
      <ValueProps />
      <CurriculumGrid />
      <FeaturedShowcases />
      <TargetAudience />
      <LearningOutcomes />
      <FAQSection />
      <FinalCTA />
    </div>
  )
}
