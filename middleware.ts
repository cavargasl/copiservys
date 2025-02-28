import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://copiservys.com', 'https://www.copiservys.com', 'https://copiservys.vercel.app'];
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  console.log(origin, 'origin')
  const isAllowedOrigin = allowedOrigins.includes(origin)
  console.log(isAllowedOrigin, 'isAllowedOrigin')
  const response = NextResponse.next()
 
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
 
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  console.log(response.headers.get('Access-Control-Allow-Origin'), 'response.headers.get')
 
  return response
}


export const config = {
  matcher: ['/api/:path*'],
};
