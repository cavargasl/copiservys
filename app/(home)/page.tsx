import Banner from "./components/Banner";
import Categories from "./components/Categories";
import { RecommendedProducts } from "./components/RecommendedProducts";

export default function IndexPage() {
  return (
    <>
      <Banner />
      <RecommendedProducts />
      <Categories /> 
    </>
  );
}
