import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Heart, Info, ShoppingBag, Check } from 'lucide-react'
import { PRODUCTS, categoryLabel, formatPrice, getProduct } from '../data/products'
import { useStore } from '../store/StoreContext'
import ProductImage from '../components/ProductImage'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import { Button, LinkButton } from '../components/Button'

export default function Product() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { addToCart, toggleFavorite, isFavorite, pushRecent, recent } = useStore()
  const [size, setSize] = useState('')
  const [colorName, setColorName] = useState('')
  const [shot, setShot] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSize(''); setSizeError(false); setShot(1); setColorName(product?.colors[0].name ?? '')
    if (product) pushRecent(product.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const related = useMemo(
    () => (product ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product],
  )
  const viewed = useMemo(() => recent.filter((r) => r !== id).map(getProduct).filter((p): p is NonNullable<typeof p> => !!p).slice(0, 4), [recent, id])

  if (!product) {
    return (
      <div className="wrap grid min-h-[70dvh] place-items-center pt-28 text-center">
        <div>
          <p className="eyebrow mb-3">Ошибка 404</p>
          <h1 className="display text-3xl">Товар не найден</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm text-mute">Возможно, ссылка устарела. Вернитесь в каталог.</p>
          <div className="mt-8 flex justify-center"><LinkButton to="/catalog">В каталог</LinkButton></div>
        </div>
      </div>
    )
  }

  const color = product.colors.find((c) => c.name === colorName) ?? product.colors[0]
  const fav = isFavorite(product.id)
  const allOut = product.sizes.every((s) => product.soldOut?.includes(s))
  const lowStock = (product.soldOut?.length ?? 0) > 0 && !allOut

  const add = () => {
    if (!size) { setSizeError(true); return }
    addToCart(product.id, size, color.name)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  const onScroll = () => {
    const el = scroller.current
    if (el) setShot(Math.round(el.scrollLeft / el.clientWidth) + 1)
  }

  return (
    <div className="pt-24 md:pt-32">
      <div className="wrap">
        <nav aria-label="Хлебные крошки" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-mute">
          <Link to="/" className="hover:text-bone">Главная</Link><ChevronRight size={12} />
          <Link to="/catalog" className="hover:text-bone">Каталог</Link><ChevronRight size={12} />
          <Link to={`/catalog?category=${product.category}`} className="hover:text-bone">{categoryLabel(product.category)}</Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* gallery */}
          <div className="grid gap-3 lg:grid-cols-[84px_1fr]">
            <div className="order-2 hidden gap-3 lg:order-1 lg:grid lg:content-start">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setShot(n)} aria-label={`Фото ${n}`} aria-pressed={shot === n} className={`relative aspect-[4/5] overflow-hidden border transition ${shot === n ? 'border-bone' : 'border-line opacity-70 hover:opacity-100'}`}>
                  <ProductImage product={product} index={n} color={color.hex} />
                </button>
              ))}
            </div>
            {/* desktop main */}
            <div className="relative order-1 hidden aspect-[4/5] overflow-hidden bg-graphite lg:order-2 lg:block">
              <AnimatePresence mode="popLayout">
                <motion.div key={`${shot}-${color.name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <ProductImage product={product} index={shot} color={color.hex} loading="eager" />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* mobile swipe gallery */}
            <div className="relative -mx-5 lg:hidden">
              <div ref={scroller} onScroll={onScroll} className="hide-scroll flex snap-x snap-mandatory overflow-x-auto">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-graphite">
                    <ProductImage product={product} index={n} color={color.hex} loading={n === 1 ? 'eager' : 'lazy'} />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
                {[1, 2, 3].map((n) => <span key={n} className={`h-px w-6 ${shot === n ? 'bg-bone' : 'bg-white/30'}`} />)}
              </div>
            </div>
          </div>

          {/* info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{product.brand}</p>
            <h1 className="display mt-3 text-3xl md:text-4xl">{product.name}</h1>
            <p className="mt-5 flex items-baseline gap-3 text-xl">
              {formatPrice(product.price)}
              {product.oldPrice && <span className="text-sm text-mute line-through">{formatPrice(product.oldPrice)}</span>}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-bone/80">{product.description}</p>

            <div className="mt-8">
              <p className="eyebrow mb-3">Цвет: <span className="text-bone normal-case tracking-normal">{color.name}</span></p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.name} aria-label={c.name} aria-pressed={c.name === color.name} title={c.name} onClick={() => setColorName(c.name)}
                    className={`h-10 w-10 rounded-full border-2 transition ${c.name === color.name ? 'border-bone' : 'border-line hover:border-white/50'}`}
                    style={{ background: c.hex, boxShadow: 'inset 0 0 0 3px #0a0a0a' }} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="eyebrow">Размер</p>
                {sizeError && <p role="alert" className="text-xs text-red-300">Выберите размер</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const out = product.soldOut?.includes(s)
                  return (
                    <button key={s} disabled={out} aria-pressed={size === s} onClick={() => { setSize(s); setSizeError(false) }}
                      className={`min-h-12 min-w-12 border px-4 text-sm transition ${size === s ? 'border-bone bg-bone text-ink' : 'border-line hover:border-white/50'} disabled:cursor-not-allowed disabled:text-white/25 disabled:line-through disabled:hover:border-line`}>
                      {s}
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-mute">
                <span className={`h-1.5 w-1.5 rounded-full ${allOut ? 'bg-red-400' : lowStock ? 'bg-amber-300' : 'bg-emerald-400'}`} />
                {allOut ? 'Нет в наличии' : lowStock ? 'Часть размеров закончилась' : 'В наличии'} · демо-данные
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <Button disabled={allOut} onClick={add} className="flex-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={added ? 'ok' : 'add'} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-3">
                    {added ? <><Check size={16} /> Добавлено</> : <><ShoppingBag size={16} strokeWidth={1.5} /> Добавить в корзину</>}
                  </motion.span>
                </AnimatePresence>
              </Button>
              <button onClick={() => toggleFavorite(product.id)} aria-pressed={fav} aria-label={fav ? 'Убрать из избранного' : 'В избранное'} className="grid h-12 w-12 place-items-center border border-line transition hover:border-white/50">
                <Heart size={18} strokeWidth={1.4} fill={fav ? '#f2f2f2' : 'none'} />
              </button>
            </div>

            <ul className="mt-10 space-y-3 border-t border-line pt-6 text-sm text-bone/80">
              {product.details.map((d) => <li key={d} className="flex gap-3"><span className="mt-2 h-px w-3 shrink-0 bg-mute" />{d}</li>)}
            </ul>
            <p className="mt-6 flex gap-2 text-xs text-mute"><Info size={14} className="mt-0.5 shrink-0" /> Демонстрационный товар. Сроки доставки и наличие не являются реальными.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap mt-24">
          <SectionHeading eyebrow="Подборка" title="Похожие товары" to={`/catalog?category=${product.category}`} linkLabel="Смотреть все" />
          <ProductGrid products={related} />
        </section>
      )}
      {viewed.length > 0 && (
        <section className="wrap mt-20">
          <SectionHeading eyebrow="История" title="Недавно просмотренные" />
          <ProductGrid products={viewed} />
        </section>
      )}
    </div>
  )
}
