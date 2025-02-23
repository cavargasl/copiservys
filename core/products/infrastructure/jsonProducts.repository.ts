import fs from "fs-extra";
import path from "path";
import { ProductRepository } from "../domain/productRepository";
import { ProductDTO, transformProductDTOToProduct } from "./productDTO";

export const JsonProductsRepository = (): ProductRepository => ({
  getProducts: async () => {
    if (typeof window !== "undefined") {
      throw new Error(
        "JsonProductsRepository solo puede ejecutarse en el servidor."
      );
    }
    const filePath = path.join(process.cwd(), "public", "products.json");

    try {
      const data = await fs.readFile(filePath, "utf-8");
      const products = JSON.parse(data) as ProductDTO[];
      return products.map((product) => transformProductDTOToProduct(product));
    } catch (error) {
      console.error("Error leyendo el archivo de productos:", error);
      throw new Error("No se pudieron cargar los productos.");
    }
  },
});
