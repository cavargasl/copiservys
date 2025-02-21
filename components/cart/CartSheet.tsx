'use client'

import ItemCart from "@/components/cart/ItemCart"
import { UpdateCart } from "@/components/cart/UpdateCart"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatPrice } from "@/core/shared/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { initializeCart } from "@/redux/slices/cart"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function CartSheet() {
  const { items, total } = useAppSelector(state => state.cart)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      dispatch(initializeCart(JSON.parse(savedCart)))
    }
  }, [dispatch])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {items.length > 0 && (
            <Badge
              variant="tertiary"
              className="absolute -right-3 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
            >
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>
            Carrito {items.length > 0 && `(${items.reduce((sum, item) => sum + item.quantity, 0)})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {total > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {items.map(item => <ItemCart key={item.product.id} item={item.product}><UpdateCart item={item.product} /></ItemCart>)}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
              <div className="flex">
                <span className="flex-1">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex">
                <span className="flex-1">Envió acordar con el cliente</span>
                <span>Variable según la localidad</span>
              </div>
              <div className="flex">
                <span className="flex-1">IVA incluido</span>
                <span>{formatPrice(0)}</span>
              </div>
              <Separator className="mt-2" />
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <SheetFooter className="mt-1.5">
                <SheetTrigger asChild>
                  <Link
                    href="/checkout"
                    aria-label="Proceed to checkout"
                    className={buttonVariants({ className: "w-full h-10" })}
                  >
                    Proceder a pagar
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Tu carrito de compra está vacío
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}