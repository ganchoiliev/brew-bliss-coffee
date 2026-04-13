import { useEffect, useRef, useState, useCallback } from 'react';

interface UseVideoVisibilityOptions {
  rootMargin?: string;
  threshold?: number;
}

interface UseVideoVisibilityReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isVisible: boolean;
  isLoaded: boolean;
  hasError: boolean;
}

export function useVideoVisibility({
  rootMargin = '300px',
  threshold = 0,
}: UseVideoVisibilityOptions = {}): UseVideoVisibilityReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer — controls loading and play/pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, hasError]);

  // Attach load/error listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setIsLoaded(true);
    const onError = () => setHasError(true);

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    // If already ready
    if (video.readyState >= 3) setIsLoaded(true);

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, []);

  return { containerRef, videoRef, isVisible, isLoaded, hasError };
}
