import { ProductRepository } from "../domain/productRepository";

export const productService = (productRepository: ProductRepository): ProductRepository => ({
  getProducts: async () => {
    return await productRepository.getProducts();
  }
})