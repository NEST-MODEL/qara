import { Headphones, CreditCard, ShieldCheck, Truck } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'Быстрая доставка', text: 'По всему Казахстану' },
  { icon: ShieldCheck, title: 'Гарантия качества', text: 'Плотные ткани и швы' },
  { icon: CreditCard, title: 'Удобная оплата', text: 'Способы оплаты уточняются' },
  { icon: Headphones, title: 'Поддержка', text: 'Мы на связи' },
]

export default function Features() {
  return (
    <section aria-label="Преимущества" className="border-y border-line bg-surface">
      <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-6 py-7 lg:grid-cols-4 lg:py-8">
        {ITEMS.map(({ icon: I, title, text }) => (
          <li key={title} className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-center lg:gap-4 lg:text-left">
            <I size={28} strokeWidth={1} className="shrink-0 text-bone/80" />
            <div>
              <p className="text-[12px] font-medium lg:text-[13px]">{title}</p>
              <p className="text-[11px] text-mute lg:text-xs">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
