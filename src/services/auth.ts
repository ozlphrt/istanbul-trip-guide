import { getStoredGoogleClientId } from './storage';

// Scope strictly limited to read-only Calendar as required
const CALENDAR_READONLY_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

interface TokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: TokenResponse) => void;
            error_callback?: (err: Error) => void;
          }) => TokenClient;
          revoke: (accessToken: string, callback?: () => void) => void;
        };
      };
    };
  }
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
}

let activeToken: string | null = null;
let tokenExpiresAt: number = 0;
let tokenClientInstance: TokenClient | null = null;

export function getCachedToken(): string | null {
  if (activeToken && Date.now() < tokenExpiresAt - 60000) {
    return activeToken;
  }
  return null;
}

export function isGoogleAuthInitialized(): boolean {
  return typeof window !== 'undefined' && !!window.google?.accounts?.oauth2;
}

export function initGoogleTokenClient(
  clientId: string,
  onSuccess: (token: string) => void,
  onError: (err: string) => void
): TokenClient | null {
  if (!isGoogleAuthInitialized()) {
    console.warn('Google Identity Services script not yet loaded.');
    return null;
  }

  if (!clientId || !clientId.trim()) {
    return null;
  }

  try {
    tokenClientInstance = window.google!.accounts!.oauth2!.initTokenClient({
      client_id: clientId.trim(),
      scope: CALENDAR_READONLY_SCOPE,
      callback: (resp: TokenResponse) => {
        if (resp.error) {
          console.error('Google OAuth error:', resp);
          onError(resp.error_description || resp.error);
          return;
        }
        activeToken = resp.access_token;
        tokenExpiresAt = Date.now() + (resp.expires_in || 3600) * 1000;
        onSuccess(resp.access_token);
      },
      error_callback: (err: Error) => {
        console.error('Google OAuth initialization error:', err);
        onError(err.message || 'Authentication failed');
      }
    });

    return tokenClientInstance;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Failed to init token client', errorMsg);
    onError(errorMsg);
    return null;
  }
}

export function promptGoogleLogin(
  onSuccess: (token: string) => void,
  onError: (err: string) => void
): void {
  const clientId = getStoredGoogleClientId();
  if (!clientId) {
    onError('Google Client ID is required. Please set it in Settings.');
    return;
  }

  const client = initGoogleTokenClient(clientId, onSuccess, onError);
  if (client) {
    client.requestAccessToken({ prompt: 'consent' });
  } else {
    onError('Google Identity Services unavailable or invalid Client ID.');
  }
}

export function clearGoogleToken(): void {
  if (activeToken && window.google?.accounts?.oauth2?.revoke) {
    window.google.accounts.oauth2.revoke(activeToken, () => {
      console.log('Google token revoked');
    });
  }
  activeToken = null;
  tokenExpiresAt = 0;
}
