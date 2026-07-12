import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY || 'demo-key'
);

export interface GeminiAnalysisResult {
  score: number;
  aesthetic: string;
  vibe: string;
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
}

const FASHION_ANALYSIS_PROMPT = `You are an expert luxury fashion stylist and analyst. Analyze this outfit image with precision and sophistication.

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:

{
  "score": 85,
  "aesthetic": "Minimal Luxury",
  "vibe": "Sophisticated and timeless with clean lines",
  "clothingItems": [
    {"type": "Blazer", "color": "Charcoal", "description": "Tailored double-breasted"}
  ],
  "colorPalette": [
    {"hex": "#2C2C2C", "name": "Charcoal", "dominance": 60}
  ],
  "recommendations": [
    {
      "category": "Styling",
      "suggestion": "Add structured accessories",
      "reasoning": "Enhances the minimal luxury aesthetic"
    }
  ],
  "suggestedAccessories": ["Gold watch", "Leather belt"],
  "fashionTags": ["minimal", "luxury", "timeless"]
}

RULES:
- Score: Compute a real, precise score from 1 to 100 based strictly on this rubric (do NOT just return 85 or repeat the example score):
  1. Color Harmony (Max 25): Cohesive palette, analogous/complementary balance, focal contrast.
  2. Fit & Proportions (Max 25): Tailoring, silhouette structure, layering proportions.
  3. Cohesion & Styling (Max 25): Fabric texture compatibility, accessory choice alignment.
  4. Trend & Context Relevance (Max 25): Current style relevancy for Gen Z aesthetics.
  Ensure the final returned score is the sum of these four categories and reflects the actual outfit details.
- Aesthetic: Choose from: Streetwear, Old Money, Clean Girl, Y2K, Dark Academia, Minimal Luxury, Techwear, Vintage, Scandinavian Minimal, Korean Casual, Quiet Luxury, Pinterest Core, TikTok Viral, Monochrome Minimal, Indian Ethnic, Desi Core, Indo-Western
- Vibe: One concise sentence describing the overall feeling
- Clothing Items: List 2-5 visible pieces
- Color Palette: 2-4 dominant colors with hex codes
- Recommendations: 2-3 actionable styling tips
- Suggested Accessories: 3-5 items that would elevate the look
- Fashion Tags: 4-6 descriptive tags

Be honest, professional, and insightful. Focus on what works and how to enhance it.`;

export async function analyzeOutfitWithGemini(
  imageBase64: string
): Promise<GeminiAnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      FASHION_ANALYSIS_PROMPT,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    const analysis: GeminiAnalysisResult = JSON.parse(cleanedText);

    // Validate the response structure
    if (
      typeof analysis.score !== 'number' ||
      !analysis.aesthetic ||
      !Array.isArray(analysis.clothingItems)
    ) {
      throw new Error('Invalid analysis format from Gemini');
    }

    return analysis;
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw new Error('Failed to analyze outfit. Please try again.');
  }
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove data:image/...;base64, prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
