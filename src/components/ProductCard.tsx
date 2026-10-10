import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Plus, X } from 'lucide-react'
import { formatPrice, type Product } from '../data/products'
import { useStore } from '../store/StoreContext'
import ProductImage from './ProductImage'

export default function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite, addToCart } = useStore()
  const [picking, setPicking] = useState(false)
  const fav = isFavorite(product.id)
  const single = product.sizes.length === 1

  const quickAdd = () => {
    if (single) addToCart(product.id, product.sizes[0], product.colors[0].name)
    else setPicking(true)
  }

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
        <Link to={`/product/${product.id}`} aria-label={product.name} className="absolute inset-0 block">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]">
            <ProductImage product={product} index={1} />
          </div>
        </Link>
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-bone px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">New</span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={fav}
          aria-label={fav ? 'Убрать из избранного' : 'Добавить в избранное'}
          className="absolute right-2 top-2 grid h-10 w-10 place-items-center text-bone/80 transition hover:text-white"
        >
          <motion.span key={String(fav)} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}>
            <Heart size={18} strokeWidth={1.5} fill={fav ? '#f2f2f2' : 'none'} />
          </motion.span>
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 md:translate-y-2 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={quickAdd}
            className="flex min-h-11 w-full items-center justify-center gap-2 bg-bone/95 text-[12px] font-medium text-ink backdrop-blur transition hover:bg-white"
          >
            <Plus size={14} strokeWidth={1.8} /> В корзину
          </button>
        </div>

        <AnimatePresence>
          {picking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col justify-end bg-black/80 p-4 backdrop-blur-sm"
            >
              <button type="button" aria-label="Закрыть" onClick={() => setPicking(false)} className="absolute right-2 top-2 grid h-10 w-10 place-items-center">
                <X size={18} strokeWidth={1.5} />
              </button>
              <p className="eyebrow mb-3">Выберите размер</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const out = product.soldOut?.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={out}
                      onClick={() => {
                        addToCart(product.id, s, product.colors[0].name)
                        setPicking(false)
                      }}
                      className="min-h-10 min-w-10 border border-white/30 px-3 text-xs transition hover:border-white hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:text-white/25 disabled:line-through disabled:hover:border-white/30 disabled:hover:bg-transparent disabled:hover:text-white/25"
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 space-y-1 text-[13px]">
        <Link to={`/product/${product.id}`} className="block text-bone transition-colors hover:text-white">
          {product.name}
        </Link>
        <p className="text-mute">{product.brand}</p>
        <p className="flex items-baseline gap-2">
          <span>{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-mute line-through">{formatPrice(product.oldPrice)}</span>}
        </p>
      </div>
    </article>
  )
}
