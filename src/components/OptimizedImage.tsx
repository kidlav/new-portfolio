import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
  style?: React.CSSProperties
}

/**
 * Optimized image component with skeleton loading state
 * Improves perceived performance with loading animation
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  style,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div className={`optimized-image optimized-image-error ${className}`} style={style}>
        <span>Failed to load image</span>
      </div>
    )
  }

  return (
    <div className="optimized-image-wrapper" style={style}>
      {isLoading && <div className="optimized-image-skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`optimized-image ${className} ${isLoading ? 'loading' : 'loaded'}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
