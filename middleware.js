import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";
// export { default } from 'next-auth/middleware'

const guestPages = ['/login', '/', 'freelanceRegister', 'clientRegister'];
const userPages = ['/dashboard', '/dashboardClient', '/dashboardFreelancer', '/clientAddJobs', '/clientJobs', '/checkJobs']

const isGuestPage = (url) => {
  return guestPages.some(x => url.startsWith(x));
}

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  if (token && guestPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  if (!token && userPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (token && pathname.startsWith("/dashboard")) {
    if (token.user.type === 'freelance' && (pathname === "/dashboard" || pathname === "/dashboardClient")) {
      return NextResponse.redirect(new URL('/dashboardFreelancer', req.url));
    } else if (token.user.type === 'client' && (pathname === "/dashboard" || pathname === "/dashboardFreelancer")) {
      return NextResponse.redirect(new URL('/dashboardClient', req.url));
    }
    console.log({ token });
  }
  return NextResponse.next();
}

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     const { user } = req.nextauth.token;
//     console.log('middleware', { user });
//     if (!user) {
//       if (!req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/firstPage')) {
//         return NextResponse.redirect(new URL('/login', req.url));
//       } else {
//         return NextResponse.next();
//       }
//     } else {
//       if (req.nextUrl.pathname.startsWith('/dashboard') ||
//         req.nextUrl.pathname.startsWith('/login') ||
//         req.nextUrl.pathname.startsWith('/firstPage')) {
//         console.log({ userType: user });
//         if (user.type == 'freelance') {
//           return NextResponse.redirect(new URL('/dashboardFreelancer', req.url));
//         } else if (user.type == 'client') {
//           return NextResponse.redirect(new URL('/dashboardClient', req.url));
//         }
//       }
//     }
//     // console.log({ url: req.nextUrl.pathname });
//     // if (guestPages.some(x => req.nextUrl.pathname.startsWith(x))) {

//     // }
//     // console.log('middleware', req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log('authorized', token);
//         return !!token?.user;
//       }
//     },
//   }
// )

// export const config = {
//   matcher: ["/dashboard", "/dashboardClient", "/clientAddJobs", "/clientJobs", "/checkJobs", "/firstPage"]
// };