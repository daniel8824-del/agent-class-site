import { useState } from 'react'
import { ImageLightbox } from './ImageLightbox'

const FILENAME_CAPTION_PATTERNS = [
  /^agent_image_/i,
  /^Pasted image/i,
  /^스크린샷/,
  /^screenshot/i,
  /^IMG_/i,
  /^image_/i,
  /^\d{4}-\d{2}-\d{2}/,          // date-prefixed filenames
  /^Gemini_Generated_Image/i,    // Gemini AI generated
  /^ChatGPT Image/i,             // ChatGPT generated
  /^DALL[·\-]?E/i,               // DALL-E generated
  /^daniel\d+_\d+_/i,            // Midjourney style user_seed_ prefix
  /^[a-f0-9]{8}-[a-f0-9]{4}-/i,  // UUID-prefixed filenames
]

function isFilenameCaption(alt: string): boolean {
  return FILENAME_CAPTION_PATTERNS.some(pattern => pattern.test(alt))
}

interface ObsidianImageProps {
  src: string
  alt?: string
}

export function ObsidianImage({ src, alt }: ObsidianImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="my-4 flex items-center justify-center h-48 bg-muted rounded-lg border border-border">
        <span className="text-muted-foreground text-sm">Image not found: {alt || src}</span>
      </div>
    )
  }

  return (
    <>
      <figure className="my-6">
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          referrerPolicy="no-referrer"
          onClick={() => setLightboxOpen(true)}
          onError={() => setError(true)}
          className="max-w-full h-auto rounded-lg shadow-md cursor-zoom-in block transition-transform hover:scale-[1.02]"
        />
      </figure>
      <ImageLightbox
        src={src}
        alt={alt || ''}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
