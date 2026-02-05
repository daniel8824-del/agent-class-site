import { type ReactNode, createElement } from 'react'

interface ColoredHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  color: string
  id?: string
  children: ReactNode
}

export function ColoredHeading({ level, color, id, children }: ColoredHeadingProps) {
  return createElement(
    `h${level}`,
    { id, style: { color }, className: 'font-bold' },
    children
  )
}
