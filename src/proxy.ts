import { NextResponse, NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl?.pathname?.replace(/\//g, '')
    if (pathname && pathname.length  === 8) {
        const res = await fetch('https://api.jobs.tonse.co.zm/v3/jobs/' + pathname)
        if (res.status === 200) {
            const job = await res.json()
            return NextResponse.redirect(job.urls?.[0].url)
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|\.well|icon|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}