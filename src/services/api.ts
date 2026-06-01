const DEFAULT_API_URL = 'http://localhost:5000';

export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || DEFAULT_API_URL;
};

// Helper for unified authenticated backend requests
export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}${endpoint}`;

  // Retrieve token from useAuthStore / local storage
  const authStorage = localStorage.getItem('auth-storage');
  let token: string | null = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.token || null;
    } catch {}
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMsg = 'An error occurred on the server';
    try {
      const errRes = await response.json();
      errorMsg = errRes.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  const result = await response.json();
  return result.data as T;
}
