import React from 'react'
import type {Metadata} from 'next'

import './core.css'

export const metadata: Metadata = {
    title: {
        template: '%s | Tonse Jobs',
        default: 'Zambia Jobs local and remote all in one place',
    },
    description: 'Zambia Jobs local and remote all in one place',
    metadataBase: new URL('https://jobs.tonse.co.zm'),
}

type Props = {
    children: React.ReactNode
}

export default function RootLayout({children}: Readonly<Props>) {
    return <html lang='en'>
    <body id='Tonse'>
    {children}
    </body>
    </html>
}