// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const originPath = request.nextUrl.pathname + request.nextUrl.search;
    const { pathname } = request.nextUrl;
    if (pathname.includes('.well-known/appspecific'))
        return NextResponse.next();
    
    console.log("pathname");
    console.log(pathname);

    const token = request.cookies.get('token')?.value;
    // Define routes
    const isAuthRequiredRoute = () => {
        const routes: (string | RegExp)[] = [
            "/products/my-products", 
            "/orders",
            /^\/products\/[^/]+$/  // Matches "/products/" followed by any ID, but stops at a second slash
        ];

        return routes.some(route => 
            route instanceof RegExp ? route.test(pathname) : pathname === route
        );
    };
    const isAuthRoute = pathname === '/login' || pathname === '/signup';

    // User is not logged in but needs to be
    if (isAuthRequiredRoute() && !token)
    {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', originPath);
    
        return NextResponse.redirect(loginUrl);
    }

    // If logged in user it trying to login / create an account
    if (isAuthRoute && token)
        return NextResponse.redirect(new URL('/products', request.url));

    return NextResponse.next();
}

export const config = {
    /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
