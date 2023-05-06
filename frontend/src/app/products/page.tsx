// import Image from 'next/image'
import Hero from '@/components/Hero'
import Container from '@/components/ui/Container'
import Copy from '@/components/ui/Copy'
import ProductList from '@/components/ProductList'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='relative'>
      <Copy />
      <Container>
        <div className='flex flex-col justify-center w-full pt-6 pb-10'>
          <div className='text-center'>
            <Link href='/' className='text-black'>Inicio</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className='text-gray-400 cursor-default'>Mujer</span>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-10 uppercase">
            Mujer
          </h1>
          <p>Compra en línea y encuentra blusas hechas con el mejor algodón peruano para mujeres con diseños modernos y clásicos para cualquier ocasión.</p>

          <ProductList />
        </div>
      </Container>
    </main>
  )
}
