# DESIGN.md -- Agent Class Apple-Grade Redesign

> Design system for the **agent-class-site** Apple.com-level redesign.
> Generated from Stitch MCP screens + existing codebase analysis.
> **Stitch Project ID**: `1385930146841616497`

---

## Stitch Screen Reference

| Screen | ID | Description |
|--------|----|-------------|
| Homepage | `1276f1fc81454eb391635b516ceb736f` | Full-scroll hero, stats, chapter grid, showcase preview, final CTA |
| Navigation (Normal) | `e7627e869b7241c88a5a4171ae51f696` | Glassmorphism sticky top nav, 64px |
| Navigation (Mega Menu) | `73bf83da3c7c4bbeaeae75e07afc0d03` | Mega dropdown with chapters + showcases |
| Chapter Reading | `a8c0f65839b04074ba55ce1cad194a23` | Immersive reading with floating TOC |
| Showcase Landing | `f26b27659e79480787ed338edf8c6975` | Cinematic product page with parallax hero |
| Mega Footer | `0d6ed11076c24549bcf495f62513e61d` | 4-column directory footer |
| Chapters Overview | `28c15d8e782e4474a8a5b685ae560eb1` | 2x4 grid with gradient-bordered cards |

---

## 1. Color System (Dark-first, OKLch)

### Surface Hierarchy (Dark Mode -- Default)

| Token | OKLch Value | Hex Approx | Usage |
|-------|-------------|------------|-------|
| `--surface-0` | `oklch(0.098 0.01 260)` | `#0a0a0f` | Page background, deepest |
| `--surface-1` | `oklch(0.145 0.01 260)` | `#141419` | Main content background |
| `--surface-2` | `oklch(0.195 0.01 260)` | `#1e1e28` | Cards, panels |
| `--surface-3` | `oklch(0.255 0.008 260)` | `#2a2a35` | Elevated elements, hover states |

### Glass Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `oklch(0.195 0.01 260 / 60%)` | Glassmorphism backgrounds |
| `--glass-bg-nav` | `oklch(0.098 0.01 260 / 80%)` | Navigation backdrop |
| `--glass-border` | `oklch(1 0 0 / 8%)` | Subtle glass borders |
| `--glass-border-hover` | `oklch(1 0 0 / 15%)` | Hover state borders |
| `--glass-blur` | `20px` | Standard backdrop-filter blur |
| `--glass-blur-heavy` | `40px` | Navigation, mega menu blur |

### Gradient Presets

```css
/* Hero gradient background */
--gradient-hero: linear-gradient(135deg,
  oklch(0.45 0.2 285 / 40%),    /* violet-600/40 */
  oklch(0.45 0.2 260 / 25%),    /* blue-600/25 */
  oklch(0.55 0.15 195 / 35%)    /* cyan-500/35 */
);

/* Text gradient (hero title, accents) */
--gradient-text: linear-gradient(90deg,
  oklch(0.7 0.15 285),           /* violet-400 */
  oklch(0.7 0.15 260),           /* blue-400 */
  oklch(0.75 0.14 195)           /* cyan-400 */
);

/* Card border gradient (hover glow) */
--gradient-card-border: linear-gradient(135deg,
  oklch(0.55 0.2 285 / 30%),
  oklch(0.55 0.2 260 / 20%),
  oklch(0.6 0.15 195 / 30%)
);

/* CTA button gradient */
--gradient-cta: linear-gradient(90deg,
  oklch(0.45 0.23 285),          /* violet-600 */
  oklch(0.45 0.23 260)           /* blue-600 */
);

/* Footer top border */
--gradient-divider: linear-gradient(90deg,
  oklch(0.55 0.2 285),           /* violet */
  oklch(0.55 0.2 260),           /* blue */
  oklch(0.65 0.15 195)           /* cyan */
);

/* Progress bar */
--gradient-progress: linear-gradient(90deg,
  oklch(0.55 0.2 285),
  oklch(0.55 0.2 260),
  oklch(0.65 0.15 195)
);
```

### Accent Colors

| Token | OKLch Value | Usage |
|-------|-------------|-------|
| `--accent-primary` | `oklch(0.55 0.23 285)` | Primary CTA, active states |
| `--accent-secondary` | `oklch(0.55 0.23 260)` | Secondary accents, links |
| `--accent-tertiary` | `oklch(0.65 0.15 195)` | Tertiary accents, badges |

### Text Colors

| Token | OKLch Value | Usage |
|-------|-------------|-------|
| `--text-primary` | `oklch(0.95 0 0)` | Headings, primary text |
| `--text-secondary` | `oklch(0.85 0 0)` | Body text |
| `--text-muted` | `oklch(0.708 0 0)` | Descriptions, labels |
| `--text-subtle` | `oklch(0.5 0 0)` | Watermarks, disabled |

### Chapter Color Map

Each chapter has a unique gradient for left border accent and watermark tint:

| Chapter | Gradient | OKLch From | OKLch To |
|---------|----------|------------|----------|
| Ch 1 | violet | `oklch(0.55 0.23 285)` | `oklch(0.45 0.2 295)` |
| Ch 2 | blue | `oklch(0.55 0.23 260)` | `oklch(0.45 0.2 270)` |
| Ch 3 | cyan | `oklch(0.65 0.15 195)` | `oklch(0.55 0.18 205)` |
| Ch 4 | emerald | `oklch(0.6 0.17 160)` | `oklch(0.5 0.15 165)` |
| Ch 5 | amber | `oklch(0.7 0.16 80)` | `oklch(0.6 0.18 70)` |
| Ch 6 | rose | `oklch(0.6 0.2 15)` | `oklch(0.5 0.22 5)` |
| Ch 7 | teal | `oklch(0.6 0.12 180)` | `oklch(0.5 0.14 175)` |
| Ch 8 | purple | `oklch(0.5 0.25 300)` | `oklch(0.4 0.22 310)` |

### Light Mode Overrides

| Token | Light Value |
|-------|-------------|
| `--surface-0` | `oklch(0.985 0 0)` |
| `--surface-1` | `oklch(1 0 0)` |
| `--surface-2` | `oklch(0.97 0 0)` |
| `--surface-3` | `oklch(0.94 0 0)` |
| `--glass-bg` | `oklch(1 0 0 / 70%)` |
| `--glass-border` | `oklch(0 0 0 / 8%)` |
| `--text-primary` | `oklch(0.145 0 0)` |
| `--text-secondary` | `oklch(0.25 0 0)` |
| `--text-muted` | `oklch(0.45 0 0)` |

---

## 2. Typography

### Font Stack

```css
/* Display / Headings -- English & UI */
--font-display: 'Inter', system-ui, -apple-system, sans-serif;

/* Body -- Korean content */
--font-body: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', sans-serif;

/* Code */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `--text-hero` | 88px (5.5rem) | 800 | 1.05 | -0.03em | Hero title |
| `--text-display` | 56px (3.5rem) | 700 | 1.1 | -0.025em | Section titles |
| `--text-heading-1` | 40px (2.5rem) | 700 | 1.15 | -0.02em | Page headings |
| `--text-heading-2` | 32px (2rem) | 600 | 1.2 | -0.015em | Section headings |
| `--text-heading-3` | 24px (1.5rem) | 600 | 1.3 | -0.01em | Card titles |
| `--text-heading-4` | 20px (1.25rem) | 600 | 1.35 | -0.005em | Sub-headings |
| `--text-body-lg` | 18px (1.125rem) | 400 | 1.8 | 0 | Article body (reading) |
| `--text-body` | 16px (1rem) | 400 | 1.6 | 0 | Default body |
| `--text-body-sm` | 14px (0.875rem) | 400 | 1.5 | 0 | Descriptions |
| `--text-caption` | 13px (0.8125rem) | 500 | 1.4 | 0.01em | Footer links, nav items |
| `--text-label` | 12px (0.75rem) | 500 | 1.35 | 0.02em | Badges, tags |
| `--text-xs` | 10px (0.625rem) | 600 | 1.3 | 0.03em | Micro labels |

### Responsive Scale

```css
/* Hero title responsive */
@media (max-width: 768px)  { --text-hero: 48px; }
@media (max-width: 480px)  { --text-hero: 36px; }

/* Display responsive */
@media (max-width: 768px)  { --text-display: 40px; }
@media (max-width: 480px)  { --text-display: 32px; }
```

---

## 3. Spacing

### Section Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-section` | 120px | Between major page sections |
| `--space-section-sm` | 80px | Between sub-sections |
| `--space-hero-y` | 160px | Hero vertical padding (desktop) |
| `--space-hero-y-mobile` | 80px | Hero vertical padding (mobile) |

### Content Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--max-w-reading` | 48rem (768px) | Article content, reading layout |
| `--max-w-content` | 72rem (1152px) | Grid sections, cards |
| `--max-w-wide` | 80rem (1280px) | Navigation, footer |
| `--max-w-full` | 100% | Hero sections |

### Grid & Card Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--gap-grid` | 24px | Chapter grid, showcase grid |
| `--gap-card-content` | 16px | Internal card padding |
| `--gap-nav-items` | 32px | Navigation link spacing |
| `--gap-footer-columns` | 48px | Footer column gaps |

### Component Padding

| Token | Value | Usage |
|-------|-------|-------|
| `--pad-card` | 24px | Standard card padding |
| `--pad-card-lg` | 32px | Large/hero card padding |
| `--pad-nav` | 0 24px | Navigation bar padding |
| `--pad-button` | 12px 24px | Standard button padding |
| `--pad-button-lg` | 16px 40px | Large CTA button padding |
| `--pad-badge` | 4px 12px | Badge/tag padding |

---

## 4. Motion System

### Apple Easing

```ts
// Primary easing -- Apple's signature smooth deceleration
const appleEase = [0.4, 0, 0.2, 1] as const;

// Spring for interactive elements
const appleSpring = { stiffness: 100, damping: 15 } as const;

// Quick micro-interaction spring
const microSpring = { stiffness: 300, damping: 25 } as const;

// Bouncy spring for hover effects
const bouncySpring = { stiffness: 200, damping: 12 } as const;
```

### Standard Animations

```ts
// Fade in from below (scroll reveal)
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: appleEase },
};

// Stagger children (card grids)
const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: appleEase },
};

// Card hover lift
const cardHover = {
  whileHover: { y: -4, transition: { type: 'spring', ...microSpring } },
};

// Scale on press
const tapScale = {
  whileTap: { scale: 0.97 },
};

// Scroll-linked progress
// Use useScroll() + useTransform() from framer-motion
// Progress bar: scaleX from 0 to 1 with transformOrigin 'left'

// Hero parallax
// Background elements: translateY at 0.3x-0.5x scroll speed
// Foreground text: translateY at 0.1x scroll speed (subtle)
```

### Page Transitions

```ts
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: appleEase },
};
```

### Scroll-Linked Parallax Ratios

| Element | Speed | Usage |
|---------|-------|-------|
| Background orbs | 0.3x | Slow-moving depth |
| Hero gradient mesh | 0.5x | Medium parallax |
| Foreground text | 0.1x | Subtle lift |
| Showcase hero layers | 0.2x-0.6x | Multi-layer parallax |

### Shimmer Effect (CTA Buttons)

```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shimmer-btn {
  background: linear-gradient(
    90deg,
    var(--accent-primary) 0%,
    oklch(0.7 0.15 285) 50%,
    var(--accent-primary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
}
```

### Word-by-Word Reveal (Showcase Hero)

```ts
// Split title into words, stagger each word's opacity
const wordReveal = {
  container: {
    animate: { transition: { staggerChildren: 0.12 } },
  },
  word: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: appleEase } },
  },
};
```

---

## 5. Component Styles

### GlassCard

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  border-color: var(--glass-border-hover);
  box-shadow: 0 8px 32px oklch(0 0 0 / 20%);
}
```

### GlassNav

```css
.glass-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  background: var(--glass-bg-nav);
  backdrop-filter: blur(var(--glass-blur-heavy));
  -webkit-backdrop-filter: blur(var(--glass-blur-heavy));
  border-bottom: 1px solid var(--glass-border);
}
```

### GlassTOC (Floating Table of Contents)

```css
.glass-toc {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 16px;
}
.glass-toc-item.active {
  color: var(--accent-primary);
  border-left: 2px solid var(--accent-primary);
  padding-left: 12px;
}
```

### Button Variants

```css
/* Primary CTA -- shimmer gradient */
.btn-primary {
  background: var(--gradient-cta);
  color: oklch(0.95 0 0);
  padding: var(--pad-button-lg);
  border-radius: 12px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 24px oklch(0.45 0.23 285 / 30%);
  transition: box-shadow 0.3s ease, transform 0.15s ease;
}
.btn-primary:hover {
  box-shadow: 0 8px 32px oklch(0.45 0.23 285 / 45%);
}

/* Secondary -- glass outline */
.btn-secondary {
  background: oklch(1 0 0 / 5%);
  backdrop-filter: blur(8px);
  color: oklch(0.95 0 0);
  padding: var(--pad-button-lg);
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid oklch(1 0 0 / 15%);
  transition: background 0.3s ease, border-color 0.3s ease;
}
.btn-secondary:hover {
  background: oklch(1 0 0 / 10%);
  border-color: oklch(1 0 0 / 25%);
}
```

### Chapter Card (Chapters Overview)

```css
.chapter-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: var(--pad-card-lg);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}
/* Unique gradient left border per chapter */
.chapter-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--chapter-gradient);
  border-radius: 4px 0 0 4px;
}
/* Large watermark number */
.chapter-card .watermark {
  position: absolute;
  top: -10px;
  right: 16px;
  font-size: 120px;
  font-weight: 800;
  color: oklch(1 0 0 / 5%);
  line-height: 1;
  pointer-events: none;
}
.chapter-card:hover {
  transform: translateY(-4px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 12px 40px oklch(0 0 0 / 25%);
}
```

### Mega Menu

```css
.mega-menu {
  position: absolute;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: min(90vw, 800px);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur-heavy));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  box-shadow: 0 24px 64px oklch(0 0 0 / 40%);
}
```

### Stats Card

```css
.stats-card {
  background: var(--surface-2);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
/* Gradient accent top bar */
.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--stat-gradient);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}
.stats-card:hover::before {
  opacity: 1;
}
```

### Progress Bar (Scroll-linked)

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 100;
  background: transparent;
  transform-origin: left;
}
.scroll-progress-fill {
  height: 100%;
  background: var(--gradient-progress);
  transform-origin: left;
  /* scaleX controlled by framer-motion useScroll/useTransform */
}
```

---

## 6. Layout Specifications

### Page Layout (Full-Width Top-Nav)

```
+----------------------------------------------------------+
|  [GlassNav - sticky, 64px, full-width]                   |
+----------------------------------------------------------+
|                                                          |
|  [Full-width hero section - 100vw]                       |
|                                                          |
+----------------------------------------------------------+
|  [Content sections - max-w-content centered]             |
|  - Chapter grid                                          |
|  - Showcase preview                                      |
|  - Stats row                                             |
+----------------------------------------------------------+
|  [MegaFooter - full-width]                               |
+----------------------------------------------------------+
```

### Reading Layout (Chapter Page)

```
+----------------------------------------------------------+
|  [GlassNav - sticky, 64px]                               |
|  [ScrollProgress - 3px, fixed top]                       |
+----------------------------------------------------------+
|  [Hero Banner - full-width, 300px, gradient]             |
+----------------------------------------------------------+
|                                                          |
|         [Article Content]       [Floating TOC]           |
|         max-w-3xl               fixed right              |
|         centered                220px wide               |
|                                                          |
+----------------------------------------------------------+
|  [Prev/Next Navigation]                                  |
+----------------------------------------------------------+
|  [MegaFooter]                                            |
+----------------------------------------------------------+
```

### Breakpoints

| Name | Width | Columns |
|------|-------|---------|
| Mobile | < 640px | 1 |
| Tablet | 640-1024px | 2 |
| Desktop | 1024-1440px | 4 |
| Wide | > 1440px | 4 (wider gaps) |

### Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Content |
| Cards | 1 | Hover states |
| TOC | 30 | Floating TOC |
| Nav | 50 | Sticky navigation |
| Mega Menu | 55 | Dropdown overlay |
| Progress | 100 | Scroll progress bar |
| Modal | 200 | Overlays, search |

---

## 7. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Badges, tags |
| `--radius-md` | 8px | Small buttons |
| `--radius-lg` | 12px | Buttons, inputs |
| `--radius-xl` | 16px | Cards |
| `--radius-2xl` | 20px | Hero containers |
| `--radius-full` | 9999px | Pills, avatars |

---

## 8. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px oklch(0 0 0 / 10%)` | Subtle elevation |
| `--shadow-md` | `0 4px 16px oklch(0 0 0 / 15%)` | Card default |
| `--shadow-lg` | `0 8px 32px oklch(0 0 0 / 20%)` | Card hover |
| `--shadow-xl` | `0 16px 48px oklch(0 0 0 / 30%)` | Mega menu, modals |
| `--shadow-glow` | `0 4px 24px oklch(0.45 0.23 285 / 30%)` | CTA buttons |
| `--shadow-glow-hover` | `0 8px 32px oklch(0.45 0.23 285 / 45%)` | CTA hover |

---

## 9. Icon System

- **Icon Library**: Lucide React (already installed)
- **Icon Size**: 16px (inline), 20px (cards), 24px (section headers)
- **Stroke Width**: 1.5px (default), 2px (bold variants)
- **Color**: Inherits from parent text color

---

## 10. Implementation Notes

### Stack
- **Framework**: Vite 7 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animation**: Framer Motion 12 (import from `framer-motion`)
- **Fonts**: Inter (display), Pretendard (body), JetBrains Mono (code)

### Key Technical Decisions
1. **Dark-first**: `:root` defines dark theme, `.light` class overrides
2. **OKLch colors**: All colors use `oklch()` for perceptual uniformity
3. **Glass effects**: `backdrop-filter: blur()` with fallback for unsupported browsers
4. **Scroll animations**: Use `whileInView` with `viewport: { once: true }` for performance
5. **Layout shift**: Sidebar removed, replaced with full-width top-nav + floating TOC on reading pages
6. **Font loading**: Use `font-display: swap` to prevent FOIT

### Migration from Current Design
- Remove `sidebar` CSS variables and components
- Replace `max-w-6xl` constrained layout with full-width sections
- Upgrade Card components to use glass tokens
- Add sticky GlassNav replacing sidebar navigation
- Add MegaFooter replacing inline footer
- Implement scroll progress bar on reading pages
- Add floating TOC panel (desktop only, hidden on mobile)
