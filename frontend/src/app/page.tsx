// import Image from 'next/image'
import Hero from '@/components/Hero'
import Container from '@/components/ui/Container'
import ProductListTrending from '@/components/ProductListTrending'

import Copy from '@/components/ui/Copy'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className='relative'>
      <Copy />
      <Hero />
      <Container>
        <div className='flex flex-col justify-center items-center w-full pt-6 pb-10'>
          <h1 className="text-3xl font-semibold text-center uppercase">
            Tendencia ahora
          </h1>

          <Link href="/products" className='mt-5 font-semibold underline underline-offset-8'>Ver Todos</Link>

          <div className='mt-10'>
            {/* @ts-expect-error Server Component */}
            <ProductListTrending /> 
          </div>
        </div>
      </Container>
    </main>
  )
}
