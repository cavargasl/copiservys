export function formatPrice(price: number | string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(price))
}