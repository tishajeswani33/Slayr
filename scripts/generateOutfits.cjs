const fs = require('fs');
const path = require('path');

const categories = [
  { name: 'Traditional Wedding', keywords: 'indian,wedding,lehenga,sherwani', events: ['wedding', 'formal'], aesthetic: 'Indian Traditional' },
  { name: 'Sangeet & Mehendi', keywords: 'sangeet,mehendi,sharara,ethnic', events: ['sangeet', 'mehendi'], aesthetic: 'Sangeet Wear' },
  { name: 'Festive & Diwali', keywords: 'festive,diwali,silk,kurta', events: ['festival', 'party'], aesthetic: 'Indian Festive' },
  { name: 'Party & Clubwear', keywords: 'party,club,sequin,nightlife', events: ['party', 'club', 'concert'], aesthetic: 'Party Wear' },
  { name: 'Office & Corporate', keywords: 'office,corporate,formal,suit', events: ['office', 'work'], aesthetic: 'Scandinavian Minimal' },
  { name: 'College & Casual', keywords: 'casual,streetwear,denim,sneaker', events: ['casual', 'college-fest'], aesthetic: 'Streetwear' },
  { name: 'Date Night', keywords: 'date,romantic,evening,elegant', events: ['date-night', 'luxury-dinner'], aesthetic: 'Minimal Luxury' },
  { name: 'Brunch & Weekend', keywords: 'brunch,summer,linen,casual,chic', events: ['brunch', 'travel'], aesthetic: 'Clean Girl' },
  { name: 'Korean & Minimal', keywords: 'korean,minimal,aesthetic,fashion', events: ['casual', 'date-night'], aesthetic: 'Korean Casual' },
  { name: 'Luxury Editorial', keywords: 'luxury,editorial,runway,fashion', events: ['photoshoot', 'luxury-dinner'], aesthetic: 'Futuristic Editorial' }
];

const outfits = [];
let sigCounter = 1000;
let idCounter = 1;

function getBudgetTier(total) {
  if (total < 5000) return 'budget';
  if (total <= 15000) return 'mid-range';
  if (total <= 50000) return 'premium';
  return 'luxury';
}

function randomPrice(min, max) {
  return Math.floor((Math.random() * (max - min) + min) / 100) * 100;
}

categories.forEach((cat, catIndex) => {
  for (let i = 0; i < 10; i++) {
    sigCounter++;
    const isMale = i % 2 === 0;
    const gender = i === 9 ? 'unisex' : (isMale ? 'male' : 'female');
    
    // Vary budget tier by index to ensure diversity
    let minTopPrice = 1000;
    let maxTopPrice = 3000;
    if (i < 3) {
      minTopPrice = 500; maxTopPrice = 1500; // budget
    } else if (i < 6) {
      minTopPrice = 2000; maxTopPrice = 5000; // mid-range
    } else if (i < 9) {
      minTopPrice = 6000; maxTopPrice = 15000; // premium
    } else {
      minTopPrice = 20000; maxTopPrice = 50000; // luxury
    }

    const item1Price = randomPrice(minTopPrice, maxTopPrice);
    const item2Price = randomPrice(minTopPrice * 0.8, maxTopPrice * 0.8);
    const acc1Price = randomPrice(minTopPrice * 0.3, maxTopPrice * 0.3);
    const acc2Price = randomPrice(minTopPrice * 0.2, maxTopPrice * 0.2);
    const shoePrice = randomPrice(minTopPrice * 0.8, maxTopPrice * 1.2);

    const total = item1Price + item2Price + acc1Price + acc2Price + shoePrice;

    outfits.push({
      id: `curated-${idCounter++}`,
      title: `${cat.name} Look ${i + 1}`,
      category: cat.name,
      gender: gender,
      imageUrl: `https://images.unsplash.com/featured/?${cat.keywords}&sig=${sigCounter}`,
      items: [
        { name: 'Primary Top/Dress', type: 'Top', price: item1Price, color: 'Primary Color' },
        { name: 'Matching Bottom', type: 'Bottom', price: item2Price, color: 'Secondary Color' }
      ],
      accessories: [
        { name: 'Statement Piece', price: acc1Price },
        { name: 'Secondary Accessory', price: acc2Price }
      ],
      shoes: { name: 'Signature Footwear', price: shoePrice },
      totalPrice: total,
      budgetTier: getBudgetTier(total),
      events: cat.events,
      aesthetic: cat.aesthetic,
      stylingTip: `Style this ${cat.aesthetic} look with confidence for your next ${cat.events[0]} event.`,
      colors: ['#000000', '#FFFFFF', '#888888']
    });
  }
});

const tsContent = `export interface CuratedOutfit {
  id: string;
  title: string;
  category: string;
  gender: 'male' | 'female' | 'unisex';
  imageUrl: string;
  items: { name: string; type: string; price: number; color: string }[];
  accessories: { name: string; price: number }[];
  shoes: { name: string; price: number };
  totalPrice: number;
  budgetTier: 'budget' | 'mid-range' | 'premium' | 'luxury';
  events: string[];
  aesthetic: string;
  stylingTip: string;
  colors: string[];
}

export const CURATED_OUTFITS: CuratedOutfit[] = ${JSON.stringify(outfits, null, 2)};

export function getCuratedOutfits(): CuratedOutfit[] {
  return CURATED_OUTFITS;
}

export function getOutfitsByCategory(category: string): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.category === category);
}

export function getOutfitsByBudget(maxBudget: number): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.totalPrice <= maxBudget).sort((a, b) => b.totalPrice - a.totalPrice);
}

export function getOutfitsByEvent(event: string): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.events.includes(event));
}

export function getOutfitsByBudgetAndEvent(maxBudget: number, event: string): CuratedOutfit[] {
  return CURATED_OUTFITS.filter(o => o.totalPrice <= maxBudget && o.events.includes(event)).sort((a, b) => b.totalPrice - a.totalPrice);
}

export function getCategories(): string[] {
  return [...new Set(CURATED_OUTFITS.map(o => o.category))];
}

export function searchCuratedOutfits(query: string): CuratedOutfit[] {
  const q = query.toLowerCase();
  return CURATED_OUTFITS.filter(o =>
    o.title.toLowerCase().includes(q) ||
    o.category.toLowerCase().includes(q) ||
    o.aesthetic.toLowerCase().includes(q) ||
    o.events.some(e => e.includes(q)) ||
    o.items.some(i => i.name.toLowerCase().includes(q)) ||
    o.stylingTip.toLowerCase().includes(q)
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../src/data/curatedOutfits.ts'), tsContent);
console.log('Successfully generated 100 curated outfits.');
