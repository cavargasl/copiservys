import axios from "axios";
import Papa from "papaparse";
import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productRepository";
import { ProductDTO, transformProductDTOToProduct } from "./productDTO";

export const excelProductsRepository = (csvUrl: string): ProductRepository => ({
  getProducts: async () => {
    try {
      const response = await axios.get(csvUrl, {
        responseType: "blob",
      });

      let csvText;

      if (typeof window !== "undefined") {
        csvText = await response.data.text();
      } else {
        csvText = response.data;
      }

      const { data: rawData } = Papa.parse(csvText, {
        header: true,
      });

      const products: Product[] = rawData.map((row: unknown) =>
        transformProductDTOToProduct(row as ProductDTO)
      );

      return products;
    } catch (error) {
      console.error("Error al leer el archivo CSV de la nube:", error);
      throw new Error("Error al obtener los productos del CSV");
    }
  },
});
