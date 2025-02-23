import { env } from "@/config/env.mjs";
import { MainNavItem } from "@/models";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Copyservys",
  description:
    "Soluciones integrales en equipos de oficina y tecnología. Especialistas en venta, mantenimiento y reparación de computadoras y fotocopiadoras, ofreciendo productos de calidad y servicio técnico profesional.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image.png}`,
  mainNav: [
    {
      title: "Inicio",
      items: [
        {
          title: "Productos",
          href: "/products",
          description: "Todos nuestros productos",
        },
        {
          title: "Servicios",
          href: "/technical-service",
          description: "Mantenimiento, reparaciones de computadoras y fotocopiadoras",
        },
        {
          title: "Contacto",
          href: "/contacto",
          description: "Contacta con nosotros",
        },
      ],
    },
  ] satisfies MainNavItem[],
};
