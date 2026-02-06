# Premium Landing Page Design Patterns Research 2026

## Executive Summary

This research document provides comprehensive design patterns, specific CSS values, color palettes, and implementation guidance for premium dark-mode landing pages. All findings are based on current 2026 industry standards from top sites like Apple, Linear.app, Vercel, and modern SaaS platforms.

---

## 1. Hero Sections

### Typography Scale

**Display Headings (Hero Primary)**
- **Font size**: 56-80px (clamp: `clamp(56px, 8vw, 80px)`)
- **Font weight**: 700-800 (bold to extra bold)
- **Letter spacing**: -0.03em (tighter tracking for impact)
- **Line height**: 1.05-1.1 (compact for drama)
- **Max width**: 800-900px (for readability)
- **CSS Example**:
```css
.hero-title {
  font-size: clamp(56px, 8vw, 80px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  max-width: 800px;
}
```

**Hero Supporting Copy**
- **Font size**: 18-24px (clamp: `clamp(18px, 2.5vw, 24px)`)
- **Font weight**: 400-500 (regular to medium)
- **Line height**: 1.6-1.8 (generous for readability)
- **Max width**: 640-720px (narrower than title)
- **Color**: `rgba(255, 255, 255, 0.65)` (secondary text)

### Layout Techniques

**Full-Screen Hero**
- **Min height**: `100vh` or `min-h-screen`
- **Padding**: `py-20 md:py-32` (80px mobile, 128px desktop)
- **Centering**: Use flexbox with `items-center justify-center`

**Asymmetric Hero**
- **Left column**: 55-60% width, content-focused
- **Right column**: 40-45% width, visual/media
- **Gap**: 48-64px between columns

### CTA Button Styles

**Pill-Shaped Primary CTA**
```css
.cta-primary {
  padding: 14px 32px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #a78bfa 0%, #6a25f4 50%, #00f0ff 100%);
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 24px rgba(106, 37, 244, 0.35);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(106, 37, 244, 0.5);
}
```

**Secondary CTA (Ghost Style)**
```css
.cta-secondary {
  padding: 14px 32px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  font-size: 16px;
  font-weight: 600;
}
.cta-secondary:hover {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.08);
}
```

### Background Treatments

**Gradient Orbs**
```css
.hero-orb-1 {
  position: absolute;
  top: -200px; right: -100px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(106, 37, 244, 0.4) 0%, transparent 70%);
  filter: blur(80px);
  border-radius: 50%;
}
.hero-orb-2 {
  position: absolute;
  bottom: -150px; left: -150px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%);
  filter: blur(100px);
  border-radius: 50%;
}
```

---

## 2. Card/Bento Grids

### Common Configurations

**2-Column Asymmetric (60/40)**
```css
.bento-asymmetric {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
}
```

**4-Column Equal**
```css
.bento-equal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
```

**Masonry (Apple-style Bento)**
```css
.bento-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  grid-auto-rows: minmax(200px, auto);
}
.bento-card-large { grid-column: span 2; grid-row: span 2; }
.bento-card-tall { grid-row: span 2; }
.bento-card-wide { grid-column: span 2; }
```

### Card Styling

**Glass Morphism Cards**
```css
.bento-card {
  padding: 32px;
  border-radius: 24px;
  background: rgba(13, 15, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}
```

### Best Practices
- **Card padding**: 24-40px (smaller: 24-28px, hero cards: 36-40px)
- **Border radius**: 16-24px
- **Gap**: 16px mobile, 20px tablet, 24px desktop
- **Min card width**: 280-300px
- **Hero card span**: 2 cols x 2 rows

---

## 3. Typography Scale

| Level | Size | Weight | Letter Spacing | Line Height | Color |
|-------|------|--------|---------------|-------------|-------|
| Display | clamp(56px, 8vw, 80px) | 700-800 | -0.03em | 1.05 | rgba(255,255,255,0.95) |
| Section Heading | clamp(36px, 5vw, 48px) | 600-700 | -0.02em | 1.15 | rgba(255,255,255,0.95) |
| Subsection (H3) | clamp(24px, 3vw, 32px) | 600 | -0.01em | 1.25 | rgba(255,255,255,0.9) |
| Body Large | clamp(18px, 2vw, 20px) | 400 | normal | 1.7 | rgba(255,255,255,0.75) |
| Body | 15-16px | 400 | normal | 1.6 | rgba(255,255,255,0.65) |
| Body Small | 14px | 400 | normal | 1.5 | rgba(255,255,255,0.6) |
| Caption | 12-14px | 500-600 | 0.08em | 1.4 | rgba(255,255,255,0.5) |

---

## 4. Dark Mode Color Patterns

### Background Layers
```css
:root {
  --bg-base: #0a0a0b;
  --bg-elevated-1: #0f1117;
  --bg-elevated-2: #141419;
  --bg-elevated-3: #1a1a23;
  --bg-elevated-4: #1f1f2e;
}
```

### Accent Gradients
```css
.gradient-primary {
  background: linear-gradient(135deg, #a78bfa 0%, #6a25f4 50%, #00f0ff 100%);
}
.gradient-secondary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
}
```

### Glass Morphism
```css
.glass { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
.glass-strong { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(16px); }
```

### Text / Border / Shadow
```css
:root {
  --text-primary: rgba(255,255,255,0.95);
  --text-secondary: rgba(255,255,255,0.65);
  --text-muted: rgba(255,255,255,0.4);
  --border-subtle: rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.12);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.24);
  --shadow-glow: 0 4px 24px rgba(106,37,244,0.35);
}
```

---

## 5. Spacing System (8px Grid)

```css
:root {
  --space-1: 8px; --space-2: 16px; --space-3: 24px; --space-4: 32px;
  --space-5: 40px; --space-6: 48px; --space-8: 64px; --space-10: 80px;
  --space-12: 96px; --space-16: 128px; --space-20: 160px;
}
```

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section padding | 96-128px | 64-80px | 48-64px |
| Container max-width | 1280px | 1024px | 100% |
| Card gap | 24px | 20px | 16px |
| Content max-width | 640-720px | — | — |

---

## 6. Animation Patterns

### Scroll Reveal
```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};
```

### Stagger Children
```jsx
const container = { visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
```

### Counter: easeOut cubic, 1-2.5s duration
### Text Reveal: word-by-word, 80ms stagger per word
### Parallax: 20-60px subtle, 60-100px dramatic

### Easing Functions
```css
--ease-in-out-cubic: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 7. FAQ + CTA Sections

### FAQ: 2-Column Layout
- Left 40%: Section title + description
- Right 60%: Accordion items
- Accordion: border-bottom dividers, 24px padding, 18px question font
- Mobile: stack to single column

### CTA: Lamp/Gradient Effect
- Radial gradient orb (800x800px, blur 100px) centered above content
- Title: clamp(40px, 6vw, 56px)
- Guarantee microcopy: 14px, muted color, below buttons
- Examples: "14-day free trial • No credit card • Cancel anytime"

---

## Implementation Checklist

- Typography: clamp() responsive scaling
- Colors: CSS custom properties for all layers
- Spacing: 8px base unit
- Glass: backdrop-filter with fallbacks
- Gradients: radial-gradient + blur orbs
- Animations: scroll reveals with IntersectionObserver
- Bento: CSS Grid with asymmetric spans
- CTA Buttons: hover transforms + shadow
- Accessibility: reduced motion + focus states
- Performance: will-change, transform-based animations
