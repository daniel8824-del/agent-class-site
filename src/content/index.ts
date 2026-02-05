import type { ChapterMeta, ShowcaseMeta } from '@/types'

export const chapters: ChapterMeta[] = [
  {
    id: 1,
    slug: 'chapter-1',
    title: 'Chapter 1 : 오리엔테이션',
    tags: ['에이전트', 'Agent', 'RAG', 'LangChain', 'LangGraph'],
    description: 'Python 개발 환경 설정, RAG 개념, LangChain/LangGraph 기초',
    icon: '🎯',
    color: '#ffc000',
  },
  {
    id: 2,
    slug: 'chapter-2',
    title: 'Chapter 2 : 텍스트 기반 LLM 활용법',
    tags: ['에이전트', 'ChatGPT', 'Gemini', 'Perplexity'],
    description: '프롬프트 전략, ChatGPT/Gemini/Perplexity 활용',
    icon: '💬',
    color: '#00b0f0',
  },
  {
    id: 3,
    slug: 'chapter-3',
    title: 'Chapter 3 : 이미지 기반 LLM 활용법',
    tags: ['에이전트', 'Gemini', 'NanoBanana', '이미지', '프롬프트'],
    description: 'Gemini 이미지 생성, 나노바나나 프로, 프롬프트 기법',
    icon: '🎨',
    color: '#92d050',
  },
  {
    id: 4,
    slug: 'chapter-4',
    title: 'Chapter 4 : n8n 에이전트 기초',
    tags: ['에이전트', 'n8n', 'Docker', 'Calendar'],
    description: 'Docker 기반 n8n, 워크플로우 자동화, Calendar 연동',
    icon: '⚙️',
    color: '#ff6b35',
  },
  {
    id: 5,
    slug: 'chapter-5',
    title: 'Chapter 5 : n8n RAG 시스템',
    tags: ['에이전트', 'n8n', 'Supabase', 'Cohere', 'RAG'],
    description: 'Supabase 벡터DB, Cohere 임베딩, n8n RAG 파이프라인',
    icon: '🔍',
    color: '#7c3aed',
  },
  {
    id: 6,
    slug: 'chapter-6',
    title: 'Chapter 6 : n8n CRM & MCP',
    tags: ['에이전트', 'n8n', 'Solapi', 'MCP', 'A2A', 'CRM'],
    description: 'CRM 자동화, Solapi 문자 발송, MCP/A2A 프로토콜',
    icon: '📱',
    color: '#e91e63',
  },
  {
    id: 7,
    slug: 'chapter-7',
    title: 'Chapter 7 : 주식 분석 MCP 서버',
    tags: ['에이전트', 'MCP', 'Telegram', 'Alpha Vantage', '금융'],
    description: '금융 MCP 서버, Telegram 봇, Alpha Vantage 연동',
    icon: '📈',
    color: '#ffd700',
  },
  {
    id: 8,
    slug: 'chapter-8',
    title: 'Chapter 8 : 공공데이터 GIS',
    tags: ['에이전트', 'Supabase', 'Postgres', 'GIS', '공공데이터'],
    description: 'Supabase/Postgres GIS, 공공데이터 API 연동',
    icon: '🗺️',
    color: '#00bcd4',
  },
]

export const showcases: ShowcaseMeta[] = [
  {
    id: 'smart-assistant',
    slug: 'smart-assistant',
    title: '스마트 비서 솔루션',
    subtitle: '업무를 자동화하는 AI 비서',
    chapterRef: 6,
    gradient: 'from-purple-500 to-violet-400',
    icon: '🤖',
  },
  {
    id: 'stock-analysis',
    slug: 'stock-analysis',
    title: '주식 분석 레포트',
    subtitle: '실시간 금융 분석 리포트',
    chapterRef: 7,
    gradient: 'from-yellow-600 to-amber-400',
    icon: '📊',
  },
  {
    id: 'business-solution',
    slug: 'business-solution',
    title: '비즈니스 솔루션 DataWave',
    subtitle: '데이터 기반 통합 솔루션',
    chapterRef: null,
    gradient: 'from-blue-600 to-cyan-400',
    icon: '🌊',
  },
  {
    id: 'google-calendar',
    slug: 'google-calendar',
    title: '구글 캘린더 자동화',
    subtitle: '일정 관리 AI 에이전트',
    chapterRef: 4,
    gradient: 'from-green-500 to-emerald-400',
    icon: '📅',
  },
  {
    id: 'inventory-management',
    slug: 'inventory-management',
    title: '실시간 재고관리',
    subtitle: '재고 모니터링 시스템',
    chapterRef: 8,
    gradient: 'from-orange-500 to-red-400',
    icon: '📦',
  },
  {
    id: 'disaster-status',
    slug: 'disaster-status',
    title: '중대재해 사고현황',
    subtitle: '산업 안전 데이터 분석',
    chapterRef: 8,
    gradient: 'from-red-600 to-pink-400',
    icon: '🚨',
  },
]

export function getChapterBySlug(slug: string): ChapterMeta | undefined {
  return chapters.find((c) => c.slug === slug)
}

export function getShowcaseBySlug(slug: string): ShowcaseMeta | undefined {
  return showcases.find((s) => s.slug === slug)
}
