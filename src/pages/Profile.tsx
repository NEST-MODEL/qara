import { formatPrice } from '../data/products'
import { useLocalStorage } from '../lib/useLocalStorage'
import type { Order } from './Checkout'
import { LinkButton } from '../components/Button'

export default function Profile() {
  const [orders] = useLocalStorage<Order[]>('qara:orders', [])
  return (
    <div className="wrap pb-8 pt-28 md:pt-36">
      <p className="eyebrow mb-3">Профиль</p>
      <h1 className="display text-3xl md:text-5xl">Мои заказы</h1>
      <p className="mt-4 max-w-md text-sm text-mute">Авторизации в демо нет. Здесь показаны демо-заказы, сохранённые в этом браузере.</p>
      <div className="mt-10 space-y-4">
        {orders.length === 0 ? (
          <div className="grid place-items-center border border-line px-6 py-20 text-center">
            <p className="display text-xl">Заказов пока нет</p>
            <div className="mt-8"><LinkButton to="/catalog">В каталог</LinkButton></div>
          </div>
        ) : (
          orders.map((o) => (
            <article key={o.id} className="border border-line p-5">
              <header className="flex justify-between text-sm">
                <p>{o.id} <span className="text-mute">· {new Date(o.date).toLocaleDateString('ru-RU')}</span></p>
                <p>{formatPrice(o.total)}</p>
              </header>
              <ul className="mt-4 space-y-1 text-xs text-mute">
                {o.items.map((i, n) => <li key={n}>{i.name} · {i.color} · {i.size} × {i.qty}</li>)}
              </ul>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
