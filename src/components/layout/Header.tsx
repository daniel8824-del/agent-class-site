import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useScrollState } from '@/hooks/useScrollState';
import { chapters, showcases } from '@/content';
import { showcaseDataMap } from '@/data/showcases';
import { appleEase, staggerContainer, staggerItem } from '@/lib/motion';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

type MenuType = 'chapters' | 'showcases' | null;

const navLinks = [
  { label: '홈', to: '/' },
  { label: '챕터', to: '/chapters', menu: 'chapters' as const },
  { label: '쇼케이스', to: '/showcase', menu: 'showcases' as const },
];

export function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  const { isScrolled } = useScrollState(10);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Close mega menu on navigation
  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname]);

  // Close mega menu on outside click
  useEffect(() => {
    if (!activeMenu) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeMenu]);

  // Close mega menu on Escape
  useEffect(() => {
    if (!activeMenu) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveMenu(null);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeMenu]);

  const handleEnterNav = useCallback((menu: MenuType) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(menu);
  }, []);

  const handleLeaveNav = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const handleEnterMenu = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handleLeaveMenu = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  // Determine active nav link
  const getIsActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <header
      ref={navRef}
      className="glass-nav"
      style={{
        height: isScrolled ? 64 : 80,
        background: isScrolled ? 'var(--glass-bg-nav)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(60px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(60px)' : 'blur(0px)',
        borderBottom: isScrolled
          ? '1px solid var(--glass-border)'
          : '1px solid transparent',
        transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s cubic-bezier(0.4,0,0.2,1), backdrop-filter 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Gradient border bottom line when scrolled */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--gradient-divider)',
          opacity: isScrolled ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="mx-auto flex items-center justify-between h-full"
        style={{
          maxWidth: 'var(--max-w-wide)',
          padding: '0 clamp(16px, 4vw, 32px)',
        }}
      >
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1
                  className="text-lg font-bold leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  에이전트 클래스
                </h1>
                <p className="text-[10px] text-muted-foreground leading-none">
                  AI Agent Development Course
                </p>
              </div>
            </Link>
          </div>

          {/* Nav links next to logo */}
          <nav
            className="hidden lg:flex items-center"
            style={{ gap: 'var(--gap-nav-items)' }}
          >
          {navLinks.map((link) => {
            const active = getIsActive(link.to);
            return (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() =>
                  link.menu ? handleEnterNav(link.menu) : setActiveMenu(null)
                }
                onMouseLeave={handleLeaveNav}
              >
                <Link
                  to={link.to}
                  className="relative py-2 font-medium transition-colors"
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: active
                      ? 'var(--text-primary)'
                      : 'var(--text-muted)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {link.label}
                  {link.menu && (
                    <span className="ml-1 text-[10px] opacity-50">
                      &#9662;
                    </span>
                  )}
                  {/* Active underline with layoutId */}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'var(--accent-primary)' }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
          </nav>
        </div>

        {/* Right: Search + Theme toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSearchClick}
            className="gap-2"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline text-muted-foreground text-xs">
              검색
            </span>
            <kbd className="hidden md:inline-flex pointer-events-none h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mega Menu Dropdowns */}
      <AnimatePresence>
        {activeMenu === 'chapters' && (
          <MegaMenuChapters
            onMouseEnter={handleEnterMenu}
            onMouseLeave={handleLeaveMenu}
          />
        )}
        {activeMenu === 'showcases' && (
          <MegaMenuShowcases
            onMouseEnter={handleEnterMenu}
            onMouseLeave={handleLeaveMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

/* --- Mega Menu: Chapters --- */
function MegaMenuChapters({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      className="mega-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: appleEase }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="col-span-2 grid grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {chapters.map((ch) => (
          <motion.div key={ch.id} variants={staggerItem}>
            <Link
              to={`/chapters/${ch.slug}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'oklch(1 0 0 / 6%)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold shrink-0"
                style={{
                  background: `var(--chapter-${ch.id}-gradient)`,
                  color: 'oklch(0.95 0 0)',
                }}
              >
                {ch.id}
              </span>
              <div className="min-w-0">
                <p
                  className="font-medium truncate"
                  style={{ fontSize: 'var(--text-body-sm)' }}
                >
                  {ch.title.replace(/^Chapter \d+ : /, '')}
                </p>
                <p
                  className="truncate"
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {ch.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* --- Mega Menu: Showcases --- */
function MegaMenuShowcases({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      className="mega-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: appleEase }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="col-span-2 grid grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {showcases.map((sc) => {
          const data = showcaseDataMap[sc.slug];
          return (
            <motion.div key={sc.id} variants={staggerItem}>
              <Link
                to={`/showcase/${sc.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    'oklch(1 0 0 / 6%)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    'transparent';
                }}
              >
                {data && (
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: data.theme.primary + '20' }}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: data.theme.primary }}
                    />
                  </span>
                )}
                <div className="min-w-0">
                  <p
                    className="font-medium truncate"
                    style={{ fontSize: 'var(--text-body-sm)' }}
                  >
                    {sc.icon} {sc.title}
                  </p>
                  <p
                    className="truncate"
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {sc.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
