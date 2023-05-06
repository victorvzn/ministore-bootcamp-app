import { headers } from 'next/headers';

const isDev = process.env.NODE_ENV === 'development'

export const getAllProducts = async () => {
  const headersInstance = headers()

    const protocol = isDev ? 'http://' : 'https://'
    const host = headersInstance.get('host')

    const url = `${protocol}${host}/api/v1/products`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data.content
}


export const getProductById = async (id: string) => {
  const headersInstance = headers()

    const protocol = isDev ? 'http://' : 'https://'
    const host = headersInstance.get('host')

    const url = `${protocol}${host}/api/v1/products/${id}`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data.content
}