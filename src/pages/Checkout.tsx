import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Info } from 'lucide-react'
import { formatPrice, getProduct } from '../data/products'
import { useStore } from '../store/StoreContext'
import { useLocalStorage } from '../lib/useLocalStorage'
import { Button, LinkButton } from '../components/Button'

export interface Order {
  id: string
  date: string
  total: number
  items: { name: string; size: string; color: string; qty: number }[]
}

type Form = { name: string; phone: string; email: string; city: string; address: string; comment: string; delivery: string }
const EMPTY: Form = { name: '', phone: '', email: '', city: '', address: '', comment: '', delivery: 'courier' }

function validate(f: Form, pickup: boolean) {
  const e: Partial<Record<keyof Form, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Укажите имя'
  if (f.phone.replace(/\D/g, '').length < 11) e.phone = 'Введите телефон полностью, например +7 700 000 00 00'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Введите корректный email'
  if (f.city.trim().length < 2) e.city = 'Укажите город'
  if (!pickup && f.address.trim().length < 5) e.address = 'Укажите адрес: улица, дом, квартира'
  return e
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore()
  const [, setOrders] = useLocalStorage<Order[]>('qara:orders', [])
  const [f, setF] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<Order | null>(null)

  const pickup = f.delivery === 'pickup'
  const set = (k: keyof Form, v: string) => setF((p) => ({ ...p, [k]: v }))

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate(f, pickup)
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus()
      return
    }
    setBusy(true)
    window.setTimeout(() => {
      const order: Order = {
        id: `QA-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        total: cartTotal,
        items: cart.map((i) => ({ name: getProduct(i.productId)?.name ?? '', size: i.size, color: i.color, qty: i.qty })),
      }
      setOrders((prev) => [order, ...prev].slice(0, 20))
      clearCart()
      setDone(order)
      setBusy(false)
      window.scrollTo({ top: 0 })
    }, 700)
  }

  if (done) {
    return (
      <div className="wrap grid min-h-[75dvh] place-items-center pt-28 text-center">
        <div className="max-w-md">
          <span className="mx-auto grid h-14 w-14 place-items-center border border-white/40"><Check size={24} strokeWidth={1.3} /></span>
          <p className="eyebrow mb-3 mt-8">Заказ {done.id}</p>
          <h1 className="display text-3xl">Демо-заказ оформлен</h1>
          <p className="mt-4 text-sm leading-relaxed text-mute">Это демонстрационный сценарий: данные сохранены только в вашем браузере, оплата не проводилась и заказ никуда не отправлен.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton to="/catalog">Продолжить покупки</LinkButton>
            <LinkButton to="/profile" variant="outline" arrow={false}>Мои заказы</LinkButton>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="wrap grid min-h-[75dvh] place-items-center pt-28 text-center">
        <div>
          <h1 className="display text-3xl">Корзина пуста</h1>
          <p className="mt-4 text-sm text-mute">Сначала добавьте товары.</p>
          <div className="mt-8 flex justify-center"><LinkButton to="/catalog">В каталог</LinkButton></div>
        </div>
      </div>
    )
  }

  const field = (k: keyof Form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="eyebrow mb-2 block">{label}</label>
      <input
        id={`f-${k}`} value={f[k]} onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={`min-h-12 w-full border bg-transparent px-4 text-sm outline-none transition focus:border-white/70 ${errors[k] ? 'border-red-400/70' : 'border-line'}`}
        {...props}
      />
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-xs text-red-300">{errors[k]}</p>}
    </div>
  )

  return (
    <div className="wrap pb-8 pt-28 md:pt-36">
      <p className="eyebrow mb-3">Оформление</p>
      <h1 className="display text-3xl md:text-5xl">Данные для заказа</h1>
      <form onSubmit={submit} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div className="space-y-10">
          <div className="flex items-start gap-3 border border-line bg-surface p-4 text-xs text-mute"><Info size={16} className="mt-0.5 shrink-0" /> Демонстрационное оформление: оплата не подключена, заказ не обрабатывается.</div>
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-5 font-display text-lg">Контакты</legend>
            {field('name', 'Имя', { autoComplete: 'name', placeholder: 'Алихан' })}
            {field('phone', 'Телефон', { type: 'tel', autoComplete: 'tel', placeholder: '+7 700 000 00 00', inputMode: 'tel' })}
            <div className="sm:col-span-2">{field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'name@mail.com' })}</div>
          </fieldset>
          <fieldset>
            <legend className="mb-5 font-display text-lg">Получение</legend>
            <div className="mb-5 grid grid-cols-2 gap-3">
              {[{ v: 'courier', l: 'Курьер' }, { v: 'pickup', l: 'Самовывоз' }].map((o) => (
                <label key={o.v} className={`flex min-h-12 cursor-pointer items-center justify-center border text-sm transition ${f.delivery === o.v ? 'border-bone bg-bone text-ink' : 'border-line hover:border-white/50'}`}>
                  <input type="radio" name="delivery" value={o.v} checked={f.delivery === o.v} onChange={() => set('delivery', o.v)} className="sr-only" />
                  {o.l}
                </label>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field('city', 'Город', { autoComplete: 'address-level2', placeholder: 'Алматы' })}
              {pickup ? <p className="self-end pb-3 text-xs text-mute">Адрес пункта выдачи будет указан позже. Это демо.</p> : field('address', 'Адрес', { autoComplete: 'street-address', placeholder: 'Улица, дом, квартира' })}
              <div className="sm:col-span-2">
                <label htmlFor="f-comment" className="eyebrow mb-2 block">Комментарий</label>
                <textarea id="f-comment" rows={3} value={f.comment} onChange={(e) => set('comment', e.target.value)} className="w-full border border-line bg-transparent p-4 text-sm outline-none transition focus:border-white/70" />
              </div>
            </div>
          </fieldset>
          <div>
            <p className="font-display text-lg">Оплата</p>
            <p className="mt-3 text-sm text-mute">Платёжная система не подключена. Реальная оплата не выполняется.</p>
          </div>
        </div>

        <aside className="h-fit border border-line bg-surface p-6 lg:sticky lg:top-28" aria-label="Ваш заказ">
          <p className="font-display text-lg">Ваш заказ</p>
          <ul className="mt-5 space-y-3 text-sm">
            {cart.map((i) => {
              const p = getProduct(i.productId)!
              return (
                <li key={i.key} className="flex justify-between gap-3">
                  <span className="text-bone/80">{p.name} <span className="text-mute">· {i.size} × {i.qty}</span></span>
                  <span className="whitespace-nowrap">{formatPrice(p.price * i.qty)}</span>
                </li>
              )
            })}
          </ul>
          <div className="mt-5 flex justify-between border-t border-line pt-4"><span>Итого</span><span>{formatPrice(cartTotal)}</span></div>
          <Button type="submit" disabled={busy} className="mt-6 w-full">{busy ? 'Оформляем…' : 'Оформить демо-заказ'}</Button>
          <Link to="/cart" className="mt-4 block text-center text-xs text-mute underline underline-offset-4 hover:text-bone">Вернуться в корзину</Link>
        </aside>
      </form>
    </div>
  )
}
