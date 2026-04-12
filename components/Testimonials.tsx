
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sophia Laurent",
    role: "Coffee Enthusiast",
    content: "The Ethiopian Yirgacheffe changed my mornings forever. Notes of blueberry and jasmine that dance on your tongue. Pure magic in a cup.",
    avatar: "https://picsum.photos/100/100?random=10",
    rating: 5
  },
  {
    name: "Marco Delgado",
    role: "Cafe Owner, Portland",
    content: "We switched our entire shop to Brew Bliss beans. Customer satisfaction went through the roof. The quality is simply unmatched.",
    avatar: "https://picsum.photos/100/100?random=11",
    rating: 5
  },
  {
    name: "Aisha Patel",
    role: "Food & Drink Blogger",
    content: "I've reviewed hundreds of coffee brands. Brew Bliss is in a league of its own. The freshness, the complexity, the pink packaging — chef's kiss.",
    avatar: "https://picsum.photos/100/100?random=12",
    rating: 5
  },
  {
    name: "James Whitfield",
    role: "Morning Ritual Devotee",
    content: "The subscription is worth every penny. Waking up to a new single-origin each month feels like Christmas morning. Absolutely obsessed.",
    avatar: "https://picsum.photos/100/100?random=13",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="testimonials" className="py-32 bg-[#1a0a10] overflow-hidden" ref={containerRef}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1a0a10] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1a0a10] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8 px-6 md:px-20 py-4"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            dragElastic={0.1}
          >
            {testimonials.concat(testimonials).map((t, i) => (
              <div
                key={i}
                className="w-[350px] md:w-[500px] flex-shrink-0 bg-white/[0.03] border border-white/5 p-10 rounded-[40px] hover:bg-white/[0.05] hover:border-[#F472B6]/20 transition-all duration-300 group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F472B6] fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl font-light leading-relaxed mb-8 text-white group-hover:text-white/90" style={{ fontFamily: 'Playfair Display, serif' }}>
                  "{t.content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-[#F472B6]/20"
                  />
                  <div>
                    <div className="font-bold text-lg text-white">{t.name}</div>
                    <div className="text-[#F472B6] text-sm uppercase tracking-widest font-bold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
