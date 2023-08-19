// import { NextResponse } from 'next/server'
// import { NextApiRequest } from 'next'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextApiRequest) {

//     // If the user is not logged in, redirect to the login page
//     const {token} = request.cookies;
//     if(!token){
//         return NextResponse.redirect(new URL('/login', request.url))
//     }
    
//     return NextResponse.redirect(new URL('/', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/auth/profile',
// }