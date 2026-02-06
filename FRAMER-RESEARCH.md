# Framer MCP Research - Agent Class Site Redesign

> Generated: 2026-02-06 | Source: Framer MCP (SSE at mcp.unframer.co)

---

## 1. Project Status

- **Pages**: 1 page (Home `/`, nodeId: `augiA20Il`)
- **Components**: None (empty)
- **Code Components**: None
- **Code Overrides**: None
- **Color Styles**: None defined
- **Text Styles**: None defined
- **CMS Collections**: 0 collections
- **Published URLs**: Not published (no staging or production URL)
- **Desktop Breakpoint**: `WQLkyLRf1` (1200px wide, white bg, vertical stack layout, 0px 20px padding)

The Framer project is essentially a blank canvas -- ready for building from scratch.

---

## 2. Pre-built Section Components

Framer provides ready-made section components that can be inserted via `insertUrl` with `?detached=true` for full customization:

| Section | Insert URL |
|---------|-----------|
| **Hero** | `https://framer.com/m/sections-Hero-2xJX.js?detached=true` |
| **Logo Strip** | `https://framer.com/m/sections-Logo-Strip-mX1f.js?detached=true` |
| **Features (Product)** | `https://framer.com/m/sections-Features-Product-ZlOC.js?detached=true` |
| **Pricing (3 plans)** | `https://framer.com/m/sections-Pricing-3-plans-uGqH.js?detached=true` |
| **Testimonials Grid** | `https://framer.com/m/sections-Testimonials-kbrH.js?detached=true` |
| **CTA Section** | `https://framer.com/m/sections-CTA-section-Qd0e.js?detached=true` |
| **Footer (Complete)** | `https://framer.com/m/sections-Footer-Complete-Night-1qIZ.js?detached=true` |

### Usage Pattern
1. Insert component with `updateXmlForNode` using `insertUrl` + `?detached=true`
2. Call `getNodeXml` on the parent page to see the internal structure
3. Customize text, images, links, and styling of the detached layers

### Linked vs Detached
- **Linked** (default): Updates when source changes. Cannot edit internal structure. Only supports positioning/sizing attributes.
- **Detached** (`?detached=true`): Creates editable Frame with all internal layers exposed. Full customization. Does NOT auto-update.

---

## 3. Font System

### 3.1 Space Grotesk (Headings -- Recommended)

| Weight | Selector (FS -- Font Source) | Selector (GF -- Google Fonts) |
|--------|------------------------------|-------------------------------|
| 300 Light | `FS;Space Grotesk-light` | `GF;Space Grotesk-300` |
| 400 Regular | `FS;Space Grotesk-regular` | `GF;Space Grotesk-regular` |
| 500 Medium | `FS;Space Grotesk-medium` | `GF;Space Grotesk-500` |
| 600 SemiBold | `FS;Space Grotesk-semibold` | `GF;Space Grotesk-600` |
| 700 Bold | `FS;Space Grotesk-bold` | `GF;Space Grotesk-700` |
| Variable | `FS;Space Grotesk-variable` | `GF;Space Grotesk-variable-regular` |

### 3.2 Inter (Body Text -- Recommended)

| Weight | Selector (GF) | Style |
|--------|---------------|-------|
| 100 Thin | `GF;Inter-100` | normal |
| 200 ExtraLight | `GF;Inter-200` | normal |
| 300 Light | `GF;Inter-300` | normal |
| 400 Regular | `GF;Inter-regular` | normal |
| 500 Medium | `GF;Inter-500` | normal |
| 600 SemiBold | `GF;Inter-600` | normal |
| 700 Bold | `GF;Inter-700` | normal |
| 800 ExtraBold | `GF;Inter-800` | normal |
| 900 Black | `GF;Inter-900` | normal |
| Variable | `GF;Inter-variable-regular` | normal |
| *All weights also available in italic* | e.g. `GF;Inter-600italic` | italic |

### 3.3 Noto Sans KR (Korean Text)

| Weight | Selector |
|--------|----------|
| 100 Thin | `GF;Noto Sans KR-100` |
| 200 ExtraLight | `GF;Noto Sans KR-200` |
| 300 Light | `GF;Noto Sans KR-300` |
| 400 Regular | `GF;Noto Sans KR-regular` |
| 500 Medium | `GF;Noto Sans KR-500` |
| 600 SemiBold | `GF;Noto Sans KR-600` |
| 700 Bold | `GF;Noto Sans KR-700` |
| 800 ExtraBold | `GF;Noto Sans KR-800` |
| 900 Black | `GF;Noto Sans KR-900` |
| Variable | `GF;Noto Sans KR-variable-regular` |

### 3.4 Pretendard (Korean)

**NOT AVAILABLE** in Framer's font library. Pretendard is a self-hosted font and would need to be loaded via custom code or CSS `@font-face`. Use **Noto Sans KR** as the Korean fallback within Framer.

### 3.5 JetBrains Mono (Code / Monospace)

| Weight | Selector (FS) | Selector (GF) |
|--------|---------------|---------------|
| 100 Thin | `FS;JetBrains Mono-thin` | `GF;JetBrains Mono-100` |
| 300 Light | `FS;JetBrains Mono-light` | `GF;JetBrains Mono-300` |
| 400 Regular | `FS;JetBrains Mono-regular` | `GF;JetBrains Mono-regular` |
| 500 Medium | `FS;JetBrains Mono-medium` | -- |
| 600 SemiBold | `FS;JetBrains Mono-semibold` | -- |
| 700 Bold | `FS;JetBrains Mono-bold` | -- |
| 800 ExtraBold | `FS;JetBrains Mono-extrabold` | -- |
| Variable | `FS;JetBrains Mono-variable` | -- |
| *All weights also in italic* | e.g. `FS;JetBrains Mono-bold italic` | -- |

### 3.6 Noto Sans JP (Japanese fallback)

Full weight range (100-900) available via `GF;Noto Sans JP-{weight}`. Variable: `GF;Noto Sans JP-variable-regular`.

### Font Usage in Framer XML

```xml
<!-- Apply font directly to a Text node -->
<Text font="GF;Space Grotesk-700">Heading Text</Text>
<Text font="GF;Inter-regular">Body text here</Text>

<!-- IMPORTANT: font and inlineTextStyle are mutually exclusive -->
<!-- Use EITHER font OR inlineTextStyle, never both -->
<Text inlineTextStyle="/Heading xl">Uses project style</Text>
```

---

## 4. Layout & Animation Attributes Reference

### Stack Layout (Flexbox-like)
```xml
<Frame layout="stack" stackDirection="vertical" stackDistribution="center" stackAlignment="center" gap="20px" padding="40px">
  <Text>Child 1</Text>
  <Text>Child 2</Text>
</Frame>
```

### Grid Layout
```xml
<Frame layout="grid" gridColumns="3" gap="20px 30px" gridRowHeightType="auto">
  <Frame gridColumnSpan="2">Spans 2 cols</Frame>
  <Frame>Single col</Frame>
</Frame>
```

### Positioning
- **Relative** (default): Flows in layout
- **Absolute**: Uses top/right/bottom/left or centerX/centerY
- **Fixed**: Stays on viewport
- **Sticky**: Sticks on scroll

### Visual Properties
- `opacity`: 0-1
- `rotation`: degrees
- `borderRadius`: CSS values (e.g., "8px", "50%")
- `backgroundColor`: CSS color or style path (e.g., "/Primary/Blue")
- `backgroundImage`: URL (auto-uploaded to Framer)

---

## 5. Exportable React Components

**No components currently exist** in the Framer project to export. The project is blank.

### React Export Workflow (for future use)
When components are created in Framer, they can be exported as React code using:
```bash
npx -y unframer example-app <projectId>
```

This generates:
- `.jsx` files for each component
- `.css` style files
- Framer variables become React component props

Documentation: https://github.com/remorses/unframer

---

## 6. CMS System

No CMS collections exist. The CMS supports these field types:
- `string`, `number`, `boolean`, `color`, `date`
- `image`, `link`, `file`
- `formattedText` (HTML content)
- `enum` (predefined options)
- `collectionReference` / `multiCollectionReference`

Collections must be created manually in the Framer UI; items can then be managed via MCP.

---

## 7. Recommendations for Agent Class Site

### Font Stack
```
Headings:  Space Grotesk (GF;Space Grotesk-700 for bold, -500 for medium)
Body:      Inter (GF;Inter-regular for body, -500 for emphasis, -600 for strong)
Korean:    Noto Sans KR (GF;Noto Sans KR-regular / -700)
Code:      JetBrains Mono (FS;JetBrains Mono-regular / -medium)
```

### Component Strategy
Since the Framer project is empty, there are two approaches:
1. **Build in Framer**: Use pre-built sections as starting points, customize via MCP
2. **Build in Code**: Use the font selectors and layout patterns documented here to inform the React/Vite codebase directly

### Pre-built Sections to Leverage
For an educational site like Agent Class:
- **Hero** section for the homepage banner
- **Features (Product)** for chapter highlights
- **CTA** for enrollment/action sections
- **Footer (Complete)** for the mega footer
- **Testimonials** could work for showcase/student feedback

### Key Constraints
- `font` and `inlineTextStyle` are mutually exclusive on Text nodes
- Text color can only be changed via text styles (not direct attributes)
- Component instances (linked) don't support `backgroundColor` or `borderRadius`
- Detached components give full control but lose auto-updates
- Root-level nodes must use absolute positioning
- Pretendard is not available; use Noto Sans KR for Korean
