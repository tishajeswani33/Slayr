import { ChatMessage } from '../types/social';

const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hi! I'm your AI fashion stylist. I can help you discover new aesthetics, build outfits, and refine your personal style. What would you like to explore today?",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    suggestions: [
      'Outfit ideas for a date night',
      'What aesthetic suits me?',
      'Build a capsule wardrobe',
      'Color palette recommendations',
    ],
  },
];

export async function getChatHistory(): Promise<ChatMessage[]> {
  return DEMO_MESSAGES;
}

export async function sendMessage(content: string): Promise<ChatMessage> {
  // Demo AI responses
  const responses: Record<string, string> = {
    default: "Based on your style profile, I'd recommend exploring Minimal Luxury aesthetics. Clean lines, neutral tones, and premium fabrics would complement your vibe perfectly.",
    date: "For a date night, I suggest a sophisticated Minimal Luxury look: tailored blazer in charcoal, crisp white shirt, and dark slim trousers. Add a statement watch for that refined touch.",
    aesthetic: "Your style leans towards Minimal Luxury with hints of Scandinavian Minimal. You appreciate clean lines, quality over quantity, and timeless pieces.",
    capsule: "Let's build your capsule wardrobe with these essentials: 2 quality blazers, 5 premium tees, 3 tailored trousers, 1 leather jacket, classic white sneakers, and minimal accessories.",
    color: "Your ideal color palette: Charcoal (#2C2C2C), Crisp White (#FFFFFF), Soft Gray (#F5F5F5), and Navy (#1A1A2E). These create a sophisticated, versatile foundation.",
  };

  const aiContent =
    content.toLowerCase().includes('date')
      ? responses.date
      : content.toLowerCase().includes('aesthetic')
      ? responses.aesthetic
      : content.toLowerCase().includes('capsule')
      ? responses.capsule
      : content.toLowerCase().includes('color')
      ? responses.color
      : responses.default;

  const aiMessage: ChatMessage = {
    id: (Date.now() + 1).toString(),
    role: 'ai',
    content: aiContent,
    timestamp: new Date(Date.now() + 1000),
  };

  return aiMessage;
}

export function getDailyInspo(): {
  title: string;
  description: string;
  aesthetic: string;
  imageUrl: string;
} {
  const inspoOptions = [
    {
      title: "Today's Vibe: Minimal Luxury",
      description: 'Less is more. Embrace clean lines and premium fabrics.',
      aesthetic: 'Minimal Luxury',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    },
    {
      title: 'Trending: Streetwear Renaissance',
      description: 'Bold graphics meet urban sophistication.',
      aesthetic: 'Streetwear',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    },
    {
      title: 'Inspired by Your Wardrobe',
      description: 'Classic elegance with a modern twist.',
      aesthetic: 'Old Money',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
    },
  ];

  // Rotate based on day
  const dayIndex = new Date().getDate() % inspoOptions.length;
  return inspoOptions[dayIndex];
}
