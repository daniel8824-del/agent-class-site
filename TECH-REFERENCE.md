# Tech Reference -- Agent Class Site Redesign

Generated from Context7 documentation queries. Stack: React 19, Framer Motion 12 (Motion), Tailwind CSS v4, shadcn/ui.

---

## 1. Framer Motion 12 (Motion)

### Import Path (CRITICAL)

Motion v12 has rebranded. The **recommended** import is:

```tsx
import { motion, AnimatePresence } from "motion/react"
```

The legacy `framer-motion` package still works but `motion/react` is the canonical path going forward. Install via:

```bash
npm install motion
```

> **Memory note**: Our MEMORY.md says "import from `framer-motion` (not `motion/react`)". This was true for earlier versions but Motion v12 docs now recommend `motion/react`. **Use `motion/react` for new code.**

### Scroll-Linked Animations

```tsx
import { useScroll, useTransform, motion } from "motion/react"

function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  return <motion.div style={{ y, opacity }}>...</motion.div>
}
```

**Element-scoped scroll tracking:**

```tsx
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]  // when element enters/exits viewport
})
```

### Layout Animations

```tsx
// Basic layout animation -- animates position/size changes
<motion.div layout />

// Position only (skip size animation)
<motion.div layout="position" />

// Shared element transitions via layoutId
{isSelected && <motion.div layoutId="underline" />}

// In scrollable containers, add layoutScroll
<motion.div layoutScroll style={{ overflow: "scroll" }}>
  <motion.div layout />
</motion.div>
```

**Key props:**
| Prop | Type | Purpose |
|------|------|---------|
| `layout` | `boolean \| "position" \| "size"` | Enable layout animations |
| `layoutId` | `string` | Shared element matching across renders |
| `layoutDependency` | `any` | Only re-measure when this changes (perf) |
| `layoutScroll` | `boolean` | Correct measurements inside scroll containers |
| `layoutRoot` | `boolean` | Mark as position:fixed for correct calculations |

### Gesture Animations

```tsx
<motion.button
  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
/>
```

**With variants (propagates to children):**

```tsx
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

<motion.button whileTap="tap" whileHover="hover" variants={buttonVariants}>
  <motion.svg variants={iconVariants} />  {/* auto-inherits */}
</motion.button>
```

### AnimatePresence (Exit Animations)

```tsx
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"                         // key is REQUIRED
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    />
  )}
</AnimatePresence>
```

**Modes:**
- `"sync"` (default) -- enter/exit simultaneously
- `"wait"` -- new child waits for old to exit first
- `"popLayout"` -- exiting child popped out of flow, siblings reflow immediately

**Props:**
- `initial={false}` -- skip initial animation on first render
- `onExitComplete` -- callback when all exits finish

### Spring vs Easing

```tsx
// Spring (physics-based, natural feel) -- PREFERRED for UI
<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>

// Tween (duration-based)
<motion.div
  animate={{ opacity: 1 }}
  transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
/>
```

**Quick spring presets:**
- Snappy: `{ type: "spring", stiffness: 400, damping: 30 }`
- Smooth: `{ type: "spring", stiffness: 200, damping: 25 }`
- Bouncy: `{ type: "spring", stiffness: 300, damping: 15 }`

### Performance Best Practices

1. **Animate transform/opacity only** -- these are GPU-composited. Avoid animating `width`, `height`, `top`, `left`.
2. **Use `layout` prop** instead of manually animating width/height.
3. **`layoutDependency`** -- limit re-measurement to only when needed.
4. **`will-change: transform`** -- Motion adds this automatically for animated elements. Don't add it manually.
5. **Don't use `transform: translate(-50%, -50%)` on motion.div** -- use flexbox centering instead (causes conflicts with Motion's internal transform).
6. **Reduce motion**: respect `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from "motion/react"

function Component() {
  const shouldReduce = useReducedMotion()
  return <motion.div animate={{ scale: shouldReduce ? 1 : 1.2 }} />
}
```

---

## 2. React 19

### ref as Prop (No More forwardRef)

```tsx
// React 19 -- ref is just a prop
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />
}

// Usage -- no forwardRef wrapper needed
<MyInput ref={myRef} />
```

**Migration**: Remove `forwardRef` wrappers. Destructure `ref` directly from props.

### useActionState (replaces useFormState)

```tsx
import { useActionState } from "react"

function AddToCartForm({ itemID, itemTitle }) {
  const [message, formAction, isPending] = useActionState(addToCart, null)
  return (
    <form action={formAction}>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add to Cart"}
      </button>
      {message}
    </form>
  )
}
```

**Signature**: `const [state, formAction, isPending] = useActionState(action, initialState)`

### useFormStatus

```tsx
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>Submit</button>
}
```

> Must be used inside a `<form>` -- reads status of the parent form.

### use() Hook

```tsx
import { use } from "react"

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise)  // suspends until resolved
  return comments.map(c => <p key={c.id}>{c.text}</p>)
}
```

- Can be called conditionally (unlike other hooks)
- Works with Promises and Context
- Replaces `useContext`: `const theme = use(ThemeContext)`

### useOptimistic

```tsx
import { useOptimistic } from "react"

function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  )
  // Show optimistic state immediately, revert if server fails
}
```

### Performance Patterns

```tsx
import { useMemo, useCallback } from "react"

function ProductPage({ productId, referrer }) {
  const product = useData("/product/" + productId)

  // Cache computed values
  const requirements = useMemo(() => computeRequirements(product), [product])

  // Cache callbacks passed to children
  const handleSubmit = useCallback((orderDetails) => {
    post("/product/" + productId + "/buy", { referrer, orderDetails })
  }, [productId, referrer])

  return <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
}
```

**Rules of thumb:**
- `useMemo`/`useCallback` only when passing to memoized children or expensive computations
- React 19 compiler (if enabled) auto-memoizes -- manual memoization may become unnecessary
- Prefer component composition over memoization where possible

---

## 3. Tailwind CSS v4

### CSS-First Configuration (No tailwind.config.js)

Tailwind v4 uses CSS `@theme` directive instead of `tailwind.config.js`:

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.72 0.11 178);
  --color-brand-dark: oklch(0.55 0.11 178);
  --font-display: "Inter", sans-serif;
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;
}
```

### @theme vs :root

| Use | When |
|-----|------|
| `@theme { }` | Design tokens that should generate utility classes (e.g., `bg-brand`, `text-brand`) |
| `:root { }` | CSS variables NOT connected to utility classes |
| `@theme inline { }` | Map existing CSS vars to Tailwind utilities (used by shadcn/ui) |

### oklch() Colors

Tailwind v4 uses oklch for all built-in colors -- perceptually uniform color space:

```css
@theme {
  --color-mint-500: oklch(0.72 0.11 178);
  /* oklch(lightness chroma hue) */
  /* lightness: 0-1, chroma: 0-0.4, hue: 0-360 */
}
```

### Container Queries (Built-in)

No plugin needed in v4:

```html
<!-- Mark parent as container -->
<div class="@container">
  <!-- Respond to container width, not viewport -->
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3">
    ...
  </div>
</div>
```

**Custom container sizes:**

```css
@theme {
  --container-8xl: 96rem;
}
```

```html
<div class="@container">
  <div class="@8xl:flex-row">...</div>
</div>
```

### Custom Breakpoints

```css
@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

> All breakpoints must use the same unit (rem recommended).

### Dark Mode

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

Generated CSS uses `@media (prefers-color-scheme: dark)` by default.

For class-based dark mode (toggle):

```css
@custom-variant dark (&:is(.dark *));
```

### Vite Setup

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss()]
})
```

```css
/* app.css */
@import "tailwindcss";
```

---

## 4. shadcn/ui

### Theming Architecture

shadcn/ui uses CSS variables with oklch colors, mapped to Tailwind via `@theme inline`:

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Key Patterns

- **Color naming**: semantic names (`primary`, `muted`, `accent`) not literal (`blue`, `gray`)
- **Foreground convention**: every color has a `-foreground` variant for text on that background
- **`@theme inline`**: bridges `:root` CSS vars to Tailwind utility classes (e.g., `bg-primary`, `text-muted-foreground`)
- **`tw-animate-css`**: animation package for enter/exit animations
- **`@custom-variant dark`**: enables class-based dark mode toggling

### Component Usage Pattern

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default">Click</Button>
    <Button variant="secondary">Alt</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="outline">Outline</Button>
  </CardContent>
</Card>
```

### Adding Animation to shadcn Components

Combine with Motion for enhanced interactions:

```tsx
import { motion } from "motion/react"
import { Card } from "@/components/ui/card"

const MotionCard = motion.create(Card)

<MotionCard
  whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
>
  ...
</MotionCard>
```

---

## 5. Things to Avoid

### Motion / Framer Motion
- Do NOT use `transform: translate(-50%, -50%)` on `motion.div` -- conflicts with internal transforms. Use flexbox.
- Do NOT animate `width`/`height` directly -- use `layout` prop instead.
- Do NOT add `will-change` manually -- Motion handles it.
- Do NOT forget `key` prop on `AnimatePresence` children.
- Do NOT use `mode="wait"` with multiple simultaneous children -- it only renders one at a time.

### React 19
- `forwardRef` still works but is unnecessary -- migrate to ref-as-prop.
- `useFormState` is renamed to `useActionState` -- use the new name.
- `useFormStatus` must be inside a `<form>` -- it reads the parent form's status.

### Tailwind CSS v4
- Do NOT mix units in `--breakpoint-*` (use rem consistently).
- Do NOT use `tailwind.config.js` -- use `@theme` in CSS instead.
- `@theme` is NOT the same as `:root` -- @theme generates utility classes, :root doesn't.
- Do NOT nest `@theme` inside selectors or media queries -- it must be top-level.

### shadcn/ui
- Do NOT hardcode colors -- always use CSS variable tokens (`bg-primary`, not `bg-black`).
- Do NOT override component internals -- compose/extend via className prop.
- Ensure `@custom-variant dark (&:is(.dark *))` is present for dark mode toggle to work.

---

## 6. Quick Import Cheatsheet

```tsx
// Motion (v12)
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react"

// React 19
import { use, useOptimistic, useMemo, useCallback, useRef, useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

// shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

// Tailwind -- no JS imports, CSS only
// @import "tailwindcss"; in your CSS file
```
