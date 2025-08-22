"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const useProfileRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const email = user.email;
      const db = getFirestore();

      try {
        const sniperQuery = query(
          collection(db, "sniper-forms"),
          where("email", "==", email)
        );
        const sniperSnap = await getDocs(sniperQuery);

        if (!sniperSnap.empty) {
          router.push("/hireDashboard");
          return;
        }

        const freelancerQuery = query(
          collection(db, "freelancer-submissions"),
          where("email", "==", email)
        );
        const freelancerSnap = await getDocs(freelancerQuery);

        if (!freelancerSnap.empty) {
          router.push("/freelancerDashboard");
          return;
        }

        // User exists but hasn't filled either form yet
        const role = localStorage.getItem("userRole");
        if (role === "beSniper") {
          router.push("/components/beSniper");
        } else if (role === "HireFreelancer") {
          router.push("/components/HireFreelancer");
        } else {
          router.push("/components/chooseRole");
        }
      } catch (err) {
        console.error("Redirection error:", err);
      }
    };

    checkUserProfile();
  }, [router]);
};
