"use client";

import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import Filter from "./components/Filter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts, selectProducts } from "@/redux/slices/products";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector(selectProducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error al cargar productos: {error}
      </div>
    );
  }

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