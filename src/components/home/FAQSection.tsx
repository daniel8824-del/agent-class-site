// Design Reference: Stitch Screen ID: 551a5a4bdcca4695bb31f0984385906c
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { fadeInLeft, fadeInRight } from '@/lib/motion'

const faqs = [
  {
    question: '프로그래밍 경험이 없어도 수강할 수 있나요?',
    answer: 'Python 기초 문법(변수, 함수, 조건문)을 알고 있다면 충분합니다. Chapter 1에서 개발 환경 설정부터 시작합니다.',
  },
  {
    question: '수강 기간은 얼마나 되나요?',
    answer: '전체 33시간 분량, 주 5시간 기준 약 7주. 무기한 접근 가능합니다.',
  },
  {
    question: 'n8n과 LangChain 중 어떤 것을 먼저?',
    answer: 'Chapter 1-3에서 LLM 기초 → Chapter 4부터 n8n. 순서대로 자연스럽게 진행됩니다.',
  },
  {
    question: 'MCP 프로토콜이 무엇인가요?',
    answer: 'AI 모델이 외부 도구와 데이터에 접근하는 표준 프로토콜입니다. Chapter 6-7에서 직접 구축합니다.',
  },
  {
    question: '쇼케이스를 직접 체험할 수 있나요?',
    answer: '네, 각 쇼케이스에서 실제 AI 에이전트와 대화하는 데모를 제공합니다. 회원가입 없이 체험 가능.',
  },
  {
    question: '학습 중 질문은 어디서?',
    answer: '챕터별 커뮤니티 Q&A, AI Q&A 봇, 월 2회 라이브 세션을 운영합니다.',
  },
  {
    question: '수료증을 받을 수 있나요?',
    answer: '8개 챕터 완료 + 6개 프로젝트 제출 시 디지털 수료증 발급. LinkedIn에 추가 가능.',
  },
  {
    question: '환불 정책은?',
    answer: '7일 이내 100% 환불, 14일 이내 50% 환불. 진행률 30% 미만인 경우 해당.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="py-20 md:py-32"
      style={{ background: 'var(--surface-1)' }}
    >
      <div className="max-w-[var(--max-w-content)] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
          {/* Left Column: Sticky Title */}
          <motion.div
            className="md:sticky md:top-8 md:self-start md:pt-6"
            {...fadeInLeft}
          >
            <h2
              className="gradient-text text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
              }}
            >
              궁금한 점이 있으신가요?
            </h2>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              자주 묻는 질문들을 모았습니다. 원하시는 답변이 없다면 커뮤니티에서 질문해주세요.
            </p>
            <a
              href="#"
              className="inline-block text-sm mt-6 transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent-primary)' }}
            >
              커뮤니티 바로가기 →
            </a>
          </motion.div>

          {/* Right Column: Accordion */}
          <motion.div {...fadeInRight}>
            <div>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: '1px solid var(--glass-border)',
                  }}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center py-6 text-left transition-opacity hover:opacity-80"
                  >
                    <span
                      className="text-base md:text-lg pr-4"
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                      }}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 shrink-0 transition-transform duration-300"
                      style={{
                        color: 'var(--text-secondary)',
                        transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {/* Answer with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="pb-6 text-[15px]"
                          style={{
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
