import {ImageResponse} from 'next/og'
import OG from "@/components/og";

// Image metadata
export const alt = 'About Tonse Jobs'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        <OG>Welcome</OG>,
        {
            ...size
        }
    )
}