import { env } from "@/config/env.mjs";
import { MainNavItem } from "@/models";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Copiservys",
  description:
    "Soluciones completas en equipos de oficina y tecnología. Expertos en venta, mantenimiento y reparación de fotocopiadoras. Ofrecemos productos de alta calidad y servicio técnico especializado para garantizar el mejor rendimiento",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/opengraph-image.webp`,
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
          href: "/services",
          description: "Mantenimiento, reparaciones de computadoras y fotocopiadoras",
        },
        {
          title: "Contacto",
          href: "/contact",
          description: "Contacta con nosotros",
        },
      ],
    },
  ] satisfies MainNavItem[],
};
