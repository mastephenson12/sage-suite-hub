import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missingFirebaseEnv =
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId;

if (missingFirebaseEnv) {
  console.error("Missing Firebase environment variables:", {
    hasApiKey: Boolean(firebaseConfig.apiKey),
    hasAuthDomain: Boolean(firebaseConfig.authDomain),
    hasProjectId: Boolean(firebaseConfig.projectId),
    hasAppId: Boolean(firebaseConfig.appId),
  });
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const isFirebaseConfigured = !missingFirebaseEnv;
