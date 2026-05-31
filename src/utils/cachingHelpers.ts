export class LRUCache<T> {
  private cache: Map<string, { value: T; expiry?: number }>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: string): T | undefined {
    if (!this.cache.has(key)) return undefined;

    const entry = this.cache.get(key)!;
    
    // Check TTL expiry
    if (entry.expiry && Date.now() > entry.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    // Refresh position for LRU
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T, ttl?: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Evict least recently used (first item in Map)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    const expiry = ttl ? Date.now() + ttl : undefined;
    this.cache.set(key, { value, expiry });
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

// Global default caches
const syncCache = new LRUCache<any>(200);
const asyncCache = new LRUCache<Promise<any>>(100);

export function withCache<T>(key: string, factory: () => T, ttlMs?: number): T {
  if (syncCache.has(key)) {
    return syncCache.get(key) as T;
  }

  const value = factory();
  syncCache.set(key, value, ttlMs);
  return value;
}

export async function withAsyncCache<T>(
  key: string,
  factory: () => Promise<T>,
  ttlMs?: number
): Promise<T> {
  if (asyncCache.has(key)) {
    return asyncCache.get(key)!;
  }

  const promise = factory().catch((error) => {
    asyncCache.delete(key);
    throw error;
  });

  asyncCache.set(key, promise, ttlMs);
  return promise;
}
