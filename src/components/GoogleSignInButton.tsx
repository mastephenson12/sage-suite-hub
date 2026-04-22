import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleSignInButton({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const init = () => {
      if (!window.google || !divRef.current) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          try {
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                credential: response.credential,
              }),
            });

            if (!res.ok) throw new Error("Auth failed");

            onSuccess?.();
          } catch (err) {
            console.error("Login error:", err);
          }
        },
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
      });

      window.google.accounts.id.prompt();
    };

    if (window.google) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = init;
      document.body.appendChild(script);
    }
  }, [onSuccess]);

  return <div ref={divRef} />;
}
