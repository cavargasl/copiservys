"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/core/shared/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

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
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    0,
    Math.ceil(priceRange.max),
  ]);
  const [searchText, setSearchText] = useState("");

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
          onValueChange={setSelectedPriceRange}
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
