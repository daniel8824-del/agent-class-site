import {
  Quote, CheckCircle, AlertTriangle, Info, HelpCircle,
  AlertOctagon, Lightbulb, Bookmark, FileText, Star,
  Zap, List
} from 'lucide-react'
import type { ReactNode } from 'react'

const calloutConfig: Record<string, {
  icon: ReactNode
  bgClass: string
  borderClass: string
  titleClass: string
  iconClass: string
}> = {
  quote: {
    icon: <Quote className="w-5 h-5" />,
    bgClass: 'bg-gray-50 dark:bg-gray-900/50',
    borderClass: 'border-l-gray-400 dark:border-l-gray-500',
    titleClass: 'text-gray-700 dark:text-gray-300',
    iconClass: 'text-gray-500',
  },
  example: {
    icon: <List className="w-5 h-5" />,
    bgClass: 'bg-purple-50 dark:bg-purple-950/30',
    borderClass: 'border-l-purple-400 dark:border-l-purple-500',
    titleClass: 'text-purple-700 dark:text-purple-300',
    iconClass: 'text-purple-500',
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bgClass: 'bg-green-50 dark:bg-green-950/30',
    borderClass: 'border-l-green-400 dark:border-l-green-500',
    titleClass: 'text-green-700 dark:text-green-300',
    iconClass: 'text-green-500',
  },
  check: {
    icon: <CheckCircle className="w-5 h-5" />,
    bgClass: 'bg-green-50 dark:bg-green-950/30',
    borderClass: 'border-l-green-400 dark:border-l-green-500',
    titleClass: 'text-green-700 dark:text-green-300',
    iconClass: 'text-green-500',
  },
  question: {
    icon: <HelpCircle className="w-5 h-5" />,
    bgClass: 'bg-yellow-50 dark:bg-yellow-950/30',
    borderClass: 'border-l-yellow-400 dark:border-l-yellow-500',
    titleClass: 'text-yellow-700 dark:text-yellow-300',
    iconClass: 'text-yellow-500',
  },
  important: {
    icon: <Zap className="w-5 h-5" />,
    bgClass: 'bg-cyan-50 dark:bg-cyan-950/30',
    borderClass: 'border-l-cyan-400 dark:border-l-cyan-500',
    titleClass: 'text-cyan-700 dark:text-cyan-300',
    iconClass: 'text-cyan-500',
  },
  danger: {
    icon: <AlertOctagon className="w-5 h-5" />,
    bgClass: 'bg-red-50 dark:bg-red-950/30',
    borderClass: 'border-l-red-400 dark:border-l-red-500',
    titleClass: 'text-red-700 dark:text-red-300',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
    borderClass: 'border-l-amber-400 dark:border-l-amber-500',
    titleClass: 'text-amber-700 dark:text-amber-300',
    iconClass: 'text-amber-500',
  },
  note: {
    icon: <Bookmark className="w-5 h-5" />,
    bgClass: 'bg-blue-50 dark:bg-blue-950/30',
    borderClass: 'border-l-blue-400 dark:border-l-blue-500',
    titleClass: 'text-blue-700 dark:text-blue-300',
    iconClass: 'text-blue-500',
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    bgClass: 'bg-blue-50 dark:bg-blue-950/30',
    borderClass: 'border-l-blue-400 dark:border-l-blue-500',
    titleClass: 'text-blue-700 dark:text-blue-300',
    iconClass: 'text-blue-500',
  },
  tldr: {
    icon: <FileText className="w-5 h-5" />,
    bgClass: 'bg-teal-50 dark:bg-teal-950/30',
    borderClass: 'border-l-teal-400 dark:border-l-teal-500',
    titleClass: 'text-teal-700 dark:text-teal-300',
    iconClass: 'text-teal-500',
  },
  summary: {
    icon: <FileText className="w-5 h-5" />,
    bgClass: 'bg-teal-50 dark:bg-teal-950/30',
    borderClass: 'border-l-teal-400 dark:border-l-teal-500',
    titleClass: 'text-teal-700 dark:text-teal-300',
    iconClass: 'text-teal-500',
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderClass: 'border-l-emerald-400 dark:border-l-emerald-500',
    titleClass: 'text-emerald-700 dark:text-emerald-300',
    iconClass: 'text-emerald-500',
  },
  abstract: {
    icon: <Star className="w-5 h-5" />,
    bgClass: 'bg-indigo-50 dark:bg-indigo-950/30',
    borderClass: 'border-l-indigo-400 dark:border-l-indigo-500',
    titleClass: 'text-indigo-700 dark:text-indigo-300',
    iconClass: 'text-indigo-500',
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
  const displayTitle = title || type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className={`my-4 rounded-lg border-l-4 p-4 ${config.bgClass} ${config.borderClass}`}>
      <div className={`flex items-center gap-2 mb-2 font-semibold ${config.titleClass}`}>
        <span className={config.iconClass}>{config.icon}</span>
        <span>{displayTitle}</span>
      </div>
      <div className="text-sm leading-relaxed text-foreground/80 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
