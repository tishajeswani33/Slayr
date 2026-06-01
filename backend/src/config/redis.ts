import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Define a unified Cache Client interface so we can fallback gracefully
export interface ICacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: { EX?: number }): Promise<string | null | undefined>;
  del(key: string): Promise<number>;
  connect(): Promise<void>;
  quit(): Promise<void>;
}

// Minimal in-memory mock fallback cache
class MockCacheClient implements ICacheClient {
  private cache = new Map<string, { val: string; expiry?: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return item.val;
  }

  async set(key: string, value: string, options?: { EX?: number }): Promise<string | null> {
    const expiry = options?.EX ? Date.now() + options.EX * 1000 : undefined;
    this.cache.set(key, { val: value, expiry });
    return 'OK';
  }

  async del(key: string): Promise<number> {
    const deleted = this.cache.delete(key);
    return deleted ? 1 : 0;
  }

  async connect(): Promise<void> {
    console.log('ℹ️ Caching is operating in local mock memory fallback mode');
  }

  async quit(): Promise<void> {}
}

let redisClient: ICacheClient;

if (process.env.NODE_ENV === 'test') {
  redisClient = new MockCacheClient();
} else {
  const client = createClient({ url: redisUrl });

  client.on('error', (err) => {
    console.error('❌ Redis Connection Error:', err.message);
  });

  redisClient = {
    get: async (key) => {
      try {
        if (!client.isOpen) return null;
        return await client.get(key);
      } catch {
        return null;
      }
    },
    set: async (key, value, options) => {
      try {
        if (!client.isOpen) return null;
        return await client.set(key, value, options);
      } catch {
        return null;
      }
    },
    del: async (key) => {
      try {
        if (!client.isOpen) return 0;
        return await client.del(key);
      } catch {
        return 0;
      }
    },
    connect: async () => {
      try {
        await client.connect();
        console.log('🚀 Successfully connected to Redis Cache cluster');
      } catch {
        console.warn('⚠️ Redis failed to connect. Falling back to local in-memory mock caching.');
        redisClient = new MockCacheClient();
        await redisClient.connect();
      }
    },
    quit: async () => {
      try {
        if (client.isOpen) await client.quit();
      } catch {}
    }
  };
}

export { redisClient };
