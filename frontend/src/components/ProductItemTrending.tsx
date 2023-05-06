import { Product } from "@/store/types";
import { formatCurrencyNumber } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

import { HiOutlineStar } from "react-icons/hi2";

interface Props {
  product: Product
}

export default function ProductItemTrending({ product }: Props) {
  const formattedPrice = formatCurrencyNumber(product.price)

  return (
    <article className='relative overflow-hidden cursor-pointer shadow-lg group'>
      <div className="relative">
        <Image
          className="h-auto max-w-full"
          src="/images/products/p1/PB001a-320x390.jpg"
          alt="Foto de producto xyz"
          width={480}
          height={585}
          priority
        />
        <Image
          className="absolute top-0 left-0 h-auto max-w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"
          src="/images/products/p1/PB001b-320x390.jpg"
          alt="Foto de producto xyz"
          width={480}
          height={585}
          priority
        />
      </div>
      <div className="absolute top-0 left-0 py-1 px-3 bg-black text-white font-semibold">SALE</div>
      <div className="absolute top-0 rhoveright-0 py-1 px-3 bg-black/60 text-white font-semibold hidden">
        <div className='text-white flex items-center gap-1'>
          <HiOutlineStar className='text-yellow-300 fill-yellow-300 shadow-2xl ' />
          <HiOutlineStar className='text-yellow-300 fill-yellow-300' />
          <HiOutlineStar className='text-yellow-300 fill-yellow-300' />
          <HiOutlineStar className='text-yellow-300 fill-yellow-300' />
          <HiOutlineStar className='text-yellow-300 fill-yellow-300' />
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full flex flex-col justify-end items-center '>
        <div className='bg-black/50 w-full px-5 py-3 '>
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <div className='text-lg font-normal text-white'>
                <span className="font-medium">{product.name}</span>
                <span className="font-normal">({product.code})</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl font-semibold text-white drop-shadow-xl">{formattedPrice}</span>
                <div className="flex-off items-center gap-3">
                  <span className="text-xs font-normal text-white line-through drop-shadow-xl hidden">S/ 52.00</span>
                  <span className="text-sm font-bold text-red-600 rounded dark:text-red-300 drop-shadow-xl hidden">-30%</span>
                  <span className="text-sm font-bold text-red-600 rounded dark:text-red-300 drop-shadow-xl">
                    {product.category?.name}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/products/${product.id}`}
              type="button"
              className="text-black bg-white hover:bg-gray-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-5 py-3.5 text-center w-32 uppercase dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ease-in-out duration-300 group-hover:scale-110">
              Comprar
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
