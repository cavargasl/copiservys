interface Image {
  url: string
  name: string
}

export interface Product {
  id: string
  title: string
  images: Image[]
  price: number
  description?: string
  brand: string
  category: 'printer' | 'spare' | 'service' | 'manufactured'
  stock: number
  brochureUrl?: string
}