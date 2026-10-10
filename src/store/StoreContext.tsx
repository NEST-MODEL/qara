import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useLocalStorage } from '../lib/useLocalStorage'
import { getProduct } from '../data/products'

export interface CartItem {
  key: string
  productId: string
  size: string
  color: string
  qty: number
}

export interface Toast {
  id: number
  message: string
  action?: { label: string; to: string }
}

interface StoreValue {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (productId: string, size: string, color: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  removeFromCart: (key: string) => void
  clearCart: () => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  recent: string[]
  pushRecent: (id: string) => void
  toasts: Toast[]
  notify: (message: string, action?: Toast['action']) => void
  dismissToast: (id: number) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
}

const Ctx = createContext<StoreValue | null>(null)
let toastId = 0

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('qara:cart', [])
  const [favorites, setFavorites] = useLocalStorage<string[]>('qara:favorites', [])
  const [recent, setRecent] = useLocalStorage<string[]>('qara:recent', [])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const notify = useCallback(
    (message: string, action?: Toast['action']) => {
      const id = ++toastId
      setToasts((t) => [...t.slice(-2), { id, message, action }])
      window.setTimeout(() => dismissToast(id), 3600)
    },
    [dismissToast],
  )

  const addToCart = useCallback(
    (productId: string, size: string, color: string, qty = 1) => {
      const key = `${productId}|${size}|${color}`
      setCart((prev) => {
        const found = prev.find((i) => i.key === key)
        if (found) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
        return [...prev, { key, productId, size, color, qty }]
      })
      const p = getProduct(productId)
      notify(`${p?.name ?? 'Товар'} добавлен в корзину`, { label: 'Корзина', to: '/cart' })
    },
    [setCart, notify],
  )

  const setQty = useCallback(
    (key: string, qty: number) =>
      setCart((prev) =>
        prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i)),
      ),
    [setCart],
  )
  const removeFromCart = useCallback((key: string) => setCart((prev) => prev.filter((i) => i.key !== key)), [setCart])
  const clearCart = useCallback(() => setCart([]), [setCart])

  const toggleFavorite = useCallback(
    (id: string) => {
      const has = favorites.includes(id)
      setFavorites(has ? favorites.filter((x) => x !== id) : [...favorites, id])
      notify(has ? 'Убрано из избранного' : 'Добавлено в избранное')
    },
    [favorites, setFavorites, notify],
  )
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const pushRecent = useCallback(
    (id: string) => setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8)),
    [setRecent],
  )

  const validCart = useMemo(() => cart.filter((i) => getProduct(i.productId)), [cart])
  const cartCount = validCart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = validCart.reduce((s, i) => s + (getProduct(i.productId)?.price ?? 0) * i.qty, 0)

  const value: StoreValue = {
    cart: validCart, cartCount, cartTotal, addToCart, setQty, removeFromCart, clearCart,
    favorites, toggleFavorite, isFavorite, recent, pushRecent,
    toasts, notify, dismissToast, menuOpen, setMenuOpen, searchOpen, setSearchOpen,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore must be used inside StoreProvider')
  return v
}
