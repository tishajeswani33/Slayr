// Exponential Moving Average to smooth trend metrics over time
export function exponentialMovingAverage(values: number[], alpha: number = 0.3): number[] {
  if (values.length === 0) return [];
  
  const ema: number[] = [values[0]];
  for (let i = 1; i < values.length; i++) {
    ema.push(alpha * values[i] + (1 - alpha) * ema[i - 1]);
  }
  return ema;
}

// Calculate the velocity of growth/decay of a trend
export function calculateTrendVelocity(
  current: number,
  previous: number,
  timeframeDays: number = 7
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  
  const pctChange = ((current - previous) / previous) * 100;
  // Normalized speed index
  return pctChange / timeframeDays;
}

// Detect sudden viral peaks (standard deviation outbreak detection)
export function detectViralOutbreak(scores: number[], threshold: number = 2.0): boolean {
  if (scores.length < 5) return false;

  // Calculate mean
  const mean = scores.reduce((sum, val) => sum + val, 0) / scores.length;

  // Calculate standard deviation
  const variance = scores.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return false;

  const currentScore = scores[scores.length - 1];
  const zScore = (currentScore - mean) / stdDev;

  return zScore > threshold;
}

// Adjustment factor based on active season vs outfit season
export function seasonalAdjustment(baseScore: number, season: string): number {
  const date = new Date();
  const month = date.getMonth(); // 0-11
  
  let activeSeason = 'all-season';
  if (month >= 2 && month <= 4) activeSeason = 'spring';
  else if (month >= 5 && month <= 7) activeSeason = 'summer';
  else if (month >= 8 && month <= 10) activeSeason = 'fall';
  else activeSeason = 'winter';

  if (season === 'all-season') return baseScore * 1.05; // slight boost for high versatility
  if (season.toLowerCase() === activeSeason) return baseScore * 1.25; // major season boost

  // Opposite seasons penalty
  const opposites: Record<string, string> = {
    'summer': 'winter',
    'winter': 'summer',
    'spring': 'fall',
    'fall': 'spring'
  };

  if (opposites[season.toLowerCase()] === activeSeason) {
    return baseScore * 0.7; // penalty for unwearable weather mismatch
  }

  return baseScore * 0.9;
}

// Predict trend lifecycle stage based on velocity and current popularity
export function trendLifecycleStage(
  velocity: number,
  popularity: number
): 'emerging' | 'trending' | 'peak' | 'declining' {
  if (velocity < -5.0) {
    return 'declining';
  }
  
  if (popularity > 80) {
    return velocity > 2.0 ? 'trending' : 'peak';
  }

  if (velocity > 12.0) {
    return 'emerging';
  }

  if (velocity > 3.0) {
    return 'trending';
  }

  return 'emerging';
}

// Predict when a trend will reach its absolute peak popularity
export function predictTrendPeak(currentVelocity: number, currentPopularity: number): string {
  if (currentVelocity <= 0) {
    return 'Passed Peak';
  }

  const remaining = 100 - currentPopularity;
  if (remaining <= 0) {
    return 'Currently Peaking';
  }

  // Weeks to peak linear approximation
  const weeksToPeak = Math.ceil(remaining / Math.max(1, currentVelocity));

  if (weeksToPeak <= 1) return 'Next week';
  if (weeksToPeak <= 2) return 'In 2 weeks';
  if (weeksToPeak <= 4) return 'In 3-4 weeks';
  if (weeksToPeak <= 8) return 'In 1-2 months';
  
  return 'In 3+ months';
}
