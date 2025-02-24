"use client";

import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts, selectProducts } from "@/redux/slices/products";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import BrandFilter from "./components/BrandFilter";
import CategoryFilter from "./components/CategoryFilter";
import MobileFilter from "./components/MobileFilter";
import PriceRangeSlider from "./components/PriceRangeSlider";
import SearchFilter from "./components/SearchFilter";
import { filterProducts } from "./utils/filterProducts";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector(selectProducts);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

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

  const filteredProducts = filterProducts({
    products,
    categoryList,
    brandList,
    minPrice,
    maxPrice,
    search,
  });

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
      {isMobile && (
        <MobileFilter>
          <CategoryFilter categories={categories} />
          <BrandFilter brands={brands} />
          <PriceRangeSlider priceRange={priceRange} />
        </MobileFilter>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_auto_1fr] gap-4">
        {!isMobile && (
          <>
            <div></div>
            <div className="space-y-5 fixed">
              <div className="space-y-5">
                <SearchFilter />
                <CategoryFilter categories={categories} />
                <BrandFilter brands={brands} />
                <PriceRangeSlider priceRange={priceRange} />
              </div>
            </div>
            <Separator orientation="vertical" className="h-auto" />
          </>
        )}

        {filteredProducts.length === 0 && products.length > 0 ? (
          <div className="text-center w-full">
            No se encontraron productos que coincidan con los filtros aplicados.
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
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
