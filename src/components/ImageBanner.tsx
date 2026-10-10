import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { LinkButton } from './Button'
import { BANNER_PHOTOS } from '../data/photos'
import SmartImage from './SmartImage'
import Atmosphere from './Atmosphere'
import Reveal from './Reveal'

export default function ImageBanner() {
  const [i, setI] = useState(0)
  const N = 3
  return (
    <section className="wrap mt-20 md:mt-28">
      <Reveal>
        <div className="grain relative isolate flex min-h-[360px] items-center overflow-hidden border border-line md:min-h-[420px]">
          <AnimatePresence mode="popLayout">
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 -z-10">
              <SmartImage src={BANNER_PHOTOS[i]} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" fallback={<Atmosphere variant={i + 1} />} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          <div className="p-6 md:p-14">
            <p className="eyebrow mb-4 text-bone/70">Стиль. Качество. Ты.</p>
            <h2 className="display text-3xl sm:text-4xl lg:text-5xl">
              QARA — БОЛЬШЕ,<br />ЧЕМ ОДЕЖДА
            </h2>
            <div className="mt-8"><LinkButton to="/about">Узнать больше</LinkButton></div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs md:bottom-8 md:right-8">
            <span className="tabular-nums">0{i + 1} <span className="text-mute">/ 0{N}</span></span>
            <button aria-label="Предыдущий" onClick={() => setI((i + N - 1) % N)} className="grid h-10 w-10 place-items-center"><ArrowLeft size={16} strokeWidth={1.3} /></button>
            <button aria-label="Следующий" onClick={() => setI((i + 1) % N)} className="grid h-10 w-10 place-items-center"><ArrowRight size={16} strokeWidth={1.3} /></button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
