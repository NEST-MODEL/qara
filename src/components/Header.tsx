import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS } from './nav'
import { useStore } from '../store/StoreContext'

function Badge({ n }: { n: number }) {
  if (!n) return null
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-bone px-1 text-[10px] font-semibold leading-none text-ink">
      {n}
    </span>
  )
}

export default function Header() {
  const { cartCount, favorites, setMenuOpen, setSearchOpen } = useStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const icon = 'relative grid h-11 w-11 place-items-center text-bone transition-opacity hover:opacity-70'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Logo />
        <nav aria-label="Основная навигация" className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="group relative py-2 text-[13px] text-bone/80 transition-colors hover:text-white">
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-white' : ''}>{l.label}</span>
                  <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-bone transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center">
          <button aria-label="Поиск" className={icon} onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.3} />
          </button>
          <NavLink to="/favorites" aria-label="Избранное" className={icon}>
            <Heart size={20} strokeWidth={1.3} />
            <Badge n={favorites.length} />
          </NavLink>
          <NavLink to="/cart" aria-label="Корзина" className={icon}>
            <ShoppingBag size={20} strokeWidth={1.3} />
            <Badge n={cartCount} />
          </NavLink>
          <button aria-label="Меню" className={icon} onClick={() => setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.3} />
          </button>
        </div>
      </div>
    </header>
  )
}
