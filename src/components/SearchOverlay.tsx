import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { PRODUCTS, formatPrice, categoryLabel } from '../data/products'
import { useStore } from '../store/StoreContext'
import ProductImage from './ProductImage'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const nav = useNavigate()

  useEffect(() => {
    if (searchOpen) setTimeout(() => ref.current?.focus(), 80)
    else setQ('')
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSearchOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearchOpen])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(s) || categoryLabel(p.category).toLowerCase().includes(s)).slice(0, 6)
  }, [q])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchOpen(false)
    nav(`/catalog${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Поиск"
        >
          <div className="wrap pt-6 md:pt-10">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Поиск</span>
              <button aria-label="Закрыть поиск" onClick={() => setSearchOpen(false)} className="grid h-11 w-11 place-items-center">
                <X size={22} strokeWidth={1.3} />
              </button>
            </div>
            <form onSubmit={submit} className="mt-6 flex items-center gap-4 border-b border-white/30 pb-4">
              <Search size={22} strokeWidth={1.3} className="text-mute" />
              <input
                ref={ref}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Название товара"
                aria-label="Поиск по названию"
                className="w-full bg-transparent font-display text-xl outline-none placeholder:text-mute/60 md:text-3xl"
              />
            </form>
            <div className="mt-8 pb-16">
              {q.trim() && results.length === 0 && <p className="text-mute">Ничего не найдено по запросу «{q}».</p>}
              <ul className="grid gap-4 md:grid-cols-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.id}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-4 border border-line p-3 transition hover:border-white/40">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-graphite">
                        <ProductImage product={p} />
                      </div>
                      <div className="text-sm">
                        <p>{p.name}</p>
                        <p className="text-mute">{categoryLabel(p.category)} · {formatPrice(p.price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {q.trim() && results.length > 0 && (
                <button onClick={submit} className="mt-6 text-sm underline underline-offset-4">
                  Все результаты в каталоге
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
