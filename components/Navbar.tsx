
import React, { useState } from 'react';
import { Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isScrolled: boolean;
  userId: string | null;
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, userId, onLoginClick, onDashboardClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
        ? 'top-4 mx-4 md:mx-auto md:max-w-5xl rounded-full bg-[#1a0a10]/80 backdrop-blur-xl border border-[#F472B6]/10 shadow-[0_0_20px_rgba(244,114,182,0.1)]'
        : 'top-0 px-6 py-6 bg-transparent'
        }`}>
        <div className={`flex items-center justify-between ${isScrolled ? 'px-6 py-3' : 'max-w-7xl mx-auto'}`}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'
              } bg-[#F472B6] group-hover:rotate-12`}>
              <Coffee className={`text-[#1a0a10] transition-all ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'}`} />
            </div>
            <span className={`font-black tracking-tighter text-white transition-all ${isScrolled ? 'text-lg' : 'text-xl'
              }`} style={{ fontFamily: 'Playfair Display, serif' }}>BREW BLISS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Our Beans', 'Recipes', 'Brewing', 'Menu'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-[#C9A0A0] hover:text-[#F472B6] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F472B6] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {userId ? (
              <button
                onClick={onDashboardClick}
                className="text-sm font-medium text-[#C9A0A0] hover:text-[#F472B6] transition-colors relative group"
              >
                My Brews
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F472B6] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-sm font-medium text-[#C9A0A0] hover:text-[#F472B6] transition-colors relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F472B6] transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}

            <button className={`bg-[#F472B6] text-[#1a0a10] font-bold text-sm rounded-full hover:bg-[#FBCFE8] transition-all transform active:scale-95 ${isScrolled ? 'px-4 py-2' : 'px-6 py-2.5'
              }`}>
              Order Now
            </button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 relative z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div>
                <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full"></div>
                <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full"></div>
                <div className="w-6 h-0.5 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1a0a10]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {['Our Beans', 'Recipes', 'Brewing', 'Menu'].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={closeMobileMenu}
                  className="text-3xl font-bold text-white hover:text-[#F472B6] transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item}
                </motion.a>
              ))}

              {userId ? (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    onDashboardClick();
                    closeMobileMenu();
                  }}
                  className="text-3xl font-bold text-white hover:text-[#F472B6] transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  My Brews
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    onLoginClick();
                    closeMobileMenu();
                  }}
                  className="text-3xl font-bold text-white hover:text-[#F472B6] transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Login
                </motion.button>
              )}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={closeMobileMenu}
                className="mt-4 px-10 py-4 bg-[#F472B6] text-[#1a0a10] font-bold text-lg rounded-full hover:bg-[#FBCFE8] transition-all"
              >
                Order Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
