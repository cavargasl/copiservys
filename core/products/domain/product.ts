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
  category: string
  tags: string[]
  weight?: number
  sku: string
  brand: string
  model: string
  type: 'printer' | 'spare' | 'service' | 'manufactured'
  specifications?: {
    printSpeed?: number
    resolution?: string
    compatibility?: string[]
    dimensions?: {
      width: number
      height: number
      depth: number
    }
  }
  stock: number
  warranty?: {
    duration: number
    type: string
  }
  serviceDetails?: {
    duration: string
    coverage: string[]
    includedServices: string[]
  }
  manufacturingDetails?: {
    assemblyDate?: Date
    components: string[]
    customizations: string[]
    qualityTests: string[]
    assemblyLocation: string
    serialNumber: string
  }
}