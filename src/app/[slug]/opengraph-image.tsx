import { ImageResponse } from 'next/og'
import { getJob } from '@/lib/data'
import PlayStore from '@/components/playstore'
import Logo from '@/components/logo'

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const job = await getJob(params)
    if (!job) return null

    // Truncate helper function
    const truncate = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text
    }

    const descriptionParts = [job.locations?.[0], job.types?.[0]].filter(Boolean)
    const rawDescription = descriptionParts.join(' | ')

    // Fetch and convert image to base64
    const phoneImageUrl = new URL('/phone.png', process.env.NEXT_PUBLIC_BASE_URL).toString()

    return new ImageResponse(
        <div style={{ width: '1200px', height: '630px', backgroundColor: '#f5f5f5', display: 'flex', position: 'relative', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }} >
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
                <div style={{fontSize: 64, fontStyle: 'bold', textAlign: 'center', lineHeight: 1, display: 'flex'}}>{truncate(job.title, 54)}</div>
                <div style={{fontSize: 38, display: 'flex'}}>{truncate(job.company.name, 40)}</div>
                <div style={{fontSize: 32, display: 'flex', marginTop: 8}}>{rawDescription}</div>
                {job.closes_at && <div style={{fontSize: 28, color: '#5B6063', display: 'flex'}}>Application deadline: {new Date(job.closes_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', })}</div>}
                <PlayStore/>
            </div>
        </div>,
        {
            ...size,
        },
    )
}