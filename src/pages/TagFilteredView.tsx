import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Tag } from 'lucide-react'
import { chapters, showcases } from '@/content'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { appleEase } from '@/lib/motion'

export function TagFilteredView() {
  const { tag } = useParams<{ tag: string }>()
  const decodedTag = decodeURIComponent(tag || '')

  useEffect(() => {
    document.title = `#${decodedTag} | 에이전트 클래스`
  }, [decodedTag])

  const matchedChapters = chapters.filter((c) =>
    c.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  )

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 max-w-6xl">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: appleEase }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold gradient-text">#{decodedTag}</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {matchedChapters.length}개 챕터에서 발견
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedChapters.map((ch, i) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: appleEase, delay: i * 0.06 }}
          >
            <Link to={`/chapters/${ch.slug}`}>
              <Card className="group h-full hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{ch.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {ch.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{ch.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {ch.tags.map((t) => (
                          <Badge
                            key={t}
                            variant={t.toLowerCase() === decodedTag.toLowerCase() ? 'default' : 'secondary'}
                            className={t.toLowerCase() === decodedTag.toLowerCase()
                              ? 'text-xs backdrop-blur-sm bg-[var(--accent-primary)] text-white'
                              : 'text-xs'}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {matchedChapters.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">해당 태그와 일치하는 챕터가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
