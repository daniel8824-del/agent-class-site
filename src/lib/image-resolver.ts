// Resolves Obsidian image filenames to public paths
const IMAGE_BASE = '/images'

export function resolveImagePath(filename: string): string {
  // Already a full URL
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename
  }

  // Already an absolute path
  if (filename.startsWith('/')) {
    return filename
  }

  // Encode the filename for URL safety
  const encoded = encodeURIComponent(filename)
  return `${IMAGE_BASE}/${encoded}`
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}
