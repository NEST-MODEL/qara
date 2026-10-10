import { LinkButton } from '../components/Button'

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[75dvh] place-items-center pt-28 text-center">
      <div>
        <p className="eyebrow mb-3">Ошибка 404</p>
        <h1 className="display text-4xl md:text-6xl">Страница не найдена</h1>
        <div className="mt-10 flex justify-center"><LinkButton to="/">На главную</LinkButton></div>
      </div>
    </div>
  )
}
