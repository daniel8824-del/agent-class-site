import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Youtube,
  MessageCircle,
  Send,
  BookOpen,
  Code2,
  Sparkles,
} from 'lucide-react';
import { chapters, showcases } from '@/content';
import { fadeInUp, staggerContainer, staggerItem, appleEase } from '@/lib/motion';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com', label: 'X (Twitter)' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative w-full">
      {/* Newsletter Section */}
      <div
        className="w-full"
        style={{ background: 'var(--surface-1)' }}
      >
        <motion.div
          className="mx-auto px-6 py-16 sm:py-20"
          style={{ maxWidth: 'var(--max-w-wide)' }}
          {...fadeInUp}
        >
          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-12"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {/* Decorative gradient orb */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)',
              }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, var(--accent-tertiary), transparent 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <div className="flex-1">
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-heading-3)',
                    color: 'var(--text-primary)',
                  }}
                >
                  최신 소식 받아보기
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-muted)',
                    maxWidth: '28rem',
                  }}
                >
                  새로운 챕터, 쇼케이스 업데이트, AI 에이전트 개발 팁을 이메일로 받아보세요.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex w-full md:w-auto gap-3"
              >
                {subscribed ? (
                  <motion.div
                    className="flex items-center gap-2 px-6 py-3 rounded-xl"
                    style={{
                      background: 'oklch(0.55 0.15 160 / 15%)',
                      color: 'oklch(0.75 0.12 160)',
                      fontSize: 'var(--text-body-sm)',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: appleEase }}
                  >
                    <Sparkles className="w-4 h-4" />
                    구독 완료!
                  </motion.div>
                ) : (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일 주소 입력"
                      className="flex-1 md:w-64 px-4 py-3 rounded-xl outline-none transition-all duration-200"
                      style={{
                        background: 'var(--surface-0)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-body-sm)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px oklch(0.53 0.25 285 / 15%)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'var(--glass-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="submit"
                      className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200"
                      style={{
                        background: 'var(--gradient-cta)',
                        color: 'oklch(0.95 0 0)',
                        fontSize: 'var(--text-body-sm)',
                        boxShadow: 'var(--shadow-glow)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-glow-hover)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">구독하기</span>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div
        className="w-full"
        style={{
          background: 'var(--surface-0)',
          borderTop: '1px solid var(--glass-border)',
        }}
      >
        <div
          className="mx-auto px-6 pt-16 pb-12"
          style={{ maxWidth: 'var(--max-w-wide)' }}
        >
          {/* 4-column grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-[var(--gap-footer-columns)]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Column 1: Chapters */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen
                  className="w-4 h-4"
                  style={{ color: 'var(--accent-primary)' }}
                />
                <h3
                  className="font-semibold"
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  챕터
                </h3>
              </div>
              <ul className="space-y-2.5">
                {chapters.map((ch) => (
                  <li key={ch.id}>
                    <Link
                      to={`/chapters/${ch.slug}`}
                      className="flex items-center gap-2 transition-colors hover:opacity-80 group"
                      style={{
                        fontSize: 'var(--text-caption)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{
                          background: `var(--chapter-${ch.id}-gradient)`,
                          color: 'oklch(0.95 0 0)',
                        }}
                      >
                        {ch.id}
                      </span>
                      <span className="truncate">
                        {ch.title.replace(/^Chapter \d+ : /, '')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2: Showcases */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: 'var(--accent-tertiary)' }}
                />
                <h3
                  className="font-semibold"
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  쇼케이스
                </h3>
              </div>
              <ul className="space-y-2.5">
                {showcases.map((sc) => (
                  <li key={sc.id}>
                    <Link
                      to={`/showcase/${sc.slug}`}
                      className="transition-colors hover:opacity-80"
                      style={{
                        fontSize: 'var(--text-caption)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {sc.icon} {sc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Resources */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-2 mb-5">
                <Code2
                  className="w-4 h-4"
                  style={{ color: 'var(--accent-secondary)' }}
                />
                <h3
                  className="font-semibold"
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  리소스
                </h3>
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/"
                    className="transition-colors hover:opacity-80"
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    시작하기
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chapters"
                    className="transition-colors hover:opacity-80"
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    교육과정 소개
                  </Link>
                </li>
                <li>
                  <Link
                    to="/showcase"
                    className="transition-colors hover:opacity-80"
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    쇼케이스 갤러리
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: About + Social */}
            <motion.div variants={staggerItem}>
              <h3
                className="font-semibold mb-5"
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-display)',
                }}
              >
                About
              </h3>
              <ul className="space-y-2.5 mb-6">
                <li>
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    AI Agent 개발 과정
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    8개 챕터 + 6개 쇼케이스
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    MIT License
                  </span>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                    style={{
                      background: 'var(--surface-2)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--glass-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar: Badge + Copyright */}
          <div
            className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid var(--glass-border)' }}
          >
            {/* Tech badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <Code2
                className="w-3.5 h-3.5"
                style={{ color: 'var(--accent-primary)' }}
              />
              <span
                style={{
                  fontSize: 'var(--text-label)',
                  color: 'var(--text-muted)',
                }}
              >
                Built with React + TypeScript + AI
              </span>
            </div>

            {/* Copyright */}
            <div className="text-right">
              <p
                style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--text-subtle)',
                }}
              >
                &copy; {new Date().getFullYear()} Agent Class. All rights reserved.
              </p>
              <p
                className="mt-1"
                style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--text-subtle)',
                }}
              >
                Powered by Datawave
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
