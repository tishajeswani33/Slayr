/**
 * Slayr AI Budget Chatbot Service
 * Powered by Gemini — solves Myntra/Meesho drawbacks by providing
 * complete outfit recommendations with accessories within any budget.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CuratedOutfit } from '../data/curatedOutfits';

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY || 'demo-key'
);

const isGeminiAvailable = !!import.meta.env.VITE_GEMINI_API_KEY &&
  import.meta.env.VITE_GEMINI_API_KEY !== 'demo-key';

export interface ChatOutfitCard {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  totalPrice: number;
  budgetTier: string;
  items: { name: string; price: number; color: string }[];
  accessories: { name: string; price: number }[];
  shoes: { name: string; price: number };
  stylingTip: string;
}

export interface ChatbotResponse {
  message: string;
  outfits: ChatOutfitCard[];
  isAiGenerated: boolean;
}

/**
 * Parse the user's message to extract budget, event, and gender hints.
 */
function parseUserIntent(message: string): {
  budget: number | null;
  event: string | null;
  gender: string | null;
  aesthetic: string | null;
} {
  const msg = message.toLowerCase();

  // Extract budget (supports ₹, rs, rupees, k notation)
  let budget: number | null = null;
  const budgetPatterns = [
    /(?:under|below|within|budget|max|upto|up to|less than)\s*(?:₹|rs\.?|inr|rupees?)?\s*(\d[\d,]*)\s*(?:k|thousand)?/i,
    /(?:₹|rs\.?|inr|rupees?)\s*(\d[\d,]*)\s*(?:k|thousand)?/i,
    /(\d[\d,]*)\s*(?:₹|rs|rupees?|k|thousand)/i,
  ];

  for (const pattern of budgetPatterns) {
    const match = msg.match(pattern);
    if (match) {
      let amount = parseInt(match[1].replace(/,/g, ''), 10);
      if (msg.includes('k') || msg.includes('thousand') || msg.includes('lakh')) {
        if (msg.includes('lakh')) amount *= 100000;
        else if (amount < 1000) amount *= 1000;
      }
      budget = amount;
      break;
    }
  }

  // Extract event
  const eventKeywords: Record<string, string> = {
    'wedding': 'wedding', 'shaadi': 'wedding', 'marriage': 'wedding',
    'sangeet': 'sangeet', 'mehendi': 'mehendi', 'mehndi': 'mehendi', 'haldi': 'mehendi',
    'party': 'party', 'club': 'club', 'nightout': 'club',
    'office': 'office', 'work': 'work', 'corporate': 'office', 'interview': 'formal',
    'date': 'date-night', 'date night': 'date-night', 'dinner': 'luxury-dinner',
    'brunch': 'brunch', 'casual': 'casual', 'college': 'college-fest',
    'festival': 'festival', 'diwali': 'festival', 'eid': 'festival', 'navratri': 'festival',
    'concert': 'concert', 'photoshoot': 'photoshoot', 'travel': 'travel', 'airport': 'airport',
    'formal': 'formal', 'prom': 'party',
  };

  let event: string | null = null;
  for (const [keyword, eventType] of Object.entries(eventKeywords)) {
    if (msg.includes(keyword)) {
      event = eventType;
      break;
    }
  }

  // Extract gender
  let gender: string | null = null;
  if (msg.includes('men') || msg.includes('male') || msg.includes(' man') || msg.includes('groom') || msg.includes('boy')) {
    gender = 'male';
  } else if (msg.includes('women') || msg.includes('female') || msg.includes(' woman') || msg.includes('bride') || msg.includes('girl') || msg.includes('ladies')) {
    gender = 'female';
  }

  // Extract aesthetic
  const aestheticKeywords: Record<string, string> = {
    'traditional': 'Indian Traditional', 'ethnic': 'Indian Traditional', 'desi': 'Indian Traditional',
    'lehenga': 'Indian Traditional', 'saree': 'Indian Traditional', 'kurta': 'Indian Traditional',
    'sherwani': 'Indian Traditional', 'anarkali': 'Indian Traditional',
    'streetwear': 'Streetwear', 'street': 'Streetwear',
    'korean': 'Korean Casual', 'minimal': 'Minimal Luxury', 'old money': 'Old Money',
    'quiet luxury': 'Quiet Luxury', 'clean girl': 'Clean Girl', 'coquette': 'Coquette',
    'y2k': 'Y2K', 'dark academia': 'Dark Academia',
  };

  let aesthetic: string | null = null;
  for (const [keyword, style] of Object.entries(aestheticKeywords)) {
    if (msg.includes(keyword)) {
      aesthetic = style;
      break;
    }
  }

  return { budget, event, gender, aesthetic };
}

/**
 * Find matching outfits from the curated dataset based on parsed intent.
 */
function findMatchingOutfits(
  allOutfits: CuratedOutfit[],
  budget: number | null,
  event: string | null,
  gender: string | null,
  aesthetic: string | null
): CuratedOutfit[] {
  let results = [...allOutfits];

  if (budget) {
    results = results.filter(o => o.totalPrice <= budget);
  }

  if (event) {
    const eventMatches = results.filter(o => o.events.includes(event));
    if (eventMatches.length > 0) results = eventMatches;
  }

  if (gender) {
    const genderMatches = results.filter(o => o.gender === gender || o.gender === 'unisex');
    if (genderMatches.length > 0) results = genderMatches;
  }

  if (aesthetic) {
    const aestheticMatches = results.filter(o => o.aesthetic === aesthetic);
    if (aestheticMatches.length > 0) results = aestheticMatches;
  }

  // Sort by totalPrice descending (best value within budget)
  results.sort((a, b) => b.totalPrice - a.totalPrice);

  return results.slice(0, 5);
}

function outfitToCard(outfit: CuratedOutfit): ChatOutfitCard {
  return {
    id: outfit.id,
    title: outfit.title,
    imageUrl: outfit.imageUrl,
    category: outfit.category,
    totalPrice: outfit.totalPrice,
    budgetTier: outfit.budgetTier,
    items: outfit.items.map(i => ({ name: i.name, price: i.price, color: i.color })),
    accessories: outfit.accessories,
    shoes: outfit.shoes,
    stylingTip: outfit.stylingTip,
  };
}

/**
 * Generate a local (no-API) response when Gemini is unavailable.
 */
function generateLocalResponse(
  _message: string,
  matchedOutfits: CuratedOutfit[],
  budget: number | null,
  event: string | null
): string {
  if (matchedOutfits.length === 0) {
    return `I searched Slayr's curated collection but couldn't find exact matches for your request. Try specifying an event (wedding, party, office) and a budget (e.g., "under ₹10,000"). I'll find the perfect outfit for you! 💫`;
  }

  const top = matchedOutfits[0];
  const budgetStr = budget ? `₹${budget.toLocaleString('en-IN')}` : 'your';
  const eventStr = event ? event.replace('-', ' ') : 'your';

  let response = `Here's what I found for ${eventStr} within ${budgetStr} budget:\n\n`;
  response += `🏆 **Top Pick: ${top.title}**\n`;
  response += `Total: ₹${top.totalPrice.toLocaleString('en-IN')}\n\n`;
  response += `👗 **Complete Outfit:**\n`;
  top.items.forEach(item => {
    response += `• ${item.name} (${item.color}) — ₹${item.price.toLocaleString('en-IN')}\n`;
  });
  response += `\n👟 **Shoes:** ${top.shoes.name} — ₹${top.shoes.price.toLocaleString('en-IN')}\n`;
  response += `\n💍 **Accessories:**\n`;
  top.accessories.forEach(acc => {
    response += `• ${acc.name} — ₹${acc.price.toLocaleString('en-IN')}\n`;
  });
  response += `\n✨ **Styling Tip:** ${top.stylingTip}`;

  if (matchedOutfits.length > 1) {
    response += `\n\n📦 I also found ${matchedOutfits.length - 1} more matching outfit${matchedOutfits.length > 2 ? 's' : ''} — scroll down to see them all!`;
  }

  return response;
}

/**
 * Main chatbot function — processes user message and returns outfit recommendations.
 */
export async function getChatbotResponse(
  message: string,
  allOutfits: CuratedOutfit[]
): Promise<ChatbotResponse> {
  const { budget, event, gender, aesthetic } = parseUserIntent(message);
  const matchedOutfits = findMatchingOutfits(allOutfits, budget, event, gender, aesthetic);
  const outfitCards = matchedOutfits.map(outfitToCard);

  // Try Gemini AI for rich, personalized responses
  if (isGeminiAvailable && matchedOutfits.length > 0) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const outfitContext = matchedOutfits.slice(0, 3).map(o => ({
        title: o.title,
        category: o.category,
        totalPrice: o.totalPrice,
        items: o.items.map(i => `${i.name} (${i.color}) — ₹${i.price}`),
        accessories: o.accessories.map(a => `${a.name} — ₹${a.price}`),
        shoes: `${o.shoes.name} — ₹${o.shoes.price}`,
        stylingTip: o.stylingTip,
      }));

      const prompt = `You are Slayr, an elite AI fashion stylist for Indian Gen Z users. A user asked: "${message}"

I found these matching outfits from our curated collection:
${JSON.stringify(outfitContext, null, 2)}

Write a warm, personalized response (150-250 words) that:
1. Recommends the BEST outfit for their needs, explaining WHY it works
2. Lists ALL items with their prices in ₹
3. Lists ALL accessories with prices
4. Includes the shoes recommendation with price
5. Gives a specific styling tip (hair, makeup, fragrance)
6. If there are alternatives, briefly mention them
7. Show the total price and confirm it's within their budget${budget ? ` of ₹${budget.toLocaleString('en-IN')}` : ''}

Use emojis sparingly. Be specific, not generic. Sound like a premium fashion advisor, not a chatbot.
Format with markdown bold (**) for item names and prices. Use bullet points.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      return {
        message: text,
        outfits: outfitCards,
        isAiGenerated: true,
      };
    } catch (err) {
      console.warn('Gemini API error, falling back to local response:', err);
    }
  }

  // Fallback to local response
  const localMessage = generateLocalResponse(message, matchedOutfits, budget, event);
  return {
    message: localMessage,
    outfits: outfitCards,
    isAiGenerated: false,
  };
}

/**
 * Get quick action chip suggestions based on context.
 */
export function getQuickActions(): { text: string; icon: string }[] {
  return [
    { text: 'Wedding outfit under ₹20,000', icon: '🥻' },
    { text: 'Party dress under ₹5,000', icon: '✨' },
    { text: 'Office formal under ₹8,000', icon: '👔' },
    { text: 'Date night outfit under ₹6,000', icon: '💕' },
    { text: 'Sangeet lehenga under ₹15,000', icon: '💃' },
    { text: 'College casual under ₹3,000', icon: '🎒' },
    { text: 'Brunch look under ₹4,000', icon: '☀️' },
    { text: 'Festival ethnic under ₹10,000', icon: '🪔' },
  ];
}
