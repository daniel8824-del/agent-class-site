interface YouTubeEmbedProps {
  src: string
  title?: string
}

export function YouTubeEmbed({ src, title }: YouTubeEmbedProps) {
  return (
    <div className="my-6 relative w-full overflow-hidden rounded-lg shadow-md" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  )
}
