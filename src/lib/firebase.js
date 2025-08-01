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

// const firebaseConfig = {
//   apiKey: "AIzaSyBI8U-iISECaMaLrZmoTfxhGeVTj_5G4XA",
//   authDomain: "sniper2-7814b.firebaseapp.com",
//   projectId: "sniper2-7814b",
//   storageBucket: "sniper2-7814b.firebasestorage.app",
//   messagingSenderId: "532506371954",
//   appId: "1:532506371954:web:08c7031f3603e7e39f9feb",
//   measurementId: "G-KGMZ61BB9Z",
// };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Add these exports:
export const auth = getAuth(app);
export const db = getFirestore(app);
