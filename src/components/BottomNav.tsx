import { NavLink } from 'react-router-dom'
import { Heart, Home, LayoutGrid, ShoppingBag, User } from 'lucide-react'
import { useStore } from '../store/StoreContext'

export default function BottomNav() {
  const { cartCount, favorites } = useStore()
  const items = [
    { to: '/', label: 'Главная', icon: Home, end: true, n: 0 },
    { to: '/catalog', label: 'Каталог', icon: LayoutGrid, n: 0 },
    { to: '/favorites', label: 'Избранное', icon: Heart, n: favorites.length },
    { to: '/cart', label: 'Корзина', icon: ShoppingBag, n: cartCount },
    { to: '/profile', label: 'Профиль', icon: User, n: 0 },
  ]
  return (
    <nav
      aria-label="Нижняя навигация"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, end, n }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={({ isActive }) => `relative flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] transition-colors ${isActive ? 'text-white' : 'text-mute'}`}>
              <span className="relative">
                <Icon size={20} strokeWidth={1.3} />
                {n > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-bone px-1 text-[9px] font-semibold text-ink">{n}</span>
                )}
              </span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
