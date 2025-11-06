import React from 'react'
import type {Metadata} from 'next'

import './core.css'

export const metadata: Metadata = {
  title: 'Tonse Jobs',
  description: '...'
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return <html lang='en'>
    <body>
      {children}
    </body>
  </html>
}
