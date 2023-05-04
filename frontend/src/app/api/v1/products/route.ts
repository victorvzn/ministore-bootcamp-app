import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url)
  console.log({ url })

  const res = await fetch(`http://localhost:5000/api/v1/products/public?domain=${url.host}`)
  const data = await res.json()

  return NextResponse.json({ data })
}
