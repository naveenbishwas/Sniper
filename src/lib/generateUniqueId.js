import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const generateUniqueId = async (name, email, role) => {
  const cleanedName = name.toLowerCase().replace(/\s/g, "");
  const randomNum = Math.floor(100 + Math.random() * 900);
  const uniqueId = `${cleanedName}${randomNum}`;

  const docRef = doc(db, "uniqueUserIds", uniqueId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return generateUniqueId(name, email, role);
  }

  await setDoc(docRef, {
    uniqueId,
    createdAt: new Date().toISOString(),
    email,
    name,
    role,
  });

  return uniqueId;
};
