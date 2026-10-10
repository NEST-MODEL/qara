import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, to, linkLabel = 'Весь каталог' }: { eyebrow: string; title: string; to?: string; linkLabel?: string }) {
  return (
    <Reveal className="mb-8 flex items-end justify-between gap-4 md:mb-10">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="display text-[26px] md:text-4xl">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="group flex shrink-0 items-center gap-2 border-b border-bone/60 pb-0.5 text-xs transition-colors hover:border-white">
          {linkLabel}
          <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  )
}
