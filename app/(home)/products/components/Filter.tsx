"use client";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/core/shared/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: 1, name: "Smartphones", count: 24 },
  { id: 2, name: "Laptops", count: 18 },
  { id: 3, name: "Tablets", count: 12 },
  { id: 4, name: "Auriculares", count: 30 },
  { id: 5, name: "Smartwatches", count: 15 },
  { id: 6, name: "Accesorios", count: 45 },
] as const;

const brands = [
  { id: 1, name: "Samsung", count: 42 },
  { id: 2, name: "Apple", count: 38 },
  { id: 3, name: "Xiaomi", count: 25 },
  { id: 4, name: "Huawei", count: 20 },
  { id: 5, name: "Sony", count: 15 },
  { id: 6, name: "LG", count: 12 },
] as const;

const maxPrice = 5000000;

export default function Filter() {
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
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
              key={category.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">{category.name}</span>
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
            <label key={brand.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">{brand.name}</span>
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
          defaultValue={priceRange}
          max={maxPrice}
          step={1000}
          minStepsBetweenThumbs={10}
          value={priceRange}
          onValueChange={setPriceRange}
          isRange
        />
        <div className="flex justify-between text-sm mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
