import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from './RecipeCard';
import type { RecipeCardData } from './RecipeCard';

interface RecipeGridProps {
  recipes: RecipeCardData[];
  onSelectRecipe: (recipe: RecipeCardData) => void;
}

const difficulties = ['All', 'Easy', 'Medium', 'Advanced'] as const;

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onSelectRecipe }) => {
  const [filter, setFilter] = useState<string>('All');
  const filtered = filter === 'All' ? recipes : recipes.filter((r) => r.difficulty === filter);

  return (
    <div>
      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="flex items-center justify-center gap-3 mb-12 flex-wrap"
      >
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8956c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0a10] ${
              filter === d
                ? 'bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-[#1a0a10] shadow-[0_4px_20px_rgba(244,114,182,0.25)]'
                : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08] border border-white/10 hover:border-white/20'
            }`}
          >
            {d}
          </button>
        ))}
      </motion.div>

      {/* Card grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28, delay: i * 0.04 }}
            >
              <RecipeCard
                recipe={recipe}
                index={i}
                onSelect={() => onSelectRecipe(recipe)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RecipeGrid;
