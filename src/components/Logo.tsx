import { Link } from 'react-router-dom'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="QARA — на главную"
      className={`font-display text-[22px] font-medium tracking-[0.32em] text-bone md:text-[26px] ${className}`}
    >
      QARA
    </Link>
  )
}
