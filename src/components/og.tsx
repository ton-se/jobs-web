import React from 'react'
import Logo from '@/components/logo'

type Props = {
    children: React.ReactNode
}

export default function OG({children}: Readonly<Props>) {
    const phoneImageUrl = new URL('/phone.png', process.env.NEXT_PUBLIC_BASE_URL).toString()
    
    return <div style={{ width: '1200px', height: '630px', backgroundColor: '#f5f5f5', display: 'flex', position: 'relative', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }} >
        <div style={{ position: 'absolute', width: 500, height: 500, display: 'flex', backgroundColor: '#10b981', borderRadius: '50%', bottom: -300, left: -300 }}></div>
        <div style={{ position: 'absolute', width: '900px', height: '900px', display: 'flex', backgroundColor: '#10b981', borderRadius: '50%', top: '-130px', right: '-600px' }}></div>
        <div style={{ position: 'absolute', display: 'flex', height: '100%', width: 270, top: 24, right: 40}}>
            <img src={phoneImageUrl} alt='phone'/>
        </div>
        <div style={{ position: 'absolute', left: 32, top: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Logo/>
            <h1 style={{fontSize: 32, marginLeft: 12, color: '#5B6063', display: 'flex'}}>Tonse Jobs</h1>
        </div>
        <div style={{display: 'flex', position: 'relative', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginLeft: 64, marginTop: 120, marginRight: 360}}>
            {children}
        </div>
    </div>
}