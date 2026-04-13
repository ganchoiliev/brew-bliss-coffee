import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const RecipeSectionHero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden aspect-[16/9] md:aspect-[21/9]"
    >
      {/* Video with parallax */}
      <motion.div
        style={prefersReduced ? {} : { y }}
        className="absolute inset-[-15%] w-[130%] h-[130%]"
      >
        {prefersReduced ? (
          <img
            src="/videos/posters/hero-video.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6) saturate(1.1)' }}
          />
        ) : (
          <video
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            poster="/videos/posters/hero-video.jpg"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6) saturate(1.1)' }}
          >
            <source src="/videos/webm/hero-video.webm" type="video/webm" />
            <source src="/videos/mp4/recipes-hero.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Overlay layer 1: bottom hard fade */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(26,10,16,1) 0%, transparent 40%)' }}
      />

      {/* Overlay layer 2: top vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(26,10,16,0.6) 0%, transparent 30%)' }}
      />

      {/* Overlay layer 3: radial vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(26,10,16,0.4) 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-[#c8956c] font-bold mb-4"
        >
          Craft At Home
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#f5f0e8] tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          PREMIUM RECIPES
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="h-px bg-[#c8956c] mt-5 mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm text-white/60 max-w-md"
        >
          Barista-grade drinks you can recreate at home, each with a looping video preview.
        </motion.p>
      </div>
    </div>
  );
};

export default RecipeSectionHero;
