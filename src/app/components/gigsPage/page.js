"use client";

import React, { useState, useEffect } from "react";
import "./gigsPage.css";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const gigs = [
  {
    category: "Video Production",
    title: "Book Trailer for Fantasy Novel",
    author: "Ratna Jyoti",
    description:
      "Need a compelling 60-second book trailer for my fantasy novel 'The Mystic Realm'...",
    duration: "7 days",
    proposals: "12",
    price: "$500 - $1,000",
    rating: "4.8",
  },
  {
    category: "Design",
    title: "Professional Book Cover Design",
    author: "Aditi Sharma",
    description:
      "Looking for a modern, eye-catching cover design for my romance novel...",
    duration: "5 days",
    proposals: "8",
    price: "$200 - $400",
    rating: "4.9",
  },
  {
    category: "Editing",
    title: "Comprehensive Book Editing",
    author: "Vikram Singh",
    description:
      "Need thorough editing for my 80,000-word historical fiction manuscript...",
    duration: "10 days",
    proposals: "5",
    price: "$600 - $800",
    rating: "4.7",
  },
  {
    category: "Marketing",
    title: "Social Media Marketing Campaign",
    author: "Priya Mehta",
    description:
      "Create and execute a 30-day social media marketing strategy for book launch...",
    duration: "6 days",
    proposals: "10",
    price: "$300 - $500",
    rating: "4.6",
  },
];

const GigsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const db = getFirestore();
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError("No data found for this user.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="gigs-grid" id="gigsPage">
        {gigs.map((gig, idx) => (
          <div key={idx} className={`gig-card ${idx === 1 ? "featured" : ""}`}>
            <div className="gig-top">
              <span className="gig-tag">{gig.category}</span>
              <span className="gig-rating">⭐ {gig.rating}</span>
            </div>
            <h3 className="gig-title">{gig.title}</h3>
            <p className="gig-author">👤 by {gig.author}</p>
            <p className="gig-desc">{gig.description}</p>
            {/* <div className="gig-meta">
              <span>⏱ {gig.duration}</span>
              <span>{gig.proposals} proposals</span>
            </div> */}
            {/* <div className="gig-bottom">
              <span className="gig-price">{gig.price}</span>
              <button className="gig-btn">Apply Now</button>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default GigsPage;
