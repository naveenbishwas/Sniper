import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHtsoGggdUeZJdGj5cgAmcdPvHCR2QjAE",
  authDomain: "sniper-app-c8fb5.firebaseapp.com",
  projectId: "sniper-app-c8fb5",
  storageBucket: "sniper-app-c8fb5.appspot.com", // ✅ fixed .app → .appspot.com
  messagingSenderId: "645350161133",
  appId: "1:645350161133:web:a339ed9e42fb684e696ae4",
  measurementId: "G-KT9NRN13N6",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Add these exports:
export const auth = getAuth(app);
export const db = getFirestore(app);
