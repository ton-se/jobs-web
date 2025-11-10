import {getJob} from '@/app/lib/data'

export async function generateMetadata({params}: { params: { slug: string } }) {
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

    return {
        title: truncate(job.title, 60), // Google displays ~50-60 chars
        description: truncate(rawDescription, 155), // Optimal SEO length: 150-160 chars
    }
}

export default async function Page({}: { params: { slug: string } }) {
    return <div></div>
}