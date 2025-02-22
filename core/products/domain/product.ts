interface Image {
  url: string
  name: string
}

export type Category = 'impresora' | 'repuesto' | 'servicio' | 'tintas' | 'otros'

export interface Product {
  id: string
  title: string
  images: Image[]
  price: number
  description?: string
  brand: string
  category: Category
  stock: number
  brochureUrl?: string
}