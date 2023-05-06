import Image from "next/image";
import Link from "next/link";

import Container from "./ui/Container";

import { FiArrowRightCircle } from "react-icons/fi";

import styles from './Hero.module.css'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Container>
        <div className="flex flex-col items-start justify-start w-full h-[576px] ">
          <h3 className="text-7xl font-bold w-96 text-white mt-10 shadow-gray-500 [text-shadow:_0_3px_10px_rgb(0_0_0_/_30%)]">Conoce nuestras blusas</h3>

          <p className="text-2xl text-white mt-6 shadow-gray-300 [text-shadow:_0_3px_10px_rgb(0_0_0_/_20%)]">Escoge el modelo que más te guste</p>
          
          <Link
            className="text-white bg-black hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-2xl px-5 py-3.5 mt-6 w-64 text-center flex items-center justify-between gap-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ease-in-out duration-300 hover:scale-110"
            href="/products">
            <span>Compra ahora</span>
            <FiArrowRightCircle className="w-8 h-8" />
          </Link>
        </div>
      </Container>
    </div>
  )
}
