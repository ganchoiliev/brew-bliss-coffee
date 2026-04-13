import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, ChefHat, X, Sparkles } from 'lucide-react';
import RecipeSectionHero from './recipes/RecipeSectionHero';
import CoffeeBeanDivider from './recipes/CoffeeBeanDivider';
import RecipeGrid from './recipes/RecipeGrid';
import type { RecipeCardData } from './recipes/RecipeCard';

/* ─── full recipe data (card data + detailed content) ─── */
const recipes = [
  {
    id: 'latte',
    name: 'Classic Latte',
    tagline: 'Silky smooth, endlessly comforting',
    description: 'A velvety espresso drink where rich, dark-roasted coffee meets perfectly steamed milk, creating a harmonious balance of bold flavor and silky texture.',
    difficulty: 'Easy' as const,
    time: '5 min',
    color: '#F472B6',
    videoName: 'classic-latte',
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
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    tagline: 'Bold espresso, pillowy foam',
    description: 'The quintessential Italian morning ritual \u2014 equal parts espresso, steamed milk, and luxuriously thick foam.',
    difficulty: 'Medium' as const,
    time: '5 min',
    color: '#FB7185',
    videoName: 'cappuccino',
    ingredients: [
      '1 double shot espresso (18 g fine ground)',
      '4 oz (120 ml) whole milk (3.5% fat)',
      'Optional: cocoa powder or cinnamon for dusting',
    ],
    steps: [
      'Pull a double shot of espresso into a 5-6 oz cappuccino cup.',
      'Steam milk near the surface for 5 sec to build foam, then submerge to whirlpool. Heat to 155 \u00b0F.',
      'Milk should grow two-thirds in volume with thick, glossy foam.',
      'Pour steamed milk, finish with thick foam. Dust with cocoa.',
    ],
    notes: 'Bold & robust with a pronounced espresso bite and pillowy, cloud-like foam.',
  },
  {
    id: 'mocha',
    name: 'Caf\u00e9 Mocha',
    tagline: 'Chocolate meets espresso indulgence',
    description: 'An indulgent marriage of rich espresso and dark chocolate, crowned with whipped cream.',
    difficulty: 'Easy' as const,
    time: '7 min',
    color: '#A855F7',
    videoName: 'cafe-mocha',
    ingredients: [
      '2 shots espresso (18 g fine ground)',
      '1 tbsp unsweetened cocoa powder',
      '1 tbsp sugar',
      '6 oz (180 ml) whole milk',
      'Whipped cream & dark chocolate shavings',
    ],
    steps: [
      'Combine cocoa, sugar, and vanilla in a mug. Pull espresso over and stir smooth.',
      'Steam 6 oz milk to 155 \u00b0F until creamy.',
      'Pour steamed milk gently into the chocolate-espresso base.',
      'Top with whipped cream and shaved dark chocolate.',
    ],
    notes: 'Rich & decadent \u2014 bittersweet chocolate-coffee complexity with a luxurious finish.',
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    tagline: 'Layered sweet and bold perfection',
    description: 'A layered masterpiece of vanilla-kissed steamed milk, bold espresso, and golden caramel.',
    difficulty: 'Medium' as const,
    time: '10 min',
    color: '#F59E0B',
    videoName: 'caramel-macchiato',
    ingredients: [
      '2 shots espresso',
      '2 tbsp caramel sauce (divided)',
      '6 oz (180 ml) whole milk',
      '1 tbsp vanilla syrup',
    ],
    steps: [
      'Swirl 1 tbsp caramel and vanilla syrup in the bottom of a mug.',
      'Steam milk to 155 \u00b0F with thin micro-foam. Pour over the base.',
      'Pull espresso and slowly pour through the center of the milk foam.',
      'Spoon foam on top and drizzle caramel in a cross-hatch pattern.',
    ],
    notes: 'Sweet & buttery \u2014 each sip shifts from creamy-sweet to boldly roasted.',
  },
  {
    id: 'affogato',
    name: 'Affogato',
    tagline: 'Where coffee becomes dessert',
    description: 'Velvety gelato "drowned" in a shot of freshly pulled espresso, blurring the line between dessert and coffee.',
    difficulty: 'Easy' as const,
    time: '3 min',
    color: '#EC4899',
    videoName: 'affogato',
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
  },
  {
    id: 'iced-vanilla',
    name: 'Iced Vanilla Latte',
    tagline: 'Cool, refreshing, effortlessly smooth',
    description: 'Smooth espresso poured over ice with homemade vanilla syrup and cold milk.',
    difficulty: 'Easy' as const,
    time: '5 min',
    color: '#06B6D4',
    videoName: 'iced-vanilla-latte',
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
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    tagline: 'The barista\u2019s drink of choice',
    description: 'Paper-thin micro-foam merges seamlessly with a bold double ristretto, creating liquid silk.',
    difficulty: 'Advanced' as const,
    time: '5 min',
    color: '#8B5CF6',
    videoName: 'flat-white',
    ingredients: [
      '1 double ristretto (18-19 g fine ground)',
      '5 oz (150 ml) cold whole milk',
      'No sugar \u2014 micro-foam provides natural sweetness',
    ],
    steps: [
      'Pull a double ristretto \u2014 shorter, more concentrated than a standard shot.',
      'Steam milk, introducing air for only 3-5 sec for paper-thin micro-foam. Heat to 145 \u00b0F.',
      'Milk should be paint-like and glossy with zero visible bubbles.',
      'Pour from low height in a steady stream. Finish with a small white dot.',
    ],
    notes: 'Intensely coffee-forward with a silk-like mouthfeel. Rich, syrupy, and espresso-dominant.',
  },
  {
    id: 'rose-latte',
    name: 'Rose Latte',
    tagline: 'A blush-pink floral fantasy',
    description: 'Delicate rosewater and warm vanilla swirl through espresso and naturally tinted pink milk.',
    difficulty: 'Medium' as const,
    time: '8 min',
    color: '#F472B6',
    videoName: 'classic-latte', // shares latte video
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
  },
];

// Map full recipes to card data
const cardData: RecipeCardData[] = recipes.map((r) => ({
  id: r.id,
  name: r.name,
  tagline: r.tagline,
  difficulty: r.difficulty,
  time: r.time,
  ingredientCount: r.ingredients.length,
  videoName: r.videoName,
  color: r.color,
}));

/* ─── recipe detail modal ─── */
type FullRecipe = typeof recipes[number];

const RecipeModal: React.FC<{ recipe: FullRecipe; onClose: () => void }> = ({ recipe, onClose }) => {
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
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#1a1a1a] shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-white/5 rounded-t-3xl overflow-hidden z-20">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: recipe.color }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close recipe"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Header */}
        <div className="p-8 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: recipe.color }}>
            Premium Recipe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {recipe.name}
          </h2>
          <p className="text-base text-[#a09080] leading-relaxed">{recipe.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border" style={{ backgroundColor: `${recipe.color}10`, color: recipe.color, borderColor: `${recipe.color}30` }}>
              <Clock className="w-3.5 h-3.5" /> {recipe.time}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border" style={{ backgroundColor: `${recipe.color}10`, color: recipe.color, borderColor: `${recipe.color}30` }}>
              <Flame className="w-3.5 h-3.5" /> {recipe.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border" style={{ backgroundColor: `${recipe.color}10`, color: recipe.color, borderColor: `${recipe.color}30` }}>
              <Sparkles className="w-3.5 h-3.5" /> {completedSteps.size}/{recipe.steps.length} done
            </span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-8 pb-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: recipe.color }}>
              <ChefHat className="w-3.5 h-3.5" /> Ingredients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="flex items-center gap-2.5 p-1.5 rounded-lg"
                >
                  <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black shrink-0" style={{ backgroundColor: `${recipe.color}20`, color: recipe.color }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-white/70">{ing}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="px-8 pb-8">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: recipe.color }}>
            <Sparkles className="w-3.5 h-3.5" /> Step by Step
          </h3>
          <div className="space-y-2.5">
            {recipe.steps.map((step, i) => {
              const isActive = activeStep === i;
              const isDone = completedSteps.has(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  onClick={() => toggleStep(i)}
                  className={`relative rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                    isActive ? 'bg-white/[0.05] border-white/15' : isDone ? 'bg-white/[0.02] border-white/8' : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                        isDone ? 'text-[#1a0a10]' : isActive ? 'text-[#1a0a10]' : 'text-white/40 bg-white/5'
                      }`}
                      style={(isDone || isActive) ? { backgroundColor: recipe.color } : {}}
                    >
                      {isDone ? '\u2713' : i + 1}
                    </div>
                    <p className={`text-sm leading-relaxed pt-0.5 transition-colors ${
                      isActive ? 'text-white/90' : isDone ? 'text-white/40 line-through' : 'text-white/50'
                    }`}>
                      {step}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tasting Notes */}
          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: recipe.color }}>Tasting Notes</h4>
            <p className="text-white/60 text-sm italic leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedRecipe = selectedId ? recipes.find((r) => r.id === selectedId) : null;

  return (
    <section id="recipes" className="bg-[#1a0a10] relative overflow-hidden">
      {/* Cinematic hero banner */}
      <RecipeSectionHero />

      {/* Coffee bean divider */}
      <CoffeeBeanDivider />

      {/* Card grid */}
      <div className="container mx-auto px-6 pb-32 relative z-10">
        <RecipeGrid
          recipes={cardData}
          onSelectRecipe={(card) => setSelectedId(card.id)}
        />
      </div>

      {/* Background accents */}
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[#F472B6]/[0.02] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/[0.02] rounded-full blur-[180px] pointer-events-none" />

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Recipes;
