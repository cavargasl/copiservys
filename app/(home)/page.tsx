import { store } from '@/redux/store'
import Banner from './components/Banner'
import Categories from './components/Categories'
import { RecommendedProducts } from './components/RecommendedProducts'
import { fetchProducts } from '@/redux/slices/products'

export const revalidate = 86400

export default async function IndexPage() {
  await store.dispatch(fetchProducts())
  return (
    <>
      <Banner />
      <RecommendedProducts />
      <Categories />
    </>
  )
}
