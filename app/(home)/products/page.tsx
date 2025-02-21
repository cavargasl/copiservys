"use client";
import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { sampleProducts } from "../components/RecommendedProducts";
import Filter from "./components/Filter";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[280px_auto_1fr] gap-4">
        <Filter />
        <Separator orientation="vertical" className="h-auto" />

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
