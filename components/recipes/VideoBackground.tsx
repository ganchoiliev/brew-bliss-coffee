import React, { useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useVideoVisibility } from '../../hooks/useVideoVisibility';

interface VideoBackgroundProps {
  name: string;
  className?: string;
  children?: React.ReactNode;
  playbackRate?: number;
  hovered?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  name,
  className = '',
  children,
  playbackRate = 0.7,
  hovered = false,
}) => {
  const prefersReduced = useReducedMotion();
  const { containerRef, videoRef, isVisible, isLoaded, hasError } = useVideoVisibility();

  const mp4Src = `/videos/mp4/${name}.mp4`;
  const webmSrc = `/videos/webm/${name}.webm`;
  const posterSrc = `/videos/posters/${name}.jpg`;

  const showVideo = !prefersReduced && !hasError;

  // Playback rate control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = hovered ? 1.0 : playbackRate;
  }, [hovered, playbackRate, videoRef]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {/* Poster image — always present as base layer */}
      <img
        src={posterSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Shimmer loading overlay */}
      {showVideo && !isLoaded && (
        <div className="absolute inset-0 z-[1]">
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{ animationDuration: '1.5s' }}
          />
        </div>
      )}

      {/* Video element */}
      {showVideo && isVisible && (
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          className={`absolute inset-0 w-full h-full object-cover z-[2] transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Children (overlays, badges, etc.) render on top */}
      <div className="relative z-[5]">{children}</div>
    </div>
  );
};

export default React.memo(VideoBackground);
