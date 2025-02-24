import { Product } from "@/core/products/domain/product";

interface FilterProductsProps {
  products: Product[];
  categoryList: string[];
  brandList: string[];
  minPrice: string | null;
  maxPrice: string | null;
  search: string | null;
}
export const filterProducts = ({ products, categoryList, brandList, minPrice, maxPrice, search }: FilterProductsProps) => {
  return products.filter((product) => {
    const matchesCategory =
      categoryList.length > 0 ? categoryList.includes(product.category) : true;
    const matchesBrand = brandList.length > 0 ? brandList.includes(product.brand) : true;
    const matchesMinPrice = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;
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
  });
};