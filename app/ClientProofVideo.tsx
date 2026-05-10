"use client";

import { useRef, useState } from "react";

type ClientProofVideoProps = {
  ariaLabel: string;
  poster: string;
  src: string;
};

export default function ClientProofVideo({ ariaLabel, poster, src }: ClientProofVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className={`client-proof-video reveal${isPlaying ? " is-playing" : ""}`}>
      <video
        aria-label={ariaLabel}
        controls
        playsInline
        poster={poster}
        preload="metadata"
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        aria-label={ariaLabel}
        className="client-proof-play"
        type="button"
        onClick={() => videoRef.current?.play()}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
