import Link from "next/link";
import Container from "./Container";

import { FiInstagram, FiFacebook } from "react-icons/fi";

export default function FooterDeveloper() {
  return (
    <header>
      <footer className="bg-black/95 text-white/60 flex justify-center">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-2 font-light">
            <span className="underline underline-offset-4 decoration-2 decoration-wavy font-semibold  cursor-pointer decoration-orange-400 hover:decoration-orange-500 ">ministoreapp.vercel.app</span>
            by
            <Link
              className="underline underline-offset-4 decoration-2 decoration-wavy font-semibold decoration-sky-400 hover:decoration-sky-500"
              href="https://victorvillazon.com"
              target="_blank">
              Victor Villazón
            </Link>
          </div>
        </Container>
      </footer>
    </header>
  )
}