import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { chapters } from '@/content'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export function ChaptersOverview() {
  useEffect(() => {
    document.title = '챕터 목록 | 에이전트 클래스'
  }, [])

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">전체 챕터</h1>
        <p className="text-muted-foreground">
          8개 챕터를 통해 AI 에이전트 개발의 A부터 Z까지 배워보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((ch, idx) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
          >
            <Link to={`/chapters/${ch.slug}`}>
              <Card className="group h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl shrink-0"
                      style={{ backgroundColor: `${ch.color}15` }}
                    >
                      {ch.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {ch.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {ch.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {ch.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
