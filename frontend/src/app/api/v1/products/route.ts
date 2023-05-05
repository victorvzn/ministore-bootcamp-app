import { NextResponse } from 'next/server';

const APP_URL = process.env.APP_URL_BACKEND

export async function GET(request: Request) {
  const url = new URL(request.url)

  const res = await fetch(`${APP_URL}/api/v1/products/store?domain=${url.host}`)
  const data = await res.json()

  return NextResponse.json(data)
}
