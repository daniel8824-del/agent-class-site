import type { Persona, FAQ, Outcome, ValueProp, WhySection } from '@/types'

export const whySection: WhySection = {
  problem: [
    'AI가 세상을 바꾸고 있지만, 대부분의 개발자는 아직 챗봇 수준에 머물러 있습니다.',
    '단순히 API를 호출하는 것만으로는 진정한 AI 제품을 만들 수 없습니다.',
    '에이전트는 스스로 판단하고, 도구를 사용하며, 복잡한 워크플로우를 자동화합니다.',
  ],
  solution: [
    '이 과정은 기초 개념부터 실전 배포까지, 8주간의 체계적 커리큘럼을 제공합니다.',
    'LangChain, n8n, MCP 프로토콜 등 실무에서 사용되는 최신 기술 스택을 직접 다룹니다.',
    '6개의 실전 프로젝트를 통해 포트폴리오를 완성하고, 즉시 업무에 적용할 수 있습니다.',
  ],
  values: [
    {
      icon: '🧠',
      title: '체계적 커리큘럼',
      description: '기초부터 고급까지, 단계별로 설계된 8개 챕터로 AI 에이전트 개발의 전 과정을 마스터합니다.',
      stat: '8',
      statLabel: '챕터',
    },
    {
      icon: '🛠️',
      title: '실전 프로젝트',
      description: '이론에 그치지 않는 6개 실전 프로젝트. CRM 자동화, 주식 분석, GIS 시스템 등 실무급 포트폴리오를 구축합니다.',
      stat: '6',
      statLabel: '프로젝트',
    },
    {
      icon: '⚡',
      title: '최신 기술 스택',
      description: 'LangChain, n8n, Supabase, MCP 프로토콜 등 2025년 현재 가장 주목받는 AI 에이전트 기술을 직접 다룹니다.',
      stat: '50+',
      statLabel: '실습',
    },
  ],
}

export const personas: Persona[] = [
  {
    icon: '👨‍💻',
    title: '개발자',
    description: 'AI 에이전트 기술로 역량을 확장하고 싶은 백엔드/프론트엔드 개발자. Python 기초만 있으면 충분합니다.',
    recommendedChapters: [1, 4, 5, 7],
  },
  {
    icon: '📋',
    title: '기획자/PM',
    description: 'AI 자동화 프로젝트를 기획하고 팀을 리드해야 하는 기획자. 기술 이해도를 높여 더 나은 의사결정을 할 수 있습니다.',
    recommendedChapters: [1, 2, 3, 6],
  },
  {
    icon: '🎓',
    title: '학생/취준생',
    description: 'AI 분야 취업을 목표로 실전 포트폴리오를 준비하는 학생. 6개 프로젝트로 경쟁력 있는 이력서를 만들 수 있습니다.',
    recommendedChapters: [1, 2, 4, 8],
  },
  {
    icon: '🚀',
    title: '창업가',
    description: 'AI 기반 서비스를 빠르게 MVP로 만들고 싶은 스타트업 창업자. 노코드 자동화부터 MCP 서버 구축까지.',
    recommendedChapters: [4, 5, 6, 7],
  },
]

export const faqs: FAQ[] = [
  {
    question: '프로그래밍 경험이 없어도 수강할 수 있나요?',
    answer: 'Python 기초 문법(변수, 함수, 조건문)을 알고 있다면 충분합니다. Chapter 1에서 개발 환경 설정부터 시작하며, 각 챕터마다 필요한 개념을 단계적으로 설명합니다. 완전 초보라면 Python 기초 강의를 먼저 수강하시는 것을 추천합니다.',
  },
  {
    question: '수강 기간은 얼마나 되나요?',
    answer: '자신의 페이스에 맞춰 학습할 수 있습니다. 전체 커리큘럼은 약 33시간 분량이며, 주 5시간 학습 기준으로 약 7주면 완료할 수 있습니다. 콘텐츠는 무기한 접근 가능합니다.',
  },
  {
    question: '쇼케이스 프로젝트를 직접 체험할 수 있나요?',
    answer: '네, 각 쇼케이스 페이지에서 실제 AI 에이전트와 대화할 수 있는 데모를 제공합니다. 스마트 비서, 주식 분석, 캘린더 자동화 등 실제 작동하는 에이전트를 직접 테스트해보세요.',
  },
  {
    question: 'n8n과 LangChain 중 어떤 것을 먼저 배워야 하나요?',
    answer: 'Chapter 1-3에서 LLM과 프롬프트 기초를 다진 후, Chapter 4부터 n8n을 배웁니다. LangChain은 Chapter 1에서 기초를 다루고, 이후 n8n 기반 실전 프로젝트로 이어집니다. 순서대로 학습하시면 자연스럽게 진행됩니다.',
  },
  {
    question: 'MCP 프로토콜이 무엇인가요?',
    answer: 'MCP(Model Context Protocol)는 AI 모델이 외부 도구와 데이터에 접근할 수 있게 해주는 표준 프로토콜입니다. Chapter 6-7에서 MCP 서버를 직접 구축하고, Claude와 연동하는 방법을 배웁니다.',
  },
  {
    question: '학습 중 질문은 어디서 하나요?',
    answer: '각 챕터 하단의 커뮤니티 섹션에서 질문할 수 있으며, AI 기반 Q&A 시스템이 빠른 답변을 제공합니다. 또한 월 2회 라이브 Q&A 세션을 통해 직접 질문할 수 있습니다.',
  },
]

export const outcomes: Outcome[] = [
  {
    before: 'API 호출만 할 줄 아는 개발자',
    after: '자율 에이전트를 설계하는 AI 엔지니어',
    description: '단순 API 래퍼를 넘어, 스스로 판단하고 도구를 사용하는 에이전트를 설계할 수 있습니다.',
  },
  {
    before: '반복 업무에 시간을 쏟는 팀',
    after: '워크플로우 자동화로 생산성 3배 향상',
    description: 'n8n과 AI 에이전트로 이메일, 일정, CRM, 문서 관리를 자동화합니다.',
  },
  {
    before: '포트폴리오가 부족한 취준생',
    after: '실전 프로젝트 6개를 보유한 AI 전문가',
    description: '금융 분석, GIS, CRM 자동화 등 실무급 프로젝트로 경쟁력 있는 포트폴리오를 완성합니다.',
  },
]

export const heroContent = {
  title: 'AI 에이전트 마스터 클래스',
  subtitle: '에이전트의 기초부터 실전까지, 8개 챕터와 6개 프로젝트로 완성하는 AI 에이전트 개발 여정. 스스로 생각하고, 도구를 사용하며, 문제를 해결하는 에이전트를 만들어보세요.',
  ctaPrimary: '지금 시작하기',
  ctaSecondary: '쇼케이스 둘러보기',
}

export const ctaContent = {
  headline: '지금 바로 시작하세요',
  subtitle: '8개 챕터와 6개 실전 프로젝트로 구성된 학습 여정을 통해 AI 에이전트 개발의 전문가가 되어보세요. 첫 챕터는 무료로 체험할 수 있습니다.',
  ctaPrimary: '무료로 시작하기',
  ctaSecondary: '커리큘럼 보기',
  guarantee: '첫 챕터 무료 체험 | 무기한 접근 | 커뮤니티 지원',
}
