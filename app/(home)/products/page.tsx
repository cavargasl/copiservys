"use client";

import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts, selectProducts } from "@/redux/slices/products";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Filter from "./components/Filter";
import MobileFilter from "./components/MobileFilter";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector(selectProducts);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (status === "loading") {
    return <Fallback />;
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error al cargar productos: {error}
      </div>
    );
  }

  const categoryList = category ? category.split(",") : [];
  const brandList = brand ? brand.split(",") : [];

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        categoryList.length > 0
          ? categoryList.includes(product.category)
          : true;
      const matchesBrand =
        brandList.length > 0 ? brandList.includes(product.brand) : true;
      const matchesMinPrice = minPrice
        ? product.price >= Number(minPrice)
        : true;
      const matchesMaxPrice = maxPrice
        ? product.price <= Number(maxPrice)
        : true;
      const matchesSearchTerm = search
        ? product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase())
        : true;

      return (
        matchesCategory &&
        matchesBrand &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesSearchTerm
      );
    })
    .map((product) => ({ ...product }));

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
      max: Math.max(acc.max, product.price),
    }),
    { min: Infinity, max: -Infinity }
  );

  const categories = Object.entries(categoriesWithCount).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  const brands = Object.entries(brandsWithCount).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="container mx-auto py-8 relative">
      <MobileFilter
        categories={categories}
        brands={brands}
        priceRange={priceRange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_auto_1fr] gap-4">
        <div className="hidden lg:block"></div>
        <div className="space-y-5 hidden lg:block fixed">
          <Filter
            categories={categories}
            brands={brands}
            priceRange={priceRange}
          />
        </div>
        <Separator orientation="vertical" className="h-auto hidden lg:block" />

        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
function Fallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<Fallback />}>
      <ProductsPage />
    </Suspense>
  );
}
