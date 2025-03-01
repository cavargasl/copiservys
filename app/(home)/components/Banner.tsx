import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative h-[600px] w-full">
      <Image
        src="/images/banner.webp"
        alt="Servicio técnico de fotocopiadoras"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/75 to-orange-800/55">
        <div className="container mx-auto flex h-full flex-col justify-center">
          <p className="mb-4 max-w-3xl tracking-wide text-orange-100">
            En Copiservys, no solo vendemos fotocopiadoras: ofrecemos soluciones
            completas con mantenimiento preventivo, reparación express y
            accesorios de alta calidad.
          </p>
          <h1 className="mb-8 max-w-3xl text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            Fotocopiadoras <br></br>+ Soporte Técnico
          </h1>
          <Link
            href="/products"
            className="inline-flex h-12 w-32 items-center justify-center rounded-md bg-tertiary px-6 text-sm font-medium text-white transition-colors hover:bg-tertiary/90"
          >
            Ver todo
          </Link>
        </div>
      </div>
    </div>
  );
}
