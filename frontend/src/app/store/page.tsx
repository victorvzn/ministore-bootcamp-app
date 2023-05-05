
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.APP_URL_FRONTEND

const fetchProducts = () => {

  return fetch(`${APP_URL}/api/v1/products`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export default async function Store() {
  const products = await fetchProducts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Store products</h1>

      <h2>{APP_URL}</h2>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}
