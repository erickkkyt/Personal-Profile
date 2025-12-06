'use client';

import { Stream } from '@cloudflare/stream-react';

type VideoPlayerProps = {
    src: string;
};

export function VideoPlayer({ src }: VideoPlayerProps) {
    const isCloudflareId = /^[a-f0-9]{32}$/i.test(src) && !src.startsWith('http');

    // Cloudflare Stream (videoId or signed URL without protocol)
    if (isCloudflareId) {
        return (
            <div className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-black dark:border-gray-800">
                <Stream
                    controls
                    src={src}
                    responsive
                    height="100%"
                    width="100%"
                    preload="metadata"
                />
            </div>
        );
    }

    // Fallback to direct video file
    return (
        <div className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-black dark:border-gray-800">
            <video
                controls
                className="w-full"
                preload="metadata"
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
