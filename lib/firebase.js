import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const config = {apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID};
export const configured = Object.values(config).every(Boolean);
export function firebaseAuth() { if (!configured) throw new Error('Firebase is not configured. Add your Firebase web configuration to .env.local.'); return getAuth(getApps()[0] || initializeApp(config)); }
