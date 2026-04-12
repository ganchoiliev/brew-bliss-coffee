
import React, { useRef, useState, useMemo } from 'react';
import { motion, useTransform, useSpring, useScroll } from 'framer-motion';
import { ArrowRight, Coffee } from 'lucide-react';
import GradientMenuInline from './ui/gradient-menu-inline';

const SteamParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 15,
      delay: Math.random() * -15,
      opacity: 0.05 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#F472B6]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            y: [0, -30, 0],
            x: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const mouseXSpring = useSpring(mousePosition.x, springConfig);
  const mouseYSpring = useSpring(mousePosition.y, springConfig);

  const textX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a0a10] pt-20"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-[#1a0a10]/60" />
        {/* Gradient edges for seamless blend */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(26,10,16,0.85)_70%,rgba(26,10,16,1)_100%)]" />
      </div>

      <SteamParticles />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a0a10] to-transparent z-[5] pointer-events-none" />

      <motion.div
        style={{ x: textX, y: textY, rotateX, rotateY, perspective: 1000 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#F472B6]/30 bg-[#F472B6]/5 text-[#F472B6] text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            <Coffee className="w-3 h-3" />
            Handcrafted With Love
          </span>

          <h1 className="text-6xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-8 text-white [text-shadow:_0_2px_40px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Playfair Display, serif' }}>
            BEAUTIFUL <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              DELICIOUS
            </span> <br />
            <span className="text-[#F472B6]">COFFEE.</span>
          </h1>

          <p className="text-lg md:text-2xl text-[#C9A0A0] max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-tight">
            From ethically sourced beans to your perfect cup. We craft extraordinary coffee experiences that awaken your senses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative group w-auto">
              <div className="absolute inset-0 bg-[#F472B6] rounded-full blur-[20px] opacity-40 group-hover:opacity-60 transition-all duration-300 transform group-hover:scale-110" />
              <button className="relative px-12 py-6 bg-[#F472B6] text-[#1a0a10] font-black text-xl rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-95 z-10 flex items-center gap-3 whitespace-nowrap">
                Explore Blends
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <button className="px-10 py-6 text-white font-bold text-lg rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 backdrop-blur-sm whitespace-nowrap">
              Our Story
            </button>
          </div>

          {/* Gradient Menu Buttons */}
          <GradientMenuInline />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
