import Image from "next/image";

import Container from "./Container";

import { HiOutlineTag } from 'react-icons/hi'

export default function Copy() {
  return (
    <div className="bg-black text-white flex justify-center">
      <div className="max-w-screen-xl flex flex-wrap mx-auto p-2">
        <div className="flex items-center gap-1">
          <HiOutlineTag className="w-5 h-5" /> Compra ahora y obten un descuento del 30%.
        </div>
      </div>
    </div>
  )
}