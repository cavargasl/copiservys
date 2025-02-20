import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='text-lg'>Sitio no encontrado</p>
      <Link href='/' className={buttonVariants()}>Volver al inicio</Link>
    </div>
  )
}
