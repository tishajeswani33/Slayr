import { getFullDataset } from '../utils/datasetGenerator';
import { AestheticStyle } from '../types/fashion';

export interface StylingReport {
  analysis: {
    undertone: string;
    silhouette: string;
    detectedVibe: string;
    recommendedPalette: string[];
    additionalStylistNote: string;
  };
  primaryMatch: {
    id: string;
    imageUrl: string;
    aesthetic: string;
    score: number;
    vibe: string;
    clothingItems: Array<{ type: string; color: string; description: string }>;
    colorPalette: Array<{ hex: string; name: string; dominance: number }>;
    recommendations: Array<{ category: string; suggestion: string; reasoning: string }>;
  };
  stylingAdvice: {
    shoes: string;
    accessories: string[];
    hairstyle: string;
    layeringOption: string;
    stylistRationale: string;
  };
  alternativeFits: Array<{
    id: string;
    imageUrl: string;
    aesthetic: string;
    score: number;
  }>;
  matchScore: number;
}

// Map hex to human-readable names
function getColorName(hex: string): string {
  const names: Record<string, string> = {
    '#FFFFFF': 'Milk White',
    '#F8F8F8': 'Off-White',
    '#2C2C2C': 'Charcoal Black',
    '#000000': 'Jet Black',
    '#C9B896': 'Oatmeal Beige',
    '#E8D5C4': 'Sand Beige',
    '#FFB6C1': 'Soft Pink',
    '#FFE4E1': 'Misty Rose',
    '#1C1C1C': 'Ebony',
    '#8B4513': 'Saddle Brown',
    '#F5F5F5': 'Light Gray',
    '#E8E8E8': 'Off-Gray',
    '#FF6B6B': 'Sunset Red',
    '#808080': 'Slate Gray',
    '#FF69B4': 'Hot Pink',
    '#00BFFF': 'Deep Sky Blue',
    '#C0C0C0': 'Silver',
    '#800020': 'Burgundy',
    '#3C2415': 'Dark Chocolate',
    '#5C4033': 'Espresso',
  };
  return names[hex.toUpperCase()] || 'Neutral Contrast';
}

function recommendAesthetic(notes: string, event: string): AestheticStyle {
  const text = (notes + ' ' + event).toLowerCase();
  
  if (text.includes('street') || text.includes('cargo') || text.includes('hoodie')) return 'Streetwear';
  if (text.includes('quiet') || text.includes('wealth') || text.includes('luxury') || text.includes('row')) return 'Quiet Luxury';
  if (text.includes('old money') || text.includes('preppy') || text.includes('classic')) return 'Old Money';
  if (text.includes('clean') || text.includes('natural')) return 'Clean Girl';
  if (text.includes('korean') || text.includes('seoul') || text.includes('k-')) return 'Korean Casual';
  if (text.includes('scand') || text.includes('copenhagen')) return 'Scandinavian Minimal';
  if (text.includes('academia') || text.includes('gothic') || text.includes('book')) return 'Dark Academia';
  if (text.includes('coquette') || text.includes('bow') || text.includes('lace')) return 'Coquette';
  if (text.includes('soft') || text.includes('pastel')) return 'Soft Girl';
  if (text.includes('y2k') || text.includes('2000s') || text.includes('retro')) return 'Y2K';
  if (text.includes('cyber') || text.includes('tech') || text.includes('matrix')) return 'Cyber Minimal';
  if (text.includes('futur') || text.includes('editorial') || text.includes('runway')) return 'Futuristic Editorial';
  if (text.includes('traditional') || text.includes('indian') || text.includes('ethnic') || text.includes('saree') || text.includes('kurta') || text.includes('sherwani') || text.includes('lehenga')) return 'Indian Traditional';
  if (text.includes('party') || text.includes('club') || text.includes('sequin') || text.includes('sparkly') || text.includes('disco')) return 'Party Wear';
  if (text.includes('pinterest')) return 'Pinterest Core';
  if (text.includes('tiktok') || text.includes('viral')) return 'TikTok Viral';
  if (text.includes('monochrome') || text.includes('black')) return 'Monochrome Minimal';
  if (text.includes('minimal')) return 'Minimal Luxury';
  
  // Event fallbacks
  if (event === 'party' || event === 'club' || event === 'festival' || event === 'concert') return 'Party Wear';
  if (event === 'wedding') return 'Indian Traditional';
  if (event === 'luxury-dinner' || event === 'formal') return 'Minimal Luxury';
  if (event === 'office' || event === 'work') return 'Scandinavian Minimal';
  if (event === 'brunch' || event === 'date-night') return 'Clean Girl';
  
  return 'Minimal Luxury';
}

function getShoeSuggestion(aesthetic: string): string {
  const shoes: Record<string, string> = {
    'Minimal Luxury': 'Black leather loafers',
    'Streetwear': 'Chunky platform sneakers',
    'Old Money': 'Suede penny loafers',
    'Clean Girl': 'Pointed-toe minimal flats',
    'Quiet Luxury': 'Cashmere lined loafers',
    'Coquette': 'Mary Janes with lace socks',
    'Korean Casual': 'Classic white court sneakers',
    'Scandinavian Minimal': 'Chunky leather ankle boots',
    'Y2K': 'Platform boots or sandals',
    'Dark Academia': 'Oxford brogues',
    'Indian Traditional': 'Embroidered Juttis or handcrafted Kolhapuris',
    'Party Wear': 'Patent leather Chelsea boots or metallic strappy heels',
  };
  return shoes[aesthetic] || 'Polished leather boots';
}

function getHairstyleSuggestion(aesthetic: string): string {
  const styles: Record<string, string> = {
    'Minimal Luxury': 'Sleek center-part low chignon',
    'Streetwear': 'Messy texture crop or braided look',
    'Old Money': 'Polished voluminous blow-out',
    'Clean Girl': 'Slicked-back bun claw-clip updo',
    'Quiet Luxury': 'Natural soft blow-dry wave profile',
    'Coquette': 'Soft ribbon braid ponytail',
    'Indian Traditional': 'Glowy classic gajra bun or textured side braid',
    'Party Wear': 'Slicked-back wet-look lock or high-volume textured waves',
  };
  return styles[aesthetic] || 'Natural styled texture waves';
}

export function getLocalStylistConsultation(
  _imageBase64: string,
  eventType: string,
  budgetTier: string,
  additionalNotes: string
): StylingReport {
  // 1. Recommend target aesthetic based on user settings
  const recommendedAesthetic = recommendAesthetic(additionalNotes, eventType);
  
  // 2. Perform mock color & silhouette analysis based on notes and input
  const textInput = (additionalNotes + ' ' + eventType).toLowerCase();
  let undertone = 'Neutral (olive skin base)';
  let silhouette = 'Hourglass (balanced symmetry)';
  let recommendedPalette = ['#FFFFFF', '#2C2C2C', '#C9B896']; // defaults
  
  if (textInput.includes('warm') || textInput.includes('gold') || textInput.includes('earth')) {
    undertone = 'Warm (golden honey undertones)';
    recommendedPalette = ['#E8D5C4', '#8B4513', '#FFFFFF'];
  } else if (textInput.includes('cool') || textInput.includes('silver') || textInput.includes('pink')) {
    undertone = 'Cool (rosy porcelain undertones)';
    recommendedPalette = ['#FFB6C1', '#F5F5F5', '#2C2C2C'];
  }
  
  if (textInput.includes('petite')) {
    silhouette = 'Petite (compact, balanced proportions)';
  } else if (textInput.includes('athletic') || textInput.includes('broad')) {
    silhouette = 'Athletic (broad shoulders, tapered waist)';
  } else if (textInput.includes('tall') || textInput.includes('slim')) {
    silhouette = 'Tall (elongated frame lines)';
  }
  
  // 3. Load 100K outfits and search matching items
  // Since visual search is done on the client, we pull the 100k cached items
  const outfits = getFullDataset(100000);
  
  // Filter by aesthetic and budget
  let matchingOutfits = outfits.filter(o => 
    o.aesthetic === recommendedAesthetic && 
    o.personalizationMeta?.budgetTier === budgetTier
  );
  
  // Fallback to budget tier only if no aesthetic match
  if (matchingOutfits.length === 0) {
    matchingOutfits = outfits.filter(o => o.personalizationMeta?.budgetTier === budgetTier);
  }
  // Fallback to full dataset if still empty
  if (matchingOutfits.length === 0) {
    matchingOutfits = outfits.slice(0, 5);
  }
  
  // Sort matching outfits by popularity score desc
  matchingOutfits.sort((a, b) => b.popularityScore - a.popularityScore);
  
  const primaryOutfit = matchingOutfits[0];
  const alternatives = matchingOutfits.slice(1, 4); // take up to 3 alternatives
  
  // Map primary outfit clothingItems string[] to object structure
  const clothingItemsObj = primaryOutfit.clothingItems.map((item, index) => {
    const colorHex = primaryOutfit.colors[index % primaryOutfit.colors.length] || '#FFFFFF';
    return {
      type: index === 0 ? 'Top' : index === 1 ? 'Bottom' : 'Outerwear',
      color: getColorName(colorHex),
      description: item
    };
  });
  
  // Map color palette to object structure
  const colorPaletteObj = primaryOutfit.colors.map((hex, index) => ({
    hex,
    name: getColorName(hex),
    dominance: index === 0 ? 50 : index === 1 ? 30 : 20
  }));
  
  const recommendations = [
    {
      category: 'Proportions',
      suggestion: 'Contrast voluminous shapes with tailored core anchors',
      reasoning: 'Creates a balanced, eye-catching profile that retains structural elegance.'
    },
    {
      category: 'Color Scheme',
      suggestion: 'Complement the main tone with matching highlight accessories',
      reasoning: 'Breaks the monochrome grids while ensuring visual consistency.'
    }
  ];

  return {
    analysis: {
      undertone,
      silhouette,
      detectedVibe: `${recommendedAesthetic} - ${primaryOutfit.vibe}`,
      recommendedPalette,
      additionalStylistNote: additionalNotes || 'Maintain structured balance between comfort and editorial elegance.',
    },
    primaryMatch: {
      id: primaryOutfit.id,
      imageUrl: primaryOutfit.imageUrl,
      aesthetic: primaryOutfit.aesthetic,
      score: primaryOutfit.popularityScore,
      vibe: `An offline-curated look matching your budget context.`,
      clothingItems: clothingItemsObj,
      colorPalette: colorPaletteObj,
      recommendations,
    },
    stylingAdvice: {
      shoes: getShoeSuggestion(primaryOutfit.aesthetic),
      accessories: primaryOutfit.accessories,
      hairstyle: getHairstyleSuggestion(primaryOutfit.aesthetic),
      layeringOption: 'Structured linen jacket or knit layering cardigans.',
      stylistRationale: `Based on your ${silhouette} silhouette and the event's ${eventType} context, we filtered Slayr's 100K fashion database for the best matches. The ${primaryOutfit.aesthetic} palette complements your ${undertone} skin undertone profile.`,
    },
    alternativeFits: alternatives.map(a => ({
      id: a.id,
      imageUrl: a.imageUrl,
      aesthetic: a.aesthetic,
      score: a.popularityScore
    })),
    matchScore: 85 + Math.floor(Math.random() * 12),
  };
}
