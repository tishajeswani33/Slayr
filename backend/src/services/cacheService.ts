import { redisClient } from '../config/redis.js';

const DEFAULT_TTL = 300;

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const raw = await redisClient.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`❌ Cache read error on key ${key}:`, error);
    return null;
  }
}

export async function setCachedData<T>(
  key: string,
  value: T,
  ttlSeconds: number = DEFAULT_TTL
): Promise<void> {
  try {
    const serialized = JSON.stringify(value);
    await redisClient.set(key, serialized, { EX: ttlSeconds });
  } catch (error) {
    console.error(`❌ Cache write error on key ${key}:`, error);
  }
}

export async function invalidateCache(key: string): Promise<void> {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`❌ Cache delete error on key ${key}:`, error);
  }
}

export function buildCacheKey(namespace: string, id: string | number): string {
  return `slayr:${namespace}:${id}`;
}
