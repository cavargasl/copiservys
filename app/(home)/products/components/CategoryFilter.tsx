import { Checkbox } from '@/components/ui/checkbox'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useUpdateQueryParams } from '../utils/queryUtils';

interface CategoryFilterProps {
  categories: {
    name: string;
    count: number;
  }[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const categoryList = category ? category.split(",") : [];

  const updateQueryParams = useUpdateQueryParams(searchParams);

  const handleCategoryChange = (category: string) => {
    const currentCategories = searchParams.get("category")
      ? searchParams.get("category")!.split(",")
      : [];
    const currentCategory = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];
    updateQueryParams({ category: currentCategory.join(",") });
  };

  return (
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
  )
}
