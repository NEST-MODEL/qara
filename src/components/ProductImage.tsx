import type { Product } from '../data/products'
import { productPhoto } from '../data/photos'
import ProductArt from './ProductArt'
import SmartImage from './SmartImage'

export const productImagePath = productPhoto

export default function ProductImage({
  product,
  index = 1,
  color,
  className = '',
  loading,
}: {
  product: Product
  index?: number
  color?: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  return (
    <SmartImage
      src={productImagePath(product.id, index)}
      alt={`${product.name}, фото ${index}`}
      loading={loading}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      fallback={
        <div className={`absolute inset-0 ${className}`}>
          <ProductArt product={product} color={color ?? product.colors[0].hex} variant={index - 1} />
        </div>
      }
    />
  )
}
