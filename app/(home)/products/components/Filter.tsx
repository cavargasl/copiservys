"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/core/shared/utils";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterItem {
  name: string;
  count: number;
}
interface PriceRange {
  min: number;
  max: number;
}

interface FilterProps {
  categories: FilterItem[];
  brands: FilterItem[];
  priceRange: PriceRange;
}

export default function Filter({
  categories,
  brands,
  priceRange,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    0,
    Math.ceil(priceRange.max),
  ]);
  const [searchText, setSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText);
  const debouncedPriceRange = useDebounce(selectedPriceRange);

  useEffect(() => {
    updateQueryParams({ search: debouncedSearchText });
  }, [debouncedSearchText]);

  useEffect(() => {
    updateQueryParams({ minPrice: debouncedPriceRange[0], maxPrice: debouncedPriceRange[1] });
  }, [debouncedPriceRange]);

  const updateQueryParams = (newParams: Record<string, string | number | undefined>) => {
    const updatedQuery = { ...Object.fromEntries(searchParams), ...newParams };

    // Filtrar valores undefined
    const filteredQuery = Object.fromEntries(
      Object.entries(updatedQuery).filter(([_, v]) => v !== undefined)
    );

    // Convertir valores a string
    const stringQuery = Object.fromEntries(
      Object.entries(filteredQuery).map(([k, v]) => [k, String(v)])
    );

    router.push(`/products?${new URLSearchParams(stringQuery).toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const currentCategories = searchParams.get('category') ? searchParams.get('category')!.split(',') : [];
    const currentCategory = currentCategories.includes(category) ? currentCategories.filter(c => c !== category) : [...currentCategories, category];
    updateQueryParams({ category: currentCategory.join(',') });
  };

  const handleBrandChange = (brand: string) => {
    const currentBrands = searchParams.get('brand') ? searchParams.get('brand')!.split(',') : [];
    const currentBrand = currentBrands.includes(brand) ? currentBrands.filter(b => b !== brand) : [...currentBrands, brand];
    updateQueryParams({ brand: currentBrand.join(',') });
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setSelectedPriceRange(newPriceRange);
  };

  return (
    <div className="space-y-5">
      {/* Buscador */}
      <div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar productos..."
            className="pl-8 bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70 transition-colors"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categorías */}
      <div>
        <h3 className="font-medium mb-2">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.name}
              className="flex items-center justify-between"
              onClick={() => handleCategoryChange(category.name)}
            >
              <div className="flex items-center">
                <Checkbox />
                <span className="ml-2 capitalize">{category.name}</span>
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
              className="flex items-center justify-between"
              onClick={() => handleBrandChange(brand.name)}
            >
              <div className="flex items-center">
                <Checkbox />
                <span className="ml-2 capitalize">{brand.name}</span>
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
