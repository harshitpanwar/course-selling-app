//middleware for checking if user is logged in

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
// import { prisma } from './pages/api/db/server';
 
// console.log('middleware.ts')
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth/profile') || (request.nextUrl.pathname.startsWith('/api/courses') && request.method === 'POST')) {

    // console.log(request.cookies)
    const token = request.cookies.get('server-token');
    // console.log(token);
    if(!token || !token.value){
      return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
  }
    
    return NextResponse.next()

  }
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/api/courses', '/api/profile'],
// }

  