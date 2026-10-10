import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreContext'

export default function Toasts() {
  const { toasts, dismissToast } = useStore()
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[84px] z-[80] flex flex-col items-center gap-2 px-4 md:bottom-8 md:items-end md:px-8"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 border border-line bg-graphite/95 px-4 py-3 text-sm backdrop-blur"
          >
            <Check size={16} strokeWidth={1.5} className="shrink-0" />
            <span className="flex-1">{t.message}</span>
            {t.action && (
              <Link to={t.action.to} onClick={() => dismissToast(t.id)} className="text-xs underline underline-offset-4">
                {t.action.label}
              </Link>
            )}
            <button aria-label="Закрыть" onClick={() => dismissToast(t.id)} className="text-mute hover:text-bone">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
