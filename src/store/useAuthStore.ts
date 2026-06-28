import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginSchema, signupSchema } from '../validation/authSchemas';
import { apiRequest } from '../services/api';
import { auth } from '../config/firebase';
import { supabase } from '../config/supabase';
import { sendSMS } from '../services/smsService';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  dominantAesthetic?: string | null;
}

interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  error: string | null;
  isLoading: boolean;
  otpCode: string | null;
  phoneNumber: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, displayName: string) => Promise<boolean>;
  sendSmsOtp: (phone: string) => Promise<string>;
  verifySmsOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

// Check if Firebase is in mock mode (using default local sandbox values)
const isMockFirebase =
  !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'demo-key';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      error: null,
      isLoading: false,
      otpCode: null,
      phoneNumber: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Client-side schema validation
          const parsed = loginSchema.safeParse({ email, password });
          if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
          }

          // 1. Authenticate with Supabase (mock/live)
          const { data: sbData } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (sbData?.user) {
            console.log('Supabase: authenticated user', sbData.user.email);
          }

          // 2. Fallback to Firebase/Node API
          if (isMockFirebase) {
            const res = await apiRequest<{ token: string; user: UserProfile }>(
              '/api/auth/login',
              'POST',
              { email, password }
            );

            set({
              isAuthenticated: true,
              token: res.token,
              user: res.user,
              isLoading: false,
            });
            return true;
          } else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseIdToken = await userCredential.user.getIdToken(true);

            const res = await apiRequest<{ token: string; user: UserProfile }>(
              '/api/auth/firebase-login',
              'POST',
              { token: firebaseIdToken }
            );

            set({
              isAuthenticated: true,
              token: res.token,
              user: res.user,
              isLoading: false,
            });
            return true;
          }
        } catch (err: any) {
          console.error('Login error:', err);
          let errorMessage = err.message || 'An error occurred during sign in';
          if (err.code) {
            switch (err.code) {
              case 'auth/user-not-found':
              case 'auth/wrong-password':
              case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password credentials.';
                break;
              case 'auth/too-many-requests':
                errorMessage = 'Access temporarily disabled due to many failed login attempts.';
                break;
            }
          }
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      signup: async (email, password, displayName) => {
        set({ isLoading: true, error: null });
        try {
          const parsed = signupSchema.safeParse({ email, password, confirmPassword: password, displayName });
          if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
          }

          // 1. Register with Supabase (mock/live)
          const { data: sbData } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { displayName }
            }
          });
          if (sbData?.user) {
            await supabase.from('profiles').upsert({
              id: sbData.user.id,
              email,
              displayName,
              dominantAesthetic: 'Minimal Luxury'
            });
          }

          // 2. Fallback to Firebase/Node API
          if (isMockFirebase) {
            const res = await apiRequest<{ token: string; user: UserProfile }>(
              '/api/auth/signup',
              'POST',
              { email, password, displayName }
            );

            set({
              isAuthenticated: true,
              token: res.token,
              user: res.user,
              isLoading: false,
            });
            return true;
          } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName });
            const firebaseIdToken = await userCredential.user.getIdToken(true);

            const res = await apiRequest<{ token: string; user: UserProfile }>(
              '/api/auth/firebase-login',
              'POST',
              { token: firebaseIdToken }
            );

            set({
              isAuthenticated: true,
              token: res.token,
              user: res.user,
              isLoading: false,
            });
            return true;
          }
        } catch (err: any) {
          console.error('Signup error:', err);
          let errorMessage = err.message || 'An error occurred during registration';
          if (err.code) {
            switch (err.code) {
              case 'auth/email-already-in-use':
                errorMessage = 'A user with this email address already exists.';
                break;
              case 'auth/weak-password':
                errorMessage = 'The password is too weak. Please use at least 6 characters.';
                break;
            }
          }
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      sendSmsOtp: async (phone: string) => {
        set({ isLoading: true, error: null });
        
        // Generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        set({ otpCode: code, phoneNumber: phone });
        
        // Send SMS via Twilio REST gateway
        const message = `[Slayr Security]: Your login verification code is ${code}. Match coordinates in 12ms.`;
        await sendSmsOtpHelper(phone, message);
        
        set({ isLoading: false });
        return code;
      },

      verifySmsOtp: async (code: string) => {
        set({ isLoading: true, error: null });
        await new Promise(r => setTimeout(r, 800));
        const activeCode = get().otpCode;
        if (code === activeCode) {
          set({
            isAuthenticated: true,
            token: 'mock-supabase-token-otp',
            user: {
              id: 'usr-otp-seed',
              email: 'genz-investor@slayr.app',
              displayName: 'Gen Z Guest',
              dominantAesthetic: 'Minimal Luxury',
              bio: 'Pitching Slayr to VC funds'
            },
            isLoading: false,
            error: null
          });
          return true;
        } else {
          set({ error: 'Invalid SMS OTP verification code.', isLoading: false });
          return false;
        }
      },

      logout: () => {
        if (!isMockFirebase) {
          signOut(auth).catch((err) => console.warn('Firebase signout warning:', err));
        }
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          error: null,
          otpCode: null,
          phoneNumber: null,
        });
      },

      fetchProfile: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const res = await apiRequest<{ user: UserProfile }>('/api/auth/profile');
          set({ user: res.user });
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
    }
  )
);

// Wrapper to prevent blocking execution on REST requests
async function sendSmsOtpHelper(phone: string, message: string) {
  try {
    await sendSMS(phone, message);
  } catch (err) {
    console.error('Twilio SMS dispatch failed async:', err);
  }
}
