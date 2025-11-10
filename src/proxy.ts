import { NextResponse, NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
    // Only consider GET navigations
    if (req.method !== 'GET') {
        return NextResponse.next()
    }

    const pathnameOnly = req.nextUrl?.pathname || '/'

    // Always let OG image routes render locally
    if (pathnameOnly.includes('opengraph-image')) {
        return NextResponse.next()
    }

    // Detect common crawler/social bot user agents
    const ua = req.headers.get('user-agent') || ''
    const isBot = /(facebookexternalhit|Twitterbot|Pinterest|Slackbot|WhatsApp|LinkedInBot|Discordbot|TelegramBot|Googlebot|bingbot|DuckDuckBot|YandexBot|vercel|Screaming\s*Frog|facebookcatalog|Applebot|Embedly|Quora\s*Link\s*Preview|ia_archiver)/i.test(ua)

    // If it's a bot, serve our page so OG tags/images come from our app
    if (isBot) {
        return NextResponse.next()
    }

    // Original redirect logic for human users: redirect only if the slug looks like 8-char job code
    const compact = pathnameOnly.replace(/\//g, '')
    if (compact && compact.length === 8) {
        const res = await fetch('https://api.jobs.tonse.co.zm/v3/jobs/' + compact)
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
        '/((?!api|_next/static|_next/image|\\.well|icon|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}