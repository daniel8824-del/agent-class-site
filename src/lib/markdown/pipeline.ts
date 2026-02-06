import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { remarkObsidianImages, remarkObsidianLinks, remarkCallouts } from './plugins'

export interface ParsedMarkdown {
  frontmatter: Record<string, any>
  html: string
  headings: { id: string; text: string; level: number }[]
}

// Simple browser-safe frontmatter parser (no Buffer dependency)
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/
  const match = raw.match(fmRegex)
  if (!match) {
    return { data: {}, content: raw }
  }

  const yamlStr = match[1]
  const content = raw.slice(match[0].length)
  const data: Record<string, any> = {}

  // Simple YAML parsing for frontmatter
  let currentKey = ''
  let currentArray: string[] | null = null

  for (const line of yamlStr.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // Array item
    if (trimmed.startsWith('- ') && currentKey) {
      if (!currentArray) {
        currentArray = []
        data[currentKey] = currentArray
      }
      currentArray.push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ''))
      continue
    }

    // Key-value pair
    const kvMatch = trimmed.match(/^(\w+)\s*:\s*(.*)$/)
    if (kvMatch) {
      currentKey = kvMatch[1]
      const value = kvMatch[2].trim().replace(/^["']|["']$/g, '')
      currentArray = null
      if (value) {
        data[currentKey] = value
      }
    }
  }

  return { data, content }
}

// Extract headings from HTML string
function extractHeadings(html: string) {
  const headings: { id: string; text: string; level: number }[] = []
  const regex = /<h([2-4])\s+id="([^"]*)"[^>]*>([\s\S]*?)<\/h[2-4]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const id = match[2]
    // Strip HTML tags from heading text
    const text = match[3].replace(/<[^>]*>/g, '').trim()
    if (text) {
      headings.push({ id, text, level })
    }
  }
  return headings
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkObsidianImages)
  .use(remarkObsidianLinks)
  .use(remarkCallouts)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true })

export async function parseMarkdown(raw: string): Promise<ParsedMarkdown> {
  const { data: frontmatter, content } = parseFrontmatter(raw)
  const result = await processor.process(content)
  const html = String(result)
  const headings = extractHeadings(html)

  return { frontmatter, html, headings }
}

// Cache for parsed markdown — key includes content fingerprint to prevent race conditions
const cache = new Map<string, ParsedMarkdown>()

export async function parseMarkdownCached(key: string, raw: string): Promise<ParsedMarkdown> {
  const cacheKey = `${key}:${raw.length}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }
  const parsed = await parseMarkdown(raw)
  cache.set(cacheKey, parsed)
  return parsed
}
