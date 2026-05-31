# Moodboard System Guide

Complete guide to using and extending the slayr moodboard discovery system.

## 🎯 Overview

The moodboard system provides Pinterest-style aesthetic discovery with:
- Visual exploration of fashion aesthetics
- Save and collect favorite moodboards
- Search and filter capabilities
- Trending recommendations
- Immersive detail views

---

## 🚀 Quick Start

### View the Explore Feed
1. Open the app
2. Browse the masonry grid of moodboards
3. Scroll through trending carousel
4. Use search or filters

### Search Moodboards
```tsx
// Type in the search bar
"minimal" → finds Minimal Luxury moodboards
"vintage" → finds Dark Academia, Vintage
"streetwear" → finds urban styles
```

### Filter by Aesthetic
Click any aesthetic pill:
- All (default)
- Minimal Luxury
- Streetwear
- Korean Casual
- ... 11 total categories

### View Moodboard Details
1. Click any moodboard card
2. View large image
3. See color palette
4. Read vibe description
5. Explore related aesthetics
6. Save to collection

### Save Moodboards
- Click heart icon on any card
- Or click "Save" button in detail view
- View all saved in "Saved" screen

---

## 📱 User Interface

### Explore Screen Layout

```
┌────────────────────────────────────┐
│ slayr              Saved    [👤]  │
├────────────────────────────────────┤
│ [Search bar........................] │
├────────────────────────────────────┤
│ [All] [Minimal] [Streetwear]...   │
├────────────────────────────────────┤
│ Discover Your Aesthetic           │
│ Explore AI-curated moodboards     │
├────────────────────────────────────┤
│ Trending Now            View All → │
│ [→ Carousel of 6 moodboards →]    │
├────────────────────────────────────┤
│ All Moodboards                    │
│                                    │
│ ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
│ │    │  │    │  │    │  │    │   │
│ └────┘  └────┘  └────┘  └────┘   │
│ ┌────┐  ┌────┐  ┌────┐           │
│ │    │  │    │  │    │           │
│ └────┘  └────┘  └────┘           │
│                                    │
│              [+ FAB]               │
└────────────────────────────────────┘
```

### Moodboard Card

```
┌──────────────────┐
│                  │
│   [Image]        │
│               [♥]│
│                  │
│  [Badge]         │
│  Title           │
│  Description     │
│                  │
│  [♥] 1.2k [●●●] │
└──────────────────┘
```

### Detail Screen

```
┌────────────────────────────────────┐
│ ← Back                    [Save]   │
├────────────────────────────────────┤
│                                    │
│     [Large Hero Image]             │
│                                    │
├────────────────────────────────────┤
│ [Minimal Luxury]  ♥ 1,247 saves   │
│                                    │
│ Minimalist Elegance                │
│ Clean lines, neutral tones...      │
│                                    │
│ Tags: #minimal #luxury #timeless   │
├────────────────────────────────────┤
│ Color Palette                      │
│ ● #F5F5F5                          │
│ ● #2C2C2C                          │
│ ● #FFFFFF                          │
├────────────────────────────────────┤
│ Related Aesthetics                 │
│ [Scandinavian] [Old Money]...     │
├────────────────────────────────────┤
│ More Like This                     │
│ [Related moodboard grid]           │
└────────────────────────────────────┘
```

---

## 🎨 Aesthetic Categories

### 1. Minimal Luxury
**Vibe**: Clean lines, premium materials, timeless sophistication  
**Colors**: White, Charcoal, Light Gray  
**Tags**: minimal, luxury, timeless, neutral  
**Best For**: Professional, elegant, understated looks

### 2. Streetwear
**Vibe**: Urban edge, bold graphics, sneaker culture  
**Colors**: Black, Red, White  
**Tags**: streetwear, urban, bold, edgy  
**Best For**: Casual, trendy, youth culture

### 3. Korean Casual
**Vibe**: Trendy layers, K-fashion influences, effortlessly cool  
**Colors**: Beige, Rose, Light Gray  
**Tags**: korean, trendy, layered, casual  
**Best For**: Contemporary, fashionable, Asian-inspired

### 4. Scandinavian Minimal
**Vibe**: Functional design, sustainable, Nordic simplicity  
**Colors**: Off-white, Gray, Dark Gray  
**Tags**: scandinavian, minimal, sustainable, clean  
**Best For**: Eco-conscious, minimalist, functional

### 5. Dark Academia
**Vibe**: Scholarly romance, vintage pieces, rich textures  
**Colors**: Brown, Dark Brown, Tan  
**Tags**: vintage, academic, romantic, classic  
**Best For**: Intellectual, vintage, bookish

### 6. Old Money
**Vibe**: Understated wealth, classic silhouettes, refined elegance  
**Colors**: Charcoal, Tan, White  
**Tags**: luxury, classic, elegant, timeless  
**Best For**: Traditional luxury, preppy, sophisticated

### 7. Y2K
**Vibe**: Early 2000s nostalgia, metallics, playful boldness  
**Colors**: Hot Pink, Cyan, White  
**Tags**: y2k, nostalgic, bold, playful  
**Best For**: Fun, retro, experimental

### 8. Techwear
**Vibe**: Technical fabrics, utility focused, futuristic function  
**Colors**: Black, Gray, White  
**Tags**: techwear, functional, futuristic, utility  
**Best For**: Urban ninja, functional, weather-resistant

### 9. Clean Girl
**Vibe**: Fresh femininity, minimal makeup, neutral tones  
**Colors**: Off-white, Nude, White  
**Tags**: clean, fresh, minimal, feminine  
**Best For**: Natural beauty, effortless, fresh-faced

### 10. Cyber Minimal
**Vibe**: Digital sleekness, monochrome, tech accents  
**Colors**: Black, White, Neon Green  
**Tags**: cyber, minimal, digital, sleek  
**Best For**: Futuristic, tech-inspired, edgy minimal

### 11. Futuristic Editorial
**Vibe**: Avant-garde vision, architectural, high fashion  
**Colors**: White, Black, Silver  
**Tags**: editorial, futuristic, avant-garde, fashion  
**Best For**: Experimental, runway, artistic

---

## 🔧 Technical Implementation

### Component Architecture

```tsx
ExploreScreen
  ├── SearchBar
  ├── AestheticPill[] (filters)
  ├── TrendingCarousel
  │   └── MoodboardCard[]
  └── MasonryGrid
      └── MoodboardCard[]

MoodboardDetailScreen
  ├── Hero Image
  ├── Info Section
  ├── Color Palette
  ├── Tags
  └── Related Grid

SavedCollectionsScreen
  ├── Collections Grid
  └── Saved Moodboards Grid
```

### Data Flow

```typescript
// Service Layer
moodboardService.ts
  └── getMoodboards(aesthetic?, limit?)
  └── getTrendingMoodboards()
  └── getMoodboardById(id)
  └── searchMoodboards(query)

// State Management
useMoodboardStore
  ├── savedMoodboards: string[]
  ├── collections: Collection[]
  ├── currentFilter: string
  └── searchQuery: string
```

---

## 🎭 Animations

### Card Animations
```tsx
// Entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05 }}

// Hover
whileHover={{ y: -4 }}

// Image
group-hover:scale-110
transition-transform duration-500
```

### Carousel Animations
```tsx
// Scroll smooth
overflow-x-auto scrollbar-hide

// Hover reveal
opacity-0 group-hover:opacity-100
translate-y-4 group-hover:translate-y-0
```

### Search Bar
```tsx
// Focus
focus:scale-[1.02]
focus:border-white/30
focus:shadow-lg
```

---

## 💾 Adding New Moodboards

### Demo Data Format
```typescript
{
  id: 'unique-id',
  title: 'Moodboard Title',
  imageUrl: 'https://images.unsplash.com/photo-xxx?w=800',
  aesthetic: 'Minimal Luxury', // must match category
  vibe: 'One sentence description of the vibe',
  colorPalette: ['#FFFFFF', '#2C2C2C', '#F5F5F5'],
  tags: ['tag1', 'tag2', 'tag3', 'tag4'],
  savedCount: 1247, // number of saves
  createdAt: new Date(),
  relatedAesthetics: ['Related Category 1', 'Related Category 2'],
}
```

### Add to Service
```typescript
// src/services/moodboardService.ts
const DEMO_MOODBOARDS: Moodboard[] = [
  // ... existing moodboards
  {
    id: '13',
    title: 'Your New Moodboard',
    // ... rest of properties
  },
];
```

---

## 🎨 Customization

### Change Aesthetic Colors
```typescript
// src/services/aestheticService.ts
export const AESTHETIC_COLORS: Record<AestheticCategory, string[]> = {
  'Your Aesthetic': ['#color1', '#color2', '#color3'],
};
```

### Add New Aesthetic Category
```typescript
// 1. Update type
export type AestheticCategory =
  | ... existing
  | 'Your New Aesthetic';

// 2. Add to array
export const AESTHETIC_CATEGORIES: AestheticCategory[] = [
  ... existing,
  'Your New Aesthetic',
];

// 3. Add description
export const AESTHETIC_DESCRIPTIONS: Record<AestheticCategory, string> = {
  ... existing,
  'Your New Aesthetic': 'Description here',
};
```

### Customize Card Layout
```tsx
// src/components/MoodboardCard.tsx

// Change aspect ratio
aspect-[3/4]  → aspect-[16/9] or aspect-square

// Change border radius
rounded-3xl → rounded-2xl or rounded-xl

// Adjust hover lift
y: -4 → y: -8 (more lift)
```

---

## 🔍 Search & Filter

### Search Functionality
Searches across:
- Moodboard title
- Aesthetic category
- Vibe description
- All tags

### Filter Logic
```typescript
// All filter
Shows all moodboards (no filtering)

// Specific aesthetic
Shows only moodboards matching that aesthetic

// Combined search + filter
First filters by aesthetic, then searches within results
```

### Usage Examples
```tsx
// Search only
Type "minimal" → all minimal-related content

// Filter only
Click "Streetwear" → only streetwear moodboards

// Search + Filter
Click "Korean Casual" + Search "layers"
→ Korean Casual moodboards with "layers" in description
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- 1 column masonry
- Full-width search
- Horizontal scroll filters
- Touch-optimized cards

### Tablet (640px - 1024px)
- 2 column masonry
- Responsive search
- Wrap filters
- Hover states (if supported)

### Desktop (1024px - 1536px)
- 3 column masonry
- Fixed search width
- All filters visible
- Full hover effects

### Large (> 1536px)
- 4 column masonry
- Centered content
- Maximum width container
- Enhanced spacing

---

## 🚀 Performance Tips

### Image Loading
```tsx
// Lazy load images
onLoad={() => setImageLoaded(true)}

// Show placeholder first
{!imageLoaded && <Skeleton />}

// Fade in on load
className={imageLoaded ? 'opacity-100' : 'opacity-0'}
```

### Optimize Animations
```tsx
// Use transform (GPU accelerated)
transform: scale, translate

// Avoid animating
width, height, top, left (CPU intensive)

// Debounce search
Wait 300ms after typing before searching
```

### State Optimization
```tsx
// Only update when needed
useEffect(() => {
  if (filter !== previousFilter) {
    loadMoodboards();
  }
}, [filter]);

// Memoize expensive computations
const filteredMoodboards = useMemo(() => {
  return moodboards.filter(...);
}, [moodboards, filter]);
```

---

## 🐛 Common Issues

### Cards Not Loading
**Problem**: Masonry columns not showing  
**Solution**: Check that `react-masonry-css` is installed
```bash
npm install react-masonry-css
```

### Images Not Displaying
**Problem**: CORS or 404 errors  
**Solution**: Use Unsplash or other CORS-enabled image sources

### Search Not Working
**Problem**: No results when searching  
**Solution**: Check search logic includes all fields (title, aesthetic, vibe, tags)

### Save Not Persisting
**Problem**: Saved moodboards lost on refresh  
**Solution**: Currently using in-memory state. Implement Firebase persistence:
```typescript
// Save to Firestore
await addDoc(collection(db, 'saved'), {
  userId,
  moodboardId,
  timestamp: serverTimestamp(),
});
```

---

## 🎯 Best Practices

### Content Creation
1. **High-Quality Images** - Use 800px+ width
2. **Descriptive Titles** - Clear, concise
3. **Accurate Vibes** - One sentence, descriptive
4. **Relevant Tags** - 4-6 tags, lowercase
5. **Accurate Colors** - Extract from image
6. **Related Aesthetics** - 2-3 similar categories

### UX Guidelines
1. **Fast Loading** - Optimize images
2. **Smooth Animations** - 300-600ms duration
3. **Clear Navigation** - Always show back button
4. **Helpful Empty States** - Guide users
5. **Consistent Spacing** - Use design system

### Code Quality
1. **TypeScript** - Full type coverage
2. **Component Size** - Keep under 300 lines
3. **Reusable Logic** - Extract to hooks
4. **Error Handling** - Try/catch all async
5. **Performance** - Memoize and optimize

---

## 📚 Related Documentation

- **DAY4_SUMMARY.md** - Complete feature overview
- **API_DOCUMENTATION.md** - Service layer docs
- **DEVELOPER_GUIDE.md** - Component reference
- **COMPONENT_SHOWCASE.md** - UI patterns

---

## 🎉 What You Can Build

With this moodboard system, you can:
- Fashion discovery platform
- Style inspiration app
- Personal mood boarding
- Aesthetic quiz/recommendations
- Shopping integration
- Social fashion network
- AI outfit suggestions
- Trend forecasting

---

Built for fashion creators and aesthetic explorers. 🖤
