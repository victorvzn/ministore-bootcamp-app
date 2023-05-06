// import Image from 'next/image'
import Hero from '@/components/Hero'
import Container from '@/components/ui/Container'
import Copy from '@/components/ui/Copy'
import ProductListTrending from '@/components/ProductListTrending'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/services/products'
import { formatCurrencyNumber } from '@/utils/currency'

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params

  const product = await getProductById(id)

  const formattedPrice = formatCurrencyNumber(product.price)

  return (
    <main className='relative'>
      <Copy />
      <Container>
        <div className='w-full flex flex-col md:flex-row items-start gap-6 pt-6 pb-10'>
          <div className='w-full md:w-1/2'>
            <Image
              className="h-auto max-w-full ease-in-out duration-100 opacity-100 group-hover:hidden group-hover:opacity-0"
              src="/images/products/p1/PB001a-520x620.jpg"
              alt="Foto de producto xyz"
              width={480}
              height={585}
              priority
            />
            <div className='flex gap-2 mt-4'>
              <div className='flex justify-center items-center font-normal text-xl w-20 h-20 border-0 border-gray-300 hover:bg-gray-300/50 cursor-pointer'>
                <Image
                  className="h-auto max-w-full ease-in-out duration-100 opacity-100 group-hover:hidden group-hover:opacity-0"
                  src="/images/products/p1/PB001a-320x390.jpg"
                  alt="Foto de producto xyz"
                  width={80}
                  height={97}
                  priority
                />
              </div>
              <div className='flex justify-center items-center font-normal text-xl w-20 h-20 border-0 border-gray-300 hover:bg-gray-300/50 cursor-pointer'>
                <Image
                  className="h-auto max-w-full ease-in-out duration-100 opacity-100 group-hover:hidden group-hover:opacity-0"
                  src="/images/products/p1/PB001a-320x390.jpg"
                  alt="Foto de producto xyz"
                  width={80}
                  height={97}
                  priority
                />
              </div>
              <div className='flex justify-center items-center font-normal text-xl w-20 h-20 border-0 border-gray-300 hover:bg-gray-300/50 cursor-pointer'>
                <Image
                  className="h-auto max-w-full ease-in-out duration-100 opacity-100 group-hover:hidden group-hover:opacity-0"
                  src="/images/products/p1/PB001a-320x390.jpg"
                  alt="Foto de producto xyz"
                  width={80}
                  height={97}
                  priority
                />
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 flex flex-col gap-2 justify-center items-start'>
            <div className='text-center'>
              <Link href='/' className='text-black'>Inicio</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href='/products' className='text-black'>Mujer</Link>
            </div>
              
            <h1 className="text-4xl font-semibold text-center uppercase">{product.name}</h1>

            <div className='flex gap-2'>
              <span className='font-normal text-lg uppercase'>Marca {product.brand}</span>
              -
              <span className='font-normal text-lg'>{product.code}</span>
            </div>

            <div className='flex items-center gap-3 py-4'>
              <span className="text-3xl font-semibold text-black drop-shadow-xl">{formattedPrice}</span>
              <span className="text-xs font-normal text-black line-through drop-shadow-xl hidden">S/ 52.00</span>
              <span className="text-sm font-bold text-red-600 rounded dark:text-red-300 drop-shadow-xl hidden">-30%</span>
            </div>

            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />

            <div className='flex flex-col gap-2'>
              <p className='ton-2xl font-normal uppercase'>Talla</p>
              <div className='flex gap-5'>
                <div className='flex justify-center items-center font-normal text-xl w-12 h-12 border-2 border-gray-300 hover:bg-gray-300/50 cursor-pointer'>XS</div>
                <div className='flex justify-center items-center font-semibold text-xl w-12 h-12 border-2 border-black hover:bg-gray-300/50 cursor-pointer'>S</div>
                <div className='flex justify-center items-center font-normal text-xl w-12 h-12 border-2 border-gray-300 hover:bg-gray-300/50 cursor-pointer'>M</div>
                <div className='flex justify-center items-center font-normal text-xl text-gray-300 w-12 h-12 border-2 border-gray-200'>L</div>
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2 mt-4'>
                <p className='ton-2xl font-normal uppercase'>Cantidad</p>
                <div className='flex'>
                  <div className='flex justify-center items-center font-semibold text-2xl w-12 h-12 border-2 border-r-0 border-gray-300 cursor-pointer'>-</div>
                  <div className='flex justify-center items-center font-light text-2xl w-20 h-12 border-2 border-gray-300 cursor-default'>2</div>
                  <div className='flex justify-center items-center font-semibold text-2xl w-12 h-12 border-2 border-l-0 border-gray-300 cursor-pointer'>+</div>
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-4'>
                <p className='ton-2xl font-normal uppercase'>Color</p>
                <select className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Elije un color</option>
                  <option value="US">Blanco</option>
                  <option value="CA">Azúl</option>
                  <option value="FR">Guinda</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-bold text-lg px-5 py-3.5 text-center mr-2 mb-2 mt-11 w-full dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              Agregar al carrito
            </button>

            <p className='font-normal text-base my-5'>{product.description}</p>
            <p className='font-normal text-base'>{product.category.name}</p>

          </div>
        </div>
      </Container>
    </main>
  )
}
