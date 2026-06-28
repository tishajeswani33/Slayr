import { AestheticStyle, Gender, Season, ExtendedFashionOutfit, FashionMood, BudgetTier, EventType } from '../types/fashion';
import { getAestheticImage } from '../utils/imageUrls';

// ─── Female Aesthetic Category Templates ────────────────────────────

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

const FEMALE_CATEGORIES: CategoryTemplate[] = [
  {
    aesthetic: 'Indian Traditional',
    slug: 'indian-traditional-female',
    items: [
      'Banarasi Silk Saree', 'Georgette Lehenga Choli', 'Anarkali flared suit',
      'Mirror-work Sharara set', 'Lucknowi Chikankari Kurti with Palazzo', 'Indo-Western draped gown',
      'Bandhani printed Kurti', 'Organza Saree with designer blouse', 'Patiala Salwar Kameez',
    ],
    accessories: [
      'Kundan Jhumka earrings', 'Embroidered Potli bag', 'Gold metallic bangles',
      'Silver Payal anklets', 'Stone studded Maang Tikka', 'Designer leather Juttis',
    ],
    colors: ['#800020', '#FF4500', '#FFD700', '#008080', '#C71585', '#E6E6FA'],
    vibes: ['Royal-Ethnic', 'Boho-Traditional', 'Graceful', 'Indo-Western-Fusion', 'Vibrant'],
    trends: ['modern-saree-drapes', 'lehenga-co-ords', 'potli-bags-chic', 'chikankari-palazzo'],
    moods: ['sophisticated', 'romantic', 'dreamy', 'powerful', 'confident'],
    budgets: ['budget', 'mid-range', 'premium', 'luxury'],
    events: ['wedding', 'formal', 'brunch', 'festival', 'college-fest', 'party'],
    creators: ['@sabyasachiofficial', '@manishmalhotra05', '@anitadongre'],
    titlePrefixes: [
      'Royal Banarasi Grace', 'Mirror-Work Sharara Glow', 'Embroidered Lehenga Set',
      'Chikankari Palazzo Harmony', 'Jaipur Block Print Silhouette', 'Indo-Western Fusion Drape',
    ],
  },
  {
    aesthetic: 'Party Wear',
    slug: 'party-wear-female',
    items: [
      'Sequinned bodycon mini dress', 'Satin cowl-neck slip dress', 'Metallic halter top & leather trousers',
      'Velvet wrap blazer dress', 'Mesh corset top with satin cargo pants', 'Sparkly glitter crop top set',
      'Off-shoulder satin gown', 'Rhinestone fringe cocktail dress', 'Sheer mesh long-sleeve bodysuit',
    ],
    accessories: [
      'Rhinestone encrusted clutch', 'Strappy metallic stiletto heels', 'Silver crystal statement earrings',
      'Rhinestone choker necklace', 'Glittering hair pins', 'Patent leather platform boots',
    ],
    colors: ['#D4AF37', '#E5E4E2', '#FF69B4', '#1A1A1A', '#4B0082', '#FF1493'],
    vibes: ['Glamorous', 'Sparkly', 'Bold-Clubwear', 'Sleek-Midnight', 'High-Drama'],
    trends: ['sequin-dresses', 'corset-layering', 'metallic-shimmer', 'rhinestone-accessories'],
    moods: ['confident', 'playful', 'powerful', 'romantic', 'edgy'],
    budgets: ['budget', 'mid-range', 'premium', 'luxury'],
    events: ['party', 'club', 'concert', 'festival', 'luxury-dinner'],
    creators: ['@balmain', '@muglerofficial', '@alexanderwangny'],
    titlePrefixes: [
      'Sparkling Night Out Ensemble', 'Satin Slip Glamour Set', 'Sequin Bodycon Silhouette',
      'Corset Cargo Night Coordinates', 'Glitter Metallic Statement', 'Midnight Cocktail Luxe',
    ],
  },
  {
    aesthetic: 'Clean Girl',
    slug: 'clean-girl',
    items: [
      'Ribbed white tank top', 'High-waisted straight jeans', 'Minimal slip dress',
      'Linen wrap skirt', 'Fitted bodysuit', 'Neutral knit set',
      'Organic cotton tee', 'Wide-leg linen trousers', 'Seamless crop top',
    ],
    accessories: [
      'Gold hoop earrings', 'White leather sneakers', 'Straw tote bag',
      'Tortoiseshell claw clip', 'Dainty layered necklaces', 'Canvas slides',
      'Silk headband',
    ],
    colors: ['#F8F8F8', '#D4B5A0', '#FFFFFF', '#FFE4E1', '#FFF5EE', '#E8D5C4'],
    vibes: ['Fresh', 'Effortless', 'Glowy', 'Natural', 'Polished'],
    trends: ['clean-girl-aesthetic', 'no-makeup-makeup', 'slicked-back-bun', 'dewy-glow', 'that-girl'],
    moods: ['serene', 'confident', 'playful', 'dreamy', 'sophisticated'],
    budgets: ['budget', 'mid-range', 'premium'],
    events: ['brunch', 'casual', 'date-night', 'office', 'airport'],
    creators: ['@matildadjerf', '@hannahmeloche', '@cleangirlaesthetic'],
    titlePrefixes: [
      'Morning Glow Essential', 'That Girl Starter Set', 'Dewy Skin Energy Look',
      'Slicked-Back Sunday', 'Pilates-to-Brunch Fit', 'Golden Hour Glow',
    ],
  },
  {
    aesthetic: 'Coquette',
    slug: 'coquette',
    items: [
      'Lace corset top', 'Tulle mini skirt', 'Ribbon-tie cardigan',
      'Ruffle hem dress', 'Satin bow blouse', 'Peter Pan collar top',
      'Puff-sleeve mini dress', 'Silk camisole', 'Tiered babydoll dress',
    ],
    accessories: [
      'Satin bow hair clips', 'Mary Jane pumps', 'Pearl choker necklace',
      'Mini quilted bag', 'Lace ankle socks', 'Velvet ribbon choker',
      'Dainty charm bracelet',
    ],
    colors: ['#FFB6C1', '#FFFFFF', '#FFC0CB', '#FFE4E1', '#F0E6EF', '#FADADD'],
    vibes: ['Romantic', 'Delicate', 'Feminine', 'Whimsical', 'Dainty'],
    trends: ['coquette-era', 'bow-obsession', 'ballet-core', 'dollette', 'soft-feminine'],
    moods: ['romantic', 'dreamy', 'playful', 'serene', 'sophisticated'],
    budgets: ['budget', 'mid-range', 'premium'],
    events: ['date-night', 'brunch', 'party', 'photoshoot', 'wedding'],
    creators: ['@coquetteaesthetic', '@dollette.diary', '@bowgirlera'],
    titlePrefixes: [
      'Bow Season Statement', 'Ballet Slipper Moment', 'Dollette Dream Set',
      'Ribbon-Wrapped Evening', 'Parisian Ballerina Look', 'Lace & Pearl Layer',
    ],
  },
  {
    aesthetic: 'Old Money',
    slug: 'old-money',
    items: [
      'Cashmere twinset', 'Pleated tennis skirt', 'Silk button-down blouse',
      'Structured tweed blazer', 'Wool midi dress', 'High-waisted trousers',
      'Cable-knit crew sweater', 'A-line wool skirt', 'Camel coat',
    ],
    accessories: [
      'Pearl stud earrings', 'Leather loafers', 'Structured top-handle bag',
      'Gold link bracelet', 'Silk neck scarf', 'Leather ballet flats',
      'Cashmere wrap',
    ],
    colors: ['#1C1C1C', '#C9B896', '#FFFFFF', '#2F4F4F', '#8B4513', '#F5F0EB'],
    vibes: ['Elegant', 'Timeless', 'Refined', 'Polished', 'Sophisticated'],
    trends: ['old-money-girl', 'quiet-luxury', 'country-club-chic', 'ivy-league-prep', 'stealth-wealth'],
    moods: ['sophisticated', 'confident', 'serene', 'powerful', 'mysterious'],
    budgets: ['premium', 'luxury'],
    events: ['luxury-dinner', 'wedding', 'brunch', 'office', 'date-night'],
    creators: ['@oldmoneygirl', '@quietluxury.her', '@preppyprincess'],
    titlePrefixes: [
      'Country Club Afternoon', 'Hamptons Brunch Set', 'Ivy League Legacy',
      'Trust Fund Essential', 'Yacht Week Capsule', 'Old Guard Elegance',
    ],
  },
  {
    aesthetic: 'Soft Girl',
    slug: 'soft-girl',
    items: [
      'Pastel cardigan', 'Pleated mini skirt', 'Fuzzy cropped sweater',
      'Gingham dress', 'Puff-sleeve blouse', 'Knit tube top',
      'Floral wrap top', 'Ruched mini dress', 'Oversized pastel hoodie',
    ],
    accessories: [
      'Cloud-shaped bag', 'Platform sneakers', 'Butterfly clips',
      'Beaded friendship bracelets', 'Heart-shaped sunglasses', 'Chunky hair claw',
      'Fuzzy tote bag',
    ],
    colors: ['#FFB6C1', '#E6E6FA', '#FFDAB9', '#87CEEB', '#F0FFF0', '#FFF0F5'],
    vibes: ['Sweet', 'Dreamy', 'Pastel', 'Cozy', 'Gentle'],
    trends: ['soft-girl-era', 'pastel-everything', 'kawaii-western', 'cozy-core', 'cottagecore-lite'],
    moods: ['dreamy', 'playful', 'romantic', 'serene', 'confident'],
    budgets: ['budget', 'mid-range'],
    events: ['casual', 'date-night', 'brunch', 'college-fest', 'party'],
    creators: ['@softgirlcheck', '@pastelvibes', '@dreamyaesthetic'],
    titlePrefixes: [
      'Cloud Nine Pastel', 'Dreamy Afternoon Set', 'Soft Hour Capsule',
      'Butterfly Garden Look', 'Cotton Candy Moment', 'Pastel Daydream Fit',
    ],
  },
  {
    aesthetic: 'Korean Casual',
    slug: 'korean-pinterest',
    items: [
      'Cropped knit cardigan', 'Tennis pleated skirt', 'Oversized blazer dress',
      'Ribbed knit top', 'Wide-leg denim', 'Sheer layering top',
      'Structured mini bag', 'Boxy crop tee', 'Tweed mini skirt',
    ],
    accessories: [
      'Platform Mary Janes', 'Minimal canvas tote', 'Pearl hair clips',
      'Thin-frame glasses', 'Knit leg warmers', 'Leather crossbody bag',
      'Satin ribbon headband',
    ],
    colors: ['#E8D5C4', '#9B6B6B', '#F0F0F0', '#FFB6C1', '#FFFFFF', '#D4C5B2'],
    vibes: ['K-Beauty', 'Effortless', 'Layered', 'Curated', 'Pinterest-Perfect'],
    trends: ['k-fashion', 'korean-girl-aesthetic', 'pinterest-board-irl', 'minimal-korean', 'seoul-street'],
    moods: ['dreamy', 'serene', 'playful', 'romantic', 'sophisticated'],
    budgets: ['mid-range', 'premium'],
    events: ['casual', 'brunch', 'date-night', 'photoshoot', 'airport'],
    creators: ['@seoulstreetstyle', '@kbeautyfashion', '@koreangirlstyle'],
    titlePrefixes: [
      'Gangnam Café Mood', 'Seoul Station Layer', 'K-Beauty Influence Set',
      'Hongdae Street Snap', 'Cherry Blossom Walk', 'Bukchon Hanok Stroll',
    ],
  },
  {
    aesthetic: 'Scandinavian Minimal',
    slug: 'scandi-minimal',
    items: [
      'Structured wool coat', 'Organic cotton turtleneck', 'Wide-leg tailored pants',
      'Linen shift dress', 'Oversized knit sweater', 'Cotton poplin shirt',
      'Wool culottes', 'Minimalist jumpsuit', 'Cashmere hoodie',
    ],
    accessories: [
      'Leather ankle boots', 'Architectural silver earrings', 'Canvas backpack',
      'Leather strap watch', 'Wool felt hat', 'Structured leather tote',
      'Merino wool scarf',
    ],
    colors: ['#F5F0EB', '#2C2C2C', '#FFFFFF', '#E8E8E8', '#B0A89A', '#4A4A4A'],
    vibes: ['Clean', 'Nordic', 'Architectural', 'Understated', 'Intentional'],
    trends: ['scandi-minimalism', 'capsule-queen', 'less-but-better', 'neutral-palette', 'hygge-fashion'],
    moods: ['serene', 'sophisticated', 'confident', 'dreamy', 'powerful'],
    budgets: ['mid-range', 'premium', 'luxury'],
    events: ['office', 'brunch', 'casual', 'airport', 'luxury-dinner'],
    creators: ['@scandistyle', '@minimalistfashion', '@nordicchic'],
    titlePrefixes: [
      'Copenhagen Morning Walk', 'Hygge Capsule Layer', 'Nordic Atelier Set',
      'Stockholm Studio Look', 'Fjord-Side Essential', 'Arctic Light Minimal',
    ],
  },
  {
    aesthetic: 'Y2K',
    slug: 'y2k',
    items: [
      'Low-rise flare jeans', 'Butterfly halter top', 'Velour tracksuit',
      'Metallic mini skirt', 'Tube top', 'Bedazzled baby tee',
      'Platform boot-cut pants', 'Mesh overlay top', 'Holographic crop top',
    ],
    accessories: [
      'Chunky platform sandals', 'Tinted visor sunglasses', 'Mini baguette bag',
      'Belly chain', 'Rhinestone phone case', 'Plastic choker necklace',
      'Butterfly hair clips',
    ],
    colors: ['#FF69B4', '#00BFFF', '#C0C0C0', '#FF1493', '#7B68EE', '#FFD700'],
    vibes: ['Retro-Futuristic', 'Glam', 'Nostalgic', 'Playful', 'Bold'],
    trends: ['y2k-revival', 'paris-hilton-coded', 'cyber-y2k', 'mcbling', '2000s-nostalgia'],
    moods: ['playful', 'confident', 'edgy', 'rebellious', 'dreamy'],
    budgets: ['budget', 'mid-range'],
    events: ['party', 'club', 'concert', 'college-fest', 'casual'],
    creators: ['@y2kaesthetic', '@2000snostalgia', '@mcbling.era'],
    titlePrefixes: [
      'Paris Hilton Coded Set', 'McBling Revival Fit', 'Butterfly Millennium Look',
      'Velour Lounge Statement', 'Chrome Millennium Bug', 'Pop Princess Reloaded',
    ],
  },
  {
    aesthetic: 'Dark Academia',
    slug: 'dark-academia',
    items: [
      'Tweed blazer', 'Plaid pleated skirt', 'Turtleneck sweater',
      'Oxford button-up shirt', 'Corduroy trousers', 'Knit sweater vest',
      'Wool pencil skirt', 'Poet blouse', 'Velvet waistcoat',
    ],
    accessories: [
      'Leather satchel', 'Oxford brogues', 'Wire-frame glasses',
      'Antique brooch', 'Wool beret', 'Leather-bound journal bag',
      'Silk necktie scarf',
    ],
    colors: ['#3C2415', '#5C4033', '#8B7355', '#2F2F2F', '#F5F0EB', '#800020'],
    vibes: ['Scholarly', 'Moody', 'Gothic-Lite', 'Intellectual', 'Poetic'],
    trends: ['dark-academia', 'bookish-aesthetic', 'library-girl', 'oxford-coded', 'poet-era'],
    moods: ['mysterious', 'sophisticated', 'dreamy', 'romantic', 'serene'],
    budgets: ['budget', 'mid-range', 'premium'],
    events: ['office', 'casual', 'date-night', 'photoshoot', 'brunch'],
    creators: ['@darkacademiagirl', '@oxfordaesthetic', '@librarygirlera'],
    titlePrefixes: [
      'Oxford Library Layer', 'Dead Poets Society Fit', 'Autumn Reading Room',
      'Gothic Campus Set', 'Candlelit Study Session', 'Manuscript Archive Look',
    ],
  },
  {
    aesthetic: 'Cyber Minimal',
    slug: 'cyber-minimal',
    items: [
      'Structured neoprene top', 'Geometric-seam leggings', 'Reflective mini dress',
      'Technical crop jacket', 'Bonded-edge skirt', 'Transparent overlay blouse',
      'Holographic bodysuit', 'Mesh-panel catsuit', 'Chrome-accent coat',
    ],
    accessories: [
      'Metallic ankle boots', 'LED earrings', 'Smart bracelet', 'Clear PVC bag',
      'Chrome visor sunglasses', 'Titanium ring set',
      'Translucent phone clutch',
    ],
    colors: ['#0D0D0D', '#00FFFF', '#FFFFFF', '#C0C0C0', '#7B68EE', '#1A1A2E'],
    vibes: ['Digital', 'Neo-futurist', 'Glitch', 'Algorithmic', 'Sleek'],
    trends: ['cyber-girl', 'digital-fashion', 'chrome-aesthetic', 'neo-matrix', 'ai-core'],
    moods: ['powerful', 'mysterious', 'edgy', 'confident', 'sophisticated'],
    budgets: ['premium', 'luxury'],
    events: ['club', 'party', 'concert', 'photoshoot'],
    creators: ['@cyberfemme', '@digitalfashionista', '@chromegirl'],
    titlePrefixes: [
      'Chrome Grid Capsule', 'Digital Femme Rig', 'Neon Mainframe Set',
      'Matrix Decoded Look', 'Pixel Bloom Statement', 'Hologram Signal Fit',
    ],
  },
  {
    aesthetic: 'Futuristic Editorial',
    slug: 'luxury-editorial',
    items: [
      'Sculptural drape gown', 'Exaggerated shoulder coat', 'Asymmetric silk top',
      'Deconstructed blazer dress', 'Pleated origami skirt', 'Molded bodice top',
      'Avant-garde cape', 'Architectural trench', 'Sheer paneled dress',
    ],
    accessories: [
      'Statement platform boots', 'Geometric chandelier earrings', 'Sculptural clutch',
      'Chrome cuff bracelet', 'Architectural headpiece', 'Chain-link belt',
      'Metal mesh bag',
    ],
    colors: ['#000000', '#FFFFFF', '#C0C0C0', '#FFD700', '#4B0082', '#800020'],
    vibes: ['Avant-garde', 'Editorial', 'Visionary', 'Provocative', 'Commanding'],
    trends: ['fashion-week-look', 'editorial-glam', 'haute-couture-inspo', 'runway-energy', 'met-gala-coded'],
    moods: ['powerful', 'mysterious', 'sophisticated', 'confident', 'edgy'],
    budgets: ['luxury'],
    events: ['photoshoot', 'luxury-dinner', 'party', 'wedding'],
    creators: ['@voguearchive', '@editorialfashion', '@runwaydaily'],
    titlePrefixes: [
      'Runway Moment Captured', 'Met Gala Whisper', 'Couture Deconstruction',
      'Editorial Masterclass', 'Fashion Week Statement', 'Atelier Vision Set',
    ],
  },
  {
    aesthetic: 'Streetwear',
    slug: 'streetwear-fem',
    items: [
      'Oversized graphic hoodie', 'Baggy cargo pants', 'Crop tank top',
      'Oversized denim jacket', 'Track pants', 'Mesh overlay tee',
      'Puffer crop jacket', 'Wide-leg joggers', 'Boxy band tee',
    ],
    accessories: [
      'Chunky dad sneakers', 'Snapback cap', 'Mini crossbody bag',
      'Layered chain necklaces', 'Hoop earrings', 'Platform boots',
      'Fanny pack',
    ],
    colors: ['#000000', '#FF4500', '#FFFFFF', '#808080', '#FFD700', '#FF69B4'],
    vibes: ['Urban', 'Bold', 'Cool-Girl', 'Fierce', 'Unapologetic'],
    trends: ['tomboy-chic', 'streetwear-queen', 'oversized-era', 'cargo-everything', 'urban-goddess'],
    moods: ['confident', 'rebellious', 'edgy', 'powerful', 'playful'],
    budgets: ['budget', 'mid-range', 'premium'],
    events: ['concert', 'casual', 'college-fest', 'party', 'club'],
    creators: ['@streetwearqueen', '@urbangoddess', '@tomboychic'],
    titlePrefixes: [
      'Block Queen Statement', 'Urban Goddess Drip', 'Concrete Runway Set',
      'Late-Night Street Look', 'Cargo Queen Capsule', 'Hood Classic Elevated',
    ],
  },
  {
    aesthetic: 'Quiet Luxury',
    slug: 'quiet-luxury',
    items: [
      'Double-face cashmere coat', 'Silk charmeuse blouse', 'Tailored wide-leg trousers',
      'Merino knit midi dress', 'Unlined suede blazer', 'Italian cotton poplin shirt',
      'Cashmere jogger set', 'Stretch wool pencil skirt', 'Silk-knit tank',
    ],
    accessories: [
      'Leather slide sandals', 'Gold signet ring', 'Soft leather tote',
      'Diamond stud earrings', 'Cashmere travel wrap', 'Suede ballet flats',
      'Slim leather watch',
    ],
    colors: ['#F5F0EB', '#C9B896', '#FFFFFF', '#E8E8E8', '#2C2C2C', '#D4C5B2'],
    vibes: ['Whisper-Wealth', 'Understated', 'Luxe', 'Effortless', 'Polished'],
    trends: ['quiet-luxury', 'the-row-aesthetic', 'stealth-wealth', 'logo-free', 'investment-dressing'],
    moods: ['sophisticated', 'serene', 'confident', 'powerful', 'mysterious'],
    budgets: ['luxury'],
    events: ['luxury-dinner', 'office', 'brunch', 'airport', 'date-night', 'wedding'],
    creators: ['@quietluxuryliving', '@therow.daily', '@stealthwealth'],
    titlePrefixes: [
      'The Row Whisper', 'Stealth Wealth Essential', 'Private Jet Capsule',
      'Gallery Preview Set', 'Understated Power Look', 'Boardroom Silk Layer',
    ],
  },
  {
    aesthetic: 'TikTok Viral',
    slug: 'tiktok-viral',
    items: [
      'Matching knit co-ord set', 'Flared yoga pants', 'Bralette-and-blazer combo',
      'Asymmetric cut-out dress', 'Wide-leg linen pants', 'Corset-style tank top',
      'Sheer mesh long-sleeve', 'High-slit maxi skirt', 'Cropped denim vest',
    ],
    accessories: [
      'Chunky gold hoops', 'Platform UGG boots', 'Oversized tinted sunglasses',
      'Beaded bag', 'Layered pearl bracelets', 'Hair bow scrunchie',
      'Clear phone case with strap',
    ],
    colors: ['#FF69B4', '#E6E6FA', '#FFFFFF', '#FFD700', '#00CED1', '#FFA07A'],
    vibes: ['Viral', 'Main-Character', 'Trendsetting', 'FYP-Ready', 'Iconic'],
    trends: ['tiktok-made-me-buy-it', 'fyp-fashion', 'outfit-of-the-day', 'get-ready-with-me', 'fashion-haul'],
    moods: ['playful', 'confident', 'edgy', 'dreamy', 'rebellious'],
    budgets: ['budget', 'mid-range'],
    events: ['party', 'casual', 'date-night', 'concert', 'college-fest', 'club'],
    creators: ['@fashiontiktok', '@grwm.daily', '@outfitinspo'],
    titlePrefixes: [
      'FYP Viral Moment', 'GRWM Main Event', 'TikTok Made Me Wear This',
      'Duet This Outfit', 'Sound Trending Fit', 'Algorithm Blessed Look',
    ],
  },
  {
    aesthetic: 'Futuristic Editorial',
    slug: 'futuristic-fashion',
    items: [
      'Iridescent puffer jacket', 'Metallic pleated skirt', 'Neoprene bodycon dress',
      'Transparent PVC trench', 'LED-embedded crop top', 'Chrome-coated pants',
      'Sculptural 3D-printed top', 'Inflatable shoulder jacket', 'Liquid metal dress',
    ],
    accessories: [
      'Holographic visor', 'Geometric ear cuffs', 'Transparent platform boots',
      'Neon light-up clutch', 'Chrome chain belt', 'Metallic nail art set',
      'Smart ring',
    ],
    colors: ['#C0C0C0', '#7B68EE', '#000000', '#00FFFF', '#FF00FF', '#FFD700'],
    vibes: ['Otherworldly', 'Boundary-breaking', 'Sci-fi', 'Innovation', 'Electric'],
    trends: ['future-fashion', 'metaverse-wear', 'ai-fashion', 'digital-couture', 'post-human-style'],
    moods: ['powerful', 'edgy', 'mysterious', 'confident', 'rebellious'],
    budgets: ['premium', 'luxury'],
    events: ['photoshoot', 'party', 'club', 'concert'],
    creators: ['@futurefashionlab', '@metaversestyle', '@aicouture'],
    titlePrefixes: [
      'Hologram Runway Drop', 'Metaverse-Ready Fit', 'Post-Human Capsule',
      'Neon Orbit Statement', 'Digital Couture Vision', 'Quantum Shift Look',
    ],
  },
  {
    aesthetic: 'Monochrome Minimal',
    slug: 'minimalist-monochrome',
    items: [
      'Black structured blazer', 'White organic cotton tee', 'Charcoal wide-leg pants',
      'Ink-black silk camisole', 'Grey cashmere sweater dress', 'Obsidian wrap skirt',
      'Slate linen jumpsuit', 'Jet-black knit tube dress', 'Snow-white poplin shirt',
    ],
    accessories: [
      'Black leather ankle boots', 'Matte silver hoops', 'Monochrome leather tote',
      'Gunmetal chain necklace', 'Black cat-eye sunglasses', 'White ceramic watch',
      'Geometric silver ring',
    ],
    colors: ['#000000', '#1C1C1C', '#333333', '#FFFFFF', '#808080', '#F5F5F5'],
    vibes: ['Architectural', 'Sleek', 'Sharp', 'Editorial', 'Intentional'],
    trends: ['monochrome-queen', 'all-black-era', 'tonal-dressing', 'shadow-palette', 'anti-color'],
    moods: ['powerful', 'mysterious', 'sophisticated', 'edgy', 'serene'],
    budgets: ['mid-range', 'premium', 'luxury'],
    events: ['office', 'photoshoot', 'luxury-dinner', 'date-night', 'party'],
    creators: ['@monochromeminimal', '@allblackfashion', '@tonaldressing'],
    titlePrefixes: [
      'Shadow Architecture Set', 'Noir Gallery Opening', 'Tonal Gradient Layer',
      'Obsidian & Ivory Look', 'Eclipse Statement Fit', 'Graphite Studio Capsule',
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

export function generateFemaleDataset(count: number = 50000): ExtendedFashionOutfit[] {
  const outfits: ExtendedFashionOutfit[] = [];
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter', 'all-season'];
  const ageGroups = ['16-20', '20-24', '24-28', '28-32'];
  const bodyTypes = ['petite', 'slim', 'curvy', 'tall', 'athletic', 'plus-size'];
  const gender: Gender = 'female';
  const categoryCount = FEMALE_CATEGORIES.length;

  for (let i = 0; i < count; i++) {
    const cat = FEMALE_CATEGORIES[i % categoryCount];
    const seed = i * 37 + 23;
    const season = pickItem(seasons, seed);
    const trendVelocity = Math.round((seededRandom(seed + 1) * 80 + 20) * 10) / 10;
    const engagementScore = Math.round(seededRandom(seed + 2) * 100 * 10) / 10;
    const saveRate = Math.round(seededRandom(seed + 3) * 45 * 10) / 10;
    const popularityScore = Math.round(seededRandom(seed + 4) * 100);
    const titlePrefix = pickItem(cat.titlePrefixes, seed + 5);
    const vibe = pickItem(cat.vibes, seed + 6);
    const mood = pickItem(cat.moods, seed + 7);
    const budget = pickItem(cat.budgets, seed + 8);

    const outfit: ExtendedFashionOutfit = {
      id: `female-${cat.slug}-${i}`,
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
      aestheticClusterId: (i % categoryCount) + 100,
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
