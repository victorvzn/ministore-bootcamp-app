import { NextResponse } from 'next/server';

const APP_CENTRAL_URL = process.env.APP_BACKEND_URL

export async function GET(request: Request) {
  const url = new URL(request.url)

  const res = await fetch(`${APP_CENTRAL_URL}/api/v1/categories/store?domain=${url.host}`)
  const data = await res.json()

  return NextResponse.json(data)
}
