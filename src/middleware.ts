import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
    console.log("Middleware executing for:", pathname);
    console.log("Token exists:", !!token);
    console.log("User role:", token?.role);
    
    // Jika user sudah login dan mencoba akses signin, redirect ke homepage
    if (pathname === "/auth/signin" && token) {
      console.log("Authenticated user trying to access signin, redirecting to homepage");
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        console.log("Checking authorization for:", pathname);
        console.log("Token:", !!token);
        console.log("Role:", token?.role);
        
        // Allow access to signin page (middleware will handle redirect for authenticated users)
        if (pathname.startsWith("/auth/signin")) {
          return true;
        }
        
        // Protect dashboard and data routes - only admin can access
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/data")) {
          return !!token && token.role === "admin";
        }
        
        // Allow all other routes
        return true;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/data/:path*",
    "/auth/signin",
  ]
};