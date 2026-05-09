/// <reference types="vite/client" />

import React from 'react';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              type?: 'standard' | 'icon';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

type GoogleCredentialResponse = {
  credential?: string;
  select_by?: string;
};

type GoogleSignInButtonProps = {
  onSuccess?: (credential: string) => void;
  onError?: (message: string) => void;
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

export default function GoogleSignInButton({
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const buttonRef = React.useRef<HTMLDivElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      const message = 'Missing VITE_GOOGLE_CLIENT_ID environment variable.';
      setError(message);
      onError?.(message);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    const initializeGoogleButton = () => {
      if (!window.google || !buttonRef.current) {
        const message = 'Google Sign-In failed to load.';
        setError(message);
        onError?.(message);
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: GoogleCredentialResponse) => {
          if (!response.credential) {
            const message = 'No Google credential returned.';
            setError(message);
            onError?.(message);
            return;
          }

          try {
  const firebaseCredential = GoogleAuthProvider.credential(response.credential);
  const userCredential = await signInWithCredential(auth, firebaseCredential);

  setError(null);
  onSuccess?.(response.credential);

  console.log("Signed into Firebase as:", userCredential.user.email);
} catch (firebaseError) {
  console.error("Firebase sign-in failed:", firebaseError);

  const message = "Google sign-in worked, but Firebase login failed.";
  setError(message);
  onError?.(message);
}
        },
      });

      buttonRef.current.innerHTML = '';

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'left',
      });
    };

    if (existingScript) {
      initializeGoogleButton();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleButton;
    script.onerror = () => {
      const message = 'Could not load Google Sign-In script.';
      setError(message);
      onError?.(message);
    };

    document.body.appendChild(script);
  }, [onError, onSuccess]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={buttonRef} />

      {error && (
        <p className="max-w-sm text-center text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
