import type { Product } from '../data/products'

/** Studio-style illustration used when a product photo is missing. */
const SHAPES: Record<string, string> = {
  hoodies:
    'M130 120 C150 80 250 80 270 120 L335 150 L370 330 L322 340 L312 250 L312 430 L88 430 L88 250 L78 340 L30 330 L65 150 Z',
  tshirts: 'M140 110 Q200 150 260 110 L345 150 L370 250 L318 268 L308 235 L308 430 L92 430 L92 235 L82 268 L30 250 L55 150 Z',
  jackets:
    'M135 105 L200 135 L265 105 L345 140 L378 345 L330 355 L318 260 L318 440 L82 440 L82 260 L70 355 L22 345 L55 140 Z',
  pants: 'M110 70 L290 70 L318 450 L222 450 L200 200 L178 450 L82 450 Z',
  shoes: 'M40 330 C40 300 70 250 110 245 L160 262 C200 270 230 300 290 300 C350 302 372 320 372 350 L372 380 L40 380 Z',
  cap: 'M95 280 C95 170 305 170 305 280 Z M290 275 L375 300 C378 315 330 322 285 305 Z',
  beanie: 'M90 320 C90 150 310 150 310 320 L310 360 L90 360 Z',
  bag: 'M110 190 L290 190 L330 390 L70 390 Z M150 190 C150 120 250 120 250 190',
}

function shapeFor(p: Pick<Product, 'id' | 'category'>) {
  if (p.category === 'accessories') {
    if (p.id.includes('cap')) return SHAPES.cap
    if (p.id.includes('beanie')) return SHAPES.beanie
    return SHAPES.bag
  }
  return SHAPES[p.category]
}

export default function ProductArt({
  product,
  color = '#111111',
  variant = 0,
  className = '',
}: {
  product: Pick<Product, 'id' | 'category' | 'name'>
  color?: string
  variant?: number
  className?: string
}) {
  const bgs = ['#4a4a4c', '#2e2e30', '#3a3a3c', '#555557']
  const bg = bgs[variant % bgs.length]
  const uid = `${product.id}-${variant}`
  const zoom = variant === 2 ? 1.5 : 1
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={product.name}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`g-${uid}`} cx="50%" cy="38%" r="80%">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor="#0b0b0b" />
        </radialGradient>
        <linearGradient id={`s-${uid}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#g-${uid})`} />
      <g transform={`translate(200 250) scale(${zoom}) translate(-200 -250)`}>
        <ellipse cx="200" cy="462" rx="130" ry="10" fill="#000" opacity=".45" />
        <path d={shapeFor(product)} fill={color} stroke="#ffffff" strokeOpacity=".38" strokeWidth="1.4" />
        <path d={shapeFor(product)} fill={`url(#s-${uid})`} />
        {product.category === 'jackets' || product.id.includes('zip') ? (
          <path d="M200 135 L200 440" stroke="#ffffff" strokeOpacity=".22" strokeWidth="1.5" />
        ) : null}
        {product.category === 'hoodies' ? (
          <path d="M130 120 C150 60 250 60 270 120 C250 160 150 160 130 120 Z" fill={color} stroke="#ffffff" strokeOpacity=".38" strokeWidth="1.4" />
        ) : null}
      </g>
    </svg>
  )
}
