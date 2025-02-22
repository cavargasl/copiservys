import { ProductRepository } from "../domain/productRepository";
import Papa from 'papaparse';
import axios from 'axios';
import { transformProductDTOToProduct, ProductDTO } from './productDTO';
import { Product } from "../domain/product";

export const excelProductsRepository = (csvUrl: string): ProductRepository => ({
  getProducts: async () => {
    try {
      const response = await axios.get(csvUrl, {
        responseType: 'blob'
      });
      const csvText = await response.data;
      const { data: rawData } = Papa.parse(csvText, {
        header: true,
      });

      const products: Product[] = rawData.map((row: unknown) => 
        transformProductDTOToProduct(row as ProductDTO)
      );

      return products;
    } catch (error) {
      console.error('Error al leer el archivo CSV de la nube:', error);
      throw new Error('Error al obtener los productos del CSV');
    }
  },
});