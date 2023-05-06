import Image from "next/image";
import Link from "next/link";

import Container from "./Container";

import { BiUser } from 'react-icons/bi'
import CartSidebar from "../CartSidebar";

export default function Navigation() {
  return (
    <header className="sticky w-full z-20 top-0 left-0 ">
      <nav className="bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
        <Container>
          <div className="flex justify-start items-center">
            <Link href={`/`} className="flex items-center">
              <Image
                className="h-9 mr-3"
                src="/images/samy_logo3.png"
                alt="Samy Logo"
                width={287}
                height={74}
                priority
              />
            </Link>
          </div>
          <div className="hidden md:block-off">
            <ul className="flex items-center gap-11">
              <li className="text-lg cursor-pointer font-semibold">Mujer</li>
              <li className="text-lg cursor-pointer">Hombre</li>
              <li className="text-lg cursor-pointer">Niñas</li>
              <li className="text-lg cursor-pointer">Niños</li>
              <li className="text-lg cursor-pointer">Bebés</li>
            </ul>
          </div>
          <div className="flex items-center md:order-2 gap-4">
            <Link href="/login">Ingresar</Link>
            
            <CartSidebar />

            <button
              type="button"
              className="text-black-500 bg-gray-600 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-7 h-7 flex justify-center items-center"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              {/* <img
                className="w-7 h-7 rounded-full hidden"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              /> */}
              <BiUser className="w-6 h-6 text-white " />
            </button>
          </div>
        </Container>
      </nav>
    </header>
  )
}