// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export const generateUniqueId = async (name, email, role) => {
//   const cleanedName = name.toLowerCase().replace(/\s/g, "");
//   const randomNum = Math.floor(100 + Math.random() * 900);
//   const uniqueId = `${cleanedName}${randomNum}`;

//   const docRef = doc(db, "uniqueUserIds", uniqueId);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     return generateUniqueId(name, email, role);
//   }

//   await setDoc(docRef, {
//     uniqueId,
//     createdAt: new Date().toISOString(),
//     email,
//     name,
//     role,
//   });

//   return uniqueId;
// };
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const generateUniqueId = async (name, email, role) => {
  // Choose prefix based on role
  let base;
  if (role === "beSniper") {
    base = "Hawkee"; // Freelancer role
  } else if (role === "HireFreelancer") {
    base = "Hawker"; // Client role
  } else {
    base = (name || "user").toLowerCase().replace(/\s/g, "");
  }

  const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random number
  const uniqueId = `${base}${randomNum}`;

  const docRef = doc(db, "uniqueUserIds", uniqueId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // If collision, try again
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
