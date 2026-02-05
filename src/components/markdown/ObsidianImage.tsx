import { useState } from 'react'
import { ImageLightbox } from './ImageLightbox'

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
          onClick={() => setLightboxOpen(true)}
          onError={() => setError(true)}
          className="max-w-full h-auto rounded-lg shadow-md cursor-zoom-in mx-auto block transition-transform hover:scale-[1.02]"
        />
        {alt && alt !== src && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
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
