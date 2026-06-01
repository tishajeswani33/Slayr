import jwt from 'jsonwebtoken';

// Cache for Google's public certificates
let googlePublicKeys: Record<string, string> = {};
let keysExpiry = 0;

/**
 * Dynamically retrieves Google's public x509 certificates used to sign Firebase ID Tokens.
 * Caches certificates in-memory based on the response's Cache-Control max-age.
 */
async function fetchGooglePublicKeys(): Promise<Record<string, string>> {
  const now = Date.now();
  if (now < keysExpiry && Object.keys(googlePublicKeys).length > 0) {
    return googlePublicKeys;
  }

  try {
    const res = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
    if (!res.ok) {
      throw new Error(`Failed to fetch Google public keys: ${res.statusText}`);
    }

    const keys = (await res.json()) as Record<string, string>;
    googlePublicKeys = keys;

    // Parse Cache-Control header to determine TTL
    const cacheControl = res.headers.get('cache-control');
    let maxAge = 3600; // default to 1 hour
    if (cacheControl) {
      const match = cacheControl.match(/max-age=(\d+)/);
      if (match) {
        maxAge = parseInt(match[1], 10);
      }
    }
    keysExpiry = now + maxAge * 1000;
    return googlePublicKeys;
  } catch (error) {
    console.error('⚠️ Error fetching Google public keys, utilizing cached keys if available:', error);
    return googlePublicKeys;
  }
}

export interface DecodedFirebaseToken {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

/**
 * Verifies a Firebase ID token (JWT) using Google's public certificates.
 * Checks signature, expiration, audience, and issuer.
 * Does not require a Firebase service account JSON.
 *
 * @param token Firebase ID token passed in headers
 * @param projectId Firebase project ID (e.g. "slayr-demo")
 */
export async function verifyFirebaseIdToken(
  token: string,
  projectId: string
): Promise<DecodedFirebaseToken> {
  const decoded = jwt.decode(token, { complete: true });
  
  if (!decoded || typeof decoded === 'string' || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid Firebase token structure: missing header or kid');
  }

  const kid = decoded.header.kid;
  const publicKeys = await fetchGooglePublicKeys();
  const cert = publicKeys[kid];

  if (!cert) {
    throw new Error(`Public key not found for kid: ${kid}`);
  }

  // Verify the JWT signature using RS256 algorithm and validate claims
  const payload = jwt.verify(token, cert, {
    algorithms: ['RS256'],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  }) as any;

  if (!payload || !payload.sub) {
    throw new Error('Firebase token is missing standard sub (uid) claim');
  }

  return {
    uid: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
}
