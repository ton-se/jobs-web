import {ImageResponse} from 'next/og'

import {getJob} from '@/app/lib/data'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({params}: { params: { slug: string } }) {
    const job = await getJob(params)
    if (!job) return null

    if (!job.company.logo) {
        job.company.logo = new URL('/company.png', process.env.NEXT_PUBLIC_BASE_URL).toString()
    }

    return new ImageResponse(
        <div
            style={{
                width: '1200px',
                height: '630px',
                background: `#f9fafb url(/dots.png) center/cover no-repeat`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 100px',
                fontFamily: 'Inter, sans-serif',
                color: '#111827',
            }}
        >
            {/* Left image/logo panel */}
            <div
                style={{
                    width: '320px',
                    height: '320px',
                    background: '#fff',
                    borderRadius: '28px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '80px',
                }}
            >
                {job.company.logo && <img
                    src={job.company.logo}
                    alt={job.company.name}
                    width="220"
                    height="220"
                    style={{
                        borderRadius: '20px',
                        objectFit: 'contain',
                    }}
                />}

            </div>

            {/* Right content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '680px',
                }}
            >
                {job.types.map((type: string, index: number) =>
                    <div key={index}
                         style={{
                             backgroundColor: '#10b981',
                             color: 'white',
                             fontWeight: 600,
                             fontSize: 28,
                             padding: '4px 12px',
                             borderRadius: '6px',
                             alignSelf: 'flex-start',
                             marginLeft: '8px',
                             marginBottom: '20px',
                         }}
                    >
                        {type}
                    </div>)}


                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color: '#111827',
                        lineHeight: 1.1,
                        marginBottom: '16px',
                    }}
                >
                    {job.title}
                </div>

                <div
                    style={{
                        fontSize: 36,
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '10px',
                    }}
                >
                    {job.company.name}
                </div>

                <div
                    style={{
                        fontSize: 30,
                        color: '#6b7280',
                        marginBottom: '28px',
                    }}
                >
                    {job.locations.join(', ')}
                </div>

                <div
                    style={{
                        fontSize: 22,
                        color: '#5B6063',
                        fontWeight: 500,
                    }}
                >
                    {job.urls?.length ? `Hiring Now — Apply via ${job.urls[0].label}` : ''}
                </div>
            </div>
        </div>,
        {
            ...size
        }
    )
}