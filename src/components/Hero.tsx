import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { LinkButton } from './Button'
import { HERO_PHOTOS } from '../data/photos'
import SmartImage from './SmartImage'
import Atmosphere from './Atmosphere'

const SLIDES = HERO_PHOTOS

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((p) => (p + 1) % SLIDES.length), 7000)
    return () => window.clearInterval(t)
  }, [paused])

  const go = (d: number) => setI((p) => (p + d + SLIDES.length) % SLIDES.length)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Новая коллекция"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grain relative isolate flex min-h-[640px] items-end overflow-hidden md:min-h-[760px] lg:h-[min(100svh,860px)]"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[7%] bottom-[-7%] -z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SmartImage
              src={HERO_PHOTOS[i]}
              alt="Модели в чёрной одежде QARA на фоне бетонной архитектуры"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
              fallback={<Atmosphere variant={i} />}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <div className="wrap relative w-full pb-10 pt-32 md:pb-16">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="eyebrow text-bone/80">
          Новая коллекция 2026
        </motion.p>
        <h1 className="display mt-5 text-[40px] leading-[1.02] sm:text-6xl lg:text-[84px]">
          {['СТИЛЬ', 'В ДЕТАЛЯХ'].map((line, n) => (
            <span key={line} className="block overflow-hidden">
              <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.2 + n * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }} className="mt-6 max-w-sm text-sm leading-relaxed text-bone/85 md:text-[15px]">
          Современная уличная одежда для тех, кто ценит качество, комфорт и свободу самовыражения.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-8">
          <LinkButton to="/catalog">Перейти к каталогу</LinkButton>
        </motion.div>

        <div className="mt-12 flex items-center gap-8 text-xs md:mt-20">
          <p className="flex items-center gap-4 tabular-nums" aria-live="polite">
            <span>{pad(i + 1)}</span>
            <span className="h-px w-12 bg-white/40" />
            <span className="text-mute">{pad(SLIDES.length)}</span>
          </p>
          <div className="flex gap-2">
            <button aria-label="Предыдущий слайд" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center transition hover:-translate-x-0.5"><ArrowLeft size={18} strokeWidth={1.3} /></button>
            <button aria-label="Следующий слайд" onClick={() => go(1)} className="grid h-11 w-11 place-items-center transition hover:translate-x-0.5"><ArrowRight size={18} strokeWidth={1.3} /></button>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 text-[10px] tracking-[0.3em] text-bone/70 xl:flex" aria-hidden>
        <span className="h-16 w-px bg-white/40" />
        <span className="[writing-mode:vertical-rl]">QARA / STREETWEAR</span>
        <span className="h-16 w-px bg-white/40" />
      </div>
    </section>
  )
}
