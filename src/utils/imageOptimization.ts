/**
 * Image optimization utilities for faster loading and better performance
 */

/**
 * Generate optimized image src with WebP support
 * Returns the path with appropriate format
 */
export function getOptimizedImageSrc(path: string): string {
  // For now, return as-is. In production, you could:
  // 1. Convert images to WebP and serve those first
  // 2. Use srcset for responsive images
  // 3. Compress images with different sizes
  return path
}

/**
 * Generate srcset for responsive images
 * Note: Images need to exist in different sizes for this to work
 */
export function getImageSrcSet(_basePath: string): string {
  void _basePath
  // Example: "/images/screenshot-1-small.png 480w, /images/screenshot-1.png 1024w"
  // For now, return empty to use single source
  return ''
}

/**
 * Preload images to improve perceived performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`))
    img.src = src
  })
}

/**
 * Preload multiple images in parallel
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  try {
    await Promise.all(srcs.map(preloadImage))
  } catch (error) {
    console.warn('Some images failed to preload:', error)
  }
}

/**
 * Generate picture element HTML for WebP with fallback
 * Usage: dangerouslySetInnerHTML={{ __html: getPictureElement(...) }}
 */
export function getPictureElement(
  imagePath: string,
  alt: string,
  className?: string,
  loading?: 'lazy' | 'eager'
): string {
  // Since we don't have pre-converted WebP versions, return a simple img tag
  // When you have WebP versions, use the picture element approach below
  const loadingAttr = loading ? `loading="${loading}"` : ''
  const classAttr = className ? `class="${className}"` : ''
  return `<img src="${imagePath}" alt="${alt}" ${classAttr} ${loadingAttr} />`

  // Production version with WebP:
  // const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  // return `
  //   <picture>
  //     <source srcset="${webpPath}" type="image/webp">
  //     <img src="${imagePath}" alt="${alt}" ${classAttr} ${loadingAttr} />
  //   </picture>
  // `
}
