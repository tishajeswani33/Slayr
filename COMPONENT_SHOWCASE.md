# Component Showcase

Visual and code reference for all slayr components.

## 🎨 Design System

### Color Palette
```css
Primary Background:   #000000  (black)
Card Background:      #171717  (neutral-900)
Card Border:          #262626  (neutral-800)
Primary Text:         #FFFFFF  (white)
Secondary Text:       #A3A3A3  (neutral-400)
Muted Text:           #737373  (neutral-500)
Subtle Text:          #525252  (neutral-600)
```

### Typography Scale
```css
Display:    text-5xl (48px)  font-light
Title:      text-3xl (30px)  font-light
Heading:    text-2xl (24px)  font-light
Subheading: text-xl  (20px)  font-light
Body:       text-sm  (14px)  font-light
Caption:    text-xs  (12px)  font-light
```

### Spacing System
```css
Unit: 0.25rem (4px)

Gap:
  xs: gap-2  (8px)
  sm: gap-4  (16px)
  md: gap-6  (24px)
  lg: gap-8  (32px)

Padding:
  xs: p-4  (16px)
  sm: p-6  (24px)
  md: p-8  (32px)
  lg: p-12 (48px)
```

---

## 📦 Core Components

### 1. ScoreCard

**Purpose:** Display outfit score with animated progress ring

**Props:**
```typescript
interface ScoreCardProps {
  score: number;  // 1-100
}
```

**Visual:**
```
┌────────────────────────┐
│                        │
│       ○                │
│      ╱ ╲               │
│     │ 88 │             │
│      ╲ ╱               │
│       ○                │
│     / 100              │
│                        │
│   OUTFIT SCORE         │
│                        │
└────────────────────────┘
```

**Usage:**
```tsx
<ScoreCard score={88} />
```

**Features:**
- Animated counter (0 → score)
- Circular progress indicator
- Smooth transitions
- Dark card background

---

### 2. AestheticBadge

**Purpose:** Display fashion aesthetic category and vibe

**Props:**
```typescript
interface AestheticBadgeProps {
  aesthetic: string;
  vibe: string;
}
```

**Visual:**
```
┌────────────────────────┐
│ ● Aesthetic            │
│                        │
│ Minimal Luxury         │
│                        │
│ Sophisticated and      │
│ timeless with clean    │
│ lines                  │
└────────────────────────┘
```

**Usage:**
```tsx
<AestheticBadge 
  aesthetic="Minimal Luxury"
  vibe="Sophisticated and timeless"
/>
```

**Features:**
- Pulsing indicator dot
- Uppercase label
- Description text
- Card container

---

### 3. ColorPalette

**Purpose:** Display detected colors with hex codes

**Props:**
```typescript
interface ColorPaletteProps {
  colors: ColorPalette[];
}

interface ColorPalette {
  hex: string;
  name: string;
  dominance: number;
}
```

**Visual:**
```
┌────────────────────────┐
│ ● Color Palette        │
│                        │
│ ●  Charcoal      45%   │
│    #2C2C2C             │
│                        │
│ ●  White         30%   │
│    #FFFFFF             │
│                        │
│ ●  Navy          25%   │
│    #1A1A2E             │
└────────────────────────┘
```

**Usage:**
```tsx
<ColorPalette colors={[
  { hex: '#2C2C2C', name: 'Charcoal', dominance: 45 },
  { hex: '#FFFFFF', name: 'White', dominance: 30 },
]} />
```

**Features:**
- Color swatches (circles)
- Hex code display
- Percentage dominance
- Staggered animations

---

### 4. ClothingItems

**Purpose:** Display detected clothing pieces

**Props:**
```typescript
interface ClothingItemsProps {
  items: ClothingItem[];
}

interface ClothingItem {
  type: string;
  color: string;
  description: string;
}
```

**Visual:**
```
┌────────────────────────┐
│ ● Detected Items       │
│                        │
│ ┌──────────┬──────────┐│
│ │• Blazer  │• Shirt   ││
│ │ Charcoal │ White    ││
│ │ Tailored │ Classic  ││
│ └──────────┴──────────┘│
└────────────────────────┘
```

**Usage:**
```tsx
<ClothingItems items={[
  { type: 'Blazer', color: 'Charcoal', description: 'Tailored' },
  { type: 'Shirt', color: 'White', description: 'Classic' },
]} />
```

**Features:**
- Grid layout (2 columns)
- Nested cards
- Hover effects
- Scale animations

---

### 5. RecommendationCard

**Purpose:** Display AI styling recommendations

**Props:**
```typescript
interface RecommendationCardProps {
  recommendations: Recommendation[];
}

interface Recommendation {
  category: string;
  suggestion: string;
  reasoning: string;
}
```

**Visual:**
```
┌────────────────────────┐
│ ● AI Recommendations   │
│                        │
│ 01  Styling            │
│     Add structured     │
│     accessories        │
│     Enhances luxury    │
│                        │
│ 02  Balance            │
│     Consider texture   │
│     Breaks up colors   │
└────────────────────────┘
```

**Usage:**
```tsx
<RecommendationCard recommendations={[
  {
    category: 'Styling',
    suggestion: 'Add accessories',
    reasoning: 'Enhances look'
  }
]} />
```

**Features:**
- Numbered list
- Category headers
- Italic reasoning
- Staggered reveals

---

### 6. AccessorySuggestions

**Purpose:** Display suggested accessories

**Props:**
```typescript
interface AccessorySuggestionsProps {
  accessories: string[];
}
```

**Visual:**
```
┌────────────────────────┐
│ ● Suggested Accessories│
│                        │
│ ┌─────────┐ ┌────────┐│
│ │Gold watch│ │Leather││
│ └─────────┘ │belt   ││
│ ┌─────────┐ └────────┘│
│ │Necklace │            │
│ └─────────┘            │
└────────────────────────┘
```

**Usage:**
```tsx
<AccessorySuggestions accessories={[
  'Gold watch',
  'Leather belt',
  'Necklace'
]} />
```

**Features:**
- Pill-shaped tags
- Wrap layout
- Hover effects
- Scale animations

---

### 7. FashionTags

**Purpose:** Display descriptive fashion tags

**Props:**
```typescript
interface FashionTagsProps {
  tags: string[];
}
```

**Visual:**
```
┌────────────────────────┐
│ ● Fashion Tags         │
│                        │
│ #minimal #luxury       │
│ #timeless #professional│
│ #sophisticated #classic│
└────────────────────────┘
```

**Usage:**
```tsx
<FashionTags tags={[
  'minimal',
  'luxury',
  'timeless'
]} />
```

**Features:**
- Hashtag prefix
- Pill containers
- Wrap layout
- Staggered reveals

---

### 8. AnalyzingScreen

**Purpose:** Loading screen during AI analysis

**Props:** None

**Visual:**
```
┌────────────────────────┐
│                        │
│         ◉              │
│                        │
│  Analyzing your fit    │
│                        │
│  Detecting colors...   │
│                        │
│    ● ● ● ●             │
│                        │
│  ▓▓▓▓░░░░░░░░░░       │
└────────────────────────┘
```

**Usage:**
```tsx
<AnalyzingScreen />
```

**Features:**
- Icon animation
- Rotating keywords
- Pulsing dots
- Progress bar
- Full screen overlay

---

### 9. LoadingShimmer

**Purpose:** Skeleton loading placeholder

**Props:**
```typescript
interface LoadingShimmerProps {
  className?: string;
}
```

**Visual:**
```
┌────────────────────────┐
│ ▓░░░░░░░░░░░░░░░      │
│ ░░▓░░░░░░░░░░░░░░     │
│ ░░░░▓░░░░░░░░░░░░     │
└────────────────────────┘
```

**Usage:**
```tsx
<LoadingShimmer className="h-20" />
```

**Features:**
- Shimmer animation
- Customizable height
- Gradient sweep
- Infinite loop

---

### 10. Logo

**Purpose:** App logo/wordmark

**Props:**
```typescript
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}
```

**Visual:**
```
slayr     (small)
slayr     (medium)
slayr     (large)
```

**Usage:**
```tsx
<Logo size="lg" animated />
```

**Features:**
- Responsive sizes
- Optional animation
- Light font weight
- Tracking tight

---

## 📱 Screen Components

### UploadScreen

**Purpose:** Upload and preview outfit image

**Features:**
- Drag & drop zone
- File input trigger
- Image preview
- Remove button
- Analyze CTA
- Feature badges

**Layout:**
```
┌────────────────────────┐
│       slayr            │
│ AI-powered analysis    │
│                        │
│ ┌────────────────────┐ │
│ │                    │ │
│ │  [Drag & Drop]     │ │
│ │  or Click          │ │
│ │                    │ │
│ └────────────────────┘ │
│                        │
│ [Analyze Outfit]       │
│                        │
│ ✓ Fast ✓ AI ✓ Insights│
└────────────────────────┘
```

---

### ResultScreen

**Purpose:** Display AI analysis results

**Features:**
- Header with back button
- Hero image
- Score card
- All insight components
- Action buttons
- Footer

**Layout:**
```
┌────────────────────────┐
│ ← New Analysis  slayr  │
├────────────────────────┤
│                        │
│   [Outfit Image]       │
│                        │
├────────────────────────┤
│ [Score] [Aesthetic]    │
├────────────────────────┤
│ [Items] [Colors]       │
├────────────────────────┤
│ [Recommendations]      │
├────────────────────────┤
│ [Accessories] [Tags]   │
├────────────────────────┤
│ [Save] [Share]         │
└────────────────────────┘
```

---

## 🎭 Animation Patterns

### Fade In Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

### Stagger Children
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
```

### Scale Pop
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
```

### Slide In
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4 }}
>
```

---

## 🎨 Card Styles

### Standard Card
```tsx
className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
```

### Nested Card
```tsx
className="bg-neutral-800/50 rounded-2xl p-5 border border-neutral-700/50"
```

### Interactive Card
```tsx
className="... hover:border-neutral-600 transition-colors"
```

---

## 🔤 Text Styles

### Section Label
```tsx
className="text-xs text-neutral-500 font-light tracking-widest uppercase"
```

### Heading
```tsx
className="text-2xl font-light text-white tracking-tight"
```

### Body
```tsx
className="text-sm text-neutral-400 font-light leading-relaxed"
```

### Caption
```tsx
className="text-xs text-neutral-600 font-light"
```

---

## 🎯 Best Practices

### Component Structure
1. Import dependencies
2. Define props interface
3. Component function
4. Return JSX
5. Export default

### Styling
- Use Tailwind utilities
- Consistent spacing (4, 6, 8, 12)
- Standard border radius (2xl, 3xl)
- Light font weights (300)

### Animation
- Initial state (opacity: 0)
- Animate to visible
- Use delays for stagger
- Duration: 0.3-0.6s

### Typography
- Uppercase for labels
- Title case for headings
- Sentence case for body
- Generous line height

---

## 📐 Layout Guidelines

### Grid
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-6"
```

### Flex
```tsx
className="flex flex-col gap-4"
className="flex items-center justify-between"
```

### Spacing
- Between sections: mb-6 or mb-12
- Between items: gap-4 or gap-6
- Inside cards: p-8
- Between text: space-y-2

---

## 🎨 Component Composition

### Example: Result Section
```tsx
<div className="space-y-6">
  <ScoreCard score={88} />
  <AestheticBadge aesthetic="Minimal Luxury" vibe="..." />
  <ColorPalette colors={[...]} />
  <ClothingItems items={[...]} />
  <RecommendationCard recommendations={[...]} />
</div>
```

---

## 💡 Usage Tips

1. **Consistency** - Use same spacing, colors, animations
2. **Hierarchy** - Clear visual order (score → details)
3. **Feedback** - Animate on appearance and interaction
4. **Context** - Labels help users understand data
5. **Accessibility** - Semantic HTML, clear text

---

Built with attention to detail. Every pixel matters. 🎨
