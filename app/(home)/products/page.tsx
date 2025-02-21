import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import Filter from "./components/Filter";
import { productService } from "@/core/products/application/productService";
import { excelProductsRepository } from "@/core/products/infrastructure/excelProducts.repository";
import { env } from "@/config/env.mjs";

export const revalidate = 86400;

export default async function ProductsPage() {
  const products = await productService(excelProductsRepository(env.PRODUCTS_SHEET_URL)).getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[280px_auto_1fr] gap-4">
        <Filter />
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