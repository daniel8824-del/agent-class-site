import type { Plugin } from 'unified'
import type { Root, Paragraph, Text, Image, PhrasingContent, BlockContent } from 'mdast'
import { visit } from 'unist-util-visit'

// Remark plugin: Convert Obsidian ![[image.png]] to standard markdown images
export const remarkObsidianImages: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return

      const children = node.children
      if (children.length === 0) return

      // Check for ![[filename]] pattern in text nodes
      const newChildren: PhrasingContent[] = []
      let modified = false

      for (const child of children) {
        if (child.type === 'text') {
          const text = (child as Text).value
          const regex = /!\[\[([^\]]+)\]\]/g
          let lastIndex = 0
          let match

          while ((match = regex.exec(text)) !== null) {
            modified = true
            if (match.index > lastIndex) {
              newChildren.push({
                type: 'text',
                value: text.slice(lastIndex, match.index),
              } as Text)
            }

            const filename = match[1]
            const encodedFilename = encodeURIComponent(filename)
            newChildren.push({
              type: 'image',
              url: `/images/${encodedFilename}`,
              alt: filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, ''),
              title: null,
            } as Image)

            lastIndex = regex.lastIndex
          }

          if (lastIndex < text.length) {
            newChildren.push({
              type: 'text',
              value: text.slice(lastIndex),
            } as Text)
          }

          if (!modified) {
            newChildren.push(child)
          }
        } else {
          newChildren.push(child)
        }
      }

      if (modified) {
        // If the paragraph only contains an image, replace with the image directly
        const images = newChildren.filter(c => c.type === 'image')
        const nonWhitespace = newChildren.filter(c =>
          c.type !== 'text' || (c as Text).value.trim() !== ''
        )

        if (images.length === nonWhitespace.length && images.length > 0) {
          // Replace paragraph with image paragraphs
          const replacements: BlockContent[] = images.map(img => ({
            type: 'paragraph' as const,
            children: [img],
          }))
          parent.children.splice(index!, 1, ...replacements)
        } else {
          node.children = newChildren
        }
      }
    })
  }
}

// Remark plugin: Convert [[Note Name]] internal links
export const remarkObsidianLinks: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return

      const text = node.value
      const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
      let lastIndex = 0
      let match
      const newNodes: PhrasingContent[] = []
      let modified = false

      while ((match = regex.exec(text)) !== null) {
        modified = true
        if (match.index > lastIndex) {
          newNodes.push({ type: 'text', value: text.slice(lastIndex, match.index) } as Text)
        }

        const target = match[1]
        const display = match[2] || target

        newNodes.push({
          type: 'link',
          url: `#${target}`,
          children: [{ type: 'text', value: display } as Text],
        } as PhrasingContent)

        lastIndex = regex.lastIndex
      }

      if (modified) {
        if (lastIndex < text.length) {
          newNodes.push({ type: 'text', value: text.slice(lastIndex) } as Text)
        }
        parent.children.splice(index, 1, ...newNodes)
      }
    })
  }
}

// Remark plugin: Convert >[!type] callout blocks
export const remarkCallouts: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node: any) => {
      const firstChild = node.children[0]
      if (!firstChild || firstChild.type !== 'paragraph') return

      const firstText = firstChild.children?.[0]
      if (!firstText || firstText.type !== 'text') return

      const text: string = firstText.value
      const calloutMatch = text.match(/^\[!(\w+)\]\s*(.*)/)
      if (!calloutMatch) return

      const calloutType = calloutMatch[1].toLowerCase()
      const title = calloutMatch[2] || calloutType

      // Remove the callout marker from the text
      const remaining = text.slice(calloutMatch[0].length)
      if (remaining.trim()) {
        firstText.value = remaining.trimStart()
      } else {
        // Remove the first text node
        firstChild.children.shift()
        if (firstChild.children.length === 0) {
          node.children.shift()
        }
      }

      // Add callout data to the node
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties['data-callout'] = calloutType
      node.data.hProperties['data-callout-title'] = title
      node.data.hProperties.className = `callout callout-${calloutType}`
    })
  }
}
