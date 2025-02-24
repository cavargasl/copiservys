import { store } from "@/redux/store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Categories() {
  const products = store.getState().products.items;
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].slice(0, 4);

  return (
    <section className="w-full bg-slate-900 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-white">Categorías</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="flex min-h-[200px] items-center justify-center rounded-lg bg-white p-6 transition-transform hover:scale-105"
            >
              <span className="flex items-center text-xl font-medium capitalize">
                {category}
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          ))}
          {categories.length <= 3 && (
            <Link
              href={`/contact`}
              className="flex min-h-[200px] items-center justify-center rounded-lg bg-white p-6 transition-transform hover:scale-105"
            >
              <span className="flex items-center text-xl font-medium capitalize">
                Contáctanos
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
