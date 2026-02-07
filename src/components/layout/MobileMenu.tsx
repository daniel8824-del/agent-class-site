import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { chapters, showcases } from '@/content';
import { appleEase } from '@/lib/motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuSlide = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: appleEase },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: appleEase },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const staggerMenu = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: appleEase },
  },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation();

  // Close on navigation
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-[199]"
            style={{ background: 'oklch(0 0 0 / 50%)' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Slide-in panel from left */}
          <motion.div
            className="fixed inset-y-0 left-0 z-[200] flex flex-col w-[min(85vw,360px)]"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRight: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-xl)',
            }}
            variants={menuSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with logo + close button */}
            <div
              className="flex items-center justify-between px-6 shrink-0"
              style={{
                height: 72,
                borderBottom: '1px solid var(--glass-border)',
              }}
            >
              <Link
                to="/"
                className="flex items-center gap-2.5"
                onClick={onClose}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span
                  className="font-bold"
                  style={{
                    fontSize: 'var(--text-body)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  에이전트 클래스
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu content */}
            <motion.div
              className="flex-1 overflow-y-auto px-5 py-6 scrollbar-thin [-webkit-overflow-scrolling:touch]"
              variants={staggerMenu}
              initial="hidden"
              animate="visible"
            >
              {/* Chapters section */}
              <motion.div variants={menuItem} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen
                    className="w-4 h-4"
                    style={{ color: 'var(--accent-primary)' }}
                  />
                  <p
                    className="font-semibold uppercase tracking-wider"
                    style={{
                      fontSize: 'var(--text-label)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    챕터
                  </p>
                </div>
                <div className="space-y-0.5">
                  {chapters.map((ch, index) => (
                    <motion.div
                      key={ch.id}
                      variants={menuItem}
                      custom={index}
                    >
                      <Link
                        to={`/chapters/${ch.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 min-h-[44px]"
                        style={{
                          color:
                            location.pathname === `/chapters/${ch.slug}`
                              ? 'var(--text-primary)'
                              : 'var(--text-secondary)',
                          background:
                            location.pathname === `/chapters/${ch.slug}`
                              ? 'oklch(1 0 0 / 8%)'
                              : 'transparent',
                        }}
                      >
                        <span
                          className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0"
                          style={{
                            background: `var(--chapter-${ch.id}-gradient)`,
                            color: 'oklch(0.95 0 0)',
                          }}
                        >
                          {ch.id}
                        </span>
                        <div className="min-w-0">
                          <span
                            className="font-medium block truncate"
                            style={{ fontSize: 'var(--text-body-sm)' }}
                          >
                            {ch.title.replace(/^Chapter \d+ : /, '')}
                          </span>
                          <span
                            className="block truncate"
                            style={{
                              fontSize: 'var(--text-label)',
                              color: 'var(--text-subtle)',
                            }}
                          >
                            {ch.difficulty} / {ch.estimatedTime}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Showcases section */}
              <motion.div variants={menuItem}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles
                    className="w-4 h-4"
                    style={{ color: 'var(--accent-tertiary)' }}
                  />
                  <p
                    className="font-semibold uppercase tracking-wider"
                    style={{
                      fontSize: 'var(--text-label)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    쇼케이스
                  </p>
                </div>
                <div className="space-y-0.5">
                  {showcases.map((sc, index) => (
                    <motion.div
                      key={sc.id}
                      variants={menuItem}
                      custom={index}
                    >
                      <Link
                        to={`/showcase/${sc.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 min-h-[44px]"
                        style={{
                          color:
                            location.pathname === `/showcase/${sc.slug}`
                              ? 'var(--text-primary)'
                              : 'var(--text-secondary)',
                          background:
                            location.pathname === `/showcase/${sc.slug}`
                              ? 'oklch(1 0 0 / 8%)'
                              : 'transparent',
                        }}
                      >
                        <span className="text-lg shrink-0">{sc.icon}</span>
                        <div className="min-w-0">
                          <span
                            className="font-medium block truncate"
                            style={{ fontSize: 'var(--text-body-sm)' }}
                          >
                            {sc.title}
                          </span>
                          <span
                            className="block truncate"
                            style={{
                              fontSize: 'var(--text-label)',
                              color: 'var(--text-subtle)',
                            }}
                          >
                            {sc.subtitle}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom gradient accent */}
            <div
              className="h-[2px] shrink-0"
              style={{ background: 'var(--gradient-divider)' }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
