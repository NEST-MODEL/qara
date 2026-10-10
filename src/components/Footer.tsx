import { Link } from 'react-router-dom'
import { Camera, Mail, MapPin, Phone, Send } from 'lucide-react'
import Logo from './Logo'
import { CATEGORIES } from '../data/products'
import { NAV_LINKS } from './nav'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface pb-24 md:pb-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-mute">Современная уличная одежда для тех, кто ценит качество, комфорт и свободу самовыражения.</p>
          <div className="mt-6 flex gap-2">
            {[
              { icon: Camera, label: 'Instagram' },
              { icon: Send, label: 'Telegram' },
              { icon: Mail, label: 'Email' },
            ].map(({ icon: I, label }) => (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} aria-label={label} className="grid h-11 w-11 place-items-center border border-line text-bone/80 transition hover:border-white/50 hover:text-white">
                <I size={18} strokeWidth={1.3} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">Навигация</p>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-bone/80 transition hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Каталог</p>
          <ul className="space-y-3 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}><Link to={`/catalog?category=${c.id}`} className="text-bone/80 transition hover:text-white">{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Контакты</p>
          <ul className="space-y-3 text-sm text-bone/80">
            <li className="flex gap-3"><Phone size={16} strokeWidth={1.3} className="mt-0.5 shrink-0" /> +7 (000) 000-00-00</li>
            <li className="flex gap-3"><Mail size={16} strokeWidth={1.3} className="mt-0.5 shrink-0" /> hello@qara.example</li>
            <li className="flex gap-3"><MapPin size={16} strokeWidth={1.3} className="mt-0.5 shrink-0" /> Казахстан, демонстрационный адрес</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-mute md:flex-row md:justify-between">
          <p>© 2026 QARA. Демонстрационный проект: контакты и товары вымышлены.</p>
          <p>Оплата и обработка заказов не подключены.</p>
        </div>
      </div>
    </footer>
  )
}
