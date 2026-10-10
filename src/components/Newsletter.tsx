import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Reveal from './Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Введите корректный email')
      return
    }
    setError('')
    setDone(true)
  }

  return (
    <section className="wrap mt-24">
      <Reveal>
        <div className="grid items-end gap-8 border border-line bg-surface p-6 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow mb-4">Рассылка</p>
            <h2 className="display text-2xl md:text-4xl">Будь первым в курсе новых коллекций</h2>
            <p className="mt-4 max-w-md text-sm text-mute">Ранний доступ к релизам и новости бренда. Без спама.</p>
          </div>
          {done ? (
            <p className="flex items-center gap-3 text-sm" role="status"><Check size={18} /> Спасибо! Это демо: адрес нигде не сохранён.</p>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="nl-email" className="sr-only">Email</label>
              <div className="flex border-b border-white/40 focus-within:border-white">
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  autoComplete="email"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'nl-err' : undefined}
                  className="min-h-12 w-full bg-transparent text-sm outline-none placeholder:text-mute"
                />
                <button type="submit" aria-label="Подписаться" className="grid h-12 w-12 place-items-center transition hover:translate-x-1">
                  <ArrowRight size={20} strokeWidth={1.3} />
                </button>
              </div>
              {error && <p id="nl-err" className="mt-2 text-xs text-red-300">{error}</p>}
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}
