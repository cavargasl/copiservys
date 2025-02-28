import { NextRequest, NextResponse } from 'next/server';
import { env } from './config/env.mjs';

const allowedOrigins = ['https://copiservys.com', 'https://www.copiservys.com'];
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
const isProduction = env.NODE_ENV === 'production';

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  const response = NextResponse.next()
    

  if (!isProduction) {
    response.headers.set('Access-Control-Allow-Origin', '*')
  } else if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
 
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
 
  return response
}


export const config = {
  matcher: ['/api/:path*'],
};
