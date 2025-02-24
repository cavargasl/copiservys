"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/core/shared/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { useUpdateQueryParams } from "../utils/queryUtils";

interface FilterItem {
  name: string;
  count: number;
}
interface PriceRange {
  min: number;
  max: number;
}

export interface FilterProps {
  categories: FilterItem[];
  brands: FilterItem[];
  priceRange: PriceRange;
  hideSearch?: boolean;
}

export default function Filter({
  categories,
  brands,
  priceRange,
  hideSearch,
}: FilterProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const maxPrice = searchParams.get("maxPrice");
  const categoryList = category ? category.split(",") : [];
  const brandList = brand ? brand.split(",") : [];

  const updateQueryParams = useUpdateQueryParams(searchParams);

  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    0,
    Math.ceil(
      maxPrice && maxPrice !== "-Infinity" ? Number(maxPrice) : priceRange.max
    ),
  ]);
  
  const debouncedPriceRange = useDebounce(selectedPriceRange);

  useEffect(() => {
    if (priceRange.max !== -Infinity) {
      updateQueryParams({
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
      });
    }
  }, [debouncedPriceRange, priceRange.max, updateQueryParams]);

  const handleCategoryChange = (category: string) => {
    const currentCategories = searchParams.get("category")
      ? searchParams.get("category")!.split(",")
      : [];
    const currentCategory = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];
    updateQueryParams({ category: currentCategory.join(",") });
  };

  const handleBrandChange = (brand: string) => {
    const currentBrands = searchParams.get("brand")
      ? searchParams.get("brand")!.split(",")
      : [];
    const currentBrand = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    updateQueryParams({ brand: currentBrand.join(",") });
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setSelectedPriceRange(newPriceRange);
  };

  return (
    <div className="space-y-5">
      {/* Buscador */}
      {!hideSearch && <SearchInput />}

      {/* Categorías */}
      <div>
        <h3 className="font-medium mb-2">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.name}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleCategoryChange(category.name)}
            >
              <div className="flex items-center">
                <Checkbox checked={categoryList.includes(category.name)} />
                <span className="ml-2 capitalize line-clamp-1">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div>
        <h3 className="font-medium mb-2">Marcas</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand.name}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleBrandChange(brand.name)}
            >
              <div className="flex items-center">
                <Checkbox checked={brandList.includes(brand.name)} />
                <span className="ml-2 capitalize line-clamp-1">
                  {brand.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({brand.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rango de Precio */}
      <div className="space-y-2">
        <span className="font-medium">Rango de precio:</span>
        <Slider
          defaultValue={selectedPriceRange}
          max={Math.ceil(priceRange.max)}
          min={0}
          value={selectedPriceRange}
          onValueChange={handlePriceChange}
          isRange
        />
        <div className="flex justify-between text-sm mt-2">
          <span>{formatPrice(selectedPriceRange[0])}</span>
          <span>{formatPrice(selectedPriceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
