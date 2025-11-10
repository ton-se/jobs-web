import { ImageResponse } from 'next/og'
import { getJob } from '@/lib/data'
import PlayStore from '@/components/playstore'
import OG from '@/components/og'

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
    
    return new ImageResponse(
        <OG>
            <div style={{fontSize: 64, fontStyle: 'bold', textAlign: 'center', lineHeight: 1, display: 'flex'}}>{truncate(job.title, 54)}</div>
            <div style={{fontSize: 38, display: 'flex', textAlign: 'center'}}>{truncate(job.company.name, 40)}</div>
            <div style={{fontSize: 32, display: 'flex', marginTop: 8}}>{rawDescription}</div>
            {job.closes_at && <div style={{fontSize: 28, color: '#5B6063', display: 'flex'}}>Application deadline: {new Date(job.closes_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', })}</div>}
            <PlayStore/>
        </OG>,
        {
            ...size,
        },
    )
}