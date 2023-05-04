import { headers } from 'next/headers';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const fetchProducts = () => {
  return fetch('http://localhost:3000/api/v1/products')
    .then(res => res.json())
    .catch(err => console.log(err))
}

export default async function Home() {
  const products = await fetchProducts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Product list</h1>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}
