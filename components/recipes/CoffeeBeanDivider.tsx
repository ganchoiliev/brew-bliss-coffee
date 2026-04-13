import React from 'react';
import { motion } from 'framer-motion';

const Bean: React.FC = () => (
  <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="6" cy="9" rx="5.5" ry="8.5" />
    <path d="M6 1 C4 5, 8 13, 6 17" stroke="rgba(26,10,16,0.6)" strokeWidth="1.2" fill="none" />
  </svg>
);

const CoffeeBeanDivider: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, gap: 0 }}
    whileInView={{ opacity: 1, gap: 12 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex items-center justify-center py-8 text-[#c8956c]/40"
  >
    <Bean />
    <Bean />
    <Bean />
  </motion.div>
);

export default CoffeeBeanDivider;
