export function formatPrice(price: number | string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 2,
  }).format(Number(price))
}