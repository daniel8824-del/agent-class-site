# Technical Research: Framer Motion 12 + Aceternity UI + Modern Animation Patterns

**Research Date:** 2026-02-06
**Target:** Agent Class Site Grand Design Renewal v4
**Stack:** React 19 + Framer Motion 12 + Tailwind CSS v4 + Aceternity UI Components

---

## Table of Contents

1. [Framer Motion 12 Scroll Animations](#framer-motion-12-scroll-animations)
2. [Aceternity UI Components](#aceternity-ui-components)
3. [Tailwind CSS v4 Features](#tailwind-css-v4-features)
4. [Animation Mapping by Section](#animation-mapping-by-section)
5. [Code Examples & Best Practices](#code-examples--best-practices)
6. [Performance Considerations](#performance-considerations)

---

## Framer Motion 12 Scroll Animations

### 1. `useScroll` Hook

Track scroll progress and create scroll-driven animations.

**API:**
```tsx
import { useScroll } from "framer-motion"

const { scrollYProgress, scrollY } = useScroll(ref, options)
```

**Options:**
- `container`: RefObject - Scroll container element
- `target`: RefObject - Element to track
- `offset`: [string, string] - Start/end offset (e.g., `["start end", "end start"]`)
- `layoutEffect`: boolean - Use layoutEffect instead of effect

**Complete Example with Spring Smoothing:**
```tsx
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

export const ScrollProgressBar = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  // Apply spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    restSpeed: 0.001,
  })

  // Transform scroll progress to SVG path length
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1])

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "scroll",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Progress bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          background: "white",
          scaleX,
          transformOrigin: "0% 0%",
        }}
      />

      {/* Circular progress indicator */}
      <svg style={{
        position: "fixed",
        top: 20,
        left: 20,
        width: 120,
        height: 120,
      }}>
        <motion.path
          fill="none"
          strokeWidth="5"
          stroke="white"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{ pathLength, rotate: 90 }}
        />
      </svg>

      {/* Content */}
      <div style={{ height: "200vh", padding: 20 }}>
        {/* Your content here */}
      </div>
    </div>
  )
}
```

**Best Use Cases:**
- Progress indicators
- Parallax backgrounds
- Scroll-linked hero animations
- Dynamic header shrinking/expanding

---

### 2. `useTransform` Hook

Map scroll progress to other values (opacity, scale, position, etc.).

**API:**
```tsx
import { useTransform } from "framer-motion"

const output = useTransform(input, inputRange, outputRange, options)
```

**Parallax Example:**
```tsx
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const ParallaxSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Background moves slower than foreground
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  return (
    <section ref={ref} style={{ height: "200vh", position: "relative" }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          y,
          opacity,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          height: "100vh"
        }}
      >
        <h1>Parallax Background</h1>
      </motion.div>
    </section>
  )
}
```

**Common Transforms:**
- **Fade out:** `useTransform(scrollYProgress, [0, 1], [1, 0])`
- **Scale up:** `useTransform(scrollYProgress, [0, 1], [0.8, 1])`
- **Rotate:** `useTransform(scrollYProgress, [0, 1], [0, 360])`
- **Translate:** `useTransform(scrollYProgress, [0, 1], ["0px", "100px"])`

---

### 3. `useInView` Hook (Viewport Detection)

Trigger animations when elements enter/leave viewport.

**API:**
```tsx
import { useInView } from "framer-motion"

const isInView = useInView(ref, options)
```

**Options:**
- `once`: boolean - Fire only once (default: false)
- `margin`: string - Trigger offset (e.g., "-100px")
- `amount`: number | "some" | "all" - Visibility threshold (0-1)

**Complete Example:**
```tsx
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export const FadeInWhenVisible = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.5
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

**Best Use Cases:**
- Fade-in cards/sections
- Staggered list items
- Counter animations
- Image reveal effects

---

### 4. `whileInView` Prop (Simplified Viewport Animation)

Shorthand for viewport-triggered animations without hooks.

**API:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.5, margin: "-100px" }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

**Viewport Options:**
- `once`: boolean - Animate only once
- `amount`: number | "some" | "all" - Visibility threshold
- `margin`: string - Root margin (like IntersectionObserver)
- `root`: RefObject - Custom scroll container

**Complete Example (Lamp Effect Recreation):**
```tsx
import { motion } from "framer-motion"

export const LampSection = () => {
  return (
    <section className="h-screen relative flex items-center justify-center bg-black">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-7xl font-bold text-transparent"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </section>
  )
}
```

**Best Use Cases:**
- Hero titles
- Feature cards
- Stats counters
- CTA sections

---

### 5. `useSpring` Hook (Spring Physics)

Apply spring physics to motion values for smooth, natural animations.

**API:**
```tsx
import { useSpring, useMotionValue } from "framer-motion"

const springValue = useSpring(sourceValue, config)
```

**Spring Config:**
```tsx
const springConfig = {
  stiffness: 300,    // Higher = faster/snappier
  damping: 28,       // Higher = less oscillation
  mass: 1,           // Higher = slower/heavier
  restDelta: 0.001,  // Stop threshold
  restSpeed: 0.001,  // Stop threshold
}
```

**Custom Cursor Example:**
```tsx
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"

const spring = {
  stiffness: 300,
  damping: 28,
  restDelta: 0.00001,
  restSpeed: 0.00001,
}

export const SpringCursor = () => {
  const xPoint = useMotionValue(0)
  const yPoint = useMotionValue(0)
  const x = useSpring(xPoint, spring)
  const y = useSpring(yPoint, spring)
  const ref = useRef(null)

  const onMove = ({ clientX, clientY }) => {
    const element = ref.current
    if (!element) return

    x.set(clientX - element.offsetLeft - element.offsetWidth / 2)
    y.set(clientY - element.offsetTop - element.offsetHeight / 2)
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: 100, height: 100, background: "yellow", x, y }}
      onPointerMove={onMove}
    >
      Spring Cursor
    </motion.div>
  )
}
```

**Recommended Spring Configs:**
- **Smooth scroll:** `{ stiffness: 100, damping: 30 }`
- **Bouncy button:** `{ stiffness: 400, damping: 15 }`
- **Slow elastic:** `{ stiffness: 50, damping: 20, mass: 2 }`
- **Apple-like:** `{ stiffness: 300, damping: 28, mass: 1 }`

---

### 6. Stagger Animations

Orchestrate sequential animations for multiple child elements.

**Variants Pattern:**
```tsx
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,   // Delay between each child
      delayChildren: 0.3,     // Delay before first child
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export const StaggeredList = ({ items }) => {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={item}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          {item.title}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

**useAnimate Pattern (Imperative):**
```tsx
import { useAnimate, stagger } from "framer-motion"
import { useEffect } from "react"

export const ImperativeStagger = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      ".card",
      { opacity: [0, 1], y: [50, 0] },
      { duration: 0.5, delay: stagger(0.1) }
    )
  }, [animate])

  return (
    <div ref={scope}>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  )
}
```

**Best Use Cases:**
- Feature cards grid
- Navigation menu items
- FAQ accordion items
- Showcase gallery

---

### 7. `layoutId` (Shared Layout Animations)

Animate elements across different layouts/positions.

**API:**
```tsx
<motion.div layoutId="unique-id">
  Content
</motion.div>
```

**Tab Switcher Example:**
```tsx
import { motion } from "framer-motion"
import { useState } from "react"

export const TabSwitcher = () => {
  const [selected, setSelected] = useState(0)
  const tabs = ["Home", "Features", "Pricing"]

  return (
    <div className="flex gap-2">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setSelected(i)}
          className="relative px-4 py-2"
        >
          {selected === i && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-purple-600 rounded-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  )
}
```

**Modal Example:**
```tsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export const CardToModal = () => {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            onClick={() => setSelected(item)}
            className="cursor-pointer"
          >
            <img src={item.image} alt={item.title} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={selected.id}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div className="bg-white rounded-xl p-8">
              <img src={selected.image} alt={selected.title} />
              <button onClick={() => setSelected(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

**Best Use Cases:**
- Tab indicators
- Card-to-modal expansions
- Navigation underlines
- Image gallery transitions

---

### 8. `AnimatePresence` (Exit Animations)

Animate components when they're removed from the React tree.

**API:**
```tsx
import { AnimatePresence } from "framer-motion"

<AnimatePresence mode="wait" initial={false} onExitComplete={() => {}}>
  {condition && <motion.div exit={{ opacity: 0 }}>Content</motion.div>}
</AnimatePresence>
```

**Modes:**
- `sync` (default): Animate exit and enter simultaneously
- `wait`: Wait for exit to complete before entering new component
- `popLayout`: Exiting components are removed from layout

**Complete Example:**
```tsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export const NotificationStack = () => {
  const [notifications, setNotifications] = useState([])

  return (
    <div className="fixed top-4 right-4 space-y-2">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            layout
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            {notif.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

**Best Use Cases:**
- Modal dialogs
- Notifications/toasts
- Route transitions
- Accordion panels

---

### 9. Text Reveal Animations

Animate text character-by-character or word-by-word.

**Word-by-Word Reveal:**
```tsx
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
}

const child = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export const TextReveal = ({ text }) => {
  const words = text.split(" ")

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="text-4xl font-bold"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
```

**Character-by-Character Reveal:**
```tsx
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    }
  }
}

const child = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut" }
  }
}

export const CharacterReveal = ({ text }) => {
  const characters = text.split("")

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-6xl font-bold"
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}
```

**Best Use Cases:**
- Hero headlines
- Feature titles
- Quote blocks
- Loading states

---

### 10. Apple-Style Scroll Animations

Recreate Apple's smooth scroll-linked animations.

**Key Principles:**
1. Use `position: sticky` for sections
2. Transform elements based on scroll progress
3. Apply smooth easing with springs
4. Use `will-change` for performance

**Complete Apple-Style Section:**
```tsx
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

export const AppleStyleSection = () => {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Apply spring for smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform properties
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2])
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1, 0])
  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"])

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
      style={{ willChange: "transform" }}
    >
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ scale, opacity, y, willChange: "transform, opacity" }}
      >
        <img src="/product.png" alt="Product" className="max-w-2xl" />
      </motion.div>
    </section>
  )
}
```

**Performance Tips:**
- Use `will-change: transform` on animated elements
- Avoid animating `width`, `height`, `top`, `left` (use `transform` instead)
- Use `useSpring` for smooth 60fps animations
- Debounce scroll listeners if using custom logic

---

## Aceternity UI Components

Pre-built animated components for rapid prototyping.

### Installation

All components use Shadcn CLI:
```bash
npx shadcn@latest add @aceternity/[component-name]
```

**Prerequisites:**
```bash
npm i motion clsx tailwind-merge
```

---

### 1. Bento Grid

Responsive grid layout with customizable spans.

**Installation:**
```bash
npx shadcn@latest add @aceternity/bento-grid
```

**Props:**

| Component | Prop | Type | Description |
|-----------|------|------|-------------|
| `BentoGrid` | `className` | string | Container CSS classes |
| `BentoGridItem` | `title` | string | Item heading |
| | `description` | string | Item description |
| | `header` | ReactNode | Header component |
| | `icon` | ReactNode | Icon element |
| | `className` | string | Item CSS classes (e.g., `"md:col-span-2"`) |

**Code Example:**
```tsx
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { IconBrandGithub } from "@tabler/icons-react"

const items = [
  {
    title: "AI-Powered Agents",
    description: "Build autonomous agents that learn and adapt",
    header: <Skeleton className="h-32" />,
    icon: <IconBrandGithub className="h-4 w-4" />,
  },
  // ... more items
]

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  )
}
```

**Layout Patterns:**
- 3-column responsive grid (default)
- Skewed grid with varied column spans
- Asymmetric layouts with `col-span-2`

**Best Use Cases:**
- Feature showcases
- Project portfolios
- Dashboard widgets
- Service offerings

---

### 2. 3D Card Effect

Perspective tilt effect on hover.

**Installation:**
```bash
npx shadcn@latest add @aceternity/3d-card
```

**Props:**

| Component | Prop | Type | Description |
|-----------|------|------|-------------|
| `CardContainer` | `children` | ReactNode | Child elements |
| | `className` | string | Container CSS classes |
| | `containerClassName` | string | Outer wrapper classes |
| `CardBody` | `children` | ReactNode | Card content |
| | `className` | string | Body CSS classes |
| `CardItem` | `as` | ElementType | HTML tag (default: "div") |
| | `children` | ReactNode | Item content |
| | `className` | string | Item CSS classes |
| | `translateX/Y/Z` | number/string | 3D translations |
| | `rotateX/Y/Z` | number/string | 3D rotations |

**Code Example:**
```tsx
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 dark:bg-black rounded-xl p-6 border border-black/[0.1]">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/thumbnail.png"
            className="h-60 w-full object-cover rounded-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ={20}
          as="button"
          className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
        >
          Sign up
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}
```

**How It Works:**
- Mouse position triggers dynamic `transform: perspective()` + `rotateX/Y()`
- `translateZ` creates depth layers
- Higher `translateZ` values = more pronounced lift effect

**Best Use Cases:**
- Product cards
- Blog post cards
- Testimonials
- Portfolio items

---

### 3. Tracing Beam

Animated beam that follows scroll progress.

**Installation:**
```bash
npx shadcn@latest add @aceternity/tracing-beam
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `className` | string | Wrapper CSS classes |
| `children` | ReactNode | Content to trace |

**Code Example:**
```tsx
import { TracingBeam } from "@/components/ui/tracing-beam"

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {content.map((item, index) => (
          <div key={index} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>
            <p className="text-xl mb-4">{item.title}</p>
            <div className="text-sm prose prose-sm dark:prose-invert">
              {item.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  className="rounded-lg mb-4"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  )
}
```

**Key Features:**
- SVG path animation synchronized with scroll
- Beam length adjusts based on scroll velocity
- Dark mode support
- Minimal configuration

**Best Use Cases:**
- Blog post layouts
- Timeline narratives
- Case study pages
- Tutorial steps

---

### 4. Text Generate Effect

Word-by-word text reveal on page load.

**Installation:**
```bash
npx shadcn@latest add @aceternity/text-generate-effect
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `className` | string | Wrapper CSS classes |
| `words` | string | Text content to animate |
| `duration` | number | Animation duration (seconds) |
| `filter` | boolean | Apply filter effects |

**Code Example:**
```tsx
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

const words = `Oxygen gets you high. In a catastrophic emergency, we're taking
giant, panicked breaths. Suddenly you become euphoric, docile. You accept
your fate. It's all right here.`

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} duration={2} filter={true} />
}
```

**How It Works:**
- Splits text into words
- Animates each word with stagger delay
- Uses motion library for smooth transitions
- Optional blur/filter effects

**Best Use Cases:**
- Hero taglines
- Quote blocks
- Feature descriptions
- Loading messages

---

### 5. Lamp Effect

Gradient spotlight effect for section headers.

**Installation:**
```bash
npx shadcn@latest add @aceternity/lamp
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Content to display |
| `className` | string | Container CSS classes |

**Code Example:**
```tsx
import { motion } from "motion/react"
import { LampContainer } from "@/components/ui/lamp"

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  )
}
```

**Animation Settings:**
- **Initial:** 50% opacity, 100px down
- **Final:** 100% opacity, natural position
- **Duration:** 0.8s with easeInOut
- **Delay:** 0.3s
- **Gradient:** Slate 300→500 with text clipping

**Best Use Cases:**
- Section headers
- Hero titles
- CTA headlines
- Feature announcements

---

### 6. Timeline

Vertical timeline with scroll beam and sticky headers.

**Installation:**
```bash
npx shadcn@latest add @aceternity/timeline
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `TimelineEntry[]` | Yes | Array of timeline entries |

**TimelineEntry Type:**
```tsx
type TimelineEntry = {
  title: string;
  content: React.ReactNode;
}
```

**Code Example:**
```tsx
import { Timeline } from "@/components/ui/timeline"

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Built and launched Aceternity UI and Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/template1.png"
              alt="template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="/template2.png"
              alt="template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Started working on Tailwind Master Kit
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  )
}
```

**Key Features:**
- Sticky header positioning
- Scroll-linked beam animation
- Rich content support (text, images, videos)
- Dark mode compatible

**Best Use Cases:**
- Company history
- Project roadmap
- Product evolution
- Learning journey

---

### 7. Sparkles

Configurable particle effect background.

**Installation:**
```bash
npx shadcn@latest add @aceternity/sparkles
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `id` | string | Component identifier |
| `className` | string | CSS classes |
| `background` | string | Background color |
| `particleSize` | number | Particle dimensions |
| `minSize` | number | Min particle size |
| `maxSize` | number | Max particle size |
| `speed` | number | Animation velocity |
| `particleColor` | string | Particle color |
| `particleDensity` | number | Particle concentration |

**Code Example:**
```tsx
import { SparklesCore } from "@/components/ui/sparkles"

export function SparklesPreview() {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Aceternity
      </h1>
      <div className="w-[40rem] h-40 relative">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  )
}
```

**Best Use Cases:**
- Hero backgrounds
- Interactive sections
- Loading states
- Ambient effects

---

### 8. Background Beams

Animated SVG beams for hero backgrounds.

**Installation:**
```bash
npx shadcn@latest add @aceternity/background-beams
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `className` | string | CSS classes |

**Code Example:**
```tsx
import { BackgroundBeams } from "@/components/ui/background-beams"

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  )
}
```

**Key Features:**
- SVG-based beam paths
- Animated along paths
- Zero configuration
- Dark mode optimized

**Best Use Cases:**
- Hero sections
- Sign-up pages
- Landing page headers
- Feature announcements

---

### 9. 3D Pin

Gradient pin with hover animation.

**Installation:**
```bash
npx shadcn@latest add @aceternity/3d-pin
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `className` | string | Child CSS classes |
| `containerClassName` | string | Container CSS classes |
| `title` | string/ReactNode | Hover tooltip text |
| `href` | string | Link URL |
| `children` | ReactNode | Pin content |

**Code Example:**
```tsx
import { PinContainer } from "@/components/ui/3d-pin"

export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
      <PinContainer
        title="/ui.aceternity.com"
        href="https://twitter.com/mannupaaji"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Aceternity UI
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              Customizable Tailwind CSS and Framer Motion Components.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  )
}
```

**Best Use Cases:**
- Product showcases
- Link cards
- Portfolio items
- Featured content

---

## Tailwind CSS v4 Features

### 1. OKLCH Colors

Tailwind v4 uses OKLCH color space for more vivid, uniform colors.

**Benefits:**
- Wider gamut than sRGB
- Perceptually uniform brightness
- More vibrant colors
- Better gradients

**Usage:**
```tsx
// Direct OKLCH
<div className="bg-[oklch(70%_0.2_180)]">Cyan</div>

// Tailwind v4 colors (already OKLCH)
<div className="bg-blue-500">Blue</div>

// Gradient interpolation
<div className="bg-linear-to-r/oklch from-purple-500 to-cyan-500">
  Gradient
</div>
```

**Color Palette Generator:**
Use [uicolors.app/tailwind-colors](https://uicolors.app/tailwind-colors) for OKLCH-based custom palettes.

---

### 2. Container Queries

Built into core (no plugin needed).

**Usage:**
```tsx
<div className="@container">
  <div className="@md:grid-cols-2 @lg:grid-cols-3 grid">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
  </div>
</div>
```

**Variants:**
- `@min-*`: Min-width container query
- `@max-*`: Max-width container query
- Stack: `@min-md @max-lg` for ranges

**Best Use Cases:**
- Component-based responsive design
- Card grids that adapt to container size
- Sidebar layouts
- Reusable UI components

---

### 3. Dark Mode Patterns

Tailwind v4 dark mode with OKLCH gradients.

**Gradient Examples:**
```tsx
// Dark mode gradient (neutral)
<div className="bg-gradient-to-b from-neutral-200 to-neutral-600 dark:from-neutral-800 dark:to-neutral-950">
  Content
</div>

// Vibrant gradient (OKLCH interpolation)
<div className="bg-linear-to-r/oklch from-purple-500 via-pink-500 to-orange-500">
  Gradient Text
</div>

// Glass morphism
<div className="bg-black/60 backdrop-blur-xl border border-white/10">
  Glass Card
</div>
```

**Text Gradients:**
```tsx
<h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent">
  Gradient Title
</h1>
```

---

### 4. Custom CSS Variables

Tailwind v4 allows CSS variables in config.

**Example:**
```css
@theme {
  --color-brand: oklch(70% 0.2 240);
  --color-accent: oklch(80% 0.15 180);
}
```

**Usage:**
```tsx
<div className="bg-[var(--color-brand)] text-white">
  Brand Color
</div>
```

---

## Animation Mapping by Section

Recommended techniques for each landing page section.

| Section | Animation Technique | Framer Motion API | Aceternity Component |
|---------|---------------------|-------------------|----------------------|
| **Hero** | Text reveal + parallax background | `whileInView`, `useScroll`, `useTransform` | Lamp, Background Beams, Sparkles |
| **Features Grid** | Stagger container + fade-up | `variants` with `staggerChildren`, `whileInView` | Bento Grid |
| **Feature Cards** | 3D tilt on hover | `whileHover`, `useSpring` | 3D Card Effect |
| **Stats/Counters** | Number counter on viewport enter | `useInView` + `useSpring` | Custom counter |
| **Timeline** | Scroll-linked beam | `useScroll`, `useTransform` | Timeline, Tracing Beam |
| **Gallery/Showcase** | Shared layout transitions | `layoutId`, `AnimatePresence` | Custom grid |
| **Testimonials** | Horizontal scroll with snap | `useScroll`, `useTransform` | Custom carousel |
| **CTA Section** | Lamp effect + button pulse | `whileInView`, `whileHover` | Lamp |
| **FAQ Accordion** | Expand/collapse with height animation | `AnimatePresence`, `layout` | Custom accordion |
| **Footer** | Fade-in on scroll | `whileInView` | Custom footer |

---

## Code Examples & Best Practices

### 1. Complete Hero Section

Combines text reveal, parallax background, and scroll indicator.

```tsx
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { SparklesCore } from "@/components/ui/sparkles"

export const HeroSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  })

  const y = useTransform(smoothProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(smoothProgress, [0, 1], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-black"
    >
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ y, opacity }}
      >
        {/* Background Effects */}
        <BackgroundBeams />
        <div className="absolute inset-0 w-full h-40">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <TextReveal text="Build AI Agents That Scale" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-neutral-400 text-xl text-center mt-6"
          >
            From zero to production in minutes
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold mx-auto block"
          >
            Get Started
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Text Reveal Component (word-by-word)
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  }
}

const child = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
}

const TextReveal = ({ text }) => {
  const words = text.split(" ")
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-7xl font-bold text-center text-white"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-3">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}
```

---

### 2. Feature Cards with Stagger + 3D Effect

```tsx
import { motion } from "framer-motion"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { useInView } from "framer-motion"
import { useRef } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

export const FeaturesGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      title: "Real-time Collaboration",
      description: "Work together seamlessly across teams",
      icon: "🤝"
    },
    {
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations",
      icon: "🧠"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance",
      icon: "🔒"
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-neutral-950">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, i) => (
          <motion.div key={i} variants={item}>
            <CardContainer>
              <CardBody className="bg-neutral-900 border border-white/[0.05] rounded-xl p-8">
                <CardItem
                  translateZ="50"
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </CardItem>
                <CardItem
                  translateZ="60"
                  className="text-2xl font-bold text-white mb-4"
                >
                  {feature.title}
                </CardItem>
                <CardItem
                  translateZ="70"
                  className="text-neutral-400"
                >
                  {feature.description}
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

---

### 3. Scroll-Linked Stats Counter

```tsx
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useSpring(0, {
    stiffness: 50,
    damping: 30
  })
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  return (
    <motion.span ref={ref}>
      <motion.span>{rounded}</motion.span>
    </motion.span>
  )
}

export const StatsSection = () => {
  const stats = [
    { label: "Active Users", value: 50000, suffix: "+" },
    { label: "Projects", value: 120000, suffix: "+" },
    { label: "Success Rate", value: 99, suffix: "%" },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
          >
            <div className="text-6xl font-bold bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              <AnimatedNumber value={stat.value} />
              {stat.suffix}
            </div>
            <div className="text-neutral-400 mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

---

### 4. FAQ Accordion with AnimatePresence

```tsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does pricing work?",
      answer: "We offer flexible pricing based on your usage. Start free and scale as you grow."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! Get started with our free tier. No credit card required."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. Cancel anytime with one click. No questions asked."
    },
  ]

  return (
    <section className="py-20 px-4 bg-neutral-950">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center text-white mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900 border border-white/[0.05] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center text-white font-medium"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-neutral-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Performance Considerations

### 1. Optimization Tips

**Use `will-change` sparingly:**
```tsx
<motion.div style={{ willChange: "transform" }}>
  {/* Only on elements that will definitely animate */}
</motion.div>
```

**Prefer `transform` over `top/left/width/height`:**
```tsx
// ✅ Good (GPU accelerated)
<motion.div animate={{ x: 100, scale: 1.2 }} />

// ❌ Bad (CPU intensive)
<motion.div animate={{ left: 100, width: 200 }} />
```

**Use `layout` prop for layout animations:**
```tsx
<motion.div layout className="w-full">
  {/* Automatically animates layout changes */}
</motion.div>
```

**Debounce scroll listeners:**
```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
})

// Spring smoothing automatically debounces
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30
})
```

---

### 2. Code Splitting

Lazy load heavy animations:
```tsx
import { lazy, Suspense } from "react"

const HeavyAnimation = lazy(() => import("./HeavyAnimation"))

export const Page = () => (
  <Suspense fallback={<Skeleton />}>
    <HeavyAnimation />
  </Suspense>
)
```

---

### 3. Reduce Motion Support

Respect user preferences:
```tsx
import { useReducedMotion } from "framer-motion"

export const Component = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
    >
      Content
    </motion.div>
  )
}
```

---

## Sources

### Framer Motion Documentation
- [Context7: Framer Motion Examples](https://context7.com/grx7/framer-motion/llms.txt)
- [Motion.dev Documentation](https://motion.dev/docs/react-scroll-animations)

### Aceternity UI Components
- [Bento Grid - Aceternity UI](https://ui.aceternity.com/components/bento-grid)
- [3D Card Effect - Aceternity UI](https://ui.aceternity.com/components/3d-card-effect)
- [Tracing Beam - Aceternity UI](https://ui.aceternity.com/components/tracing-beam)
- [Text Generate Effect - Aceternity UI](https://ui.aceternity.com/components/text-generate-effect)
- [Lamp Effect - Aceternity UI](https://ui.aceternity.com/components/lamp-effect)
- [Timeline - Aceternity UI](https://ui.aceternity.com/components/timeline)
- [Sparkles - Aceternity UI](https://ui.aceternity.com/components/sparkles)
- [Background Beams - Aceternity UI](https://ui.aceternity.com/components/background-beams)
- [3D Pin - Aceternity UI](https://ui.aceternity.com/components/3d-pin)
- [Aceternity UI Homepage](https://ui.aceternity.com/)

### Tailwind CSS v4
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4)
- [OKLCH Colors for Tailwind](https://uicolors.app/tailwind-colors)
- [OKLCH CSS Variables Guide](https://kyrylo.org/css/2025/02/09/oklch-css-variables-for-tailwind-v4-colors.html)

### Animation Techniques
- [Framer Motion Text Animations](https://ui.indie-starter.dev/docs/text-animation)
- [Apple's Parallax Effect Breakdown](https://www.protopie.io/blog/parallax-effect)
- [Apple Product Page Animations Tutorial](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)
- [Builder.io: Parallax Scrolling 2026](https://www.builder.io/blog/parallax-scrolling-effect)

---

## Next Steps

1. **Phase 5 Implementation**: Use this reference to implement animations in agent-class-site redesign
2. **Stitch Integration**: Export Stitch screens and apply Framer Motion animations
3. **Performance Testing**: Profile animations with React DevTools
4. **A/B Testing**: Compare animation variants for user engagement

---

**End of Technical Research Document**
