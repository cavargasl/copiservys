import { Product } from "./product";

export type ProductRepository = {
  getProducts: () => Promise<Product[]>;
};