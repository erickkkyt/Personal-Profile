'use client';

import { Stream } from '@cloudflare/stream-react';

type VideoPlayerProps = {
  videoIdOrSignedUrl: string;
  autoPlay?: boolean;
  muted?: boolean;
};

const VideoPlayer = ({ videoIdOrSignedUrl, autoPlay, muted }: VideoPlayerProps) => (
  <div className="w-full">
    <Stream
      controls
      src={videoIdOrSignedUrl}
      responsive
      height="100%"
      width="100%"
      preload="metadata"
      autoplay={autoPlay}
      muted={muted}
    />
  </div>
);

export default VideoPlayer;
