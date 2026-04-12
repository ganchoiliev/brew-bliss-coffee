
import React from 'react';
import { Coffee, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#150810] pt-32 pb-12 border-t border-[#F472B6]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-[#F472B6] rounded-lg flex items-center justify-center">
                <Coffee className="text-[#1a0a10] w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tighter text-white uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>BREW BLISS</span>
            </div>
            <p className="text-[#C9A0A0] font-light leading-relaxed mb-8">
              Crafting extraordinary coffee experiences from ethically sourced beans. Every sip, a moment of pure bliss.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#F472B6] hover:text-[#F472B6] transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Coffee",
              links: ["Single Origins", "Blends", "Espresso", "Decaf"]
            },
            {
              title: "Learn",
              links: ["Brewing Guides", "Our Story", "Farm Partners", "Blog"]
            },
            {
              title: "Support",
              links: ["Contact Us", "Shipping Info", "Returns", "FAQ"]
            }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#C9A0A0] hover:text-[#F472B6] transition-colors font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5 text-[#C9A0A0] text-sm">
          <p>&copy; 2026 Brew Bliss Coffee Co. All rights reserved.</p>
          <p>Brewed with love, one cup at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
