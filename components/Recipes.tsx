import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Coffee, Clock, Flame, ChefHat, X, ChevronRight, Sparkles } from 'lucide-react';

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
    emoji: '\u2615',
    ingredients: [
      '1 double shot espresso (18 g fine ground)',
      '4 oz (120 ml) whole milk (3.5% fat)',
      'Optional: cocoa powder or cinnamon for dusting',
    ],
    steps: [
      'Pull a double shot of espresso into a 5-6 oz cappuccino cup.',
      'Steam milk with the wand near the surface for 5 seconds to build foam, then submerge and create a whirlpool. Heat to 155 \u00b0F (68 \u00b0C).',
      'The milk should grow two-thirds in volume with thick, glossy foam.',
      'Pour steamed milk, finish with a generous spoon of thick foam. Dust with cocoa.',
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
    emoji: '\ud83c\udf6f',
    ingredients: [
      '2 shots espresso',
      '2 tbsp caramel sauce (divided)',
      '6 oz (180 ml) whole milk',
      '1 tbsp vanilla syrup',
    ],
    steps: [
      'Swirl 1 tbsp caramel and vanilla syrup in the bottom of a mug.',
      'Steam milk to 155 \u00b0F (68 \u00b0C) with thin micro-foam. Pour over the caramel-vanilla base.',
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
    emoji: '\ud83e\udea8',
    ingredients: [
      '1 double ristretto (18-19 g fine ground)',
      '5 oz (150 ml) cold whole milk',
      'No sugar \u2014 micro-foam provides natural sweetness',
    ],
    steps: [
      'Pull a double ristretto \u2014 shorter, more concentrated than a standard shot.',
      'Steam milk, introducing air for only 3-5 seconds to create paper-thin micro-foam. Heat to 145 \u00b0F (63 \u00b0C).',
      'The milk should be paint-like and glossy with zero visible bubbles.',
      'Pour from a low height in a steady stream. Finish with a small white dot on the surface.',
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

/* ─── 3D tilt card ─── */
const RecipeCard: React.FC<{ recipe: typeof recipes[0]; onSelect: () => void }> = ({ recipe, onSelect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, (v) => {
    if (!ref.current) return 0;
    const r = ref.current.getBoundingClientRect();
    return -(v - r.top - r.height / 2) / 25;
  });
  const rotateY = useTransform(mx, (v) => {
    if (!ref.current) return 0;
    const r = ref.current.getBoundingClientRect();
    return (v - r.left - r.width / 2) / 25;
  });

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          animate(mx, e.clientX, { duration: 0.08 });
          animate(my, e.clientY, { duration: 0.08 });
        }}
        onMouseLeave={() => {
          animate(mx, 0, { type: 'spring', stiffness: 200 });
          animate(my, 0, { type: 'spring', stiffness: 200 });
        }}
        onClick={onSelect}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative w-full h-[420px] rounded-[32px] cursor-pointer group"
      >
        {/* Glass card */}
        <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Top shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Coffee cup illustration */}
          <div className="relative h-56 flex items-center justify-center overflow-hidden">
            {/* Ambient glow */}
            <div
              className="absolute w-64 h-64 rounded-full blur-[80px] opacity-20"
              style={{ backgroundColor: recipe.color }}
            />

            {/* Cup layers */}
            <div className="relative" style={{ transform: 'translateZ(30px)' }}>
              {/* Saucer */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-4 rounded-[50%] opacity-60" style={{ backgroundColor: recipe.layers[1] }} />

              {/* Cup body */}
              <div className="relative w-20 h-16 rounded-b-[28px] overflow-hidden shadow-lg" style={{ background: `linear-gradient(135deg, ${recipe.layers[2]}, ${recipe.layers[1]})` }}>
                {/* Liquid */}
                <motion.div
                  animate={{ height: ['55%', '60%', '55%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-0 w-full"
                  style={{ backgroundColor: recipe.layers[0] }}
                />
                {/* Crema */}
                <div className="absolute w-full h-2 rounded-[50%] opacity-80" style={{ bottom: '53%', backgroundColor: recipe.layers[1] }} />
              </div>

              {/* Cup handle */}
              <div className="absolute right-[-14px] top-2 w-4 h-8 rounded-r-full border-[3px] border-l-0" style={{ borderColor: recipe.layers[2] }} />

              {/* Steam wisps */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 rounded-full"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: -12,
                    height: 16,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    filter: 'blur(2px)',
                  }}
                  animate={{
                    y: [0, -18, -30],
                    opacity: [0, 0.6, 0],
                    scaleX: [1, 1.5, 2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

            {/* Floating emoji */}
            <motion.span
              className="absolute top-4 right-6 text-3xl"
              style={{ transform: 'translateZ(50px)' }}
              animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {recipe.emoji}
            </motion.span>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {recipe.name}
            </h3>
            <p className="text-sm text-[#C9A0A0] mb-4 italic">{recipe.tagline}</p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${recipe.color}20`, color: recipe.color }}>
                <Clock className="w-3 h-3" /> {recipe.time}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${recipe.color}20`, color: recipe.color }}>
                <Flame className="w-3 h-3" /> {recipe.difficulty}
              </span>
            </div>

            {/* View recipe hint */}
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: recipe.color }}>
              View Recipe <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <motion.div
          className="absolute -inset-1 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          style={{ backgroundColor: recipe.color }}
        />
      </motion.div>
    </div>
  );
};

/* ─── recipe detail modal ─── */
const RecipeModal: React.FC<{ recipe: typeof recipes[0]; onClose: () => void }> = ({ recipe, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1a0a10]/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[40px] border border-white/10 bg-[#1a0a10]/95 backdrop-blur-xl shadow-2xl"
      >
        {/* Header glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: recipe.color }} />

        {/* Close button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Top Section */}
        <div className="relative p-10 pb-6">
          <div className="flex items-start gap-6">
            {/* Emoji */}
            <motion.div
              animate={{ rotate: [0, 5, 0], y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl shrink-0"
            >
              {recipe.emoji}
            </motion.div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: recipe.color }}>
                Premium Recipe
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {recipe.name}
              </h2>
              <p className="text-lg text-[#C9A0A0] font-light">{recipe.description}</p>

              <div className="flex items-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full" style={{ backgroundColor: `${recipe.color}15`, color: recipe.color }}>
                  <Clock className="w-4 h-4" /> {recipe.time}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full" style={{ backgroundColor: `${recipe.color}15`, color: recipe.color }}>
                  <Flame className="w-4 h-4" /> {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-10 pb-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-4" style={{ color: recipe.color }}>
              <ChefHat className="w-4 h-4" /> Ingredients
            </h3>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ing, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 text-white/80"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: recipe.color }} />
                  <span className="text-sm">{ing}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="px-10 pb-10">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6" style={{ color: recipe.color }}>
            <Sparkles className="w-4 h-4" /> Step by Step
          </h3>

          <div className="space-y-3">
            {recipe.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                  activeStep === i
                    ? 'bg-white/[0.06] border-white/20 shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                {/* Active glow */}
                {activeStep === i && (
                  <motion.div
                    layoutId="stepGlow"
                    className="absolute -inset-px rounded-2xl opacity-20 -z-10"
                    style={{ backgroundColor: recipe.color }}
                  />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors ${
                      activeStep === i ? 'text-[#1a0a10]' : 'text-white/60 bg-white/10'
                    }`}
                    style={activeStep === i ? { backgroundColor: recipe.color } : {}}
                  >
                    {i + 1}
                  </div>
                  <p className={`text-sm leading-relaxed transition-colors ${activeStep === i ? 'text-white' : 'text-white/50'}`}>
                    {step}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tasting Notes */}
          <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: recipe.color }}>Tasting Notes</h4>
            <p className="text-white/70 text-sm italic leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              "{recipe.notes}"
            </p>
          </div>
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
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#F472B6]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block text-[#F472B6] font-bold tracking-widest uppercase mb-4 text-sm"
          >
            Craft At Home
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            PREMIUM <span className="text-[#F472B6]">RECIPES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#C9A0A0] max-w-2xl mx-auto font-light"
          >
            Interactive barista-grade recipes you can recreate at home. Tap any card to explore.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-16 flex-wrap"
        >
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === d
                  ? 'bg-[#F472B6] text-[#1a0a10]'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </motion.div>

        {/* Recipe Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <RecipeCard recipe={recipe} onSelect={() => setSelectedRecipe(recipe)} />
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
