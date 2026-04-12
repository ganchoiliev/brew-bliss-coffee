
import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  'Ethiopian Yirgacheffe', 'Colombian Supremo', 'Sumatra Mandheling', 'Kenyan AA',
  'Costa Rica Tarrazú', 'Guatemala Antigua', 'Jamaica Blue', 'Panama Geisha',
  'Brazil Santos', 'Hawaiian Kona', 'Yemen Mocha', 'Java Estate'
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-20 border-y border-[#F472B6]/10 bg-[#150810] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#150810] via-transparent to-[#150810] z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-12 relative z-20">
        <div className="text-center">
          <p className="text-[#C9A0A0] text-sm font-bold uppercase tracking-[0.2em]">
            Single-origin beans from the world's finest regions
          </p>
        </div>
      </div>

      <div className="relative flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -3000] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 md:gap-32 items-center pr-20"
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F472B6]/30 to-[#F472B6]/10 hover:from-[#F472B6] hover:to-[#FB7185] transition-all cursor-default tracking-tighter uppercase"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
