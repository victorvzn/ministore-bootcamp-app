import { Inter } from 'next/font/google'
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.APP_URL_FRONTEND

const fetchProducts = async () => {
    const headersInstance = headers();

    const host = headersInstance.get('host')

    console.log(host)

    const url = `https://${host}/api/v1/products`

    const res = await fetch(url)

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
