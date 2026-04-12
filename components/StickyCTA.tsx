
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StickyCTAProps {
  isVisible: boolean;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 left-0 right-0 z-[60] flex justify-center pointer-events-none"
        >
          <div className="bg-[#2a1520] pointer-events-auto border border-[#F472B6]/20 rounded-full p-2 pl-8 flex items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="hidden md:block">
              <div className="text-white font-bold text-sm">Ready to taste bliss?</div>
              <div className="text-[#C9A0A0] text-xs">Limited roast batches available</div>
            </div>
            <button className="px-8 py-3 bg-[#F472B6] text-[#1a0a10] font-black rounded-full hover:bg-[#FBCFE8] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
              Order Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
