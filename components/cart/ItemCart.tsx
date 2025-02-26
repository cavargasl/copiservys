import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/core/products/domain/product";
import { formatPrice } from "@/core/shared/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateQuantity } from "@/redux/slices/cart";
import { Image as ImageIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface ItemCartProps {
  item: Product;
  children?: React.ReactNode;
}

export default function ItemCart({ item, children }: ItemCartProps) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(
    (state) =>
      state.cart.items.find((_item) => _item.product.id === item.id)?.quantity
  );
  return (
    <div className="space-y-3 min-w-full">
      <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row items-center">
        <div className="relative h-16 w-16 overflow-hidden rounded">
          {item.images.length && item.images[0].url !== "" ? (
            <Image
              src={item.images[0]?.url ?? "/images/product-placeholder.webp"}
              alt={item.images[0]?.name ?? item.title}
              fill
              className="absolute object-cover"
              loading="lazy"
            />
          ) : (
            <ImageIcon
              className="h-full w-full object-cover opacity-15"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="grid grid-cols-2 text-sm flex-1 gap-1">
          {item.isRemanufactured && (
            <span className="text-red-500 col-span-2">
              Este producto es remanufacturado
            </span>
          )}
          <span className="line-clamp-1 font-semibold col-span-2">
            {item.title}
          </span>
          <span className="line-clamp-1">{`${
            item.category === "servicios" ? "Precio mínimo" : "Precio unidad"
          }`}</span>
          <span className="line-clamp-1 text-muted-foreground">
            {formatPrice(item.price)}
          </span>
          {item.category !== "servicios" && (
            <>
              <span className="line-clamp-1">Cantidad:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  disabled={quantity === 1}
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.id,
                        quantity: quantity ? quantity - 1 : 1,
                      })
                    )
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="line-clamp-1 text-muted-foreground min-w-[20px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.id,
                        quantity: quantity ? quantity + 1 : 1,
                      })
                    )
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </>
          )}
        </div>
        {children}
      </div>
      <Separator />
    </div>
  );
}
