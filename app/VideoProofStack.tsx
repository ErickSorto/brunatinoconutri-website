"use client";

import { useEffect, useRef, useState } from "react";

type ProofVideo = {
  title: string;
  label: string;
  src: string;
  poster: string;
  href: string;
};

type VideoProofStackProps = {
  ariaLabel: string;
  nextLabel: string;
  previousLabel: string;
  videos: readonly ProofVideo[];
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function VideoProofStack({
  ariaLabel,
  nextLabel,
  previousLabel,
  videos,
}: VideoProofStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const move = (direction: 1 | -1) => {
    const currentVideo = videoRefs.current[activeIndex];

    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
    }

    setIsPlaying(false);
    setActiveIndex((index) => wrapIndex(index + direction, videos.length));
  };

  useEffect(() => {
    if (isPlaying || videos.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => wrapIndex(index + 1, videos.length));
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPlaying, videos.length]);

  return (
    <div className="video-proof-stack reveal" aria-label={ariaLabel}>
      <div className="video-stack-list">
        {videos.map((video, index) => {
          const offset = wrapIndex(index - activeIndex, videos.length);
          const isActive = offset === 0;

          return (
            <article
              className="video-stack-card"
              data-position={offset}
              aria-hidden={!isActive}
              key={video.src}
            >
              <video
                aria-label={video.title}
                controls={isActive}
                playsInline
                poster={video.poster}
                preload="metadata"
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                tabIndex={isActive ? 0 : -1}
                onPlay={() => {
                  if (isActive) {
                    setIsPlaying(true);
                  }
                }}
                onPause={() => {
                  if (isActive) {
                    setIsPlaying(false);
                  }
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setActiveIndex((current) => wrapIndex(current + 1, videos.length));
                }}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="video-card-label">
                <span>{video.label}</span>
                <strong>{video.title}</strong>
              </div>
            </article>
          );
        })}
      </div>

      <div className="video-stack-controls">
        <button type="button" aria-label={previousLabel} onClick={() => move(-1)}>
          <span aria-hidden="true">‹</span>
        </button>
        <button type="button" aria-label={nextLabel} onClick={() => move(1)}>
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
