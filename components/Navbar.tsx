
import React from 'react';
import { Zap } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  userId: string | null;
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, userId, onLoginClick, onDashboardClick }) => {
  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
      ? 'top-4 mx-4 md:mx-auto md:max-w-5xl rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
      : 'top-0 px-6 py-6 bg-transparent'
      }`}>
      <div className={`flex items-center justify-between ${isScrolled ? 'px-6 py-3' : 'max-w-7xl mx-auto'}`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'
            } bg-[#BFF549] group-hover:rotate-12`}>
            <Zap className={`text-black transition-all ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'}`} fill="currentColor" />
          </div>
          <span className={`font-black tracking-tighter text-white transition-all ${isScrolled ? 'text-lg' : 'text-xl'
            }`}>VOLTFLOW</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Expertise', 'Process', 'Audit'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-[#99A1AF] hover:text-[#BFF549] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BFF549] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* Login/Dashboard button */}
          {userId ? (
            <button
              onClick={onDashboardClick}
              className="text-sm font-medium text-[#99A1AF] hover:text-[#BFF549] transition-colors relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BFF549] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-sm font-medium text-[#99A1AF] hover:text-[#BFF549] transition-colors relative group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BFF549] transition-all duration-300 group-hover:w-full"></span>
            </button>
          )}

          <button className={`bg-white text-black font-bold text-sm rounded-full hover:bg-[#BFF549] transition-all transform active:scale-95 ${isScrolled ? 'px-4 py-2' : 'px-6 py-2.5'
            }`}>
            Book Strategy
          </button>
        </div>

        <button className="md:hidden text-white p-1">
          <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full"></div>
          <div className="w-6 h-0.5 bg-white rounded-full"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
