
import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Check } from 'lucide-react';

const pricingPlans = [
  {
    name: "The Morning Cup",
    subtitle: "For casual sippers",
    price: "24",
    period: "/mo",
    features: [
      "1 bag of single-origin beans",
      "Monthly tasting notes card",
      "Basic brewing guide included",
      "Free shipping on all orders"
    ],
    highlight: false,
    color: "bg-[#FB7185]"
  },
  {
    name: "The Connoisseur",
    subtitle: "Most loved subscription",
    price: "49",
    period: "/mo",
    features: [
      "2 bags of premium single-origin",
      "Exclusive micro-lot access",
      "Personalized roast profile",
      "Brewing equipment discounts",
      "Monthly virtual cupping session"
    ],
    highlight: true,
    color: "bg-[#F472B6]"
  },
  {
    name: "The Aficionado",
    subtitle: "For true coffee lovers",
    price: "89",
    period: "/mo",
    features: [
      "4 bags including rare reserves",
      "First access to limited editions",
      "Personal coffee sommelier",
      "Quarterly equipment gift",
      "Private origin tour invites"
    ],
    highlight: false,
    color: "bg-[#E879A0]"
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="menu" className="py-32 bg-[#1a0a10] relative overflow-hidden overflow-x-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#F472B6]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            SUBSCRIBE TO <span className="text-[#F472B6]">BLISS</span>
          </motion.h2>
          <p className="text-[#C9A0A0] text-xl font-light max-w-2xl mx-auto px-6 md:px-0">
            Fresh-roasted beans delivered to your door. Cancel anytime, pure happiness always.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-10 rounded-[40px] border ${plan.highlight
                ? 'bg-white/[0.05] border-[#F472B6]/50 shadow-[0_0_50px_rgba(244,114,182,0.1)]'
                : 'bg-white/[0.02] border-white/5'
                } backdrop-blur-xl transition-all duration-300`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#F472B6] text-[#1a0a10] text-xs font-bold uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{plan.name}</h3>
                <p className="text-[#C9A0A0] text-sm">{plan.subtitle}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-sm align-top text-[#C9A0A0]">$</span>
                <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                <span className="text-[#C9A0A0] text-sm">{plan.period}</span>
              </div>

              <div className="space-y-5 mb-12 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-[#F472B6] text-[#1a0a10]' : 'bg-white/10 text-white'}`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-white/80 font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${plan.highlight
                ? 'bg-[#F472B6] text-[#1a0a10] hover:bg-[#FBCFE8]'
                : 'bg-white/10 text-white hover:bg-[#F472B6] hover:text-[#1a0a10]'
                }`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
