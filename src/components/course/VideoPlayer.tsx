export function VideoPlayer({ src }: { src: string }) {
    // Check if it's a direct link or an embed
    // For now, assume direct MP4 link or similar
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
