import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AESTHETICS = [
  'Streetwear', 'Old Money', 'Clean Girl', 'Y2K', 'Dark Academia', 'Minimal Luxury',
  'Techwear', 'Vintage', 'Scandinavian Minimal', 'Korean Casual', 'Quiet Luxury',
  'Pinterest Core', 'TikTok Viral', 'Monochrome Minimal', 'Coquette', 'Soft Girl',
  'Futuristic Editorial', 'Cyber Minimal'
];

const GENDERS = ['male', 'female', 'unisex'];
const BUDGET_TIERS = ['budget', 'mid-range', 'premium', 'luxury'];

const CLOTHING_TEMPLATES: Record<string, Array<{ type: string; colors: string[]; items: string[] }>> = {
  'Streetwear': [
    { type: 'Outerwear', colors: ['Matte Black', 'Off-White', 'Neon Orange'], items: ['Oversized hoodie', 'Grafitti windbreaker', 'Utility vest'] },
    { type: 'Top', colors: ['Cream', 'Jet Black', 'Acid Wash Blue'], items: ['Graphic boxy tee', 'Heavyweight long sleeve', 'Ribbed tank'] },
    { type: 'Bottom', colors: ['Charcoal', 'Olive Green', 'Denim Blue'], items: ['Baggy cargo pants', 'Raw denim jeans', 'Drawstring sweatpants'] }
  ],
  'Minimal Luxury': [
    { type: 'Outerwear', colors: ['Taupe', 'Camel', 'Slate Gray'], items: ['Tailored wool coat', 'Cashmere trench', 'Double-breasted blazer'] },
    { type: 'Top', colors: ['Milk White', 'Black Silk', 'Warm Beige'], items: ['Merino knit crewneck', 'Silk button-down', 'Modal rib top'] },
    { type: 'Bottom', colors: ['Off-Black', 'Oatmeal', 'Espresso Brown'], items: ['Wide-leg tailored trousers', 'Fluid crepe pants', 'Straight wool pants'] }
  ],
  'Clean Girl': [
    { type: 'Outerwear', colors: ['Sage Green', 'Butter Cream', 'Bone'], items: ['Oversized linen blazer', 'Cropped trench coat', 'Soft knit cardigan'] },
    { type: 'Top', colors: ['Crisp White', 'Soft Heather', 'Nude'], items: ['Ribbed crop tank', 'Seamless bodysuit', 'Fine-knit polo'] },
    { type: 'Bottom', colors: ['Ecru', 'Light Wash Blue', 'Warm Gray'], items: ['High-waisted linen trousers', 'Dad jeans', 'Flowy tennis skirt'] }
  ],
  'Old Money': [
    { type: 'Outerwear', colors: ['Navy Blue', 'Chocolate', 'Ivory'], items: ['Cable-knit v-neck sweater', 'Structured tweed jacket', 'Suede bomber'] },
    { type: 'Top', colors: ['Classic White', 'Light Blue', 'Champagne'], items: ['Oxford poplin shirt', 'Pima cotton polo', 'Silk halter neck'] },
    { type: 'Bottom', colors: ['Stone Beige', 'Bright White', 'Navy'], items: ['Chino trousers', 'Pleated tennis shorts', 'High-rise linen pants'] }
  ],
  'Coquette': [
    { type: 'Outerwear', colors: ['Baby Pink', 'Soft Lilac', 'Powder Blue'], items: ['Pointelle lace cardigan', 'Cropped bouclé jacket', 'Ribbon knit shrug'] },
    { type: 'Top', colors: ['Vanilla Cream', 'Rose White', 'Pastel Pink'], items: ['Corset camisole', 'Lace-trim puff sleeve blouse', 'Bustier top'] },
    { type: 'Bottom', colors: ['Blossom Pink', 'Marshmallow', 'Soft Pearl'], items: ['Tiered ruffle skirt', 'Pleated mini skirt', 'Lace slip skirt'] }
  ]
};

const ACCESSORIES_TEMPLATES: Record<string, string[]> = {
  'Streetwear': ['Silver cuban chain', 'Nylon shoulder bag', 'Bucket hat', 'Shield sunglasses', 'Chunky rings'],
  'Minimal Luxury': ['Dainty gold watch', 'Leather card holder', 'Minimalist silver band', 'Tortoise shell sunglasses'],
  'Clean Girl': ['Thick gold hoops', 'Matte claw clip', 'Leather shoulder bag', 'Wireframe glasses'],
  'Old Money': ['Heritage leather watch', 'Pearl studs', 'Silk pocket square', 'Gold signet ring'],
  'Coquette': ['Ribbon bow hair clip', 'Pearl choker', 'Heart-shaped locket', 'Mini lace clutch'],
};

const TAGS_TEMPLATES: Record<string, string[]> = {
  'Streetwear': ['streetwear', 'boxy', 'oversized', 'graphic', 'unisex', 'vintage'],
  'Minimal Luxury': ['minimalist', 'luxury', 'tailored', 'understated', 'cashmere', 'monochrome'],
  'Clean Girl': ['cleangirl', 'effortless', 'aesthetic', 'dewy', 'comfy', 'neutral'],
  'Old Money': ['oldmoney', 'classic', 'prep', 'timeless', 'refined', 'vintage'],
  'Coquette': ['coquette', 'romantic', 'pastel', 'vintage', 'feminine', 'delicate'],
};

async function main() {
  console.log('🔄 Cleaning up existing databases...');
  // Delete existing outfits and seed users to clear the state
  await prisma.outfit.deleteMany();
  await prisma.user.upsert({
    where: { id: 'usr-demo-seed' },
    update: {},
    create: {
      id: 'usr-demo-seed',
      email: 'demo@slayr.app',
      username: 'demostylist',
      displayName: 'Demo Stylist',
      dominantAesthetic: 'Minimal Luxury',
    },
  });

  console.log('🔄 Preparing programmatically generated fashion datasets...');
  const BATCH_SIZE = 5000;
  const TOTAL_OUTFITS = 100000;
  const numBatches = TOTAL_OUTFITS / BATCH_SIZE;

  // Let's pre-generate unique outfit components to keep memory foot-print extremely lightweight
  const aestheticsList = AESTHETICS;

  for (let batch = 0; batch < numBatches; batch++) {
    const outfitsBatch: any[] = [];
    const startIdx = batch * BATCH_SIZE;

    for (let i = 0; i < BATCH_SIZE; i++) {
      const idx = startIdx + i;
      
      // Determine properties deterministically to simulate rich diversity
      const aesthetic = aestheticsList[idx % aestheticsList.length];
      const gender = GENDERS[idx % GENDERS.length];
      const budgetTier = BUDGET_TIERS[idx % BUDGET_TIERS.length];

      // Retrieve templates (with default fallback to streetwear/minimal)
      const clothingTemplate = CLOTHING_TEMPLATES[aesthetic] || CLOTHING_TEMPLATES['Streetwear'];
      const accessories = ACCESSORIES_TEMPLATES[aesthetic] || ACCESSORIES_TEMPLATES['Minimal Luxury'];
      const tags = TAGS_TEMPLATES[aesthetic] || TAGS_TEMPLATES['Clean Girl'];

      const score = 72 + (idx % 27); // 72-98

      // Generate clothing items
      const clothingItems = clothingTemplate.map((layer) => {
        const itemIdx = (idx + layer.items.length) % layer.items.length;
        const colorIdx = (idx + layer.colors.length) % layer.colors.length;
        return {
          type: layer.type,
          color: layer.colors[colorIdx],
          description: layer.items[itemIdx],
        };
      });

      // Generate color palette
      const colorPalette = [
        { hex: '#000000', name: 'Charcoal Black', dominance: 50 },
        { hex: '#FFFFFF', name: 'Milk White', dominance: 30 },
        { hex: '#C9B896', name: 'Oatmeal Beige', dominance: 20 },
      ];

      // Generate recommendations list
      const recommendations = [
        {
          category: 'Proportions',
          suggestion: 'Balance the oversized silhouettes with fitted key accents',
          reasoning: 'Guarantees the overall look does not appear slouchy and retains editorial poise.'
        },
        {
          category: 'Color harmony',
          suggestion: 'Introduce contrasting accessory highlight nodes',
          reasoning: 'Breaks the monochrome tone grid smoothly.'
        }
      ];

      outfitsBatch.push({
        id: `outfit-${idx}-${startIdx}`,
        userId: 'usr-demo-seed',
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + (idx % 8000)}?w=800&q=80`,
        score,
        aesthetic,
        vibe: `An effortlessly styled high-end fashion representation of ${aesthetic} for everyday luxury wear.`,
        clothingItems,
        colorPalette,
        recommendations,
        suggestedAccessories: accessories.slice(0, 3),
        fashionTags: [...tags, gender, budgetTier],
        likesCount: 10 + (idx % 490),
        savesCount: 5 + (idx % 230),
        trendVelocity: 30.0 + (idx % 70),
        engagementScore: 50.0 + (idx % 50),
        budgetTier,
        gender,
      });
    }

    console.log(`📦 Seeding Batch ${batch + 1}/${numBatches} (${BATCH_SIZE} items)...`);
    await prisma.outfit.createMany({
      data: outfitsBatch,
    });
  }

  console.log('🚀 Successfully seeded 100,000+ outfits in your Slayr database!');
}

main()
  .catch((e) => {
    console.error('❌ Seeder script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
