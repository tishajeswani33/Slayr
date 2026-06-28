import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Run in mock mode if keys are placeholders, not provided, or not valid URLs starting with http
const isMock =
  !supabaseUrl ||
  !supabaseKey ||
  supabaseUrl.includes('placeholder') ||
  supabaseUrl.includes('your_') ||
  supabaseUrl === 'demo' ||
  !supabaseUrl.startsWith('http');

class MockSupabaseClient {
  auth = {
    async signInWithPassword({ email, password: _password }: any) {
      console.log('Mock Supabase Auth: signInWithPassword', email);
      await new Promise(r => setTimeout(r, 600));
      return {
        data: {
          user: { id: 'mock-supabase-id-999', email },
          session: { access_token: 'mock-access-token-999' }
        },
        error: null
      };
    },
    async signUp({ email, password: _password, options }: any) {
      console.log('Mock Supabase Auth: signUp', email);
      await new Promise(r => setTimeout(r, 600));
      return {
        data: {
          user: { id: 'mock-supabase-id-999', email, user_metadata: options?.data || {} },
          session: { access_token: 'mock-access-token-999' }
        },
        error: null
      };
    },
    async signOut() {
      console.log('Mock Supabase Auth: signOut');
      return { error: null };
    }
  };

  from(table: string) {
    return {
      select(_query: string = '*') {
        return {
          eq(column: string, value: any) {
            return {
              async single() {
                console.log(`Mock Supabase Database: select single from ${table} where ${column} = ${value}`);
                return {
                  data: {
                    id: value,
                    displayName: 'Slayr Enthusiast',
                    bio: 'Gen Z fashion revolutionary',
                    dominantAesthetic: 'Minimal Luxury',
                    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
                  },
                  error: null
                };
              }
            };
          }
        };
      },
      upsert(values: any) {
        return {
          async select() {
            console.log(`Mock Supabase Database: upsert in ${table}`, values);
            return { data: [values], error: null };
          }
        };
      }
    };
  }
}

export const supabase = isMock
  ? (new MockSupabaseClient() as any)
  : createClient(supabaseUrl, supabaseKey);

console.log(`Supabase Client initialized in [${isMock ? 'MOCK/OFFLINE' : 'LIVE'}] mode`);
