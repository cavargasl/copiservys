"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/core/products/domain/product";
import { formatPrice } from "@/core/shared/utils";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cart";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl text-primary tracking-tighter font-mono">
        {formatPrice(product.price)}
      </span>
      <Button onClick={handleAddToCart}>
        Añadir al carrito
        <span className="sr-only">Añadir al carrito</span>
      </Button>
    </div>
  );
}
