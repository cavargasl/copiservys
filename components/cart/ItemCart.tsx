import { Separator } from "@/components/ui/separator";
import { Product } from "@/core/products/domain/product";
import { formatPrice } from "@/core/shared/utils";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ItemCartProps {
  item: Product;
  children?: React.ReactNode;
}

export default function ItemCart({ item, children }: ItemCartProps) {
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
        <div className="grid grid-cols-[155px,1fr] text-sm flex-1">
          <span className="line-clamp-1 font-semibold col-span-2">
            {item.title}
          </span>
          <span className="line-clamp-1">Precio:</span>
          <span className="line-clamp-1 text-muted-foreground">
            {formatPrice(item.price)}
          </span>
        </div>
        {children}
      </div>
      <Separator />
    </div>
  );
}
