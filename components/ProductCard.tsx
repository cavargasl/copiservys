"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/core/products/domain/product";
import { formatPrice } from "@/core/shared/utils";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cart";
import { Image as ImageIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const mainImage = product.images.length > 0 ? product.images[0] : null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast({
      title: "Producto agregado",
      description: `${product.title} fue agregado al carrito`,
    });
  };

  return (
    <div className="group relative rounded-lg border bg-white p-4 transition-all hover:shadow-lg">
      <div className="relative mb-2 aspect-square overflow-hidden rounded-md">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <ImageIcon className="h-full w-full object-cover transition-transform group-hover:scale-105 opacity-15" />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground m-0 p-0 leading-none">
          {product.category === 'servicios' ? 'Precio Variable' : product.brand}
        </p>
        <h3 className="font-medium leading-tight line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${formatPrice(product.price)}</p>
          {product.category === 'servicios' ? (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">Disponible</Badge>
          ) : product.stock > 0 ? (
            <Badge variant="secondary">En Stock</Badge>
          ) : (
            <Badge variant="destructive">Agotado</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button
            className="flex-1"
            disabled={product.category !== 'servicios' && product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar
          </Button>
          {product.brochureUrl && (
            <Button variant="outline" asChild>
              <Link href={product.brochureUrl} target="_blank" rel="noopener noreferrer">Ficha Técnica</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
