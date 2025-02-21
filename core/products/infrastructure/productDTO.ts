import { Product } from "../domain/product";


export interface ProductDTO {
  id: string;
  titulo: string;
  imagenes: string;
  precio: string;
  descripcion?: string;
  marca: string;
  categoria: 'impresora' | 'repuesto' | 'servicio' | 'fabricado';
  stock: string;
  brochureUrl?: string;
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
    category: dto.categoria as 'printer' | 'spare' | 'service' | 'manufactured',
    stock: parseInt(dto.stock, 10),
    brochureUrl: dto.brochureUrl,
  };
}

export const mapProductDTOsToProducts = (dtos: ProductDTO[]): Product[] => {
  return dtos.map(transformProductDTOToProduct);
};
