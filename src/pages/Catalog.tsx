import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import { ALL_COLORS, ALL_SIZES, CATEGORIES, PRICE_MAX, PRODUCTS, formatPrice, type Category } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Button } from '../components/Button'

type Sort = 'new' | 'price-asc' | 'price-desc'

function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 lg:grid-cols-3" aria-busy="true" aria-label="Загрузка">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[4/5] animate-pulse bg-graphite" />
          <div className="mt-3 h-3 w-2/3 animate-pulse bg-graphite" />
          <div className="mt-2 h-3 w-1/3 animate-pulse bg-graphite" />
        </div>
      ))}
    </div>
  )
}

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const category = (params.get('category') as Category | null) ?? ''
  const size = params.get('size') ?? ''
  const color = params.get('color') ?? ''
  const maxPrice = Number(params.get('max')) || PRICE_MAX
  const sort = (params.get('sort') as Sort | null) ?? 'new'
  const q = params.get('q') ?? ''

  const set = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    const list = PRODUCTS.filter(
      (p) =>
        (!category || p.category === category) &&
        (!size || p.sizes.includes(size)) &&
        (!color || p.colors.some((c) => c.name === color)) &&
        p.price <= maxPrice &&
        (!s || p.name.toLowerCase().includes(s)),
    )
    return [...list].sort((a, b) => (sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.order - a.order))
  }, [category, size, color, maxPrice, sort, q])

  // short skeleton on every query change so state transitions are visible
  const sig = `${category}|${size}|${color}|${maxPrice}|${sort}|${q}`
  useEffect(() => {
    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(t)
  }, [sig])

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [filtersOpen])

  const activeCount = [category, size, color, maxPrice < PRICE_MAX ? 'p' : '', q].filter(Boolean).length
  const reset = () => setParams(new URLSearchParams(), { replace: true })

  const chip = (active: boolean) =>
    `min-h-10 border px-3.5 text-xs transition ${active ? 'border-bone bg-bone text-ink' : 'border-line text-bone/80 hover:border-white/50'}`

  const Filters = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-3">Категория</p>
        <div className="flex flex-wrap gap-2">
          <button className={chip(!category)} onClick={() => set({ category: null })}>Все</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={chip(category === c.id)} aria-pressed={category === c.id} onClick={() => set({ category: category === c.id ? null : c.id })}>{c.label}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3">Размер</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button key={s} className={chip(size === s)} aria-pressed={size === s} onClick={() => set({ size: size === s ? null : s })}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3">Цвет</p>
        <div className="flex flex-wrap gap-3">
          {ALL_COLORS.map((c) => (
            <button
              key={c.name}
              title={c.name}
              aria-label={c.name}
              aria-pressed={color === c.name}
              onClick={() => set({ color: color === c.name ? null : c.name })}
              className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? 'border-bone' : 'border-line hover:border-white/50'}`}
              style={{ background: c.hex, boxShadow: 'inset 0 0 0 3px #0a0a0a' }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3">Цена до: <span className="text-bone">{formatPrice(maxPrice)}</span></p>
        <input
          type="range" min={5000} max={PRICE_MAX} step={1000} value={maxPrice}
          onChange={(e) => set({ max: Number(e.target.value) >= PRICE_MAX ? null : e.target.value })}
          aria-label="Максимальная цена" className="h-8 w-full"
        />
      </div>
      {activeCount > 0 && (
        <button onClick={reset} className="text-xs text-mute underline underline-offset-4 hover:text-bone">Сбросить фильтры</button>
      )}
    </div>
  )

  return (
    <div className="wrap pb-8 pt-28 md:pt-36">
      <p className="eyebrow mb-3">Каталог</p>
      <h1 className="display text-3xl md:text-5xl">{category ? CATEGORIES.find((c) => c.id === category)?.label : 'Вся одежда'}</h1>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Поиск по названию</span>
          <Search size={18} strokeWidth={1.3} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
          <input
            value={q}
            onChange={(e) => set({ q: e.target.value || null })}
            placeholder="Поиск по названию"
            className="min-h-12 w-full border border-line bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-white/60"
          />
        </label>
        <div className="flex gap-3">
          <button onClick={() => setFiltersOpen(true)} className="flex min-h-12 flex-1 items-center justify-center gap-2 border border-line px-5 text-sm lg:hidden">
            <SlidersHorizontal size={16} strokeWidth={1.3} /> Фильтры{activeCount ? ` (${activeCount})` : ''}
          </button>
          <label className="flex-1 md:flex-none">
            <span className="sr-only">Сортировка</span>
            <select value={sort} onChange={(e) => set({ sort: e.target.value === 'new' ? null : e.target.value })} className="min-h-12 w-full border border-line bg-ink px-4 text-sm outline-none focus:border-white/60 md:w-56">
              <option value="new">Сначала новые</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        <aside className="hidden lg:block" aria-label="Фильтры"><div className="sticky top-28">{Filters}</div></aside>
        <section aria-label="Товары">
          <p className="mb-6 text-xs text-mute" aria-live="polite">{loading ? 'Загрузка…' : `Найдено: ${filtered.length}`}</p>
          {loading ? (
            <Skeleton />
          ) : filtered.length === 0 ? (
            <div className="grid place-items-center border border-line px-6 py-20 text-center">
              <p className="display text-xl md:text-2xl">Ничего не найдено</p>
              <p className="mt-3 max-w-sm text-sm text-mute">Попробуйте изменить запрос или сбросить фильтры.</p>
              <Button variant="outline" className="mt-8" onClick={reset}>Сбросить фильтры</Button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </motion.div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-[60] bg-black/70" />
            <motion.div
              role="dialog" aria-modal="true" aria-label="Фильтры"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-[61] max-h-[88dvh] overflow-y-auto border-t border-line bg-ink p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-lg">Фильтры</p>
                <button aria-label="Закрыть" onClick={() => setFiltersOpen(false)} className="grid h-11 w-11 place-items-center"><X size={22} strokeWidth={1.3} /></button>
              </div>
              {Filters}
              <Button className="mt-8 w-full" onClick={() => setFiltersOpen(false)}>Показать {filtered.length}</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
