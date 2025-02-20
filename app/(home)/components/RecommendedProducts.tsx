import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/core/products/domain/product";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Impresora HP LaserJet Pro M404dw",
    images: [
      {
        url: "/placeholder.svg",
        name: "HP LaserJet Pro M404dw",
      },
    ],
    price: 399.99,
    brand: "HP",
    model: "M404dw",
    sku: "W1A56A",
    category: "Impresoras",
    tags: ["laser", "monocromo", "wifi"],
    type: "printer",
    stock: 5,
    specifications: {
      printSpeed: 40,
      resolution: "1200x1200",
      dimensions: {
        width: 381,
        height: 220,
        depth: 356,
      },
    },
  },
  {
    id: "2",
    title: "Tóner Original HP 58A Negro",
    images: [
      {
        url: "/placeholder.svg",
        name: "Tóner Original HP 58A Negro",
      },
    ],
    price: 79.99,
    brand: "HP",
    model: "58A",
    sku: "CF258A",
    category: "Consumibles",
    tags: ["toner", "negro", "original"],
    type: "spare",
    stock: 15,
  },
  {
    id: "3",
    title: "Impresora Epson EcoTank L3250",
    images: [
      {
        url: "/placeholder.svg",
        name: "Epson EcoTank L3250",
      },
    ],
    price: 299.99,
    brand: "Epson",
    model: "L3250",
    sku: "C11CJ67303",
    category: "Impresoras",
    tags: ["tinta", "multifuncional", "wifi"],
    type: "printer",
    stock: 8,
    specifications: {
      printSpeed: 33,
      resolution: "5760x1440",
      dimensions: {
        width: 375,
        height: 179,
        depth: 347,
      },
    },
  },
  {
    id: "4",
    title: "Botella de Tinta Epson T544 Negro",
    images: [
      {
        url: "/placeholder.svg",
        name: "Botella de Tinta Epson T544 Negro",
      },
    ],
    price: 14.99,
    brand: "Epson",
    model: "T544",
    sku: "T544120",
    category: "Consumibles",
    tags: ["tinta", "negro", "original"],
    type: "spare",
    stock: 25,
  },
  {
    id: "5",
    title: "Kit de Mantenimiento HP LaserJet M404",
    images: [
      {
        url: "/placeholder.svg",
        name: "Kit de Mantenimiento HP LaserJet M404",
      },
    ],
    price: 129.99,
    brand: "HP",
    model: "M404-MK",
    sku: "W1A56-67903",
    category: "Repuestos",
    tags: ["mantenimiento", "kit", "original"],
    type: "spare",
    stock: 3,
  },
];

interface RecommendedProductsProps {
  maxProducts?: number;
}

export function RecommendedProducts({
  maxProducts = 4,
}: RecommendedProductsProps) {
  const displayProducts = sampleProducts.slice(0, maxProducts);

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Productos Recomendados</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
