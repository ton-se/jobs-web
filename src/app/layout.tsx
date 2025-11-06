import React from 'react'
import Head from 'next/head'
import type {Metadata} from 'next'

import './core.css'

export const metadata: Metadata = {
    title: {
        template: '%s | Tonse Jobs',
        default: 'Zambia Jobs local and remote all in one place',
    },
    description: 'Zambia Jobs local and remote all in one place',
    metadataBase: new URL('https://jobs.tonse.co.zm')
}

type Props = {
    children: React.ReactNode
}

export default function RootLayout({children}: Readonly<Props>) {
    return <html lang='en'>
    <Head>
        <meta name='apple-mobile-web-app-title' content='Tonse Jobs' />
    </Head>
    <body id='Tonse'>
    {children}
    </body>
    </html>
}