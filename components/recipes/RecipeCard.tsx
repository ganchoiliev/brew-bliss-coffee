import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Coffee, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface RecipeCardData {
  id: string;
  name: string;
  tagline: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  time: string;
  ingredientCount: number;
  videoUrl: string;
  color: string;
}

interface RecipeCardProps {
  recipe: RecipeCardData;
  index: number;
  onSelect: () => void;
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-emerald-500/80',
  Medium: 'bg-amber-500/80',
  Advanced: 'bg-red-500/80',
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  const { ref: observerRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
  });

  // Pause/play video based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReduced) return;

    if (isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isIntersecting, prefersReduced]);

  // Adjust playback rate on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = isHovered ? 1.0 : 0.7;
  }, [isHovered]);

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      observerRef.current = node;
    },
    [observerRef]
  );

  return (
    <motion.article
      ref={setRefs}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className="relative flex flex-col bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group aspect-[3/4]"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
    >
      {/* ── Video Background (top 60%) ── */}
      <div className="relative flex-[3] overflow-hidden" aria-hidden="true">
        {!prefersReduced && !videoError ? (
          <video
            ref={videoRef}
            src={recipe.videoUrl}
            muted
            autoPlay
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#2a1a1a] to-[#1a0a10]"
          />
        )}

        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />

        {/* Difficulty badge — top-left */}
        <span
          className={`absolute top-3 left-3 ${difficultyColors[recipe.difficulty]} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm`}
        >
          {recipe.difficulty}
        </span>
      </div>

      {/* ── Text Content (bottom 40%) ── */}
      <div className="relative flex-[2] flex flex-col justify-between px-5 pt-3 pb-5">
        <div>
          <h3 className="text-lg font-semibold text-[#f5f0e8] leading-snug mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
            {recipe.name}
          </h3>
          <p className="text-sm text-[#a09080] leading-relaxed line-clamp-2">
            {recipe.tagline}
          </p>
        </div>

        {/* Meta pills */}
        <div className="flex items-center gap-2 mt-3 mb-3">
          <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full px-3 py-1 text-xs">
            <Clock className="w-3 h-3" /> {recipe.time}
          </span>
          <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full px-3 py-1 text-xs">
            <Coffee className="w-3 h-3" /> {recipe.ingredientCount} ingredients
          </span>
        </div>

        {/* CTA */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onSelect(); }}
          aria-label={`View full recipe for ${recipe.name}`}
          className="inline-flex items-center gap-1.5 text-[#c8956c] text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4 decoration-[#c8956c]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8956c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded transition-all"
        >
          View Full Recipe
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        </a>
      </div>
    </motion.article>
  );
};

export default RecipeCard;
