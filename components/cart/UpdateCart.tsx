import { Button } from "@/components/ui/button"
import { Product } from "@/core/products/domain/product"
import { useAppDispatch } from "@/redux/hooks"
import { removeFromCart } from "@/redux/slices/cart"
import { Trash } from "lucide-react"

interface UpdateCartProps {
  item: Product
}

export function UpdateCart({ item }: UpdateCartProps) {
  const dispatch = useAppDispatch()

  function handleClick() {
    dispatch(removeFromCart(item.id))
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleClick}
      >
        <Trash className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Borrar producto</span>
      </Button>
    </div>
  )
}
