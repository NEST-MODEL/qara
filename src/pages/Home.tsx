import { PRODUCTS } from '../data/products'
import Hero from '../components/Hero'
import Features from '../components/Features'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import ImageBanner from '../components/ImageBanner'
import Newsletter from '../components/Newsletter'
import { LinkButton } from '../components/Button'
import Reveal from '../components/Reveal'

export default function Home() {
  const popular = PRODUCTS.filter((p) => p.popular).slice(0, 4)
  const fresh = PRODUCTS.filter((p) => p.isNew).sort((a, b) => b.order - a.order).slice(0, 4)
  return (
    <>
      <Hero />
      <Features />
      <section className="wrap mt-16 md:mt-24">
        <SectionHeading eyebrow="Каталог" title="Популярные товары" to="/catalog" />
        <ProductGrid products={popular} />
      </section>
      <ImageBanner />
      <section className="wrap mt-20 md:mt-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:gap-14">
          <Reveal className="flex flex-col justify-between gap-8">
            <div>
              <p className="eyebrow mb-3">Коллекция 2026</p>
              <h2 className="display text-[28px] md:text-4xl">Новая<br />коллекция</h2>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">Объёмные силуэты, технические ткани и сдержанная палитра: чёрный, графит, пепел.</p>
            </div>
            <div><LinkButton to="/catalog?sort=new" variant="outline">Смотреть всё</LinkButton></div>
          </Reveal>
          <ProductGrid products={fresh} cols={4} />
        </div>
      </section>
      <Newsletter />
    </>
  )
}
