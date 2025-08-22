import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0rkRpGc7CaZkokxbj7kOVmZunFT6pq2s",
  authDomain: "sniper-85a51.firebaseapp.com",
  projectId: "sniper-85a51",
  storageBucket: "sniper-85a51.firebasestorage.app",
  messagingSenderId: "502797706138",
  appId: "1:502797706138:web:ba0b4e75c16ce1e6549023",
  measurementId: "G-56553T4KR2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Add these exports:
export const auth = getAuth(app);
export const db = getFirestore(app);
