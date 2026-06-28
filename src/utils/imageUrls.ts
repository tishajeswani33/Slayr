/**
 * Dynamic Fashion Image Provider
 * Leverages Unsplash's featured search redirect API with unique signature seeds
 * to deliver thousands of non-repeating, high-resolution fashion coordinates.
 */
export function getAestheticImage(aesthetic: string, gender: string, index: number): string {
  const isMale = gender === 'male';
  const term = aesthetic.toLowerCase();
  
  let keywords: string[] = ['fashion'];
  
  if (term.includes('traditional') || term.includes('indian')) {
    keywords.push('indian', 'traditional', 'ethnic');
    keywords.push(isMale ? 'kurta,sherwani,man' : 'saree,lehenga,woman');
  } else if (term.includes('party')) {
    keywords.push('party', 'clubwear', 'nightlife');
    keywords.push(isMale ? 'suit,blazer,man' : 'dress,glamorous,woman');
  } else if (term.includes('streetwear')) {
    keywords.push('streetwear', 'urban', 'hypebeast');
    keywords.push(isMale ? 'hoodie,cargo,man' : 'streetstyle,woman');
  } else if (term.includes('korean')) {
    keywords.push('korean', 'minimalist', 'chic');
    keywords.push(isMale ? 'coat,oversized,man' : 'outfit,woman');
  } else if (term.includes('luxury') || term.includes('old money') || term.includes('quiet')) {
    keywords.push('quiet,luxury', 'classy', 'editorial');
    keywords.push(isMale ? 'suit,tailored,man' : 'dress,silk,woman');
  } else if (term.includes('clean')) {
    keywords.push('minimalist', 'aesthetic', 'casual');
    keywords.push(isMale ? 'linen,shirt,man' : 'clean,girl,woman');
  } else if (term.includes('coquette') || term.includes('soft')) {
    keywords.push('pastel', 'vintage', 'romantic');
    keywords.push('dress,woman');
  } else {
    keywords.push('clothing', 'model');
    keywords.push(isMale ? 'man' : 'woman');
  }

  const query = keywords.join(',');
  // The sig parameter forces Unsplash to return a different, cached photo for every card index,
  // preventing image repetition across Slayr's 100K+ fashion database.
  return `https://images.unsplash.com/featured/?${query}&sig=${index}`;
}
