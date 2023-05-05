import { Inter } from 'next/font/google'
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.APP_URL_FRONTEND

const fetchProducts = async () => {
  const headersInstance = headers();

  const referer = headersInstance.get('referer')

  const res = await fetch(`${referer}/api/v1/products`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
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
