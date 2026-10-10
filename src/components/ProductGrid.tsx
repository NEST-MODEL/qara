import type { Product } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function ProductGrid({ products, cols = 4 }: { products: Product[]; cols?: 3 | 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 0.06} y={20}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  )
}
