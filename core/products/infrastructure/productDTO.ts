import type { Category, Product } from "../domain/product";


export interface ProductDTO {
  id: string;
  titulo: string;
  imagenes: string;
  precio: string;
  descripcion?: string;
  marca: string;
  categoria: 'impresora' | 'repuesto' | 'servicio' | 'tintas';
  stock: string;
  folletoUrl?: string;
  recomendado?: boolean;
}
// Función para mapear de DTO a Domain Model
export function transformProductDTOToProduct(dto: ProductDTO): Product {
  return {
    id: dto.id,
    title: dto.titulo,
    images: dto.imagenes.split(',').map(url => ({
      url: url.trim(),
      name: url.trim().split('/').pop()?.split('?')[0] || 'sin-nombre'
    })),
    price: parseFloat(dto.precio),
    description: dto.descripcion,
    brand: dto.marca,
    category: mapCategory(dto.categoria),
    stock: parseInt(dto.stock, 10),
    brochureUrl: dto.folletoUrl,
    recommended: dto.recomendado || false,
  };
}

function mapCategory(
  category?: 'impresora' | 'repuesto' | 'servicio' | 'tintas'
): Category {
  return category || 'otros';
}

export const mapProductDTOsToProducts = (dtos: ProductDTO[]): Product[] => {
  return dtos.map(transformProductDTOToProduct);
};
