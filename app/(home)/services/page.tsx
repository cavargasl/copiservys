import { Printer, Wrench, Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Category } from "@/core/products/domain/product";

const suministros:Category = "suministros"
const servicios = [
  {
    titulo: "Fotocopiadoras",
    descripcion: "Venta y alquiler de fotocopiadoras de alta calidad para empresas y oficinas.",
    servicios: ["Venta de fotocopiadoras", "Alquiler de equipos", "Asesoramiento personalizado"],
    icono: Printer,
    cta: "Explorar opciones",
  },
  {
    titulo: "Servicios Técnicos",
    descripcion: "Mantenimiento profesional y reparación de equipos de impresión y fotocopiado.",
    servicios: ["Mantenimiento preventivo", "Reparación de equipos", "Diagnóstico y solución de problemas"],
    icono: Wrench,
    cta: "Solicitar servicio",
  },
  {
    titulo: "Suministros",
    descripcion: "Venta de repuestos originales, tóner y tintas para todas las marcas principales.",
    servicios: ["Repuestos originales", "Tóner de alta calidad", "Tintas para impresoras"],
    icono: Package,
    cta: "Comprar suministros",
    href: `/products?category=${suministros}`,
  },
]

export default function ServiciosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Nuestros Servicios</h1>
      <p className="text-xl text-center mb-12">
        Soluciones integrales para todas sus necesidades
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicios.map((servicio, index) => (
          <Card key={index} className="flex flex-col bg-primary text-primary-foreground">
            <CardHeader>
              <servicio.icono className="w-12 h-12 mb-4 text-primary-foreground" />
              <CardTitle>{servicio.titulo}</CardTitle>
              <CardDescription className="text-primary-foreground">{servicio.descripcion}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {servicio.servicios.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full" variant={"secondary"}>
                <Link href={servicio.href ?? "/contact"}>{servicio.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Necesita ayuda para elegir el servicio adecuado?</h2>
        <p className="mb-8">
          Nuestro equipo de expertos está listo para asesorarle y encontrar la mejor solución para su negocio.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contáctenos</Link>
        </Button>
      </div>
    </div>
  )
}

