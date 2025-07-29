"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./successfull.css";

export default function SuccessPage() {
  const [uniqueId, setUniqueId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem("uniqueId");
    const storedRole = localStorage.getItem("userRole");

    if (storedId) {
      setUniqueId(storedId);
      localStorage.removeItem("uniqueId"); // Optional: cleanup
    }

    const timeout = setTimeout(() => {
      if (storedRole === "beSniper") {
        router.push("/components/gigsPage");
      } else if (storedRole === "HireFreelancer") {
        router.push("/components/cardProfile");
      } else {
        router.push("/");
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timeout); // cleanup on unmount
  }, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>🎉 Thank You!</h1>
        <p>Your form was submitted successfully.</p>
        {uniqueId && (
          <div className="uid-box">
            <strong>Your Unique ID:</strong>
            <p>{uniqueId}</p>
          </div>
        )}
        <p className="note">Redirecting you shortly...</p>
      </div>
    </div>
  );
}
