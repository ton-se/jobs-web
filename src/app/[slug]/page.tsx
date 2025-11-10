import {getJob} from '@/lib/data'
import type {Metadata} from 'next'

export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata> {
    const job = await getJob(params)
    if (!job) return {}

    // Truncate helper function
    const truncate = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text
    }

    // Format location or type with fallback
    const locationOrType = job.locations?.[0] || job.types?.[0] || ''

    // Build description with proper length limits
    const descriptionParts = [job.company.name, locationOrType].filter(Boolean)
    const rawDescription = descriptionParts.join(' | ')

    // Use absolute URL or relative to metadataBase
    const url = new URL(`/${job.short_url}`, 'https://jobs.tonse.co.zm').toString()

    return {
        title: truncate(job.title, 60),
        description: truncate(rawDescription, 155),
        openGraph: {
            siteName: 'Tonse Jobs',
            url: url, // Absolute URL
            title: truncate(job.title, 60),
            description: truncate(rawDescription, 155),
        },
    }
}

export default async function Page({}: { params: { slug: string } }) {
    return <div></div>
}