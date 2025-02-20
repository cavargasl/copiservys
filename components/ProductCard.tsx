"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/core/products/domain/product"
import { addToCart } from "@/redux/slices/cart"
import { useAppDispatch } from "@/redux/hooks"
import { formatPrice } from "@/core/shared/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const mainImage = product.images[0]
  const hasSpecs = product.specifications || product.serviceDetails || product.manufacturingDetails

  return (
    <div className="group relative rounded-lg border bg-white p-4 transition-all hover:shadow-lg">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md">
        <Image
          src={mainImage.url || "/placeholder.svg"}
          alt={mainImage.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <h3 className="font-medium leading-tight line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${formatPrice(product.price)}</p>
          {product.stock > 0 ? (
            <Badge variant="secondary">En Stock</Badge>
          ) : (
            <Badge variant="destructive">Agotado</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button 
            className="flex-1" 
            disabled={product.stock === 0}
            onClick={() => dispatch(addToCart(product))}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar
          </Button>
          {hasSpecs && (
            <Button variant="outline" asChild>
              <Link href={`/productos/${product.id}/especificaciones`}>Ficha Técnica</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

