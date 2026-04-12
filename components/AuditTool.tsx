
import React, { useState } from 'react';
import { Loader2, CheckCircle2, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeConversion } from '../services/geminiService';
import { AuditResult } from '../types';

const AuditTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeConversion(input);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="brewing" className="relative py-40 bg-[#150810] overflow-hidden">
      {/* Volumetric Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#F472B6]/8 rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-[84px] font-black leading-[0.9] tracking-tighter mb-8 uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>
                AI BREW <span className="text-transparent border-white/20 [-webkit-text-stroke:1px_white]">TASTE</span> <br />
                <span className="text-[#F472B6]">ANALYZER</span>
              </h2>
              <p className="text-xl md:text-2xl text-[#C9A0A0] font-light max-w-3xl mx-auto">
                Tell us your flavor preferences or describe your ideal cup. Our AI sommelier crafts the perfect blend recommendation.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F472B6]/20 to-transparent blur-3xl opacity-20 -z-10" />

            <form onSubmit={handleAudit} className="bg-white/[0.03] border border-white/10 hover:border-[#F472B6]/20 p-2 md:p-3 rounded-[40px] flex flex-col md:flex-row gap-4 backdrop-blur-3xl shadow-2xl transition-all duration-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: I love fruity, bright coffees with a hint of chocolate..."
                className="flex-1 bg-transparent border-none rounded-[32px] px-8 py-6 text-white placeholder:text-white/30 focus:ring-0 outline-none text-xl focus:placeholder:text-white/50 transition-all"
              />
              <button
                disabled={isLoading}
                className="px-10 py-6 bg-[#F472B6] text-[#1a0a10] font-black rounded-[32px] flex items-center justify-center gap-3 hover:bg-[#FBCFE8] hover:scale-105 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-[0_0_40px_rgba(244,114,182,0.5)]"
              >
                {isLoading ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <>Find My Blend</>
                )}
              </button>
            </form>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 p-10 rounded-[40px] backdrop-blur-xl flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle
                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * result.score) / 100}
                        className="text-[#F472B6] transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black">{result.score}</span>
                      <span className="text-[10px] uppercase font-bold text-[#C9A0A0] tracking-widest">Match</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-[#F472B6]/10 text-[#F472B6] rounded-full text-xs font-bold uppercase tracking-widest">
                    <Coffee className="w-3 h-3" /> Perfect Match Found
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[40px] backdrop-blur-xl">
                    <h4 className="text-[#F472B6] font-bold uppercase text-xs tracking-widest mb-6">Tasting Profile</h4>
                    <p className="text-2xl text-white/90 font-light leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                      "{result.critique}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/10 p-6 rounded-[30px] flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-[#F472B6] shrink-0 mt-1" />
                        <span className="text-sm text-[#C9A0A0] leading-snug">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AuditTool;
