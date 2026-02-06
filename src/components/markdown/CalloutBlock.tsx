import {
  Quote, CheckCircle, AlertTriangle, Info, HelpCircle,
  AlertOctagon, Lightbulb, Bookmark, FileText, Star,
  Zap, List
} from 'lucide-react'
import type { ReactNode } from 'react'

const calloutConfig: Record<string, {
  icon: ReactNode
  accentColor: string
  gradientFrom: string
  gradientTo: string
  bgTint: string
  label: string
}> = {
  quote: {
    icon: <Quote className="w-5 h-5" />,
    accentColor: 'oklch(0.6 0 0)',
    gradientFrom: 'oklch(0.6 0 0)',
    gradientTo: 'oklch(0.5 0.02 275)',
    bgTint: 'oklch(0.6 0 0 / 5%)',
    label: 'Quote',
  },
  example: {
    icon: <List className="w-5 h-5" />,
    accentColor: 'oklch(0.55 0.23 285)',
    gradientFrom: 'oklch(0.55 0.23 285)',
    gradientTo: 'oklch(0.50 0.20 300)',
    bgTint: 'oklch(0.55 0.23 285 / 5%)',
    label: 'Example',
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    accentColor: 'oklch(0.6 0.17 160)',
    gradientFrom: 'oklch(0.6 0.17 160)',
    gradientTo: 'oklch(0.55 0.15 145)',
    bgTint: 'oklch(0.6 0.17 160 / 5%)',
    label: 'Success',
  },
  check: {
    icon: <CheckCircle className="w-5 h-5" />,
    accentColor: 'oklch(0.6 0.17 160)',
    gradientFrom: 'oklch(0.6 0.17 160)',
    gradientTo: 'oklch(0.55 0.15 145)',
    bgTint: 'oklch(0.6 0.17 160 / 5%)',
    label: 'Check',
  },
  question: {
    icon: <HelpCircle className="w-5 h-5" />,
    accentColor: 'oklch(0.7 0.16 80)',
    gradientFrom: 'oklch(0.7 0.16 80)',
    gradientTo: 'oklch(0.65 0.18 65)',
    bgTint: 'oklch(0.7 0.16 80 / 5%)',
    label: 'Question',
  },
  important: {
    icon: <Zap className="w-5 h-5" />,
    accentColor: 'oklch(0.65 0.15 195)',
    gradientFrom: 'oklch(0.65 0.15 195)',
    gradientTo: 'oklch(0.55 0.20 210)',
    bgTint: 'oklch(0.65 0.15 195 / 5%)',
    label: 'Important',
  },
  danger: {
    icon: <AlertOctagon className="w-5 h-5" />,
    accentColor: 'oklch(0.6 0.2 15)',
    gradientFrom: 'oklch(0.6 0.2 15)',
    gradientTo: 'oklch(0.55 0.22 5)',
    bgTint: 'oklch(0.6 0.2 15 / 5%)',
    label: 'Danger',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    accentColor: 'oklch(0.7 0.16 80)',
    gradientFrom: 'oklch(0.7 0.16 80)',
    gradientTo: 'oklch(0.65 0.2 60)',
    bgTint: 'oklch(0.7 0.16 80 / 5%)',
    label: 'Warning',
  },
  note: {
    icon: <Bookmark className="w-5 h-5" />,
    accentColor: 'oklch(0.55 0.23 260)',
    gradientFrom: 'oklch(0.55 0.23 260)',
    gradientTo: 'oklch(0.50 0.20 280)',
    bgTint: 'oklch(0.55 0.23 260 / 5%)',
    label: 'Note',
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    accentColor: 'oklch(0.55 0.23 260)',
    gradientFrom: 'oklch(0.55 0.23 260)',
    gradientTo: 'oklch(0.50 0.20 280)',
    bgTint: 'oklch(0.55 0.23 260 / 5%)',
    label: 'Info',
  },
  tldr: {
    icon: <FileText className="w-5 h-5" />,
    accentColor: 'oklch(0.65 0.15 195)',
    gradientFrom: 'oklch(0.65 0.15 195)',
    gradientTo: 'oklch(0.55 0.18 210)',
    bgTint: 'oklch(0.65 0.15 195 / 5%)',
    label: 'TL;DR',
  },
  summary: {
    icon: <FileText className="w-5 h-5" />,
    accentColor: 'oklch(0.65 0.15 195)',
    gradientFrom: 'oklch(0.65 0.15 195)',
    gradientTo: 'oklch(0.55 0.18 210)',
    bgTint: 'oklch(0.65 0.15 195 / 5%)',
    label: 'Summary',
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    accentColor: 'oklch(0.6 0.17 160)',
    gradientFrom: 'oklch(0.6 0.17 160)',
    gradientTo: 'oklch(0.65 0.15 145)',
    bgTint: 'oklch(0.6 0.17 160 / 5%)',
    label: 'Tip',
  },
  abstract: {
    icon: <Star className="w-5 h-5" />,
    accentColor: 'oklch(0.55 0.23 285)',
    gradientFrom: 'oklch(0.55 0.23 285)',
    gradientTo: 'oklch(0.50 0.20 300)',
    bgTint: 'oklch(0.55 0.23 285 / 5%)',
    label: 'Abstract',
  },
}

const defaultConfig = calloutConfig.note

interface CalloutBlockProps {
  type: string
  title?: string
  children: ReactNode
}

export function CalloutBlock({ type, title, children }: CalloutBlockProps) {
  const config = calloutConfig[type] || defaultConfig
  const displayTitle = title || config.label || type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div
      className="my-6 overflow-hidden relative"
      style={{
        borderRadius: 'var(--radius-xl)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
      }}
    >
      {/* Gradient left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[4px]"
        style={{
          background: `linear-gradient(180deg, ${config.gradientFrom}, ${config.gradientTo})`,
          borderRadius: '4px 0 0 4px',
        }}
      />

      {/* Subtle tinted background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: config.bgTint,
        }}
      />

      {/* Header with icon and title */}
      <div
        className="relative flex items-center gap-2.5 px-5 pl-6 pt-4 pb-2"
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `${config.accentColor}15`,
            color: config.accentColor,
          }}
        >
          {config.icon}
        </div>
        <span
          className="text-sm font-semibold tracking-wide"
          style={{ color: config.accentColor }}
        >
          {displayTitle}
        </span>
      </div>

      {/* Content area with improved typography */}
      <div
        className="relative px-5 pl-6 pb-4 text-sm leading-relaxed [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul]:my-2 [&>ol]:my-2 [&_a]:underline [&_a]:underline-offset-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {children}
      </div>
    </div>
  )
}
