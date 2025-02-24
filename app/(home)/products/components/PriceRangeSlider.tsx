import { Slider } from '@/components/ui/slider'
import { formatPrice } from '@/core/shared/utils'
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useUpdateQueryParams } from '../utils/queryUtils';

interface PriceRange {
  min: number;
  max: number;
}

export default function PriceRangeSlider({ priceRange }: { priceRange: PriceRange }) {
  const searchParams = useSearchParams();
  const maxPrice = searchParams.get("maxPrice");
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

  const handlePriceChange = (newPriceRange: number[]) => {
    setSelectedPriceRange(newPriceRange);
  };

  return (
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
  )
}
