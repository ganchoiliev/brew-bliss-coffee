import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate, animate, useSpring } from 'framer-motion';
import { Coffee, Clock, Flame, ChefHat, X, ChevronRight, Sparkles, Star, ArrowRight } from 'lucide-react';

/* ─── recipe data ─── */
const recipes = [
  {
    id: 'latte',
    name: 'Classic Latte',
    tagline: 'Silky smooth, endlessly comforting',
    description: 'A velvety espresso drink where rich, dark-roasted coffee meets perfectly steamed milk, creating a harmonious balance of bold flavor and silky texture.',
    difficulty: 'Easy',
    time: '5 min',
    color: '#F472B6',
    colorDark: '#9D174D',
    emoji: '\u2615',
    ingredients: [
      '2 shots espresso (18 g fine ground)',
      '8 oz (240 ml) whole milk',
      'Optional: 1-2 tsp sugar or flavored syrup',
    ],
    steps: [
      'Pull a double shot of espresso into your mug.',
      'Steam milk to 150 \u00b0F (65 \u00b0C) until glossy with micro-foam.',
      'Pour steamed milk steadily into the espresso, holding back foam initially.',
      'Let the foam flow last for a thin 1 cm layer on top. Sweeten to taste.',
    ],
    notes: 'Smooth & creamy with caramel undertones and a velvety mouthfeel.',
    layers: ['#3c2415', '#6f4e37', '#d4a574', '#f5e6d3'],
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    tagline: 'Bold espresso, pillowy foam',
    description: 'The quintessential Italian morning ritual \u2014 equal parts espresso, steamed milk, and luxuriously thick foam, served in a petite cup for maximum intensity.',
    difficulty: 'Medium',
    time: '5 min',
    color: '#FB7185',
    colorDark: '#BE123C',
    emoji: '\u2615',
    ingredients: [
      '1 double shot espresso (18 g fine ground)',
      '4 oz (120 ml) whole milk (3.5% fat)',
      'Optional: cocoa powder or cinnamon for dusting',
    ],
    steps: [
      'Pull a double shot of espresso into a 5-6 oz cappuccino cup.',
      'Steam milk near the surface for 5 sec to build foam, then submerge to create a whirlpool. Heat to 155 \u00b0F.',
      'Milk should grow two-thirds in volume with thick, glossy foam.',
      'Pour steamed milk, finish with thick foam. Dust with cocoa.',
    ],
    notes: 'Bold & robust with a pronounced espresso bite and pillowy, cloud-like foam.',
    layers: ['#2a1810', '#6f4e37', '#c49a6c', '#fffdf5'],
  },
  {
    id: 'mocha',
    name: 'Caf\u00e9 Mocha',
    tagline: 'Chocolate meets espresso indulgence',
    description: 'An indulgent marriage of rich espresso and dark chocolate, crowned with whipped cream \u2014 the elegant answer to every chocolate lover\u2019s coffee craving.',
    difficulty: 'Easy',
    time: '7 min',
    color: '#A855F7',
    colorDark: '#6B21A8',
    emoji: '\ud83c\udf6b',
    ingredients: [
      '2 shots espresso (18 g fine ground)',
      '1 tbsp unsweetened cocoa powder',
      '1 tbsp sugar',
      '6 oz (180 ml) whole milk',
      'Whipped cream & dark chocolate shavings',
    ],
    steps: [
      'Combine cocoa, sugar, and vanilla in a mug. Pull espresso directly over and stir until smooth.',
      'Steam 6 oz milk to 155 \u00b0F (68 \u00b0C) until creamy.',
      'Pour steamed milk gently into the chocolate-espresso base.',
      'Top with whipped cream and shaved dark chocolate.',
    ],
    notes: 'Rich & decadent \u2014 bittersweet chocolate-coffee complexity with a luxurious finish.',
    layers: ['#1a0f0a', '#4a2c1a', '#6f4e37', '#f5e6d3'],
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    tagline: 'Layered sweet and bold perfection',
    description: 'A layered masterpiece of vanilla-kissed steamed milk, bold espresso, and a golden ribbon of caramel \u2014 as beautiful to look at as it is to drink.',
    difficulty: 'Medium',
    time: '10 min',
    color: '#F59E0B',
    colorDark: '#B45309',
    emoji: '\ud83c\udf6f',
    ingredients: [
      '2 shots espresso',
      '2 tbsp caramel sauce (divided)',
      '6 oz (180 ml) whole milk',
      '1 tbsp vanilla syrup',
    ],
    steps: [
      'Swirl 1 tbsp caramel and vanilla syrup in the bottom of a mug.',
      'Steam milk to 155 \u00b0F with thin micro-foam. Pour over the caramel-vanilla base.',
      'Pull a double espresso and slowly pour through the center of the milk foam to "mark" it.',
      'Spoon foam on top and drizzle remaining caramel in a cross-hatch pattern.',
    ],
    notes: 'Sweet & buttery \u2014 each sip blends differently, shifting from creamy-sweet to boldly roasted.',
    layers: ['#c68e3c', '#e8b86d', '#f5deb3', '#fffdf5'],
  },
  {
    id: 'affogato',
    name: 'Affogato',
    tagline: 'Where coffee becomes dessert',
    description: 'The simplest form of Italian indulgence \u2014 a scoop of velvety gelato "drowned" in a shot of freshly pulled espresso, blurring the line between dessert and coffee.',
    difficulty: 'Easy',
    time: '3 min',
    color: '#EC4899',
    colorDark: '#9D174D',
    emoji: '\ud83c\udf68',
    ingredients: [
      '2 scoops vanilla gelato or ice cream',
      '1 shot freshly brewed espresso (hot)',
      'Optional: splash of amaretto liqueur',
      'Dark chocolate shavings for garnish',
    ],
    steps: [
      'Place two generous scoops of vanilla gelato into a clear glass.',
      'Pull a single shot of fresh, hot espresso immediately before serving.',
      'Pour the hot espresso directly over the gelato at the table.',
      'Garnish with chocolate shavings. Serve immediately with a spoon.',
    ],
    notes: 'Dramatic interplay of hot & cold \u2014 bitter espresso meets sweet, melting cream.',
    layers: ['#3c2415', '#6f4e37', '#f5e6d3', '#fffff0'],
  },
  {
    id: 'iced-vanilla',
    name: 'Iced Vanilla Latte',
    tagline: 'Cool, refreshing, effortlessly smooth',
    description: 'A refreshing, sunlit take on the classic latte \u2014 smooth espresso poured over ice with homemade vanilla syrup and cold milk for a drink that is effortlessly cool.',
    difficulty: 'Easy',
    time: '5 min',
    color: '#06B6D4',
    colorDark: '#0E7490',
    emoji: '\ud83e\uddca',
    ingredients: [
      '2 shots espresso (cooled slightly)',
      '2 tbsp vanilla syrup',
      '6 oz (180 ml) cold milk',
      'Ice cubes (or frozen coffee cubes)',
    ],
    steps: [
      'Add vanilla syrup to a tall glass. Pour in espresso and stir.',
      'Fill the glass generously with ice cubes.',
      'Pour cold milk over the ice to fill the glass.',
      'Stir gently and serve with a straw.',
    ],
    notes: 'Crisp & clean \u2014 aromatic vanilla sweetness with a smooth, refreshing finish.',
    layers: ['#3c2415', '#c49a6c', '#e8ddd3', '#f0f9ff'],
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    tagline: 'The barista\u2019s drink of choice',
    description: 'A concentrated, velvet-textured espresso experience where paper-thin micro-foam merges seamlessly with a bold double ristretto, creating liquid silk.',
    difficulty: 'Advanced',
    time: '5 min',
    color: '#8B5CF6',
    colorDark: '#5B21B6',
    emoji: '\ud83e\udea8',
    ingredients: [
      '1 double ristretto (18-19 g fine ground)',
      '5 oz (150 ml) cold whole milk',
      'No sugar \u2014 micro-foam provides natural sweetness',
    ],
    steps: [
      'Pull a double ristretto \u2014 shorter, more concentrated than a standard shot.',
      'Steam milk, introducing air for only 3-5 sec to create paper-thin micro-foam. Heat to 145 \u00b0F.',
      'Milk should be paint-like and glossy with zero visible bubbles.',
      'Pour from low height in a steady stream. Finish with a small white dot.',
    ],
    notes: 'Intensely coffee-forward with a silk-like mouthfeel. Rich, syrupy, and espresso-dominant.',
    layers: ['#2a1810', '#5a3d2b', '#d4a574', '#f5efe8'],
  },
  {
    id: 'rose-latte',
    name: 'Rose Latte',
    tagline: 'A blush-pink floral fantasy',
    description: 'Delicate rosewater and warm vanilla swirl through espresso and naturally tinted milk, creating a drink as enchanting to behold as it is to sip.',
    difficulty: 'Medium',
    time: '8 min',
    color: '#F472B6',
    colorDark: '#9D174D',
    emoji: '\ud83c\udf39',
    ingredients: [
      '1 double shot espresso',
      '6 oz (180 ml) oat or whole milk',
      '2 tsp rosewater',
      '\u00bd tsp beetroot powder (for natural pink)',
      '1-2 tbsp maple syrup',
      'Dried rose petals for garnish',
    ],
    steps: [
      'Pull a double shot of espresso and set aside.',
      'Warm milk in a saucepan. Whisk in beetroot powder until vibrant pink.',
      'Remove from heat. Stir in rosewater, maple syrup, and vanilla. Froth until creamy.',
      'Pour pink milk over espresso. Spoon foam on top. Garnish with rose petals.',
    ],
    notes: 'Ethereal & floral \u2014 perfumed rosewater sweetness with warm vanilla and bold espresso.',
    layers: ['#3c2415', '#8b4060', '#f472b6', '#fce4ec'],
  },
];

/* ─── animated border gradient ─── */
const AnimatedBorder: React.FC<{ color: string; hovered: boolean }> = ({ color, hovered }) => (
  <motion.div
    className="absolute -inset-[1px] rounded-[32px] overflow-hidden -z-10"
    initial={false}
    animate={{ opacity: hovered ? 1 : 0 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color} 50%, transparent 90%, ${color})`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />
    <div className="absolute inset-[1px] rounded-[31px] bg-[#1a0a10]" />
  </motion.div>
);

/* ─── shimmer overlay ─── */
const ShimmerOverlay: React.FC<{ color: string }> = ({ color }) => (
  <motion.div
    className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none z-20"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
  >
    <motion.div
      className="absolute -top-full -left-full w-[200%] h-[200%]"
      style={{
        background: `linear-gradient(115deg, transparent 40%, ${color}15 45%, ${color}25 50%, ${color}15 55%, transparent 60%)`,
      }}
      animate={{
        x: ['-100%', '100%'],
        y: ['-100%', '100%'],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeInOut',
      }}
    />
  </motion.div>
);

/* ─── floating particles around card ─── */
const FloatingParticles: React.FC<{ color: string; active: boolean }> = ({ color, active }) => {
  const particles = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: i * 0.3,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      {active && particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: [0, -40 - Math.random() * 30],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  );
};

/* ─── 3D tilt card (upgraded) ─── */
const RecipeCard: React.FC<{ recipe: typeof recipes[0]; onSelect: () => void; index: number }> = ({ recipe, onSelect, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, (v) => {
    if (!ref.current) return 0;
    const r = ref.current.getBoundingClientRect();
    return -(v - r.top - r.height / 2) / 18;
  });
  const rotateY = useTransform(mx, (v) => {
    if (!ref.current) return 0;
    const r = ref.current.getBoundingClientRect();
    return (v - r.left - r.width / 2) / 18;
  });

  // Glare effect following mouse
  const glareX = useTransform(mx, (v) => {
    if (!ref.current) return 50;
    const r = ref.current.getBoundingClientRect();
    return ((v - r.left) / r.width) * 100;
  });
  const glareY = useTransform(my, (v) => {
    if (!ref.current) return 50;
    const r = ref.current.getBoundingClientRect();
    return ((v - r.top) / r.height) * 100;
  });
  const glareOpacity = useTransform(
    [rotateX, rotateY],
    ([rx, ry]: number[]) => Math.min(Math.sqrt(rx * rx + ry * ry) / 25, 0.15)
  );
  const glareGradient = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`;

  return (
    <div className="[perspective:800px]">
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          animate(mx, e.clientX, { duration: 0.05 });
          animate(my, e.clientY, { duration: 0.05 });
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          animate(mx, 0, { type: 'spring', stiffness: 300, damping: 20 });
          animate(my, 0, { type: 'spring', stiffness: 300, damping: 20 });
        }}
        onClick={onSelect}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.04, y: -8 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative w-full h-[440px] rounded-[32px] cursor-pointer group"
      >
        {/* Animated border */}
        <AnimatedBorder color={recipe.color} hovered={hovered} />

        {/* Outer glow on hover */}
        <motion.div
          className="absolute -inset-3 rounded-[40px] -z-20 blur-2xl"
          style={{ backgroundColor: recipe.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Glass card body */}
        <div className="absolute inset-0 rounded-[32px] border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
          {/* Top edge shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          {/* Left edge shine */}
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/15 via-transparent to-transparent" />

          {/* Shimmer effect */}
          <ShimmerOverlay color={recipe.color} />

          {/* Glare overlay */}
          <motion.div
            className="absolute inset-0 rounded-[32px] pointer-events-none z-10"
            style={{ backgroundImage: glareGradient }}
          />

          {/* Coffee cup illustration area */}
          <div className="relative h-52 flex items-center justify-center overflow-hidden">
            {/* Animated ambient glow */}
            <motion.div
              className="absolute w-52 h-52 rounded-full blur-[60px]"
              style={{ backgroundColor: recipe.color }}
              animate={{
                opacity: hovered ? [0.25, 0.4, 0.25] : [0.1, 0.15, 0.1],
                scale: hovered ? [1, 1.15, 1] : [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Secondary glow */}
            <motion.div
              className="absolute w-32 h-32 rounded-full blur-[40px] -translate-x-8 translate-y-4"
              style={{ backgroundColor: recipe.colorDark }}
              animate={{ opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* 3D cup — parallax depth layers */}
            <div className="relative" style={{ transform: 'translateZ(40px)' }}>
              {/* Shadow under cup */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 rounded-[50%] bg-black/40 blur-sm"
                animate={{ width: hovered ? 28 * 4 : 24 * 4, opacity: hovered ? 0.5 : 0.3 }}
                transition={{ duration: 0.3 }}
              />

              {/* Saucer */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-5 rounded-[50%]"
                style={{ background: `linear-gradient(135deg, ${recipe.layers[2]}, ${recipe.layers[1]})`, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                animate={{ y: hovered ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />

              {/* Cup body */}
              <motion.div
                className="relative w-24 h-[72px] rounded-b-[32px] overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${recipe.layers[3]} 0%, ${recipe.layers[2]} 40%, ${recipe.layers[1]} 100%)`,
                  boxShadow: `inset -6px -4px 12px rgba(0,0,0,0.2), inset 3px 3px 8px rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.3)`,
                }}
                animate={{ y: hovered ? -4 : 0, rotateZ: hovered ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Liquid with wave animation */}
                <motion.div
                  className="absolute bottom-0 w-full"
                  style={{ backgroundColor: recipe.layers[0] }}
                  animate={{
                    height: ['58%', '64%', '58%'],
                    borderRadius: ['0 0 32px 32px', '4px 8px 32px 32px', '0 0 32px 32px'],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Crema layer */}
                <motion.div
                  className="absolute w-full h-[6px] rounded-[50%]"
                  style={{ bottom: '56%', background: `linear-gradient(90deg, ${recipe.layers[1]}, ${recipe.layers[2]}, ${recipe.layers[1]})` }}
                  animate={{ bottom: ['56%', '62%', '56%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Specular highlight on cup */}
                <div className="absolute top-2 left-2 w-3 h-10 bg-white/10 rounded-full blur-[2px] rotate-12" />
              </motion.div>

              {/* Cup handle with depth */}
              <motion.div
                className="absolute right-[-16px] top-2 w-5 h-10 rounded-r-full border-[3.5px] border-l-0"
                style={{
                  borderColor: recipe.layers[2],
                  boxShadow: `2px 2px 4px rgba(0,0,0,0.2)`,
                }}
                animate={{ y: hovered ? -4 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />

              {/* Steam wisps — more organic */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${20 + i * 18}%`,
                    top: -8,
                    width: 3 + i % 2,
                    height: 14 + i * 3,
                    background: `linear-gradient(to top, rgba(255,255,255,0.12), transparent)`,
                    filter: 'blur(2px)',
                  }}
                  animate={{
                    y: [0, -24 - i * 6, -40 - i * 8],
                    opacity: [0, 0.7, 0],
                    scaleX: [1, 1.8, 2.5],
                    x: [0, (i % 2 ? 4 : -4), (i % 2 ? 8 : -8)],
                  }}
                  transition={{
                    duration: 2.2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

            {/* Floating emoji with bounce */}
            <motion.span
              className="absolute top-3 right-5 text-3xl select-none"
              style={{ transform: 'translateZ(60px)' }}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 8, -3, 0],
                scale: hovered ? [1.1, 1.2, 1.1] : [1, 1.05, 1],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {recipe.emoji}
            </motion.span>

            {/* Difficulty star badge */}
            <motion.div
              className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/10"
              style={{ backgroundColor: `${recipe.color}20`, color: recipe.color }}
              animate={{ scale: hovered ? 1.05 : 1 }}
            >
              <Star className="w-2.5 h-2.5 fill-current" />
              {recipe.difficulty}
            </motion.div>
          </div>

          {/* Content area */}
          <div className="px-6 pb-6 relative">
            {/* Divider line */}
            <motion.div
              className="h-px mb-5"
              style={{ background: `linear-gradient(90deg, transparent, ${recipe.color}40, transparent)` }}
              animate={{ opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            />

            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
              {recipe.name}
            </h3>
            <p className="text-sm text-[#C9A0A0] mb-4 italic leading-relaxed">{recipe.tagline}</p>

            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/5" style={{ backgroundColor: `${recipe.color}12`, color: recipe.color }}>
                <Clock className="w-3 h-3" /> {recipe.time}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/5" style={{ backgroundColor: `${recipe.color}12`, color: recipe.color }}>
                <Coffee className="w-3 h-3" /> {recipe.ingredients.length} ingredients
              </span>
            </div>

            {/* CTA button */}
            <motion.div
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: recipe.color }}
              animate={{
                x: hovered ? 4 : 0,
                opacity: hovered ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            >
              View Full Recipe
              <motion.div animate={{ x: hovered ? [0, 4, 0] : 0 }} transition={{ duration: 1, repeat: Infinity }}>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating particles */}
        <FloatingParticles color={recipe.color} active={hovered} />
      </motion.div>
    </div>
  );
};

/* ─── recipe detail modal ─── */
const RecipeModal: React.FC<{ recipe: typeof recipes[0]; onClose: () => void }> = ({ recipe, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (i: number) => {
    setActiveStep(i);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const progress = (completedSteps.size / recipe.steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#1a0a10]/85 backdrop-blur-lg" />

      <motion.div
        initial={{ scale: 0.9, y: 50, rotateX: 5 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[40px] border border-white/10 bg-[#1a0a10]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Header glow */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: recipe.color }}
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Progress bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-white/5 rounded-t-[40px] overflow-hidden z-20">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: recipe.color }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </div>

        {/* Close button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Top Section */}
        <div className="relative p-10 pb-6">
          <div className="flex items-start gap-6">
            <motion.div
              animate={{ rotate: [0, 8, -3, 0], y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl shrink-0 drop-shadow-lg"
            >
              {recipe.emoji}
            </motion.div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: recipe.color }}>
                Premium Recipe
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {recipe.name}
              </h2>
              <p className="text-lg text-[#C9A0A0] font-light leading-relaxed">{recipe.description}</p>
              <div className="flex items-center gap-3 mt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border" style={{ backgroundColor: `${recipe.color}10`, color: recipe.color, borderColor: `${recipe.color}30` }}>
                  <Clock className="w-4 h-4" /> {recipe.time}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border" style={{ backgroundColor: `${recipe.color}10`, color: recipe.color, borderColor: `${recipe.color}30` }}>
                  <Flame className="w-4 h-4" /> {recipe.difficulty}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border" style={{ backgroundColor: `${recipe.color}10`, color: recipe.color, borderColor: `${recipe.color}30` }}>
                  <Sparkles className="w-4 h-4" /> {completedSteps.size}/{recipe.steps.length} done
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-10 pb-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-5" style={{ color: recipe.color }}>
              <ChefHat className="w-4 h-4" /> Ingredients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: `${recipe.color}20`, color: recipe.color }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-white/80">{ing}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="px-10 pb-10">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6" style={{ color: recipe.color }}>
            <Sparkles className="w-4 h-4" /> Step by Step
          </h3>

          <div className="space-y-3">
            {recipe.steps.map((step, i) => {
              const isActive = activeStep === i;
              const isDone = completedSteps.has(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  onClick={() => toggleStep(i)}
                  whileHover={{ x: 4 }}
                  className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-white/[0.06] border-white/20 shadow-lg'
                      : isDone
                      ? 'bg-white/[0.03] border-white/10'
                      : 'bg-white/[0.015] border-white/5 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeStep"
                      className="absolute -inset-px rounded-2xl border-2 -z-10"
                      style={{ borderColor: `${recipe.color}50` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={isDone ? { scale: [1, 1.2, 1] } : {}}
                      className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black transition-all ${
                        isDone
                          ? 'text-[#1a0a10] shadow-lg'
                          : isActive
                          ? 'text-[#1a0a10]'
                          : 'text-white/40 bg-white/5'
                      }`}
                      style={(isDone || isActive) ? { backgroundColor: recipe.color } : {}}
                    >
                      {isDone ? '\u2713' : i + 1}
                    </motion.div>
                    <p className={`text-sm leading-relaxed pt-1.5 transition-colors ${
                      isActive ? 'text-white' : isDone ? 'text-white/60 line-through' : 'text-white/50'
                    }`}>
                      {step}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tasting Notes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none" style={{ backgroundColor: recipe.color }} />
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: recipe.color }}>Tasting Notes</h4>
            <p className="text-white/70 text-base italic leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              "{recipe.notes}"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── main section ─── */
const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const difficulties = ['All', 'Easy', 'Medium', 'Advanced'];
  const filtered = filter === 'All' ? recipes : recipes.filter((r) => r.difficulty === filter);

  return (
    <section id="recipes" className="py-32 bg-[#1a0a10] relative overflow-hidden">
      {/* Background accents */}
      <motion.div
        className="absolute top-20 left-0 w-[700px] h-[700px] bg-[#F472B6]/[0.03] rounded-full blur-[180px] pointer-events-none"
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-[#8B5CF6]/[0.03] rounded-full blur-[180px] pointer-events-none"
        animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[#F472B6] font-bold tracking-widest uppercase mb-6 text-sm px-5 py-2 rounded-full border border-[#F472B6]/20 bg-[#F472B6]/5"
          >
            <Coffee className="w-4 h-4" />
            Craft At Home
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            PREMIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#FB7185]">RECIPES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#C9A0A0] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Interactive barista-grade recipes you can recreate at home. Hover to explore, tap to unlock the full experience.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-16 flex-wrap"
        >
          {difficulties.map((d) => (
            <motion.button
              key={d}
              onClick={() => setFilter(d)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === d
                  ? 'bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-[#1a0a10] shadow-[0_4px_20px_rgba(244,114,182,0.3)]'
                  : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08] border border-white/10 hover:border-white/20'
              }`}
            >
              {d}
            </motion.button>
          ))}
        </motion.div>

        {/* Recipe Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((recipe, i) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.05 }}
              >
                <RecipeCard recipe={recipe} onSelect={() => setSelectedRecipe(recipe)} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Recipes;
