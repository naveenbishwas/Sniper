"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./gigsPage.css";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebaseClient";
import { db } from "@/lib/firebase";
import Header from "../header/page";
import Footer from "../footer/page";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Graphic Designers / Graphic Designing",
  "Copywriters / Copywriting",
  "Copy Editors / Copy Editing",
  "Proofreaders / Proofreading",
  "Beta Readers / Beta Reading",
  "Translators / Translation",
  "Illustrators / Illustration",
  "Ghost Writers / Ghost Writing",
  "Voice Over Artists / Voice Over",
  "Video Editors / Video Editing",
  "Typesetter / Typesetting",
  "Literary Agents / Literary Representation",
  "Social Media Managers / Social Media Management",
  "Amazon Marketing Executives / Amazon Marketing Services",
  "Full Stack Developers / Web Development",
  "Content Writers / Content Writing",
  "Emcees / Event Coordination",
];

const CATEGORY_TESTS = {
  "Graphic Designers / Graphic Designing": [/graphic[\s-]*design/i],
  "Copywriters / Copywriting": [/copy[\s-]*writing|copywriter/i],
  "Copy Editors / Copy Editing": [/copy[\s-]*edit/i],
  "Proofreaders / Proofreading": [/proof[\s-]*read/i],
  "Beta Readers / Beta Reading": [/beta[\s-]*read/i],
  "Translators / Translation": [/translat/i],
  "Illustrators / Illustration": [/illustrat/i],
  "Ghost Writers / Ghost Writing": [/ghost[\s-]*write/i],
  "Voice Over Artists / Voice Over": [/voice[\s-]*over/i],
  "Video Editors / Video Editing": [/video[\s-]*edit/i],
  "Typesetter / Typesetting": [/typesett/i],
  "Literary Agents / Literary Representation": [/literary|representation/i],
  "Social Media Managers / Social Media Management": [/social[\s-]*media/i],
  "Amazon Marketing Executives / Amazon Marketing Services": [
    /amazon[\s-]*marketing|ams/i,
  ],
  "Full Stack Developers / Web Development": [/full[\s-]*stack|web[\s-]*dev/i],
  "Content Writers / Content Writing": [
    /content[\s-]*writing|content[\s-]*writer/i,
  ],
  "Emcees / Event Coordination": [/emcee|event[\s-]*coordination/i],
};

// ---- simple local cache keys
const CACHE_KEY = "gigsCacheV1";
const CAT_KEY = "gigsSelectedCategory";

export default function GigsPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem(CAT_KEY) || "All"
      : "All"
  );

  // Load cached gigs instantly (so reloads don’t look empty), then refresh from Firestore
  useEffect(() => {
    let alive = true;

    // 1) hydrate from cache (if present)
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          if (Array.isArray(cached)) {
            setGigs(cached);
            setLoading(false); // show cached immediately
          }
        }
      } catch (e) {
        // ignore cache errors
      }
    }

    // 2) fetch fresh data
    (async () => {
      try {
        const snap = await getDocs(collection(db, "sniper-forms"));
        const rows = snap.docs.map((d) => {
          const data = d.data();
          return {
            title: data.gigTopic || "Untitled",
            description: data.gigDescription || "",
            category: String(data.category || "Other"),
            deadline: data.gigDeadline || "No Deadline",
            price: data.gigBudget ? `₹${data.gigBudget}` : "Not Specified",
            author: data.fullName || "Anonymous",
          };
        });

        if (!alive) return;
        setGigs(rows);
        setError("");
        setLoading(false);

        // 3) save to cache for future reloads
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(rows));
          } catch {}
        }
      } catch (e) {
        console.error("Error fetching gigs:", e);
        if (!alive) return;
        setError("Could not load gigs. Please try again later.");
        setLoading(false);
      }
    })();

    return () => {
      alive = false; // avoid state updates after unmount
    };
  }, []);

  // persist selected category so it survives reloads
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CAT_KEY, selectedCategory);
    }
  }, [selectedCategory]);

  const filteredGigs = useMemo(() => {
    if (selectedCategory === "All") return gigs;
    const tests = CATEGORY_TESTS[selectedCategory];
    return tests
      ? gigs.filter((g) => tests.some((rx) => rx.test(`${g.category}`)))
      : gigs;
  }, [gigs, selectedCategory]);

  return (
    <>
      <Header />
      <h1 className="gigs-title" id="title">
        All Gigs
      </h1>

      {/* Filter Bar */}
      <div className="filters-bar">
        <div className="filters-inner">
          <div className="filter-group">
            <label htmlFor="gig-category" className="filter-label">
              Select Category
            </label>
            <div className="select-wrap">
              <select
                id="gig-category"
                className="nice-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="select-caret">▾</span>
            </div>
          </div>

          <div className="result-pill">{filteredGigs.length} gigs</div>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading gigs...</p>
      ) : error ? (
        <p className="error-text" id="gigs-error">
          {error}
        </p>
      ) : filteredGigs.length === 0 ? (
        <p className="error-text">No gigs found for this category.</p>
      ) : (
        <div className="gigs-grid" id="gigsPage">
          {/* {filteredGigs.map((gig, idx) => (
            <div
              key={idx}
              className={`gig-card ${idx === 1 ? "featured" : ""}`}
            >
              <div className="gig-top">
                <span className="gig-tag">{gig.category}</span>
                <span className="gig-rating">⭐ 4.9</span>
              </div>
              <h3 className="gig-title">{gig.title}</h3>
              <p className="gig-author">👤 by {gig.author}</p>
              <p className="gig-desc">{gig.description}</p>
              <div className="gig-meta">
                <span>📅 {gig.deadline}</span>
              </div>
              <div className="gig-bottom">
                <span className="gig-price">{gig.price}</span>
                <Link href="https://wa.me/919643138042?text=Hi%2C%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20your%20services.">
                  <button className="gig-btn">Chat Now</button>
                </Link>
              </div>
            </div>
          ))} */}
          {filteredGigs.map((gig, idx) => (
            <div
              key={idx}
              className={`gig-card ${idx === 1 ? "featured" : ""}`}
            >
              <div className="gig-top">
                <span className="gig-tag">{gig.category}</span>
                <span className="gig-rating">⭐ 4.9</span>
              </div>

              {/* NEW: body wrapper so the bottom bar aligns */}
              <div className="gig-body">
                <h3 className="gig-title">{gig.title}</h3>
                <p className="gig-author">👤 by {gig.author}</p>
                <p className="gig-desc">{gig.description}</p>
                <div className="gig-meta">
                  <span>📅 {gig.deadline}</span>
                </div>
              </div>

              <div className="gig-bottom">
                <span className="gig-price">{gig.price}</span>
                <Link href="https://wa.me/919643138042?text=Hi%2C%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20your%20services.">
                  <button className="gig-btn">Chat Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
