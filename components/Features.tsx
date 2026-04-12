
import React from 'react';
import { Flame, Droplets, Bean, Layers, ThermometerSun, ShieldCheck, Coffee, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  return (
    <section id="our-beans" className="py-32 bg-[#1a0a10] relative overflow-hidden overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F472B6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FB7185]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-[#F472B6] font-bold tracking-widest uppercase mb-4 text-sm"
            >
              Our Craft
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black tracking-tighter text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ARTISAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">PERFECTION.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#C9A0A0] max-w-lg font-light leading-relaxed"
          >
            Every cup tells a story. From bean to brew, we obsess over every detail to deliver an unforgettable experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          {/* Main Large Card */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-4 md:row-span-2 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/5 rounded-[40px] p-10 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F472B6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#F472B6] rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                <Flame className="w-8 h-8 text-[#1a0a10]" />
              </div>
              <h3 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Small-Batch <br />Roasting</h3>
              <p className="text-lg text-[#C9A0A0] max-w-md">
                Each batch is roasted to perfection in small quantities, ensuring peak flavor and aroma. Our master roasters bring out the unique character of every origin.
              </p>
            </div>

            <div className="relative mt-10 h-64 bg-[#0f0509]/60 rounded-3xl border border-[#F472B6]/5 overflow-hidden">
              {/* Mock Roast Profile Chart */}
              <div className="absolute bottom-0 left-0 right-0 h-full flex items-end gap-2 px-8 pb-8">
                {[30, 50, 65, 85, 95, 80, 60].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                    className="flex-1 bg-gradient-to-t from-[#F472B6]/20 to-[#F472B6] rounded-t-lg opacity-80"
                  />
                ))}
              </div>
              <div className="absolute top-4 left-8 text-xs text-[#C9A0A0] uppercase tracking-widest font-bold">Roast Profile</div>
            </div>
          </motion.div>

          {/* Secondary Card 1 */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-1 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex flex-col justify-center relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
              <ArrowUpRight className="w-8 h-8 text-[#F472B6]" />
            </div>
            <Droplets className="w-10 h-10 text-[#F472B6] mb-6" />
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Pour-Over Precision</h3>
            <p className="text-sm text-[#C9A0A0]">
              Water temperature, grind size, and bloom time perfected for each origin.
            </p>
          </motion.div>

          {/* Secondary Card 2 */}
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-1 bg-white/[0.03] border border-white/5 rounded-[40px] p-8 flex flex-col justify-center relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FB7185]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bean className="w-10 h-10 text-[#FB7185] mb-6" />
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Ethical Sourcing</h3>
            <p className="text-sm text-[#C9A0A0]">
              Direct trade with farmers. Fair wages, sustainable practices, incredible beans.
            </p>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
          <motion.div whileHover={{ y: -5 }} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
            <div className="p-3 bg-[#F472B6]/10 rounded-xl"><ThermometerSun className="w-6 h-6 text-[#F472B6]" /></div>
            <div><h4 className="font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Fresh Roasted</h4><p className="text-xs text-[#6b4f4f]">Roasted to order</p></div>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
            <div className="p-3 bg-[#FB7185]/10 rounded-xl"><Layers className="w-6 h-6 text-[#FB7185]" /></div>
            <div><h4 className="font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Tasting Notes</h4><p className="text-xs text-[#6b4f4f]">Complex flavors</p></div>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
            <div className="p-3 bg-[#FBCFE8]/10 rounded-xl"><Coffee className="w-6 h-6 text-[#FBCFE8]" /></div>
            <div><h4 className="font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Brewing Guides</h4><p className="text-xs text-[#6b4f4f]">Expert tips</p></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
