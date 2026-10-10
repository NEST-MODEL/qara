import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import Reveal from '../components/Reveal'
import { Button, LinkButton } from '../components/Button'

function Shell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="wrap pb-8 pt-28 md:pt-36">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="display max-w-3xl text-3xl md:text-5xl">{title}</h1>
      <div className="mt-12">{children}</div>
    </div>
  )
}

export function About() {
  const blocks = [
    ['Детали', 'Плотные ткани, продуманные швы и посадка, которая держит форму после десятков стирок.'],
    ['Силуэт', 'Объём, длина и пропорции выверены под городской ритм: от утра до поздней ночи.'],
    ['Палитра', 'Чёрный, графит, пепел. Ничего лишнего, всё сочетается между собой.'],
  ]
  return (
    <Shell eyebrow="О нас" title="QARA — больше, чем одежда">
      <p className="max-w-2xl text-[15px] leading-relaxed text-bone/80">QARA — вымышленный бренд для этого демо-проекта. Мы показываем, как может выглядеть премиальный streetwear-магазин: сдержанно, точно, без шума.</p>
      <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
        {blocks.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.08} className="bg-ink p-8">
            <p className="eyebrow mb-4">0{i + 1}</p>
            <h2 className="display text-xl">{t}</h2>
            <p className="mt-4 text-sm leading-relaxed text-mute">{d}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-12"><LinkButton to="/catalog">Перейти к каталогу</LinkButton></div>
    </Shell>
  )
}

export function Delivery() {
  const rows = [
    ['Доставка', 'Условия и сроки в демо-версии не заданы. В рабочем магазине здесь будут тарифы по городам Казахстана.'],
    ['Оплата', 'Платёжная система не подключена. Реальные платежи не принимаются.'],
    ['Возврат', 'Правила возврата добавляются владельцем магазина в соответствии с законодательством.'],
  ]
  return (
    <Shell eyebrow="Доставка" title="Доставка и оплата">
      <dl className="divide-y divide-line border-y border-line">
        {rows.map(([t, d]) => (
          <div key={t} className="grid gap-2 py-7 md:grid-cols-[240px_1fr]">
            <dt className="font-display text-lg">{t}</dt>
            <dd className="max-w-xl text-sm leading-relaxed text-mute">{d}</dd>
          </div>
        ))}
      </dl>
    </Shell>
  )
}

export function Contacts() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const n: Record<string, string> = {}
    if (f.name.trim().length < 2) n.name = 'Укажите имя'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) n.email = 'Введите корректный email'
    if (f.message.trim().length < 10) n.message = 'Напишите хотя бы пару предложений'
    setErr(n)
    if (!Object.keys(n).length) setSent(true)
  }
  const cls = (k: string) => `w-full border bg-transparent px-4 text-sm outline-none transition focus:border-white/70 ${err[k] ? 'border-red-400/70' : 'border-line'}`

  return (
    <Shell eyebrow="Контакты" title="Свяжитесь с нами">
      <div className="grid gap-12 lg:grid-cols-2">
        <ul className="space-y-5 text-sm text-bone/80">
          <li className="flex gap-4"><Phone size={18} strokeWidth={1.3} /> +7 (000) 000-00-00</li>
          <li className="flex gap-4"><Mail size={18} strokeWidth={1.3} /> hello@qara.example</li>
          <li className="flex gap-4"><MapPin size={18} strokeWidth={1.3} /> Демонстрационный адрес, Казахстан</li>
          <li className="pt-2 text-xs text-mute">Контактные данные вымышлены.</li>
        </ul>
        {sent ? (
          <p role="status" className="border border-line p-8 text-sm">Спасибо! Это демо-форма: сообщение никуда не отправлено.</p>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5">
            {([['name', 'Имя', 'text'], ['email', 'Email', 'email']] as const).map(([k, l, t]) => (
              <div key={k}>
                <label htmlFor={`c-${k}`} className="eyebrow mb-2 block">{l}</label>
                <input id={`c-${k}`} type={t} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} className={`${cls(k)} min-h-12`} />
                {err[k] && <p className="mt-1.5 text-xs text-red-300">{err[k]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="c-message" className="eyebrow mb-2 block">Сообщение</label>
              <textarea id="c-message" rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-invalid={!!err.message} className={`${cls('message')} py-3`} />
              {err.message && <p className="mt-1.5 text-xs text-red-300">{err.message}</p>}
            </div>
            <Button type="submit">Отправить</Button>
          </form>
        )}
      </div>
    </Shell>
  )
}
