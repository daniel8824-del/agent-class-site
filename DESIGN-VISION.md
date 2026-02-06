# DESIGN-VISION.md -- Agent Class Site Premium Redesign

> Transforming a "course listing" into a **cinematic product experience**.
> Reference sites: Apple.com, Linear.app, Vercel.com, Notion.so
> Stack: Vite 7 + React 19 + TypeScript + shadcn/ui + Tailwind CSS v4 + Framer Motion 12

---

## 1. Design Philosophy

### Core Principle: "Cinematic Storytelling, Not Cataloging"

The current site presents content like a syllabus: Hero, Stats, Chapter Grid, Showcase Grid, CTA. Every section is a **container of equal-weight items**. This is the fundamental problem.

Premium product sites (Apple, Linear, Vercel) never show 8 items in a grid. They show **one idea per viewport**, revealed through scroll. Each section has a unique visual identity. The page tells a STORY, not a table of contents.

### Three Pillars

| Pillar | Current Problem | Solution |
|--------|----------------|----------|
| **Narrative Arc** | Sections are disconnected containers | Page flows as a 5-act story: Hook, Context, Journey, Proof, Invitation |
| **Visual Hierarchy** | All items have equal weight | Size differentiation, sequential disclosure, one idea per viewport |
| **Scroll as Interaction** | Passive browsing, static sections | Scroll-driven reveals, parallax transitions, progressive disclosure |

### Design Maxims

1. **One idea per viewport** -- never show everything at once
2. **Color through restraint** -- dark canvas, bright signals at moments of importance
3. **Scroll is the narrator** -- content reveals at the pace of the user's scroll
4. **Every section has a unique identity** -- no two sections should use the same layout pattern
5. **Transitions, not dividers** -- sections blend into each other, no hard lines

---

## 2. Page Flow & Narrative Arc

The homepage is structured as a **5-act narrative**:

```
ACT 1: THE HOOK        -- Cinematic Hero (100vh+)
  "AI agents are here. Are you ready?"
  Full-screen statement, maximum visual impact

ACT 2: THE CONTEXT     -- Scroll Manifesto (~200vh scroll-driven)
  "Agents are not chatbots. They are a new form of software."
  Scroll-driven text reveal, embedded stats, builds the WHY

ACT 3: THE JOURNEY     -- Chapter Journey (sticky sidebar)
  "8 chapters. From zero to mastery."
  Sticky left panel + scrolling chapter cards, visual progression

ACT 4: THE PROOF       -- Showcase Spotlight (alternating cards)
  "Here's what you'll build."
  Featured case studies, not a grid. Each project feels important.

ACT 5: THE INVITATION  -- Final CTA (100vh)
  "Begin your journey."
  Full-circle return to hero gradient. Emotional close.
```

**Key structural change**: Remove all gradient divider lines (`<div className="h-px">`). Sections blend via background color transitions and overlapping animations.

---

## 3. Section Deep-Dives

### 3.1 Cinematic Hero

**Purpose**: Create an unforgettable first impression. Make the visitor feel they've arrived at something significant.

**Layout**:
```
+------------------------------------------------------------------+
|                                                                    |
|  [Animated gradient orbs -- violet, blue, cyan -- breathing]       |
|  [Dot grid pattern overlay -- subtle, 4% opacity]                  |
|                                                                    |
|              AI AGENT                                              |
|           MASTER CLASS                                             |
|                                                                    |
|  "에이전트의 기초부터 실전까지,                                      |
|   8개 챕터로 완성하는 AI 에이전트 개발 여정"                          |
|                                                                    |
|  [ 시작하기 -> ]    [ 쇼케이스 보기 ]                               |
|                                                                    |
|                     v (scroll indicator)                            |
+------------------------------------------------------------------+
```

**Enhancements over current**:
- Title text should be STACKED vertically (one word per line) on desktop for maximum impact:
  ```
  AI
  에이전트
  마스터 클래스
  ```
  Each line reveals word-by-word with stagger, creating a dramatic build-up.
- **Scroll-extended hero**: As user scrolls past 100vh, the hero content fades out with parallax (content moves up at 0.5x speed, orbs at 0.3x), creating a cinematic exit
- Gradient orbs should have LARGER scale and slower pulse (8-12s cycles) for grandeur
- Add a subtle radial vignette (dark edges) to focus attention on center text

**Animation Choreography**:
1. `t=0ms`: Gradient orbs begin breathing (ambient, infinite)
2. `t=200ms`: First title word fades in from below
3. `t=200ms + 120ms * n`: Each subsequent word reveals
4. `t=800ms`: Subtitle fades in
5. `t=1000ms`: Primary CTA slides up
6. `t=1120ms`: Secondary CTA slides up
7. `t=2000ms`: Scroll indicator begins bouncing
8. `scroll > 0`: Content begins parallax exit, opacity fades

**Kept from current**: Gradient orbs, word-by-word reveal, dot grid, glass buttons. These are already good.

---

### 3.2 Scroll Manifesto (NEW SECTION)

**Purpose**: Replace the dry stats bar with an emotional, scroll-driven narrative that builds the case for WHY AI agents matter.

**Concept**: Large text lines that reveal one-by-one as the user scrolls. Like Apple's product feature reveals where each line appears at scroll pace.

**Layout**:
```
+------------------------------------------------------------------+
|                                                                    |
|  (near-black background, no gradient -- stark contrast to hero)    |
|                                                                    |
|        에이전트는 단순한 챗봇이 아닙니다.                             |
|                                                                    |
|        스스로 판단하고,                                              |
|        행동하고,                                                    |
|        학습하는                                                     |
|                                                                    |
|        새로운 형태의 소프트웨어입니다.                                 |
|                                                                    |
|                                                                    |
|        8개의 챕터  ·  6개의 실전 프로젝트  ·  50+개의 실습            |
|        (stats appear last, as evidence)                            |
|                                                                    |
+------------------------------------------------------------------+
```

**Scroll Mechanics**:
- Section height: ~200vh (tall scroll region, slow reveal)
- Content is position:sticky centered within a tall scroll container
- Each line has a scroll trigger range: `[lineStart, lineEnd]` mapped to `opacity: [0, 1]` and `translateY: [20px, 0px]`
- Lines reveal sequentially: line N+1 only starts appearing after line N is at ~80% opacity
- The stats line gets the gradient text treatment, making the numbers visually pop
- The word "소프트웨어" gets special treatment: it briefly flashes with the gradient before settling to white

**Typography**:
- Main text: `--text-display` (56px) or even larger (64px)
- Weight: 600 for emphasis words, 400 for connectors
- Color: `--text-primary` (near-white)
- Stats line: `--text-heading-2` with gradient fill on numbers

**Implementation**:
```tsx
// Pseudocode for scroll-driven manifesto
const { scrollYProgress } = useScroll({ target: sectionRef });

const lines = [
  "에이전트는 단순한 챗봇이 아닙니다.",
  "스스로 판단하고,",
  "행동하고,",
  "학습하는",
  "새로운 형태의 소프트웨어입니다.",
];

// Each line gets a slice of the scroll range
lines.map((line, i) => {
  const start = i * 0.15;         // each line takes 15% of scroll
  const end = start + 0.12;       // with 3% overlap
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  return <motion.p style={{ opacity, y }}>{line}</motion.p>
});
```

**Why this works**:
- Forces the user to SCROLL to learn more (active participation)
- The restraint (no color, no images, just text) creates dramatic contrast after the colorful hero
- Embedding stats in narrative makes them feel meaningful, not arbitrary

---

### 3.3 Chapter Journey (MAJOR REDESIGN)

**Purpose**: Present the 8 chapters as a guided JOURNEY, not a catalog grid. The user should feel a sense of progression from Chapter 1 to Chapter 8.

**Layout Pattern**: STICKY LEFT + SCROLLING RIGHT (used by Apple Mac Pro, Linear, Stripe)

```
+------------------------------------------------------------------+
|                                                                    |
|   STICKY LEFT PANEL        |   SCROLLING RIGHT CONTENT            |
|   (fixed while scrolling)  |                                      |
|                             |   +------------------------------+   |
|   학습 여정                  |   | [Chapter 1 Card]             |   |
|                             |   | 오리엔테이션                   |   |
|   01 ----                   |   | Python 개발 환경 설정, RAG..   |   |
|   02                        |   | #에이전트 #RAG #LangChain     |   |
|   03                        |   +------------------------------+   |
|   04                        |                                      |
|   05                        |   +------------------------------+   |
|   06                        |   | [Chapter 2 Card]             |   |
|   07                        |   | 텍스트 기반 LLM 활용법         |   |
|   08                        |   | ...                          |   |
|                             |   +------------------------------+   |
|   [gradient progress line]  |                                      |
|                             |   ... (chapters 3-8)                 |
|                             |                                      |
+------------------------------------------------------------------+
```

**Sticky Left Panel Details**:
- Title: "학습 여정" in gradient text
- 8 chapter numbers (01-08) stacked vertically
- A vertical gradient line connects all numbers
- The ACTIVE chapter number is highlighted (larger, gradient color, slight glow)
- As user scrolls through chapters, the active indicator smoothly transitions
- The gradient line "fills" from top to bottom as scroll progresses (like a progress bar)
- Each number uses its chapter's unique color from the chapter color map

**Scrolling Right Content**:
- Each chapter is a glass card (~50-60vh height) with generous padding
- Card contents:
  - Chapter number badge: "Chapter N" with chapter color
  - Title: Large heading (--text-heading-2)
  - Description: Body text
  - Tags: Tag pills in a row
  - Subtle chapter-specific gradient accent (left border, like current chapter-card::before)
  - "시작하기 ->" link at bottom
- Cards have `whileInView` fade-in-up animation
- Cards are spaced with ~40px gap

**Mobile Layout**:
- Sticky left panel becomes a HORIZONTAL progress bar at top (sticky)
- Shows dots for each chapter, active dot highlighted
- Chapters stack vertically as full-width cards
- Scroll-snap optional for cleaner mobile experience

**Implementation Notes**:
- Use `position: sticky` for the left panel within a flex container
- Track active chapter via IntersectionObserver on each chapter card
- The progress line uses `scaleY` driven by scroll progress via `useScroll`
- Left panel width: ~200px on desktop, collapses on tablet/mobile

---

### 3.4 Showcase Spotlight (REDESIGN)

**Purpose**: Present showcases as impressive CASE STUDIES, not a card grid. Each project should feel like a featured product.

**Layout**: Two tiers -- one SPOTLIGHT showcase + alternating case study cards.

#### Tier 1: Spotlight (first/featured showcase)
```
+------------------------------------------------------------------+
|                                                                    |
|  (dark gradient background unique to this showcase)                |
|                                                                    |
|        에이전트 쇼케이스                                             |
|        "실무에서 활용되는 AI 에이전트 프로젝트"                        |
|                                                                    |
|  +--------------------------------------------------------------+  |
|  |                                                              |  |
|  |  [Large icon/visual]     스마트 비서 솔루션                    |  |
|  |  [80x80 emoji or         업무를 자동화하는 AI 비서              |  |
|  |   abstract gradient]     - CRM 자동화                         |  |
|  |                          - 일정 관리                           |  |
|  |                          - 고객 응대                           |  |
|  |                          [ 자세히 보기 -> ]                    |  |
|  |                                                              |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
+------------------------------------------------------------------+
```

#### Tier 2: Alternating Cards (remaining 5 showcases)
```
+------------------------------------------------------------------+
|                                                                    |
|  +---------------------------+  +------------------------------+   |
|  | [Icon]                    |  | 주식 분석 레포트               |   |
|  |                           |  | 실시간 금융 분석               |   |
|  |                           |  | [ 자세히 보기 -> ]            |   |
|  +---------------------------+  +------------------------------+   |
|                                                                    |
|  +------------------------------+  +---------------------------+   |
|  | 비즈니스 솔루션 DataWave      |  | [Icon]                    |   |
|  | 데이터 기반 통합 솔루션        |  |                           |   |
|  | [ 자세히 보기 -> ]            |  |                           |   |
|  +------------------------------+  +---------------------------+   |
|                                                                    |
|  ... (alternating pattern continues)                               |
|                                                                    |
+------------------------------------------------------------------+
```

**Alternating Layout Details**:
- Full content-width cards (1152px max)
- Two-column split within each card: ~40% visual / ~60% content
- ODD cards: visual LEFT, content RIGHT
- EVEN cards: content LEFT, visual RIGHT
- Each card has its own gradient accent (from showcase gradient data)
- Card entrance animation: slides in from its visual side (left cards from left, right cards from right)
- Gap between cards: 48px

**Visual Area**:
- Large emoji (80-100px) centered in a gradient circle
- Or: abstract gradient blob using the showcase's color palette
- Subtle animated glow behind the icon

**Mobile Layout**:
- All cards stack vertically
- Visual area appears above content (not side-by-side)
- Single column, full-width

---

### 3.5 Final CTA

**Purpose**: Emotional close. Make starting feel inevitable. Bring the journey full circle.

**Layout**:
```
+------------------------------------------------------------------+
|                                                                    |
|  (same gradient as hero -- violet/blue/cyan orbs return)           |
|  (creates full-circle closure)                                     |
|                                                                    |
|              지금 시작하세요                                         |
|                                                                    |
|  "8개 챕터와 6개 실전 쇼케이스로 구성된 학습 여정을 통해              |
|   AI 에이전트 개발의 전문가가 되어보세요"                             |
|                                                                    |
|              [ 학습 시작하기 -> ]                                    |
|                                                                    |
+------------------------------------------------------------------+
```

**Enhancements**:
- The gradient orbs from the hero RETURN, creating a visual echo
- But now they're calmer (slower animation, lower opacity) -- the energy has transformed from "explosive opener" to "confident invitation"
- The heading could use a different style than the hero -- perhaps NOT gradient text, but solid white with larger weight, for a grounded feeling
- Consider adding a subtle "what you'll achieve" line: "Python, n8n, RAG, MCP -- 모든 것을 마스터하세요"

**Mostly unchanged from current** -- the current CTA is already decent. Main changes are removing the hard divider before it and adjusting the gradient orb behavior.

---

## 4. Atomic Design Component Hierarchy

### Atoms (indivisible UI primitives)

| Component | Description | Used In |
|-----------|-------------|---------|
| `GradientText` | Text with `background-clip: text` gradient fill | Hero title, section headings, stat numbers |
| `GlowButton` | Primary CTA with shimmer animation + glow shadow | Hero CTA, Final CTA |
| `GhostButton` | Glass-bordered secondary button | Hero secondary, nav actions |
| `ProgressDot` | Circle indicator (active/inactive) for journey timeline | ChapterJourney sidebar |
| `GradientLine` | Thin animated gradient connector line | ChapterJourney progress |
| `SectionLabel` | Uppercase small label ("CHAPTER 01", "SHOWCASE") | Chapter entries, showcase cards |
| `TagPill` | Small rounded tag badge | Chapter tags |
| `IconCircle` | Emoji/icon in a glass circle | Showcase visuals |
| `ScrollIndicator` | Bouncing chevron at hero bottom | Hero section |

### Molecules (atom combinations)

| Component | Composition | Used In |
|-----------|-------------|---------|
| `SectionHeader` | GradientText + muted subtitle + optional SectionLabel | All section openings |
| `ManifestoLine` | Scroll-bound text line (opacity + translateY driven by scroll) | ScrollManifesto |
| `ChapterEntry` | SectionLabel + heading + description + TagPill[] + CTA link | ChapterJourney right side |
| `JourneyNode` | ProgressDot + chapter number + title (compact) | ChapterJourney sidebar |
| `ShowcaseCard` | IconCircle + title + subtitle + CTA link (in a glass card) | ShowcaseSpotlight |
| `NavLink` | Text with hover underline wipe animation | GlassNav |
| `FooterColumn` | Column heading + link list | MegaFooter |

### Organisms (self-contained sections)

| Component | Description |
|-----------|-------------|
| `CinematicHero` | Full-screen hero with gradient orbs, stacked title reveal, CTAs, scroll indicator, parallax exit |
| `ScrollManifesto` | Scroll-driven text reveal section with embedded stats (NEW) |
| `ChapterJourney` | Sticky sidebar + scrolling chapter entries (REPLACES chapter grid) |
| `ShowcaseSpotlight` | Featured showcase (large) + alternating case study cards (REPLACES showcase grid) |
| `FinalCTA` | Full-screen gradient close with heading + button |
| `GlassNav` | Sticky top navigation with mega menu (existing) |
| `MegaFooter` | 4-column directory footer (existing) |

### Templates (page composition)

| Template | Composition |
|----------|-------------|
| **HomepageTemplate** | CinematicHero -> ScrollManifesto -> ChapterJourney -> ShowcaseSpotlight -> FinalCTA |
| **ChapterReadingTemplate** | Hero banner -> Article -> Floating TOC -> Prev/Next (existing) |
| **ShowcaseDetailTemplate** | Showcase hero -> Features -> HowItWorks -> Stats -> CTA (existing) |
| **ChaptersOverviewTemplate** | Grid of all chapters (for /chapters route, existing) |
| **ShowcaseLandingTemplate** | Grid of all showcases (for /showcase route, existing) |

---

## 5. Color & Gradient Strategy

### Philosophy: "Dark Canvas, Bright Signals"

The background is near-black. Color is **earned** -- it appears at moments of importance. This restraint creates contrast and guides the eye.

### Per-Section Color Usage

| Section | Background | Text Color | Accent Color | Reasoning |
|---------|-----------|------------|--------------|-----------|
| Hero | Gradient mesh (violet/blue/cyan orbs) | White, gradient title | Maximum | "Fireworks" -- grab attention |
| Manifesto | Pure `--surface-0` (near-black) | `--text-primary` (white) | None (stats get gradient numbers) | Stark contrast to hero, focuses on words |
| Chapter Journey | `--surface-0` | Mixed | Per-chapter unique gradients | Each chapter is its own "character" |
| Showcase | `--surface-1` (slightly lighter) | Mixed | Per-showcase gradients | Projects are the "characters" |
| Final CTA | Gradient mesh (returns to hero) | White | Gradient CTA button | Full-circle closure |

### Color Rhythm

```
HERO (colorful) -> MANIFESTO (monochrome) -> JOURNEY (per-chapter color) -> SHOWCASE (per-project color) -> CTA (colorful)
```

This creates a **breathing pattern**: intensity -> rest -> build -> build -> intensity. The manifesto's monochrome is crucial -- it prevents color fatigue and makes subsequent sections feel fresh.

### Gradient Line in Chapter Journey

The vertical connecting line in the sticky sidebar uses a DYNAMIC gradient that shifts as the user scrolls:

```
Ch1 position: oklch(0.55 0.23 285) (violet)
Ch2 position: oklch(0.55 0.23 260) (blue)
Ch3 position: oklch(0.65 0.15 195) (cyan)
Ch4 position: oklch(0.6 0.17 160) (emerald)
Ch5 position: oklch(0.7 0.16 80) (amber)
Ch6 position: oklch(0.6 0.2 15) (rose)
Ch7 position: oklch(0.6 0.12 180) (teal)
Ch8 position: oklch(0.5 0.25 300) (purple)
```

The line gradient shifts to match the currently active chapter's color, creating a subtle but constant visual feedback.

---

## 6. Animation Choreography

### Animation Hierarchy

Animations are organized into 4 levels of prominence:

#### Level 1 -- HERO ANIMATIONS (high impact, seen once)

| Animation | Property | Duration | Easing | Trigger |
|-----------|----------|----------|--------|---------|
| Title word reveal | opacity, y | 500ms per word | Apple ease [0.4, 0, 0.2, 1] | Page load, 120ms stagger |
| Subtitle fade-in | opacity, y | 600ms | Apple ease | Delay 800ms |
| CTA buttons stagger | opacity, y | 400ms | Apple ease | Delay 1000ms, 120ms stagger |
| Scroll indicator bounce | y | 2000ms | easeInOut | Delay 2000ms, infinite |
| Gradient orbs pulse | scale, opacity | 8-12s | easeInOut | Immediate, infinite |
| Parallax exit | opacity, y (0.5x speed) | Scroll-driven | Linear | scroll > 0 |

#### Level 2 -- SCROLL-DRIVEN REVEALS (progressive disclosure)

| Animation | Property | Duration | Trigger |
|-----------|----------|----------|---------|
| Manifesto line reveal | opacity: [0,1], y: [20px, 0] | ~15% of section scroll per line | scrollYProgress thresholds |
| Chapter card entrance | opacity, y | 600ms | whileInView, once |
| Journey sidebar active indicator | y position | 300ms spring | Active chapter change |
| Journey progress line fill | scaleY: [0, 1] | Scroll-driven | scrollYProgress of journey section |
| Showcase card slide-in | opacity, x (alternating +-60px) | 600ms | whileInView, once |

#### Level 3 -- MICRO-INTERACTIONS (subtle, repeated)

| Animation | Property | Duration | Trigger |
|-----------|----------|----------|---------|
| Card hover lift | y: -4px | Spring (stiffness: 300, damping: 25) | Hover |
| Card border glow | border-color, box-shadow | 300ms ease | Hover |
| Button hover | scale: 1.02, glow intensify | Spring | Hover |
| Button press | scale: 0.97 | Spring | Active/tap |
| Nav link underline | scaleX: [0, 1], transform-origin: left | 200ms | Hover |
| Tag pill highlight | background-color shift | 200ms | Hover |

#### Level 4 -- AMBIENT (always running, very subtle)

| Animation | Property | Duration | Location |
|-----------|----------|----------|----------|
| Gradient orb breathing | scale, opacity | 8-12s | Hero, CTA only |
| Dot grid drift | backgroundPosition | 30s | Hero only |
| CTA button shimmer | background-position | 3s | CTA buttons |
| Journey line shimmer | opacity pulse | 4s | Chapter Journey sidebar |

### Performance Rules

1. **GPU-only properties**: All animations use `transform` and `opacity` exclusively
2. **Once triggers**: `whileInView` uses `viewport: { once: true }` for all entrance animations
3. **No layout thrashing**: Never animate width, height, margin, padding
4. **will-change hints**: Add `will-change: transform` on scroll-driven elements
5. **Reduced motion**: Respect `prefers-reduced-motion` -- disable all animations except opacity fades
6. **CSS for ambient**: Use CSS `@keyframes` for infinite ambient animations (lighter than Framer Motion for simple loops)

---

## 7. Section Transition Strategy

### How Sections Flow (No Hard Dividers)

**REMOVE** all `<div className="h-px" style={{ background: 'var(--gradient-divider)' }} />` dividers.

| Transition | Technique |
|-----------|-----------|
| Hero -> Manifesto | Hero gradient fades to pure black as user scrolls. Manifesto content begins appearing while hero is still partially visible (parallax overlap). |
| Manifesto -> Journey | After the stats line, a brief breathing space (80px padding). The journey's section label ("학습 여정") fades in. The sticky sidebar appears from the left. Background stays `surface-0`. |
| Journey -> Showcase | After the last chapter card, the sticky sidebar fades out. A 120px breathing space. Background gradually shifts from `surface-0` to `surface-1` via CSS gradient at the boundary. |
| Showcase -> CTA | After the last showcase card, the background begins shifting toward the CTA's gradient mesh. The gradient orbs fade in gradually. 80px breathing space. |

### Background Blending Technique

Instead of hard color changes, use a tall (200-300px) CSS gradient at section boundaries:

```css
.section-transition {
  background: linear-gradient(
    to bottom,
    var(--surface-0),
    var(--surface-1)
  );
  height: 200px;
  /* This sits between Journey and Showcase sections */
}
```

This creates an imperceptible color shift that prevents the "stacked boxes" feeling.

---

## 8. Implementation Priorities

### Phase A: Foundation (build first)

| Priority | Component | Dependencies |
|----------|-----------|-------------|
| A1 | `ManifestoLine` atom + `ScrollManifesto` organism | Framer Motion useScroll |
| A2 | `JourneyNode` + `ChapterEntry` molecules | IntersectionObserver |
| A3 | `ChapterJourney` organism (sticky sidebar) | A2, scroll tracking |

### Phase B: Refinement

| Priority | Component | Dependencies |
|----------|-----------|-------------|
| B1 | Update `CinematicHero` with parallax exit | Phase A complete |
| B2 | `ShowcaseSpotlight` with alternating layout | Phase A complete |
| B3 | Section transitions (remove dividers, add blending) | B1, B2 |

### Phase C: Polish

| Priority | Component | Dependencies |
|----------|-----------|-------------|
| C1 | Journey progress line gradient shifting | Phase B |
| C2 | Mobile responsive layouts (horizontal progress bar, stacked cards) | Phase B |
| C3 | Reduced motion support | Phase B |
| C4 | Light mode verification | Phase C1-C3 |

### Component Dependency Graph

```
Atoms (GradientText, ProgressDot, GradientLine, etc.)
  |
  v
Molecules (ManifestoLine, JourneyNode, ChapterEntry, ShowcaseCard)
  |
  v
Organisms (ScrollManifesto, ChapterJourney, ShowcaseSpotlight)
  |
  v
Template (HomepageTemplate -- new HomePage.tsx)
```

Build bottom-up: atoms first, then molecules, then organisms, then compose into the template.

---

## 9. Key Metrics for Success

How to know if the redesign worked:

| Metric | Current (Listing) | Target (Cinematic) |
|--------|-------------------|-------------------|
| Sections with unique layout | 0 (all grids) | 5 (each section unique) |
| Max items visible per viewport | 4-6 cards | 1-2 items |
| Scroll-driven animations | 0 | 3+ sections |
| Hard divider lines | 2 | 0 |
| Narrative coherence | None (disconnected sections) | 5-act story arc |
| Time-to-first-CTA-click | Low (no emotional build-up) | Higher (earned through story) |

---

## 10. Content Notes

### Manifesto Text Options

**Option A (Bold/Provocative)**:
```
에이전트는 단순한 챗봇이 아닙니다.
스스로 판단하고,
행동하고,
학습하는
새로운 형태의 소프트웨어입니다.

8개의 챕터 · 6개의 실전 프로젝트 · 50+개의 실습
```

**Option B (Journey-focused)**:
```
코드 한 줄에서 시작해
스스로 생각하는 에이전트를 만들기까지.
이것은 단순한 강의가 아닙니다.
당신의 개발 여정입니다.

8 Chapters · 6 Real Projects · 50+ Hands-on Labs
```

**Option C (Capability-focused)**:
```
검색하고, 분석하고, 실행합니다.
에이전트는 지시를 기다리지 않습니다.
스스로 판단하고 행동합니다.
그리고 이제, 당신이 만듭니다.
```

Recommend **Option A** for clarity and impact. It establishes what agents ARE before inviting the user to learn.

---

## Appendix: Reference Patterns

| Pattern | Source | How We Adapt It |
|---------|--------|-----------------|
| Scroll-driven text reveal | Apple iPhone pages | ScrollManifesto section |
| Sticky sidebar + scrolling content | Apple Mac Pro, Stripe docs | ChapterJourney section |
| Full-screen single-message sections | Linear.app | Hero, Manifesto, CTA |
| Alternating left/right feature cards | Notion features page | ShowcaseSpotlight section |
| Gradient mesh backgrounds | Linear.app, Vercel | Hero and CTA sections |
| Per-section unique visual identity | Apple.com/watch | Every section has its own layout |
| Progressive disclosure via scroll | Apple product pages | All sections use scroll-triggered reveals |
