import { cache } from 'react'

// getJob will be used twice, but execute only once
export const getJob = cache(async (params: { slug: string } ) => {
    const {slug} = await params
    return fetch(`https://api.jobs.tonse.co.zm/v2/jobs/${slug}`).then((res) => res.json())
})