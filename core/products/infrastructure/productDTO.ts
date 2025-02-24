import type { Category, Product } from "../domain/product";


export interface ProductDTO {
  id: string;
  titulo: string;
  imagenes?: string;
  precio: string;
  descripcion?: string;
  marca: string;
  categoria: Category;
  stock: string;
  folletoUrl?: string;
  recomendado?: string;
  remanufacturada?: string;
}
// Función para mapear de DTO a Domain Model
export function transformProductDTOToProduct(dto: ProductDTO): Product {
  return {
    id: dto.id,
    title: dto.titulo,
    images: dto.imagenes && dto.imagenes.length > 0 
        ? dto.imagenes.split(',').map(url => ({
            url: url.trim(),
            name: url.trim().split('/').pop()?.split('?')[0] || 'sin-nombre'
        })) 
        : [],
    price: parseFloat(dto.precio),
    description: dto.descripcion,
    brand: dto.marca,
    category: dto.categoria,
    stock: parseInt(dto.stock, 10),
    brochureUrl: dto.folletoUrl,
    recommended: dto.recomendado?.toLocaleLowerCase() === 'true',
    isRemanufactured: dto.remanufacturada?.toLocaleLowerCase() === 'true',
  };
}


export const mapProductDTOsToProducts = (dtos: ProductDTO[]): Product[] => {
  return dtos.map(transformProductDTOToProduct);
};
