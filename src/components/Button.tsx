import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const base =
  'group inline-flex min-h-12 items-center justify-center gap-4 px-6 text-[13px] font-medium tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40'
const variants = {
  light: 'bg-bone text-ink hover:bg-white',
  outline: 'border border-white/30 text-bone hover:border-white hover:bg-white/5',
}

type Variant = keyof typeof variants

export function LinkButton({ to, children, variant = 'light', arrow = true, className = '' }: { to: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  )
}

export function Button({ variant = 'light', className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button {...rest} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
