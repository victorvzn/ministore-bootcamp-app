
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const fetchProducts = () => {
  const APP_URL = process.env.VITE_APP_URL

  return fetch(`${APP_URL}/api/v1/products`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export default async function Store() {
  const products = await fetchProducts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Store products</h1>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}
