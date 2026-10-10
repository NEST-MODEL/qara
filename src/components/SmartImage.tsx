import { useState, type ReactNode } from 'react'

/** Image with graceful fallback: shows `fallback` if the file is missing or fails. */
export default function SmartImage({
  src,
  alt,
  fallback,
  className = '',
  loading = 'lazy',
}: {
  src: string
  alt: string
  fallback: ReactNode
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  if (failed) return <>{fallback}</>
  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-graphite" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </>
  )
}
