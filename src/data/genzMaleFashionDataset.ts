import { AestheticStyle, Gender, Season, ExtendedFashionOutfit, FashionMood, BudgetTier, EventType } from '../types/fashion';
import { getAestheticImage } from '../utils/imageUrls';

// ─── Male Aesthetic Category Templates ──────────────────────────────

interface CategoryTemplate {
  aesthetic: AestheticStyle;
  slug: string;
  items: string[];
  accessories: string[];
  colors: string[];
  vibes: string[];
  trends: string[];
  moods: FashionMood[];
  budgets: BudgetTier[];
  events: EventType[];
  creators: string[];
  titlePrefixes: string[];
}

const MALE_CATEGORIES: CategoryTemplate[] = [
  {
    aesthetic: 'Indian Traditional',
    slug: 'indian-traditional',
    items: [
      'Lucknowi Chikankari Kurta', 'Pleated silk Dhoti pants', 'Embroidered velvet Sherwani',
      'Assam Silk Kurta Pajama', 'Structured Jodhpuri Bandhgala coat', 'Designer Nehru jacket vest',
      'Raw silk kurta pyjama set', 'Khadi short Kurta', 'Indo-Western draped cowl kurta',
    ],
    accessories: [
      'Leather ethnic Juttis', 'Handcrafted Kolhapuri sandals', 'Silk embroidered pocket square',
      'Gold Kada bracelet', 'Royal organza Dupatta', 'Designer brooch pin',
    ],
    colors: ['#FFE4C4', '#800020', '#FFD700', '#008080', '#FFFFFF', '#000080'],
    vibes: ['Royal-Festive', 'Traditional-Coordinated', 'Indo-Western', 'Classic-Ethnic', 'Bespoke'],
    trends: ['modern-ethnic-co-ord', 'royal-festive-layers', 'chikankari-revival', 'indo-western-drapes'],
    moods: ['sophisticated', 'confident', 'dreamy', 'powerful', 'serene'],
    budgets: ['budget', 'mid-range', 'premium', 'luxury'],
    events: ['wedding', 'formal', 'brunch', 'festival', 'college-fest', 'party'],
    creators: ['@sabyasachiofficial', '@manishmalhotra05', '@kunalkrawalofficial'],
    titlePrefixes: [
      'Royal Bandhgala Layer', 'Chikankari Coordinates Set', 'Embroidered Sherwani Ensemble',
      'Jaipur Block Print Fest Fit', 'Modern Indo-Western Blend', 'Varanasi Brocade Statement',
    ],
  },
  {
    aesthetic: 'Party Wear',
    slug: 'party-wear-male',
    items: [
      'Sequinned black bomber jacket', 'Satin slim-fit button down', 'Velvet double-breasted blazer',
      'Metallic thread crewneck', 'Slim-fit leather trousers', 'Glossy patent leather pants',
      'Deconstructed asymmetrical blazer', 'Silk-blend camp collar shirt', 'Embellished tuxedo jacket',
    ],
    accessories: [
      'Patent leather Chelsea boots', 'Sterling silver neck chain', 'Designer chronograph watch',
      'Polished leather zip boots', 'Suede single-monk strap shoes', 'Chrome buckle belt',
    ],
    colors: ['#0A0A0A', '#C0C0C0', '#004B49', '#4A0E17', '#1F305E', '#FFFFFF'],
    vibes: ['Club-Chic', 'Sleek-Glow', 'Bold-Nightlife', 'High-Glamour', 'Futuristic-Midnight'],
    trends: ['party-blazers', 'metallic-glow-wear', 'sequin-embellishments', 'leather-separates'],
    moods: ['confident', 'powerful', 'edgy', 'playful', 'mysterious'],
    budgets: ['budget', 'mid-range', 'premium', 'luxury'],
    events: ['party', 'club', 'concert', 'festival', 'luxury-dinner'],
    creators: ['@balmain', '@ysl.archive', '@hypebeast.style'],
    titlePrefixes: [
      'Midnight Club Silhouette', 'Velvet Lounge Coordinate', 'Glittering Sequin Statement',
      'Sleek Satin Night Set', 'Tuxedo Disruption Look', 'High-Octane Party Layer',
    ],
  },
  {
    aesthetic: 'Streetwear',
    slug: 'oversized-streetwear',
    items: [
      'Oversized graphic hoodie', 'Baggy cargo joggers', 'Box-fit vintage tee',
      'Drop-shoulder bomber jacket', 'Heavyweight cotton shorts', 'Distressed denim jacket',
      'Oversized crewneck sweatshirt', 'Mesh jersey tank', 'Parachute pants',
    ],
    accessories: [
      'Chunky platform sneakers', 'Trucker cap', 'Cuban link chain', 'Crossbody sling bag',
      'Retro sport sunglasses', 'Beanie with logo patch', 'Wrist sweatbands',
    ],
    colors: ['#000000', '#FF4500', '#FFFFFF', '#808080', '#32CD32', '#FFD700'],
    vibes: ['Urban', 'Bold', 'Hype', 'Laid-back', 'Fearless'],
    trends: ['oversized-everything', 'archive-fashion', 'y2k-comeback', 'hype-drop', 'skate-punk'],
    moods: ['confident', 'rebellious', 'edgy', 'playful', 'powerful'],
    budgets: ['budget', 'mid-range', 'premium'],
    events: ['concert', 'casual', 'college-fest', 'party'],
    creators: ['@blaireadiebee', '@sangiev', '@streetfashion.archive'],
    titlePrefixes: [
      'Hype District Drop', 'Urban Archive Layer', 'Concrete Jungle Fit',
      'Block Party Statement', 'Graffiti Wall Inspo', 'Late-Night Drip',
    ],
  },
  {
    aesthetic: 'Korean Casual',
    slug: 'korean-oversized',
    items: [
      'Oversized linen shirt', 'Wide-leg pleated trousers', 'Knit sweater vest',
      'Cropped boxy cardigan', 'Relaxed-fit polo', 'Long-line trench coat',
      'Boxy striped tee', 'Loose turtleneck', 'Structured wide pants',
    ],
    accessories: [
      'Canvas tote bag', 'Round wire-frame glasses', 'Leather bucket hat',
      'Minimalist white sneakers', 'Beaded bracelet set', 'Crossbody messenger bag',
    ],
    colors: ['#E8D5C4', '#9B6B6B', '#F0F0F0', '#4A4A4A', '#C9B896', '#D4C5B2'],
    vibes: ['Seoul-Chic', 'Layered', 'Effortless', 'Soft-Edge', 'Modern'],
    trends: ['k-fashion-wave', 'oversized-korean', 'neutral-palette', 'soft-boy-era', 'layered-knits'],
    moods: ['serene', 'dreamy', 'sophisticated', 'playful', 'romantic'],
    budgets: ['mid-range', 'premium'],
    events: ['casual', 'brunch', 'date-night', 'photoshoot'],
    creators: ['@seoulfashionweek', '@koreanmenswear', '@gentlemonster.fits'],
    titlePrefixes: [
      'Seoul-Inspired Oversized Layer', 'Gangnam Soft-Edge Fit', 'Hannam-dong Afternoon Look',
      'K-Drama Leading Man Set', 'Bukchon Village Stroll', 'Itaewon Café Mood',
    ],
  },
  {
    aesthetic: 'Techwear',
    slug: 'techwear',
    items: [
      'Gore-Tex shell jacket', 'Articulated cargo pants', 'Utility molle vest',
      'Performance base layer', 'Waterproof anorak', 'Modular harness top',
      'Technical joggers', 'Reflective windbreaker', 'Neoprene pullover',
    ],
    accessories: [
      'Tactical sling bag', 'Magnetic buckle belt', 'Trail-runner sneakers',
      'UV-shield visor', 'Carabiner keychain set', 'Waterproof phone pouch',
    ],
    colors: ['#0A0A0A', '#1A1A2E', '#3D3D3D', '#00FF41', '#FFFFFF', '#2D2D2D'],
    vibes: ['Functional', 'Futuristic', 'Tactical', 'Dark-Utility', 'Cyberpunk'],
    trends: ['gorpcore', 'utility-maximalism', 'dark-futurism', 'modular-wear', 'neo-ninja'],
    moods: ['mysterious', 'powerful', 'edgy', 'confident', 'rebellious'],
    budgets: ['premium', 'luxury'],
    events: ['concert', 'casual', 'photoshoot', 'party'],
    creators: ['@teaboraxs', '@techwear.official', '@errolson_h'],
    titlePrefixes: [
      'Urban Operator Shell', 'Night Protocol Utility', 'Stealth Mode Rig',
      'Dark Corridor Layer', 'Neo-Tokyo Modular', 'System Override Kit',
    ],
  },
  {
    aesthetic: 'Minimal Luxury',
    slug: 'luxury-minimal',
    items: [
      'Italian wool blazer', 'Egyptian cotton tee', 'Tailored slim trousers',
      'Cashmere half-zip', 'Merino polo shirt', 'Unstructured linen suit',
      'Silk-blend camp collar shirt', 'Premium knit henley', 'Relaxed-fit chinos',
    ],
    accessories: [
      'Brushed gold watch', 'Leather card holder', 'Suede loafers',
      'Tortoiseshell sunglasses', 'Italian leather belt', 'Linen pocket square',
    ],
    colors: ['#FFFFFF', '#1A1A1A', '#F5F0EB', '#C9B896', '#E8E8E8', '#2C2C2C'],
    vibes: ['Refined', 'Timeless', 'Elevated', 'Understated', 'Premium'],
    trends: ['quiet-luxury', 'stealth-wealth', 'capsule-wardrobe', 'less-is-more', 'row-coded'],
    moods: ['sophisticated', 'confident', 'serene', 'powerful', 'mysterious'],
    budgets: ['premium', 'luxury'],
    events: ['luxury-dinner', 'office', 'brunch', 'date-night', 'photoshoot'],
    creators: ['@danielsimmons', '@therow.archive', '@luxuryminimal'],
    titlePrefixes: [
      'Quiet Wealth Essential', 'Italian Riviera Layer', 'The Row-Coded Set',
      'Monaco Terrace Fit', 'Stealth Luxury Statement', 'Gallery Opening Look',
    ],
  },
  {
    aesthetic: 'Monochrome Minimal',
    slug: 'monochrome',
    items: [
      'Black structured tee', 'Charcoal wide-leg pants', 'Slate overcoat',
      'Ink-black mock-neck', 'Graphite knit sweater', 'Shadow-grey joggers',
      'Obsidian bomber jacket', 'Onyx slim trousers', 'Midnight shirt jacket',
    ],
    accessories: [
      'Matte black watch', 'Black leather Chelsea boots', 'Gunmetal chain',
      'Black canvas tote', 'Monochrome ring set', 'Dark aviator sunglasses',
    ],
    colors: ['#000000', '#1C1C1C', '#333333', '#555555', '#808080', '#FFFFFF'],
    vibes: ['Sleek', 'Architectural', 'Moody', 'Sharp', 'Minimal'],
    trends: ['all-black-everything', 'monochrome-wave', 'anti-color', 'shadow-dressing', 'noir-aesthetic'],
    moods: ['mysterious', 'powerful', 'sophisticated', 'edgy', 'serene'],
    budgets: ['mid-range', 'premium', 'luxury'],
    events: ['photoshoot', 'date-night', 'luxury-dinner', 'party', 'office'],
    creators: ['@allblackeverything', '@monochrome.men', '@darkminimal'],
    titlePrefixes: [
      'Shadow Gradient Layer', 'Noir Architecture Set', 'Midnight Silhouette',
      'Ink & Obsidian Drop', 'Charcoal Studio Fit', 'Eclipse Tonal Look',
    ],
  },
  {
    aesthetic: 'Streetwear',
    slug: 'skater',
    items: [
      'Graphic skate tee', 'Loose carpenter jeans', 'Flannel overshirt',
      'Skate-brand hoodie', 'Corduroy work jacket', 'Vintage band tee',
      'Dickies work pants', 'Mesh-back trucker vest', 'Canvas anorak',
    ],
    accessories: [
      'Vans Old Skool sneakers', 'Snapback cap', 'Canvas belt', 'Thrasher beanie',
      'Tube socks', 'Keychain lanyard', 'Wrist sweatband',
    ],
    colors: ['#8B4513', '#2F4F4F', '#FFFFFF', '#000000', '#FFD700', '#B22222'],
    vibes: ['Grungy', 'Carefree', 'Raw', 'Anti-establishment', 'Authentic'],
    trends: ['skate-culture', 'thrift-flip', 'grunge-revival', '90s-nostalgia', 'diy-punk'],
    moods: ['rebellious', 'playful', 'edgy', 'confident', 'powerful'],
    budgets: ['budget', 'mid-range'],
    events: ['casual', 'concert', 'college-fest', 'party'],
    creators: ['@nikesb.archive', '@skatecore', '@thrashermag.fits'],
    titlePrefixes: [
      'Halfpipe Heritage Look', 'Concrete Park Classic', 'Venice Beach Session',
      'DIY Punk Layer', 'Thrift-Flip Skate Set', 'Boardwalk Grind Fit',
    ],
  },
  {
    aesthetic: 'Cyber Minimal',
    slug: 'cyber-minimal',
    items: [
      'Neoprene crewneck', 'Geometric-cut trousers', 'Reflective shell jacket',
      'Bonded seam tee', 'Laser-cut vest', 'Technical knit pullover',
      'Holographic accent hoodie', 'Structured cargo shorts', 'Mesh-panel joggers',
    ],
    accessories: [
      'LED-accent sneakers', 'Titanium bracelet', 'Smart ring', 'Translucent backpack',
      'Mirrored shield sunglasses', 'Cable-management crossbody',
    ],
    colors: ['#0D0D0D', '#00FFFF', '#FFFFFF', '#1A1A2E', '#C0C0C0', '#7B68EE'],
    vibes: ['Digital', 'Neo-futurist', 'Sleek', 'Glitch', 'Algorithmic'],
    trends: ['cyber-minimalism', 'digital-fashion', 'techno-aesthetic', 'ai-core', 'neo-chrome'],
    moods: ['mysterious', 'powerful', 'edgy', 'confident', 'sophisticated'],
    budgets: ['premium', 'luxury'],
    events: ['party', 'concert', 'photoshoot', 'club'],
    creators: ['@cyberfashion.lab', '@futuristic.fits', '@neodigital.wear'],
    titlePrefixes: [
      'Digital Frontier Shell', 'Algorithm Layer', 'Neon Grid Statement',
      'Cyber-Space Capsule', 'Matrix Protocol Fit', 'Pixel Dissolve Set',
    ],
  },
  {
    aesthetic: 'Old Money',
    slug: 'old-money',
    items: [
      'Navy cable-knit sweater', 'Tailored chinos', 'Oxford button-down shirt',
      'Tweed sport coat', 'V-neck cashmere pullover', 'Pressed khaki trousers',
      'Striped rugby polo', 'Linen blazer', 'Merino wool vest',
    ],
    accessories: [
      'Penny loafers', 'Leather-strap dress watch', 'Woven leather belt',
      'Tortoiseshell clubmaster glasses', 'Monogrammed pocket square', 'Boat shoes',
    ],
    colors: ['#1C1C1C', '#C9B896', '#FFFFFF', '#2F4F4F', '#8B4513', '#003366'],
    vibes: ['Classic', 'Refined', 'Understated', 'Heritage', 'Preppy'],
    trends: ['old-money-aesthetic', 'ivy-league-prep', 'quiet-luxury', 'heritage-style', 'country-club'],
    moods: ['sophisticated', 'confident', 'serene', 'powerful', 'mysterious'],
    budgets: ['premium', 'luxury'],
    events: ['brunch', 'luxury-dinner', 'wedding', 'office', 'date-night'],
    creators: ['@oldmoneyaesthetic', '@ivyleague.style', '@preppyfashion'],
    titlePrefixes: [
      'Ivy League Heritage Set', 'Country Club Morning', 'Hamptons Weekend Look',
      'Polo Club Essential', 'Old Guard Classic', 'Trust Fund Casual',
    ],
  },
  {
    aesthetic: 'Streetwear',
    slug: 'gymwear',
    items: [
      'Performance compression tee', 'Tapered jogger pants', 'Sleeveless muscle tank',
      'Quarter-zip pullover', 'Training shorts', 'Dry-fit hoodie',
      'Mesh-panel track jacket', 'Compression leggings', 'Lifting tank',
    ],
    accessories: [
      'Training sneakers', 'Sports watch', 'Gym duffle bag', 'Lifting gloves',
      'Resistance band set', 'Wireless earbuds case', 'Performance headband',
    ],
    colors: ['#000000', '#1C1C1C', '#4169E1', '#FF4500', '#FFFFFF', '#2E8B57'],
    vibes: ['Athletic', 'Powerful', 'Disciplined', 'Active', 'Energized'],
    trends: ['gym-shark-coded', 'athleisure-wave', 'fit-check', 'pump-cover', 'gym-to-street'],
    moods: ['powerful', 'confident', 'edgy', 'rebellious', 'playful'],
    budgets: ['budget', 'mid-range', 'premium'],
    events: ['casual', 'college-fest', 'concert', 'party'],
    creators: ['@davidlaid', '@cbum', '@gymshark.community'],
    titlePrefixes: [
      'Iron Temple Session', 'Pump Cover Essential', 'Gym-to-Street Bridge',
      'Rep PR Celebration', 'Morning Grind Set', 'Athletic Genesis Kit',
    ],
  },
  {
    aesthetic: 'Minimal Luxury',
    slug: 'smart-casual',
    items: [
      'Unstructured cotton blazer', 'Slim-fit OCBD shirt', 'Tapered chinos',
      'Fine-gauge knit polo', 'Merino blend tee', 'Stretch dress pants',
      'Linen camp collar shirt', 'Cashmere crewneck', 'Tailored bermuda shorts',
    ],
    accessories: [
      'Clean leather sneakers', 'Minimalist dress watch', 'Braided leather belt',
      'Suede desert boots', 'Slim card wallet', 'Polarized sunglasses',
    ],
    colors: ['#2C3E50', '#ECF0F1', '#34495E', '#BDC3C7', '#FFFFFF', '#1A1A1A'],
    vibes: ['Polished', 'Approachable', 'Smart', 'Versatile', 'Easy-going'],
    trends: ['smart-casual-king', 'office-siren-male', 'business-casual-2.0', 'elevated-basics', 'capsule-core'],
    moods: ['confident', 'sophisticated', 'serene', 'playful', 'powerful'],
    budgets: ['mid-range', 'premium'],
    events: ['office', 'brunch', 'date-night', 'luxury-dinner', 'wedding'],
    creators: ['@smartcasual.men', '@capsulewardrobemen', '@businesscasual.king'],
    titlePrefixes: [
      'Corner Office Ready', 'Brunch District Fit', 'Business-Casual Elevated',
      'Boardroom-to-Bar Look', 'Weekend Smart Set', 'Gallery Vernissage Kit',
    ],
  },
  {
    aesthetic: 'TikTok Viral',
    slug: 'tiktok-fashion',
    items: [
      'Boxy cropped tee', 'Pleated wide-leg trousers', 'Mesh layer tank',
      'Statement print shirt', 'Knit short-sleeve set', 'Retro track jacket',
      'Color-block windbreaker', 'Oversized resort shirt', 'Drawstring linen pants',
    ],
    accessories: [
      'Dad sneakers', 'Pearl necklace', 'Tinted sunglasses', 'Crochet bucket hat',
      'Beaded phone strap', 'Shell ankle bracelet', 'Layered rings',
    ],
    colors: ['#FF69B4', '#87CEEB', '#FFFFFF', '#E6E6FA', '#FFD700', '#00CED1'],
    vibes: ['Viral', 'Trendsetting', 'Eye-catching', 'Main-character', 'Unapologetic'],
    trends: ['tiktok-fit-check', 'main-character-energy', 'that-boy', 'hot-boy-summer', 'fyp-fashion'],
    moods: ['playful', 'confident', 'edgy', 'rebellious', 'dreamy'],
    budgets: ['budget', 'mid-range'],
    events: ['party', 'casual', 'college-fest', 'concert', 'date-night'],
    creators: ['@wisaamxst', '@fashiontiktok', '@whatiworetoday'],
    titlePrefixes: [
      'FYP Viral Statement', 'Main Character Moment', 'TikTok Fit Check',
      'Algorithm-Approved Drop', 'Trending Sound Fit', 'Duet-Worthy Look',
    ],
  },
  {
    aesthetic: 'Streetwear',
    slug: 'sneaker-culture',
    items: [
      'Premium blank hoodie', 'Vintage wash denim', 'Jersey shorts',
      'Heavyweight pocket tee', 'Nylon track pants', 'Quilted vest',
      'Retro windbreaker', 'Varsity jacket', 'French terry joggers',
    ],
    accessories: [
      'Retro Jordan 1s', 'New Balance 550s', 'Dunk Lows', 'AF1s',
      'Sneaker duffle bag', 'Sneaker-themed socks', 'Shoelace swaps',
    ],
    colors: ['#FFFFFF', '#FF0000', '#000000', '#1E90FF', '#228B22', '#DAA520'],
    vibes: ['Collector', 'Hype', 'OG', 'Clean', 'Curated'],
    trends: ['sneaker-head', 'shoe-game', 'grail-check', 'on-feet', 'sneaker-rotation'],
    moods: ['confident', 'playful', 'powerful', 'rebellious', 'edgy'],
    budgets: ['mid-range', 'premium', 'luxury'],
    events: ['casual', 'concert', 'college-fest', 'party'],
    creators: ['@sneakerheaduk', '@solecollector', '@kicksonfire'],
    titlePrefixes: [
      'Grail Rotation Fit', 'On-Feet Statement', 'Sneaker Museum Set',
      'Heat Check Combo', 'Sole Collector Drop', 'Deadstock Drip',
    ],
  },
  {
    aesthetic: 'Scandinavian Minimal',
    slug: 'layered-winter',
    items: [
      'Wool overcoat', 'Chunky cable-knit sweater', 'Thermal henley',
      'Shearling-lined jacket', 'Flannel-lined chinos', 'Down puffer vest',
      'Merino turtleneck', 'Waxed cotton jacket', 'Heavyweight flannel shirt',
    ],
    accessories: [
      'Cashmere scarf', 'Leather gloves', 'Chelsea boots', 'Wool beanie',
      'Insulated tote', 'Merino wool socks',
    ],
    colors: ['#2C2C2C', '#8B7355', '#F5F0EB', '#4A4A4A', '#D2B48C', '#1C1C1C'],
    vibes: ['Cozy', 'Layered', 'Nordic', 'Warm', 'Rugged-refined'],
    trends: ['layer-game', 'cozy-boy', 'nordic-minimal', 'winter-capsule', 'earth-tone-era'],
    moods: ['serene', 'sophisticated', 'dreamy', 'mysterious', 'confident'],
    budgets: ['mid-range', 'premium', 'luxury'],
    events: ['casual', 'brunch', 'date-night', 'office', 'airport'],
    creators: ['@nordicmenswear', '@cozyboyaesthetic', '@scandinavian.style'],
    titlePrefixes: [
      'Nordic Frost Layer', 'Fireside Evening Set', 'Scandinavian Winter Kit',
      'Hygge Season Capsule', 'Alpine Lodge Look', 'Blizzard-Ready Rig',
    ],
  },
  {
    aesthetic: 'Futuristic Editorial',
    slug: 'futuristic-editorial',
    items: [
      'Sculptural shoulder blazer', 'Asymmetric-hem shirt', 'Deconstructed trench',
      'Avant-garde draped top', 'Molded-panel trousers', 'Exaggerated-collar coat',
      'Origami-fold vest', 'Transparent overlay jacket', 'Architectural cape',
    ],
    accessories: [
      'Geometric metal cuff', 'Platform sole boots', 'Sculptural earpiece',
      'Structured clutch', 'Chrome visor', 'Chain-link harness',
    ],
    colors: ['#C0C0C0', '#000000', '#FFFFFF', '#4B0082', '#FFD700', '#1A1A2E'],
    vibes: ['Avant-garde', 'Editorial', 'Visionary', 'Otherworldly', 'Provocative'],
    trends: ['fashion-week-coded', 'avant-garde-menswear', 'editorial-shoot', 'deconstructed', 'conceptual-fashion'],
    moods: ['powerful', 'mysterious', 'edgy', 'confident', 'sophisticated'],
    budgets: ['luxury'],
    events: ['photoshoot', 'party', 'concert', 'luxury-dinner'],
    creators: ['@maisonmargiela', '@balenciaga.archive', '@avant.fashion'],
    titlePrefixes: [
      'Runway Deconstruction', 'Avant-Garde Editorial', 'Future Archive Look',
      'Couture Disruption Set', 'Maison Atelier Piece', 'Visionary Silhouette',
    ],
  },
];

// ─── Utility Functions ──────────────────────────────────────────────

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function pickItem<T>(array: T[], seed: number): T {
  return array[Math.floor(seededRandom(seed) * array.length)];
}

function pickItems<T>(array: T[], count: number, seed: number): T[] {
  const result: T[] = [];
  const available = [...array];
  for (let i = 0; i < Math.min(count, available.length); i++) {
    const idx = Math.floor(seededRandom(seed + i * 7) * available.length);
    result.push(available[idx]);
    available.splice(idx, 1);
  }
  return result;
}

function generateTitle(prefix: string, index: number): string {
  return `${prefix} #${index}`;
}

// ─── Main Generator ─────────────────────────────────────────────────

export function generateMaleDataset(count: number = 50000): ExtendedFashionOutfit[] {
  const outfits: ExtendedFashionOutfit[] = [];
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter', 'all-season'];
  const ageGroups = ['18-22', '22-26', '26-30', '30-35'];
  const bodyTypes = ['slim', 'athletic', 'average', 'muscular', 'tall-lean'];
  const gender: Gender = 'male';
  const categoryCount = MALE_CATEGORIES.length;

  for (let i = 0; i < count; i++) {
    const cat = MALE_CATEGORIES[i % categoryCount];
    const seed = i * 31 + 17;
    const season = pickItem(seasons, seed);
    const trendVelocity = Math.round((seededRandom(seed + 1) * 80 + 20) * 10) / 10;
    const engagementScore = Math.round(seededRandom(seed + 2) * 100 * 10) / 10;
    const saveRate = Math.round(seededRandom(seed + 3) * 40 * 10) / 10;
    const popularityScore = Math.round(seededRandom(seed + 4) * 100);
    const titlePrefix = pickItem(cat.titlePrefixes, seed + 5);
    const vibe = pickItem(cat.vibes, seed + 6);
    const mood = pickItem(cat.moods, seed + 7);
    const budget = pickItem(cat.budgets, seed + 8);

    const outfit: ExtendedFashionOutfit = {
      id: `male-${cat.slug}-${i}`,
      title: generateTitle(titlePrefix, i),
      gender,
      aesthetic: cat.aesthetic,
      colors: pickItems(cat.colors, 3, seed + 10),
      clothingItems: pickItems(cat.items, Math.floor(seededRandom(seed + 11) * 2) + 3, seed + 12),
      accessories: pickItems(cat.accessories, Math.floor(seededRandom(seed + 13) * 2) + 2, seed + 14),
      vibe,
      popularityScore,
      season,
      moodTags: [
        ...pickItems(cat.trends, 2, seed + 15),
        vibe.toLowerCase(),
        cat.aesthetic.toLowerCase().replace(/ /g, '-'),
      ],
      recommendationWeight: Math.round(seededRandom(seed + 16) * 100) / 100,
      imageUrl: getAestheticImage(cat.aesthetic, gender, i),
      trendVelocity,
      engagementScore,
      saveRate,
      genZTrendTags: pickItems(cat.trends, 3, seed + 17),
      fashionMood: mood,
      creatorInspiration: pickItem(cat.creators, seed + 18),
      aestheticClusterId: (i % categoryCount) + 1,
      personalizationMeta: {
        ageGroup: pickItem(ageGroups, seed + 19),
        bodyTypes: pickItems(bodyTypes, 2, seed + 20),
        occasions: pickItems(cat.events, Math.floor(seededRandom(seed + 21) * 2) + 2, seed + 22),
        budgetTier: budget,
      },
    };

    outfits.push(outfit);
  }

  return outfits;
}
