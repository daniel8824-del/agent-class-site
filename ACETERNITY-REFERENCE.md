# Aceternity UI Component Reference

Research from Context7 MCP documentation. Components selected for Agent Class Site redesign.

---

## Installation & Dependencies

### Core Dependencies

```bash
npm i motion clsx tailwind-merge
```

### Utility Function (required by all components)

```typescript
// lib/utils.ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Component Installation (shadcn CLI)

Each component can be installed individually via the shadcn CLI:

```bash
npx shadcn@latest add @aceternity/3d-card
npx shadcn@latest add @aceternity/text-generate-effect
npx shadcn@latest add @aceternity/spotlight-new
npx shadcn@latest add @aceternity/tracing-beam
npx shadcn@latest add @aceternity/timeline
npx shadcn@latest add @aceternity/bento-grid
npx shadcn@latest add @aceternity/lamp
```

> These commands copy component source into your project (not node_modules). You own the code and can modify freely.

---

## 1. 3D Card Effect

**Use case**: Feature cards, showcase items, interactive hover reveals.

**Components**: `CardContainer`, `CardBody`, `CardItem`

**How it works**: CSS perspective + mouse-tracking rotation. Items inside `CardBody` get different `translateZ` values to create parallax depth layers.

### Props

| Component | Prop | Type | Description |
|-----------|------|------|-------------|
| `CardItem` | `translateZ` | `string \| number` | Z-axis depth (higher = more "pop") |
| `CardItem` | `translateX` | `number` | X-axis offset on hover |
| `CardItem` | `rotateX` | `number` | Rotation around X axis |
| `CardItem` | `rotateZ` | `number` | Rotation around Z axis |
| `CardItem` | `as` | `string` | HTML element to render (default: `div`) |

### Usage

```tsx
import { CardBody, CardContainer, CardItem } from "@aceternity/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card w-auto rounded-xl p-6 border">
        <CardItem
          translateZ="100"
          className="w-auto mt-4"
        >
          <img
            src="/showcase-image.jpg"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          as="p"
          translateZ="20"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="rounded-xl text-xs font-normal px-4 py-2"
          >
            Try now
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            className="rounded-xl bg-neutral-900 dark:bg-white px-4 py-2 text-white dark:text-black text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
```

### With Rotation

```tsx
<CardItem rotateX={20} rotateZ={-5} translateZ="50">
  Make things float in air
</CardItem>
<CardItem as="p" rotateX={-10} rotateZ={15} translateZ="60">
  Hover over this card to unleash the power of CSS perspective
</CardItem>
```

**Applicable to**: Showcase cards on landing page, chapter preview cards.

---

## 2. Text Generate Effect

**Use case**: Hero headings, section introductions, dramatic text reveals.

**Component**: `TextGenerateEffect`

**How it works**: Splits text into words, animates each word with staggered opacity + optional blur filter using framer-motion.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `words` | `string` | required | Text content to animate |
| `duration` | `number` | `1000` | Animation duration in ms |
| `filter` | `boolean` | `true` | Apply blur-to-clear filter effect |
| `className` | `string` | - | Additional styling |

### Usage

```tsx
import { TextGenerateEffect } from "@aceternity/text-generate-effect";

export default function HeroSection() {
  return (
    <TextGenerateEffect
      words="Build AI agents that think, plan, and execute autonomously"
      duration={800}
      filter={true}
      className="text-4xl font-bold text-foreground"
    />
  );
}
```

**Applicable to**: Homepage hero headline, chapter title reveals, manifesto section.

---

## 3. Spotlight (New)

**Use case**: Hero backgrounds, feature sections, ambient lighting effects.

**Component**: `Spotlight` (spotlight-new variant)

**How it works**: SVG-based radial gradient that follows cursor or animates on its own. Configurable left/right placement. Less heavy than the original spotlight.

### Installation

```bash
npx shadcn@latest add @aceternity/spotlight-new
```

### Usage

```tsx
import { Spotlight } from "@aceternity/spotlight-new";

export function HeroWithSpotlight() {
  return (
    <div className="relative overflow-hidden">
      <Spotlight />
      <div className="relative z-10">
        <h1>Your content here</h1>
      </div>
    </div>
  );
}
```

**Also available**: Card Spotlight (`@aceternity/card-spotlight`) -- a card variant with spotlight on hover revealing radial gradient background.

**Applicable to**: Homepage hero section ambient lighting, dark sections.

---

## 4. Tracing Beam

**Use case**: Content reading experience, scroll progress indicators, article sidebars.

**Component**: `TracingBeam`

**How it works**: A vertical beam/line on the left side that traces scroll progress using framer-motion's scroll tracking. Shows how far the user has read.

### Installation

```bash
npx shadcn@latest add @aceternity/tracing-beam
```

### Usage

```tsx
import { TracingBeam } from "@aceternity/tracing-beam";

export function ChapterContent({ children }) {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </TracingBeam>
  );
}
```

**Applicable to**: Chapter reading pages (scroll progress), showcase detail pages.

---

## 5. Timeline

**Use case**: Roadmaps, learning paths, course progression, changelog.

**Component**: `Timeline`

**How it works**: Vertical timeline with sticky headers per entry. Scroll beam follows scroll position. Each entry has a title (sticky) and content (any React node).

### Data Structure

```typescript
type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};
```

### Installation

```bash
npx shadcn@latest add @aceternity/timeline
```

### Usage

```tsx
import { Timeline } from "@aceternity/timeline";

const data: TimelineEntry[] = [
  {
    title: "Chapter 1",
    content: (
      <div>
        <h3 className="text-lg font-semibold">Introduction to AI Agents</h3>
        <p className="text-muted-foreground">
          Understanding the fundamentals of autonomous agents...
        </p>
      </div>
    ),
  },
  {
    title: "Chapter 2",
    content: (
      <div>
        <h3 className="text-lg font-semibold">Agent Architecture</h3>
        <p className="text-muted-foreground">
          Building blocks of intelligent systems...
        </p>
      </div>
    ),
  },
];

export function CourseTimeline() {
  return <Timeline data={data} />;
}
```

**Applicable to**: Course roadmap on homepage, chapter progression overview.

---

## 6. Bento Grid

**Use case**: Feature showcases, dashboard layouts, content grids with mixed sizes.

**Components**: `BentoGrid`, `BentoGridItem`

**How it works**: CSS Grid-based layout with configurable span sizes. Each item has header, title, description, and icon slots.

### Installation

```bash
npx shadcn@latest add @aceternity/bento-grid
```

### Usage

```tsx
import { BentoGrid, BentoGridItem } from "@aceternity/bento-grid";

const items = [
  {
    title: "AI Content Generation",
    description: "Experience the power of AI in generating unique content.",
    header: <div className="h-40 w-full bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl" />,
    icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",  // span 2 columns
  },
  {
    title: "Automated Proofreading",
    description: "Let AI handle the proofreading of your documents.",
    header: <div className="h-40 w-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl" />,
    icon: <IconEdit className="h-4 w-4 text-neutral-500" />,
  },
  // ... more items
];

export function FeatureGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
```

**BentoGridItem Props**: `title`, `description`, `header` (React.ReactNode), `icon` (React.ReactNode), `className` (for grid span control).

**Applicable to**: Showcase landing grid, features overview section.

---

## 7. Lamp Effect

**Use case**: Hero sections, dramatic reveals, dark-themed headers.

**Component**: `LampContainer`

**How it works**: Conic gradient animation that simulates a lamp/spotlight illumination from above. Uses framer-motion for the gradient expansion animation on mount.

### Installation

```bash
npx shadcn@latest add @aceternity/lamp
```

### Usage

```tsx
import { LampContainer } from "@aceternity/lamp";

export function HeroWithLamp() {
  return (
    <LampContainer>
      <h1 className="text-4xl font-bold text-white">
        Build the Future with AI
      </h1>
      <p className="text-muted-foreground mt-4">
        Learn to create autonomous agents
      </p>
    </LampContainer>
  );
}
```

**Applicable to**: Homepage hero (alternative to Spotlight), dark section headers.

---

## Component-to-Section Mapping (Agent Class Site)

| Section | Primary Component | Secondary |
|---------|-------------------|-----------|
| Homepage Hero | Lamp Effect or Spotlight | Text Generate Effect |
| Chapter Cards | 3D Card Effect | -- |
| Course Roadmap | Timeline | Tracing Beam |
| Feature Showcase | Bento Grid | 3D Card Effect |
| Chapter Reading | Tracing Beam | -- |
| Section Titles | Text Generate Effect | -- |

---

## Shared Dependencies Summary

| Package | Version | Used By |
|---------|---------|---------|
| `motion` | latest | All animated components |
| `clsx` | latest | All components (cn utility) |
| `tailwind-merge` | latest | All components (cn utility) |
| `tailwindcss` | v4 | All components (styling) |

> All components are shadcn-style: source code is copied into your project. No runtime dependency on `@aceternity/*` packages at build time.
