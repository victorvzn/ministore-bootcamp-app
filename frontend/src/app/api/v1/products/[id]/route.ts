import { NextResponse } from 'next/server';

const APP_URL = process.env.APP_URL_BACKEND

export async function GET(request: Request) {
  const url = new URL(request.url)

  const id = url.pathname.split('/').at(-1)

  const res = await fetch(`${APP_URL}/api/v1/products/${id}/store?domain=${url.host}`)

  const data = await res.json()

  return NextResponse.json(data)
}
