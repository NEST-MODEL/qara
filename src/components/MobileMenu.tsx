import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS } from './nav'
import { CATEGORIES } from '../data/products'
import { useStore } from '../store/StoreContext'

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStore()
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, setMenuOpen])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, setMenuOpen])

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[60] bg-black/70"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[61] flex h-dvh w-full max-w-md flex-col overflow-y-auto border-l border-line bg-ink px-6 pb-10 pt-4"
          >
            <div className="flex h-12 items-center justify-between">
              <Logo />
              <button aria-label="Закрыть меню" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center">
                <X size={24} strokeWidth={1.3} />
              </button>
            </div>
            <nav className="mt-10" aria-label="Меню">
              {NAV_LINKS.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.5 }}>
                  <Link to={l.to} className="flex items-center justify-between border-b border-line py-4 font-display text-2xl">
                    {l.label}
                    <span className="text-xs text-mute">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="eyebrow mb-4 mt-10">Категории</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/catalog?category=${c.id}`} className="border border-line px-4 py-2.5 text-sm transition hover:border-white/50">
                  {c.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-10 text-sm text-mute">
              <p>Demo-витрина. Заказы не обрабатываются.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
