import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginSchema, signupSchema } from '../validation/authSchemas';
import { apiRequest } from '../services/api';
import { auth } from '../config/firebase';
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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, displayName: string) => Promise<boolean>;
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

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Client-side schema validation
          const parsed = loginSchema.safeParse({ email, password });
          if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
          }

          if (isMockFirebase) {
            // Local dev mode fallback (0 config needed)
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
            // Live Firebase Auth pipeline
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseIdToken = await userCredential.user.getIdToken(true);

            // Sync user to PostgreSQL database on-the-fly via backend API
            const res = await apiRequest<{ token: string; user: UserProfile }>(
              '/api/auth/firebase-login',
              'POST',
              { token: firebaseIdToken }
            );

            set({
              isAuthenticated: true,
              token: res.token, // Store Firebase ID Token in state (picked up by apiRequest)
              user: res.user,
              isLoading: false,
            });
            return true;
          }
        } catch (err: any) {
          console.error('Login error:', err);
          let errorMessage = err.message || 'An error occurred during sign in';
          if (err.code) {
            // Handle Firebase error codes gracefully
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

          if (isMockFirebase) {
            // Local dev mode fallback
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
            // Live Firebase Auth pipeline
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Set displayName in Firebase Auth Profile
            await updateProfile(userCredential.user, { displayName });
            
            const firebaseIdToken = await userCredential.user.getIdToken(true);

            // Synchronize with PostgreSQL database on the fly
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

      logout: () => {
        if (!isMockFirebase) {
          signOut(auth).catch((err) => console.warn('Firebase signout warning:', err));
        }
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          error: null,
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
