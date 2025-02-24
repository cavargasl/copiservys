import { Checkbox } from '@/components/ui/checkbox'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useUpdateQueryParams } from '../utils/queryUtils';

interface BrandFilterProps {
  brands: {
    name: string;
    count: number;
  }[];
}

export default function BrandFilter({ brands }: BrandFilterProps) {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const brandList = brand ? brand.split(",") : [];

  const updateQueryParams = useUpdateQueryParams(searchParams);

  const handleBrandChange = (brand: string) => {
    const currentBrands = searchParams.get("brand")
      ? searchParams.get("brand")!.split(",")
      : [];
    const currentBrand = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    updateQueryParams({ brand: currentBrand.join(",") });
  };

  return (
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
  )
}
