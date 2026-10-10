export type Category = 'hoodies' | 'tshirts' | 'pants' | 'jackets' | 'shoes' | 'accessories'

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'hoodies', label: 'Худи' },
  { id: 'tshirts', label: 'Футболки' },
  { id: 'pants', label: 'Брюки' },
  { id: 'jackets', label: 'Куртки' },
  { id: 'shoes', label: 'Обувь' },
  { id: 'accessories', label: 'Аксессуары' },
]

export interface ColorOption { name: string; hex: string }

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  oldPrice?: number
  colors: ColorOption[]
  sizes: string[]
  /** sizes that are shown as unavailable (demo data) */
  soldOut?: string[]
  description: string
  details: string[]
  isNew?: boolean
  popular?: boolean
  /** higher = newer */
  order: number
}

const APPAREL = ['XS', 'S', 'M', 'L', 'XL']
const BLACK: ColorOption = { name: 'Чёрный', hex: '#0d0d0d' }
const GRAPHITE: ColorOption = { name: 'Графит', hex: '#3a3a3a' }
const ASH: ColorOption = { name: 'Пепельный', hex: '#8c8c8c' }
const BONE: ColorOption = { name: 'Костный', hex: '#d9d6cf' }
const OLIVE: ColorOption = { name: 'Тёмная олива', hex: '#2f3328' }

export const PRODUCTS: Product[] = [
  {
    id: 'hoodie-oversize', name: 'Худи Oversize', brand: 'QARA', category: 'hoodies', price: 24990,
    colors: [BLACK, GRAPHITE, ASH], sizes: APPAREL, soldOut: ['XS'], popular: true, order: 16,
    description: 'Объёмное худи свободного кроя из плотного футера с начёсом. Опущенное плечо, глубокий капюшон и графичный принт на спине.',
    details: ['Футер 420 г/м², 100% хлопок', 'Свободный крой, посадка oversize', 'Принт на спине, вышивка на груди', 'Стирка при 30 °C, без отбеливателя'],
  },
  {
    id: 'cargo-pants', name: 'Карго брюки', brand: 'QARA', category: 'pants', price: 27990,
    colors: [BLACK, OLIVE], sizes: ['28', '30', '32', '34', '36'], popular: true, order: 15,
    description: 'Широкие карго с объёмными карманами, контрастными лампасами и регулировкой по низу. Плотный рип-стоп, который держит форму.',
    details: ['Рип-стоп, хлопок с нейлоном', 'Широкая прямая посадка', 'Шесть карманов, шнур на щиколотке', 'Стирка при 30 °C'],
  },
  {
    id: 'tee-basic', name: 'Футболка Basic', brand: 'QARA', category: 'tshirts', price: 14990,
    colors: [BLACK, BONE, GRAPHITE], sizes: APPAREL, popular: true, order: 14,
    description: 'Базовая футболка из тяжёлого джерси с плотным воротом. Минимальный логотип на груди, boxy-силуэт.',
    details: ['Джерси 240 г/м², 100% хлопок', 'Boxy-посадка', 'Двойная строчка по вороту', 'Стирка при 30 °C'],
  },
  {
    id: 'sneakers-street', name: 'Кроссовки Street', brand: 'QARA Footwear', category: 'shoes', price: 39990,
    colors: [BLACK, BONE], sizes: ['40', '41', '42', '43', '44', '45'], soldOut: ['40', '45'], popular: true, order: 13,
    description: 'Городские кроссовки на утолщённой подошве. Сетчатый верх с накладками из экокожи, амортизирующая стелька.',
    details: ['Верх: текстиль, экокожа', 'Подошва: EVA + резина', 'Маломерят на полразмера', 'Протирать влажной тканью'],
  },
  {
    id: 'bomber-shell', name: 'Бомбер Shell', brand: 'QARA', category: 'jackets', price: 54990,
    colors: [BLACK, OLIVE], sizes: APPAREL, isNew: true, order: 20,
    description: 'Объёмный бомбер из технической ткани с лёгким утеплителем. Двусторонняя молния, нашивка на рукаве, трикотажные манжеты.',
    details: ['Нейлон, утеплитель 120 г', 'Свободный крой', 'Два боковых и один внутренний карман', 'Химчистка или деликатная стирка'],
  },
  {
    id: 'parka-urban', name: 'Парка Urban', brand: 'QARA', category: 'jackets', price: 79990, oldPrice: 92990,
    colors: [BLACK, GRAPHITE], sizes: APPAREL, soldOut: ['XS', 'XL'], isNew: true, order: 19,
    description: 'Удлинённая парка с ветрозащитной мембраной и съёмным капюшоном. Для межсезонья и холодных вечеров.',
    details: ['Мембрана, водоотталкивающая пропитка', 'Утеплитель 200 г', 'Скрытая планка на молнии и кнопках', 'Химчистка'],
  },
  {
    id: 'hoodie-zip', name: 'Худи на молнии Zip', brand: 'QARA', category: 'hoodies', price: 29990,
    colors: [BLACK, ASH], sizes: APPAREL, isNew: true, order: 18,
    description: 'Худи на молнии из плотного футера. Усиленные швы, карманы-кенгуру, ребристые манжеты.',
    details: ['Футер 400 г/м²', 'Классическая посадка', 'Металлическая молния', 'Стирка при 30 °C'],
  },
  {
    id: 'tee-longsleeve', name: 'Лонгслив Silence', brand: 'QARA', category: 'tshirts', price: 17990,
    colors: [BLACK, BONE], sizes: APPAREL, isNew: true, order: 17,
    description: 'Лонгслив с длинным рукавом и минималистичным принтом на спине. Мягкий хлопок, плотный ворот.',
    details: ['Джерси 220 г/м²', 'Свободная посадка', 'Принт на спине', 'Стирка при 30 °C'],
  },
  {
    id: 'pants-wide', name: 'Брюки Wide', brand: 'QARA', category: 'pants', price: 22990,
    colors: [BLACK, GRAPHITE], sizes: ['28', '30', '32', '34', '36'], order: 12,
    description: 'Широкие костюмные брюки со стрелками и высокой посадкой. Драпируются и не мнутся.',
    details: ['Вискоза с полиэстером', 'Высокая посадка, широкий низ', 'Скрытая застёжка', 'Деликатная стирка'],
  },
  {
    id: 'pants-jogger', name: 'Джоггеры Core', brand: 'QARA', category: 'pants', price: 18990,
    colors: [BLACK, ASH], sizes: APPAREL, order: 11,
    description: 'Джоггеры из мягкого футера с зауженным низом и карманом на молнии.',
    details: ['Футер 320 г/м²', 'Зауженный низ', 'Шнурок и карман на молнии', 'Стирка при 30 °C'],
  },
  {
    id: 'jacket-denim', name: 'Куртка Denim Black', brand: 'QARA', category: 'jackets', price: 44990,
    colors: [BLACK], sizes: APPAREL, order: 10,
    description: 'Укороченная джинсовая куртка из чёрного денима с эффектом потёртости. Оверсайз-плечо.',
    details: ['Деним 12 oz, 100% хлопок', 'Укороченный крой', 'Металлическая фурнитура', 'Стирка при 30 °C, наизнанку'],
  },
  {
    id: 'boots-lug', name: 'Ботинки Lug', brand: 'QARA Footwear', category: 'shoes', price: 49990,
    colors: [BLACK], sizes: ['40', '41', '42', '43', '44', '45'], order: 9,
    description: 'Массивные ботинки на тракторной подошве. Натуральная кожа, шнуровка и усиленный задник.',
    details: ['Верх: натуральная кожа', 'Подошва: резина Lug', 'Размер в размер', 'Использовать крем для кожи'],
  },
  {
    id: 'cap-logo', name: 'Кепка Logo', brand: 'QARA', category: 'accessories', price: 8990,
    colors: [BLACK, GRAPHITE, BONE], sizes: ['ONE'], popular: true, order: 8,
    description: 'Шестипанельная кепка из плотного хлопка с вышитым логотипом и регулировкой сзади.',
    details: ['Хлопковый твилл', 'Регулируемый ремешок', 'Вышивка на передней панели', 'Ручная стирка'],
  },
  {
    id: 'beanie-rib', name: 'Шапка Rib', brand: 'QARA', category: 'accessories', price: 7490,
    colors: [BLACK, ASH], sizes: ['ONE'], order: 7,
    description: 'Тёплая шапка в рубчик с отворотом. Мягкая акриловая пряжа с шерстью.',
    details: ['Акрил 70%, шерсть 30%', 'Двойной отворот', 'Универсальный размер', 'Ручная стирка'],
  },
  {
    id: 'bag-sling', name: 'Сумка Sling', brand: 'QARA', category: 'accessories', price: 16990,
    colors: [BLACK, OLIVE], sizes: ['ONE'], isNew: true, order: 6,
    description: 'Компактная сумка через плечо с водоотталкивающей тканью и регулируемым ремнём. Два отделения и карман на молнии.',
    details: ['Нейлон Cordura', 'Объём 6 л', 'Регулируемый ремень', 'Протирать влажной тканью'],
  },
  {
    id: 'tee-oversize-print', name: 'Футболка Oversize Print', brand: 'QARA', category: 'tshirts', price: 16990,
    colors: [BLACK, GRAPHITE], sizes: APPAREL, order: 5,
    description: 'Футболка свободного кроя с крупным принтом на спине и пастельной эффектной стиркой.',
    details: ['Джерси 260 г/м²', 'Oversize', 'Принт на спине', 'Стирка при 30 °C'],
  },
]

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id)
export const categoryLabel = (id: Category) => CATEGORIES.find((c) => c.id === id)?.label ?? ''

export const formatPrice = (n: number) => `${n.toLocaleString('ru-RU').replace(/ /g, ' ')} ₸`

export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36', '40', '41', '42', '43', '44', '45', 'ONE']
export const ALL_COLORS: ColorOption[] = [BLACK, GRAPHITE, ASH, BONE, OLIVE]
export const PRICE_MAX = 100000
