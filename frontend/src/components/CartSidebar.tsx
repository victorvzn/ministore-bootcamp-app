"use client"

import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

export default function CartSidebar() {
  const [toggle, setToggle] = useState(false)

  const defaultClass = 'fixed top-0 right-0 z-40 h-screen flex flex-col justify-between pb-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800'

  const toggleSidebar = () => {
    document.querySelector('body')?.classList.toggle('overflow-hidden')

    setToggle(!toggle)
  }
  
  return (
    <>
      <button
        type="button"
        className="rounded-full text-black-500"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open cart menu</span>
        <HiOutlineShoppingBag className="w-7 h-7" />
      </button>

      <div
        className={`${defaultClass} ${toggle ? 'transform-none' : 'translate-x-full'}`}
        tabIndex={-1}
      >
        <header className="sticky top-0 left-0 bg-white">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-4 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            <FiX className='w-6 h-6' />
            <span className="sr-only">Close menu</span>
          </button>
          <h5
            className="inline-flex items-center my-4 text-4xl font-normal uppercase text-left px-4 dark:text-gray-400"
          >
            Carrito de compras
          </h5>

          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
        </header>

        <section className='px-4 flex justify-center mt-40 h-full font-light text-lg'>
          Su carrito actualmente está vacío.
        </section>

        <footer>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700 w-full" />

          <div className='flex flex-col gap-5 px-11 py-4'>
            <div className='flex justify-between '>
              <span>Subtotal</span>
              <span>S/. 60.00</span>
            </div>
            <button
              type="button"
              className="text-white bg-black hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-lg px-5  w-full h-12 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ease-in-out duration-300 hover:scale-110">
              Comprar ahora
            </button>
          </div>
        </footer>
      </div>

      { toggle && <div className='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30' onClick={toggleSidebar}></div>}
    </>
  )
}