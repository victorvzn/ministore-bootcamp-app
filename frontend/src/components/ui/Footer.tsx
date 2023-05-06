import Link from "next/link";
import Image from "next/image";

import Container from "./Container";

import { FiInstagram, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <header>
      <footer className="bg-black text-white flex justify-center py-20">
        <Container>
          <div className="flex flex-col justify-center items-center gap-3">
            <Link href={`/`} className="flex items-center">
              <Image
                className="h-9 mr-3 invert"
                src="/images/samy_logo.png"
                alt="Samy Logo"
                width={140}
                height={36}
                priority
              />
            </Link>
            <div className="flex items-center">
              © {new Date().getFullYear()} | Todos los derechos reservados
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="uppercase">Siguenos en</span>
              <Link href="https://www.instagram.com/samy/" target="_blank">
                <FiInstagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.instagram.com/samy/" target="_blank">
                <FiFacebook className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </header>
  )
}