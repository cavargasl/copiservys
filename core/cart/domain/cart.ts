import { Product } from "@/core/products/domain/product"

export interface CartItem {
  product: Product
  quantity: number
  subtotal: number
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
}