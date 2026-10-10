import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatPrice, getProduct } from '../data/products'
import { useStore } from '../store/StoreContext'
import ProductImage from '../components/ProductImage'
import { LinkButton } from '../components/Button'

export default function Cart() {
  const { cart, cartTotal, cartCount, setQty, removeFromCart } = useStore()

  if (cart.length === 0) {
    return (
      <div className="wrap grid min-h-[75dvh] place-items-center pt-28 text-center">
        <div>
          <p className="eyebrow mb-3">Корзина</p>
          <h1 className="display text-3xl">Здесь пока пусто</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm text-mute">Добавьте что-нибудь из каталога, и оно сохранится здесь.</p>
          <div className="mt-8 flex justify-center"><LinkButton to="/catalog">В каталог</LinkButton></div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap pb-8 pt-28 md:pt-36">
      <p className="eyebrow mb-3">Корзина</p>
      <h1 className="display text-3xl md:text-5xl">Ваш заказ</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <ul>
          <AnimatePresence initial={false}>
            {cart.map((item) => {
              const p = getProduct(item.productId)!
              const color = p.colors.find((c) => c.name === item.color) ?? p.colors[0]
              return (
                <motion.li key={item.key} layout exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden border-b border-line first:border-t">
                  <div className="flex gap-4 py-5">
                    <Link to={`/product/${p.id}`} className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-graphite md:w-28">
                      <ProductImage product={p} color={color.hex} />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between text-sm">
                      <div className="flex justify-between gap-3">
                        <div>
                          <Link to={`/product/${p.id}`} className="hover:text-white">{p.name}</Link>
                          <p className="mt-1 text-xs text-mute">{item.color} · {item.size}</p>
                        </div>
                        <p className="whitespace-nowrap">{formatPrice(p.price * item.qty)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button aria-label="Уменьшить количество" disabled={item.qty <= 1} onClick={() => setQty(item.key, item.qty - 1)} className="grid h-11 w-11 place-items-center disabled:opacity-30"><Minus size={14} /></button>
                          <span className="w-8 text-center tabular-nums" aria-live="polite">{item.qty}</span>
                          <button aria-label="Увеличить количество" disabled={item.qty >= 10} onClick={() => setQty(item.key, item.qty + 1)} className="grid h-11 w-11 place-items-center disabled:opacity-30"><Plus size={14} /></button>
                        </div>
                        <button aria-label={`Удалить ${p.name}`} onClick={() => removeFromCart(item.key)} className="grid h-11 w-11 place-items-center text-mute transition hover:text-white"><Trash2 size={17} strokeWidth={1.3} /></button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        <aside className="h-fit border border-line bg-surface p-6 lg:sticky lg:top-28" aria-label="Итого">
          <p className="font-display text-lg">Итого</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-mute">Товары ({cartCount})</dt><dd>{formatPrice(cartTotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-mute">Доставка</dt><dd className="text-mute">уточняется</dd></div>
            <div className="flex justify-between border-t border-line pt-4 text-base"><dt>К оплате</dt><dd>{formatPrice(cartTotal)}</dd></div>
          </dl>
          <LinkButton to="/checkout" className="mt-6 w-full">Оформить заказ</LinkButton>
          <Link to="/catalog" className="mt-4 block text-center text-xs text-mute underline underline-offset-4 hover:text-bone">Продолжить покупки</Link>
        </aside>
      </div>
    </div>
  )
}
