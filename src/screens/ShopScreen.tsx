import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCuratedOutfits, getCategories, type CuratedOutfit } from '../data/curatedOutfits';

interface ShopScreenProps {
  onClose: () => void;
  onChatbotClick?: () => void;
}

const BUDGET_TIERS = [
  { label: 'All', value: '' },
  { label: 'Under ₹5K', value: 'budget' },
  { label: '₹5K-₹15K', value: 'mid-range' },
  { label: '₹15K-₹50K', value: 'premium' },
  { label: '₹50K+', value: 'luxury' },
];

const GENDERS = [
  { label: 'All', value: '' },
  { label: 'Women', value: 'female' },
  { label: 'Men', value: 'male' },
  { label: 'Unisex', value: 'unisex' },
];

export default function ShopScreen({ onClose, onChatbotClick }: ShopScreenProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBudget, setActiveBudget] = useState('');
  const [activeGender, setActiveGender] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allOutfits = useMemo(() => getCuratedOutfits(), []);
  const categories = useMemo(() => ['All', ...getCategories()], []);

  const filteredOutfits = useMemo(() => {
    let result = allOutfits;
    if (activeCategory !== 'All') {
      result = result.filter(o => o.category === activeCategory);
    }
    if (activeBudget) {
      result = result.filter(o => o.budgetTier === activeBudget);
    }
    if (activeGender) {
      result = result.filter(o => o.gender === activeGender || o.gender === 'unisex');
    }
    return result;
  }, [allOutfits, activeCategory, activeBudget, activeGender]);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const getBudgetColor = (tier: string) => {
    switch (tier) {
      case 'budget': return 'text-emerald-400 bg-emerald-500/10';
      case 'mid-range': return 'text-blue-400 bg-blue-500/10';
      case 'premium': return 'text-amber-400 bg-amber-500/10';
      case 'luxury': return 'text-purple-400 bg-purple-500/10';
      default: return 'text-neutral-400 bg-neutral-500/10';
    }
  };

  const renderOutfitCard = (outfit: CuratedOutfit, index: number) => {
    const isExpanded = expandedId === outfit.id;

    return (
      <motion.div
        key={outfit.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        layout
        className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden group"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={outfit.imageUrl}
            alt={outfit.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="text-[10px] bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full font-medium">
              {outfit.category}
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium backdrop-blur-sm ${getBudgetColor(outfit.budgetTier)}`}>
              {outfit.budgetTier.toUpperCase()}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="text-[10px] bg-black/70 backdrop-blur-sm text-neutral-400 px-2 py-1 rounded-full">
              {outfit.gender === 'male' ? '♂' : outfit.gender === 'female' ? '♀' : '⚧'}
            </span>
          </div>
          {/* Price overlay at bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-12">
            <p className="text-white text-xl font-semibold">{formatPrice(outfit.totalPrice)}</p>
            <p className="text-neutral-400 text-xs mt-0.5">{outfit.items.length} items + {outfit.accessories.length} accessories</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white text-sm font-medium leading-tight">{outfit.title}</h3>
          <p className="text-neutral-600 text-xs mt-1">{outfit.aesthetic}</p>

          {/* Color swatches */}
          <div className="flex gap-1.5 mt-3">
            {outfit.colors.map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-neutral-800"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpandedId(isExpanded ? null : outfit.id)}
            className="w-full mt-3 py-2.5 text-xs text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            {isExpanded ? 'Hide Details' : 'View Full Look'}
            <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4 border-t border-neutral-900 pt-4">
                {/* Items */}
                <div>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">👗 Clothing Items</p>
                  {outfit.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-neutral-900/50 last:border-0">
                      <div>
                        <span className="text-xs text-neutral-300">{item.name}</span>
                        <span className="text-[10px] text-neutral-600 ml-2">({item.color})</span>
                      </div>
                      <span className="text-xs text-white font-medium">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Accessories */}
                <div>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">💍 Accessories</p>
                  {outfit.accessories.map((acc, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-neutral-900/50 last:border-0">
                      <span className="text-xs text-neutral-300">{acc.name}</span>
                      <span className="text-xs text-white font-medium">{formatPrice(acc.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Shoes */}
                <div>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">👟 Footwear</p>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-neutral-300">{outfit.shoes.name}</span>
                    <span className="text-xs text-white font-medium">{formatPrice(outfit.shoes.price)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">Total</span>
                  <span className="text-base text-white font-semibold">{formatPrice(outfit.totalPrice)}</span>
                </div>

                {/* Styling tip */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3">
                  <p className="text-xs text-amber-400/80 italic">💡 {outfit.stylingTip}</p>
                </div>

                {/* Events */}
                <div className="flex flex-wrap gap-1.5">
                  {outfit.events.map((ev, i) => (
                    <span key={i} className="text-[10px] bg-neutral-900 text-neutral-500 px-2 py-1 rounded-full">
                      {ev.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto font-light text-neutral-400 select-none">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-neutral-900 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl text-white font-light tracking-tight">Curated Outfits</h1>
              <p className="text-[10px] text-neutral-600">{filteredOutfits.length} complete looks with accessories & pricing</p>
            </div>
          </div>
          {onChatbotClick && (
            <button
              onClick={onChatbotClick}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <span>✨</span> Ask AI Stylist
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white text-black font-medium'
                    : 'bg-neutral-900 text-neutral-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter row */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-600 uppercase">Budget:</span>
            {BUDGET_TIERS.map(tier => (
              <button
                key={tier.value}
                onClick={() => setActiveBudget(tier.value)}
                className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${
                  activeBudget === tier.value
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-600 hover:text-neutral-400'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-600 uppercase">Gender:</span>
            {GENDERS.map(g => (
              <button
                key={g.value}
                onClick={() => setActiveGender(g.value)}
                className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${
                  activeGender === g.value
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-600 hover:text-neutral-400'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Outfit Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredOutfits.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">😔</p>
            <p className="text-neutral-500 text-sm">No outfits match your filters</p>
            <button
              onClick={() => { setActiveCategory('All'); setActiveBudget(''); setActiveGender(''); }}
              className="mt-4 text-xs text-white bg-neutral-900 px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOutfits.map((outfit, i) => renderOutfitCard(outfit, i))}
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </div>
  );
}
