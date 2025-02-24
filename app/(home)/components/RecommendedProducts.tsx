import { ProductCard } from "@/components/ProductCard";
import { store } from "@/redux/store";

interface RecommendedProductsProps {
  maxProducts?: number;
}

export async function RecommendedProducts({
  maxProducts = 4,
}: RecommendedProductsProps) {
  const products = store.getState().products.items;
  const recommendedProducts = products.filter((product) => product.recommended);
  const nonRecommendedProducts = products.filter(
    (product) => !product.recommended
  );
  const displayProducts = [
    ...recommendedProducts,
    ...nonRecommendedProducts.slice(
      0,
      maxProducts - recommendedProducts.length
    ),
  ].slice(0, maxProducts);

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold">Productos Recomendados</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
