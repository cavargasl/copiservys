import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import Filter from "./components/Filter";
import { productService } from "@/core/products/application/productService";
import { testProductsRepository } from "@/core/products/infrastructure/testProducts.repository";

export const revalidate = 86400;

export default async function ProductsPage() {
  //const products = await productService(excelProductsRepository(env.PRODUCTS_SHEET_URL)).getProducts()
  const products = await productService(testProductsRepository()).getProducts()
  
  const categoriesWithCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const brandsWithCount = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priceRange = products.reduce(
    (acc, product) => ({
      min: Math.min(acc.min, product.price),
      max: Math.max(acc.max, product.price)
    }),
    { min: Infinity, max: -Infinity }
  );

  const categories = Object.entries(categoriesWithCount).map(([name, count]) => ({
    name,
    count
  }));

  const brands = Object.entries(brandsWithCount).map(([name, count]) => ({
    name,
    count
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[280px_auto_1fr] gap-4">
        <Filter 
          categories={categories} 
          brands={brands}
          priceRange={priceRange}
        />
        <Separator orientation="vertical" className="h-auto" />

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}