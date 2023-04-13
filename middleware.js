import { NextResponse } from "next/server";

export function middleware(req) {
  const { body, url, method, geo, ip } = req
  try {
    const date = new Date();
    const stamp = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    console.log({ url, ip, geo, method, body, timestamp: stamp }) // logging
  } catch (err) {
    console.error(err)
  } finally {
    const res = NextResponse.next()
    return res
  }
}

export const config = {
  matcher: '/api/:path*',
}
