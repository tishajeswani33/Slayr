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

const validImageIds = [
  "1490481651871-ab68de25d43d", "1515886657613-9f3515b0c78f", "1529139574466-a30ac09a7b66",
  "1485230895905-ec40ba36b9e2", "1509631179647-0b1e4cbe5e7e", "1550614000-4b95dd5e9854",
  "1483985988355-763728e1935b", "1496747611176-843222e1e57c", "1445205170230-053b83016050",
  "1512436991641-6745cdb1723f", "1532453288672-3a27e9be9efd", "1503342394128-c104d54dba01",
  "1502716115624-b58610eb67cd", "1487222477894-8943e31ef7b2", "1554412933-414cd7d15243",
  "1475179427670-043e0617300c", "1488161628813-0af8e0c81216", "1492707892479-7bc8d5a4ee93",
  "1500917293891-ef795e70e1f6", "1508427953056-b4e50d75b341"
];

const outfits = [];
let idCounter = 1;

function getBudgetTier(total) {
  if (total < 2500) return 'budget';
  if (total <= 6000) return 'mid-range';
  if (total <= 15000) return 'premium';
  return 'luxury';
}

function randomPrice(min, max) {
  return Math.floor((Math.random() * (max - min) + min) / 50) * 50; // Round to nearest 50
}

categories.forEach((cat, catIndex) => {
  for (let i = 0; i < 10; i++) {
    const isMale = i % 2 === 0;
    const gender = i === 9 ? 'unisex' : (isMale ? 'male' : 'female');
    
    // Vary budget tier by index to ensure diversity, with much lower realistic prices
    let minTopPrice = 300;
    let maxTopPrice = 800;
    if (i < 3) {
      minTopPrice = 250; maxTopPrice = 600; // budget (Total < 2000)
    } else if (i < 6) {
      minTopPrice = 800; maxTopPrice = 1500; // mid-range (Total < 5000)
    } else if (i < 9) {
      minTopPrice = 2000; maxTopPrice = 4000; // premium (Total < 12000)
    } else {
      minTopPrice = 5000; maxTopPrice = 10000; // luxury
    }

    const item1Price = randomPrice(minTopPrice, maxTopPrice);
    const item2Price = randomPrice(minTopPrice * 0.9, maxTopPrice * 1.1);
    const acc1Price = randomPrice(minTopPrice * 0.2, maxTopPrice * 0.4);
    const acc2Price = randomPrice(minTopPrice * 0.1, maxTopPrice * 0.2);
    const shoePrice = randomPrice(minTopPrice * 0.8, maxTopPrice * 1.5);

    const total = item1Price + item2Price + acc1Price + acc2Price + shoePrice;
    
    // Select a pseudo-random image from the valid list
    const imageId = validImageIds[(catIndex * 10 + i) % validImageIds.length];

    outfits.push({
      id: `curated-${idCounter++}`,
      title: `${cat.name} Look ${i + 1}`,
      category: cat.name,
      gender: gender,
      imageUrl: `https://images.unsplash.com/photo-${imageId}?w=600&q=80`,
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
