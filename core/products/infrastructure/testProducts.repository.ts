import type { ProductRepository } from "../domain/productRepository";
import { mapProductDTOsToProducts, type ProductDTO } from "./productDTO";

const productos: ProductDTO[] = [
  {
    id: "1",
    titulo: "Impresora X1",
    imagenes: "",
    precio: "500",
    descripcion: "Impresora de alta velocidad",
    marca: "MarcaA",
    categoria: "fotocopiadoras",
    stock: "10",
    folletoUrl: "folleto.pdf",
  },
  {
    titulo: "Repuesto Y2",
    imagenes: "",
    precio: "50",
    descripcion: "Pieza de repuesto",
    marca: "MarcaB",
    categoria: "suministros",
    stock: "100",
    folletoUrl: "",
  },
  {
    id: "3",
    titulo: "Servicio Z3",
    imagenes: "",
    precio: "200",
    descripcion: "Servicio anual",
    marca: "MarcaC",
    categoria: "servicios",
    stock: "0",
    folletoUrl: "",
  },
  {
    titulo: "Producto Fabricado W4",
    imagenes: "",
    precio: "300",
    descripcion: "Producto personalizado",
    marca: "MarcaD",
    categoria: "suministros",
    stock: "5",
    folletoUrl: "",
  },
  {
    id: "5",
    titulo: "Impresora X2",
    imagenes: "",
    precio: "700",
    descripcion: "Impresora avanzada",
    marca: "MarcaA",
    categoria: "fotocopiadoras",
    stock: "8",
    folletoUrl: "folleto2.pdf",
  },
];

export const testProductsRepository = (): ProductRepository => ({
  getProducts: async () => mapProductDTOsToProducts(productos),
});
