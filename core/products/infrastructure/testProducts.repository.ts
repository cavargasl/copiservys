import { ProductRepository } from "../domain/productRepository";
import { ProductDTO, transformProductDTOToProduct } from "./productDTO";

const productos = [
  {
    id: "1",
    titulo: "Impresora X1",
    imagenes: "",
    precio: "500",
    descripcion: "Impresora de alta velocidad",
    marca: "MarcaA",
    categoria: "impresora",
    stock: "10",
    folletoUrl: "folleto.pdf"
  },
  {
    id: "2",
    titulo: "Repuesto Y2",
    imagenes: "",
    precio: "50",
    descripcion: "Pieza de repuesto",
    marca: "MarcaB",
    categoria: "repuesto",
    stock: "100",
    folletoUrl: ""
  },
  {
    id: "3",
    titulo: "Servicio Z3",
    imagenes: "",
    precio: "200",
    descripcion: "Servicio anual",
    marca: "MarcaC",
    categoria: "servicio",
    stock: "0",
    folletoUrl: ""
  },
  {
    id: "4",
    titulo: "Producto Fabricado W4",
    imagenes: "",
    precio: "300",
    descripcion: "Producto personalizado",
    marca: "MarcaD",
    categoria: "tintes",
    stock: "5",
    folletoUrl: ""
  },
  {
    id: "5",
    titulo: "Impresora X2",
    imagenes: "",
    precio: "700",
    descripcion: "Impresora avanzada",
    marca: "MarcaA",
    categoria: "impresora",
    stock: "8",
    folletoUrl: "folleto2.pdf"
  }
];

export const testProductsRepository = (): ProductRepository => ({
  getProducts: async () => productos.map(row => transformProductDTOToProduct(row as ProductDTO)),
});
