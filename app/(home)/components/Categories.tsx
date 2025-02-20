import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const categories = [
  { name: "Impresoras", href: "/printers" },
  { name: "Tintas", href: "/inks" },
  { name: "Repuestos", href: "/spare-parts" },
  { name: "Servicio Técnico", href: "/technical-service" },
]

export default function Categories() {
  return (
    <section className="w-full bg-slate-900 py-16">
    <div className="container mx-auto px-4">
      <h2 className="mb-8 text-3xl font-bold text-white">Categorías</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex min-h-[200px] items-center justify-center rounded-lg bg-white p-6 transition-transform hover:scale-105"
          >
            <span className="flex items-center text-xl font-medium">
              {category.name}
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
  )
}
