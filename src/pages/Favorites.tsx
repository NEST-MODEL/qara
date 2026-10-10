import { getProduct } from '../data/products'
import { useStore } from '../store/StoreContext'
import ProductGrid from '../components/ProductGrid'
import { LinkButton } from '../components/Button'

export default function Favorites() {
  const { favorites } = useStore()
  const items = favorites.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p)
  return (
    <div className="wrap pb-8 pt-28 md:pt-36">
      <p className="eyebrow mb-3">Избранное</p>
      <h1 className="display text-3xl md:text-5xl">Ваши любимые вещи</h1>
      <div className="mt-10">
        {items.length === 0 ? (
          <div className="grid place-items-center border border-line px-6 py-20 text-center">
            <p className="display text-xl">Пока ничего нет</p>
            <p className="mt-3 max-w-sm text-sm text-mute">Нажмите на сердце у товара, чтобы сохранить его здесь.</p>
            <div className="mt-8"><LinkButton to="/catalog">В каталог</LinkButton></div>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  )
}
