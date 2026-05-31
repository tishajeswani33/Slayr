# API Documentation

Technical documentation for slayr's AI analysis system.

## Architecture Overview

```
User Upload → Image Processing → Gemini Vision API → Parse Response → Save to Firestore → Display Results
```

## Core Services

### 1. Gemini Service (`src/services/gemini.ts`)

Handles communication with Google Gemini Vision API.

#### `analyzeOutfitWithGemini(imageBase64: string): Promise<GeminiAnalysisResult>`

Sends image to Gemini API and receives fashion analysis.

**Parameters:**
- `imageBase64` (string): Base64-encoded image data (without prefix)

**Returns:**
```typescript
{
  score: number;              // 1-100
  aesthetic: string;          // Fashion category
  vibe: string;              // Brief description
  clothingItems: Array<{
    type: string;            // e.g., "Blazer"
    color: string;           // e.g., "Charcoal"
    description: string;     // e.g., "Tailored fit"
  }>;
  colorPalette: Array<{
    hex: string;             // e.g., "#2C2C2C"
    name: string;            // e.g., "Charcoal"
    dominance: number;       // 0-100 percentage
  }>;
  recommendations: Array<{
    category: string;        // e.g., "Styling"
    suggestion: string;      // Action item
    reasoning: string;       // Why it works
  }>;
  suggestedAccessories: string[];  // Array of accessory names
  fashionTags: string[];           // Array of tags
}
```

**Throws:**
- Error if API key is invalid
- Error if response format is invalid
- Error if API request fails

**Example:**
```typescript
const base64Image = await imageToBase64(file);
const analysis = await analyzeOutfitWithGemini(base64Image);
console.log(`Score: ${analysis.score}/100`);
```

#### `imageToBase64(file: File): Promise<string>`

Converts File object to base64 string.

**Parameters:**
- `file` (File): Image file object

**Returns:**
- Promise resolving to base64 string (without data URI prefix)

---

### 2. Outfit Analysis Service (`src/services/analyzeOutfit.ts`)

Orchestrates the complete analysis workflow.

#### `analyzeAndSaveOutfit(imageFile: File, userId?: string): Promise<OutfitAnalysis>`

Complete pipeline: analyze image → upload to storage → save to Firestore.

**Parameters:**
- `imageFile` (File): Image file to analyze
- `userId` (string, optional): User identifier (defaults to "demo-user")

**Returns:**
```typescript
{
  id?: string;                    // Firestore document ID
  userId?: string;                // User identifier
  imageUrl: string;               // Firebase Storage URL or blob URL
  score: number;                  // Outfit score
  aesthetic: string;              // Fashion aesthetic
  vibe: string;                   // Vibe description
  clothingItems: ClothingItem[];  // Detected items
  colorPalette: ColorPalette[];   // Color analysis
  recommendations: Recommendation[]; // Styling tips
  suggestedAccessories: string[]; // Accessory ideas
  fashionTags: string[];          // Fashion tags
  timestamp?: Date;               // When analyzed
}
```

**Behavior:**
- In **demo mode** (no API keys): Returns mock data after 3 second delay
- In **production mode**: Full AI analysis with real APIs

**Example:**
```typescript
try {
  const analysis = await analyzeAndSaveOutfit(imageFile, 'user123');
  console.log(`Analysis complete! ID: ${analysis.id}`);
} catch (error) {
  console.error('Analysis failed:', error);
}
```

---

## State Management

### Zustand Store (`src/store/useOutfitStore.ts`)

Global state for outfit analysis.

**State:**
```typescript
{
  currentAnalysis: OutfitAnalysis | null;  // Current analysis result
  isAnalyzing: boolean;                    // Loading state
  error: string | null;                    // Error message
}
```

**Actions:**
```typescript
setAnalysis(analysis: OutfitAnalysis)  // Store analysis result
setAnalyzing(analyzing: boolean)       // Set loading state
setError(error: string | null)         // Set error message
clearAnalysis()                        // Reset state
```

**Usage:**
```typescript
import { useOutfitStore } from './store/useOutfitStore';

function MyComponent() {
  const { currentAnalysis, isAnalyzing, setAnalyzing } = useOutfitStore();
  
  if (isAnalyzing) return <LoadingSpinner />;
  if (currentAnalysis) return <Results data={currentAnalysis} />;
}
```

---

## Gemini Prompt Engineering

### Current Prompt Structure

The prompt is optimized for:
1. **Consistent JSON output** - No markdown, no explanation
2. **Fashion expertise** - Professional styling language
3. **Actionable insights** - Specific recommendations
4. **Realistic scoring** - Based on fit, color, proportion, trend
5. **Aesthetic accuracy** - Proper classification

### Prompt Template

```
You are an expert luxury fashion stylist and analyst.
Analyze this outfit image with precision and sophistication.

Return ONLY valid JSON with this structure:
{
  "score": 85,
  "aesthetic": "Minimal Luxury",
  "vibe": "Sophisticated and timeless",
  "clothingItems": [...],
  "colorPalette": [...],
  "recommendations": [...],
  "suggestedAccessories": [...],
  "fashionTags": [...]
}

RULES:
- Score: 1-100 (cohesion + fit + color + trend)
- Aesthetic: Choose from 10 predefined styles
- Be honest, professional, and insightful
```

### Supported Aesthetics

1. **Streetwear** - Urban, edgy, sneaker culture
2. **Old Money** - Timeless luxury, understated
3. **Clean Girl** - Fresh, minimal, neutral
4. **Y2K** - Early 2000s nostalgia
5. **Dark Academia** - Scholarly, vintage, romantic
6. **Minimal Luxury** - Sophisticated simplicity
7. **Techwear** - Functional, futuristic
8. **Vintage** - Retro-inspired
9. **Scandinavian Minimal** - Nordic, sustainable
10. **Korean Casual** - K-fashion trends

---

## Image Processing

### Validation (`src/utils/imageUtils.ts`)

#### `validateImageFile(file: File): { valid: boolean; error?: string }`

Validates image before upload.

**Checks:**
- File type: JPG, PNG, WebP only
- File size: Max 10MB

**Example:**
```typescript
const validation = validateImageFile(file);
if (!validation.valid) {
  alert(validation.error);
  return;
}
```

#### `compressImage(file: File, maxWidth?: number, quality?: number): Promise<File>`

Compresses image to reduce file size.

**Parameters:**
- `file` (File): Original image
- `maxWidth` (number): Max width in pixels (default: 1920)
- `quality` (number): JPEG quality 0-1 (default: 0.85)

**Returns:**
- Compressed File object

---

## Firebase Integration

### Firestore Schema

**Collection:** `outfits`

```typescript
{
  userId: string;              // User identifier
  imageUrl: string;            // Storage URL
  score: number;               // 1-100
  aesthetic: string;           // Fashion category
  vibe: string;               // Description
  clothingItems: Array<{
    type: string;
    color: string;
    description: string;
  }>;
  colorPalette: Array<{
    hex: string;
    name: string;
    dominance: number;
  }>;
  recommendations: Array<{
    category: string;
    suggestion: string;
    reasoning: string;
  }>;
  suggestedAccessories: string[];
  fashionTags: string[];
  timestamp: Timestamp;        // Server timestamp
}
```

### Storage Structure

```
outfits/
  {userId}/
    {timestamp}.jpg
```

**Example:** `outfits/user123/1706543210000.jpg`

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Failed to analyze outfit" | Gemini API error | Check API key, quota |
| "Invalid analysis format" | Unexpected Gemini response | Retry, check prompt |
| "Image size must be less than 10MB" | File too large | Compress image first |
| "Please upload a JPG, PNG, or WebP image" | Invalid file type | Convert image |
| "Missing or insufficient permissions" | Firestore rules | Update security rules |

### Error Flow

```typescript
try {
  const analysis = await analyzeAndSaveOutfit(file);
  // Success
} catch (error) {
  if (error.message.includes('API key')) {
    // Handle API key issues
  } else if (error.message.includes('quota')) {
    // Handle quota exceeded
  } else {
    // Generic error
  }
}
```

---

## Performance Optimization

### Current Optimizations

1. **Image Compression** - Reduce upload size
2. **Base64 Encoding** - Direct to Gemini API
3. **Lazy Loading** - Components load on demand
4. **Debouncing** - Prevent duplicate requests
5. **Caching** - Store results in Firestore

### Recommended Improvements

1. **CDN** - Serve images via CDN
2. **WebP Format** - Better compression
3. **Edge Functions** - Process images on edge
4. **Rate Limiting** - Prevent abuse
5. **Batch Processing** - Analyze multiple images

---

## Rate Limits

### Gemini API
- **Free tier**: 60 requests/minute
- **Paid tier**: Contact Google for limits

### Firebase
- **Firestore**: 50,000 reads/day (free)
- **Storage**: 1GB storage, 5GB transfer/day (free)

### Recommendations
- Implement request queuing
- Add user-level rate limiting
- Cache results aggressively
- Use Firebase quotas wisely

---

## Testing

### Unit Tests (Example)

```typescript
import { validateImageFile } from './utils/imageUtils';

describe('validateImageFile', () => {
  it('accepts valid JPEG', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(true);
  });

  it('rejects oversized files', () => {
    const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large.jpg');
    const result = validateImageFile(largeFile);
    expect(result.valid).toBe(false);
  });
});
```

---

## Security Considerations

1. **API Keys** - Never expose in client code
2. **File Upload** - Validate type and size
3. **Firestore Rules** - Restrict write access
4. **Storage Rules** - Control who uploads
5. **Rate Limiting** - Prevent abuse
6. **Input Sanitization** - Clean user inputs

---

## Monitoring

### Metrics to Track

- API response times
- Success/failure rates
- User upload patterns
- Storage usage
- Firestore reads/writes
- Error frequencies

### Tools

- Firebase Console Analytics
- Google Cloud Monitoring
- Custom logging with `console.log`

---

## Future Enhancements

1. **Multi-image Analysis** - Compare multiple outfits
2. **Video Analysis** - Analyze outfit videos
3. **Style Evolution** - Track style over time
4. **Social Features** - Share and rate outfits
5. **Personal Stylist** - AI chat for advice
6. **Wardrobe Manager** - Catalog all clothes
7. **Outfit Generator** - AI creates outfit combinations

---

Built with ❤️ using Google Gemini Vision AI
