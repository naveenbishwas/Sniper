"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./successfull.css";

export default function SuccessPage() {
  const [uniqueId, setUniqueId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem("uniqueId");
    if (storedId) {
      setUniqueId(storedId);
      localStorage.removeItem("uniqueId"); // Optional: clear after display
    }
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
        <button onClick={() => router.push("/")}>Back to Home</button>
      </div>
    </div>
  );
}
