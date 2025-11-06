import { getJob } from '@/app/lib/data'

export async function generateMetadata({params}: { params: { slug: string } }) {
    const job = await getJob(params)
    return {
        title: job.title,
        description: `${job.company.name} | ${job.locations?.join(', ')}`,
    }
}

export default async function Page({ }: { params: { slug: string } }) {
    // const job = await getJob(params)
    return <div/>
}