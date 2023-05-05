import { url } from 'inspector';
import { Inter } from 'next/font/google'
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] })

const APP_URL = process.env.APP_URL_FRONTEND

const fetchProducts = async () => {
  const headersInstance = headers();

  const host = await headersInstance.get('referer')

  console.log({ host })

  const url = new URL(host || '')

  return fetch(`${url.origin}/api/v1/products`)
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
