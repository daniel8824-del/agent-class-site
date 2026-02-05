import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Sparkles, Rocket } from 'lucide-react'
import { chapters, showcases } from '@/content'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export function HomePage() {
  useEffect(() => {
    document.title = '에이전트 클래스 | AI Agent Development Course'
  }, [])

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-border p-8 md:p-12">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              <Rocket className="w-3 h-3 mr-1" />
              AI Agent Development
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              AI 에이전트 개발
              <br />
              <span className="text-primary">완전 정복</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              RAG부터 n8n 자동화, MCP 서버, GIS 공공데이터까지.
              <br />
              8개 챕터로 AI 에이전트의 모든 것을 배워보세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/chapters/chapter-1">
                <Button size="lg" className="gap-2">
                  학습 시작하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/chapters">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  전체 챕터 보기
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </motion.section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: '챕터', value: '8개', icon: '📚' },
          { label: '에이전트', value: '6개', icon: '🤖' },
          { label: '기술 스택', value: '15+', icon: '⚡' },
          { label: '실습 코드', value: '100+', icon: '💻' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <span className="text-2xl mb-1 block">{stat.icon}</span>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Chapter Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              학습 챕터
            </h2>
            <p className="text-sm text-muted-foreground mt-1">단계별로 학습을 진행하세요</p>
          </div>
          <Link to="/chapters">
            <Button variant="ghost" size="sm" className="gap-1">
              전체 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chapters.map((ch, idx) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
            >
              <Link to={`/chapters/${ch.slug}`}>
                <Card className="group h-full hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{ch.icon}</span>
                      <span className="text-xs font-medium text-muted-foreground">Ch {ch.id}</span>
                    </div>
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {ch.title.replace(`Chapter ${ch.id} : `, '')}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {ch.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              에이전트 쇼케이스
            </h2>
            <p className="text-sm text-muted-foreground mt-1">실무 활용 AI 에이전트 프로젝트</p>
          </div>
          <Link to="/showcase">
            <Button variant="ghost" size="sm" className="gap-1">
              전체 보기 <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcases.slice(0, 3).map((sc, idx) => (
            <motion.div
              key={sc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
            >
              <Link to={`/showcase/${sc.slug}`}>
                <Card className="group overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className={`h-24 bg-gradient-to-br ${sc.gradient} flex items-center justify-center`}>
                    <span className="text-4xl group-hover:scale-110 transition-transform">{sc.icon}</span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{sc.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{sc.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          에이전트 클래스 &copy; 2024-2025. AI Agent Development Course.
        </p>
      </footer>
    </div>
  )
}
