// lib/generateUniqueId.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // adjust if needed

export const generateUniqueId = async (name) => {
  const cleanedName = name.toLowerCase().replace(/\s/g, "");
  const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit
  const uniqueId = `${cleanedName}${randomNum}`;

  const docRef = doc(db, "uniqueUserIds", uniqueId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return generateUniqueId(name); // retry if exists
  }

  await setDoc(docRef, {
    uniqueId,
    createdAt: new Date().toISOString(),
  });

  return uniqueId;
};
