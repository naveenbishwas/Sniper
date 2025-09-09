// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import "./gigsPage.css";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import Header from "../header/page";
// import Footer from "../footer/page";
// import Link from "next/link";

// const CATEGORIES = [
//   "All",
//   "Graphic Designers / Graphic Designing",
//   "Copywriters / Copywriting",
//   "Copy Editors / Copy Editing",
//   "Proofreaders / Proofreading",
//   "Beta Readers / Beta Reading",
//   "Translators / Translation",
//   "Illustrators / Illustration",
//   "Ghost Writers / Ghost Writing",
//   "Voice Over Artists / Voice Over",
//   "Video Editors / Video Editing",
//   "Typesetter / Typesetting",
//   "Literary Agents / Literary Representation",
//   "Social Media Managers / Social Media Management",
//   "Amazon Marketing Executives / Amazon Marketing Services",
//   "Full Stack Developers / Web Development",
//   "Content Writers / Content Writing",
//   "Emcees / Event Coordination",
// ];

// // dropdown label -> regex tests for your stored categories
// const CATEGORY_TESTS = {
//   "Graphic Designers / Graphic Designing": [/graphic[\s-]*design/i],
//   "Copywriters / Copywriting": [/copy[\s-]*writing|copywriter/i],
//   "Copy Editors / Copy Editing": [/copy[\s-]*edit/i],
//   "Proofreaders / Proofreading": [/proof[\s-]*read/i],
//   "Beta Readers / Beta Reading": [/beta[\s-]*read/i],
//   "Translators / Translation": [/translat/i],
//   "Illustrators / Illustration": [/illustrat/i],
//   "Ghost Writers / Ghost Writing": [/ghost[\s-]*write/i],
//   "Voice Over Artists / Voice Over": [/voice[\s-]*over/i],
//   "Video Editors / Video Editing": [/video[\s-]*edit/i],
//   "Typesetter / Typesetting": [/typesett/i],
//   "Literary Agents / Literary Representation": [/literary|representation/i],
//   "Social Media Managers / Social Media Management": [/social[\s-]*media/i],
//   "Amazon Marketing Executives / Amazon Marketing Services": [
//     /amazon[\s-]*marketing|ams/i,
//   ],
//   "Full Stack Developers / Web Development": [/full[\s-]*stack|web[\s-]*dev/i],
//   "Content Writers / Content Writing": [
//     /content[\s-]*writing|content[\s-]*writer/i,
//   ],
//   "Emcees / Event Coordination": [/emcee|event[\s-]*coordination/i],
// };

// const GigsPage = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         const db = getFirestore();
//         const querySnapshot = await getDocs(collection(db, "sniper-forms"));

//         const gigsData = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           gigsData.push({
//             title: data.gigTopic || "Untitled",
//             description: data.gigDescription || "",
//             category: (data.category || "Other").toString(),
//             deadline: data.gigDeadline || "No Deadline",
//             price: data.gigBudget ? `₹${data.gigBudget}` : "Not Specified",
//             author: data.fullName || "Anonymous",
//           });
//         });

//         setGigs(gigsData);
//       } catch (err) {
//         console.error("❌ Error fetching gigs:", err);
//         setError("Could not load gigs. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGigs();
//   }, []);

//   const filteredGigs = useMemo(() => {
//     if (selectedCategory === "All") return gigs;
//     const tests = CATEGORY_TESTS[selectedCategory];
//     if (!tests) return gigs;
//     return gigs.filter((g) => tests.some((rx) => rx.test(`${g.category}`)));
//   }, [gigs, selectedCategory]);

//   return (
//     <>
//       <Header />
//       <h1 className="gigs-title" id="title">
//         All Gigs
//       </h1>

//       {/* Filter Bar */}
//       <div className="filters-bar">
//         <div className="filters-inner">
//           <div className="filter-group">
//             <label htmlFor="gig-category" className="filter-label">
//               Select Category
//             </label>
//             <div className="select-wrap">
//               <select
//                 id="gig-category"
//                 className="nice-select"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 {CATEGORIES.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//               <span className="select-caret">▾</span>
//             </div>
//           </div>

//           <div className="result-pill">{filteredGigs.length} gigs</div>
//         </div>
//       </div>

//       {loading ? (
//         <p className="loading-text">Loading gigs...</p>
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : filteredGigs.length === 0 ? (
//         <p className="error-text">No gigs found for this category.</p>
//       ) : (
//         <div className="gigs-grid" id="gigsPage">
//           {filteredGigs.map((gig, idx) => (
//             <div
//               key={idx}
//               className={`gig-card ${idx === 1 ? "featured" : ""}`}
//             >
//               <div className="gig-top">
//                 <span className="gig-tag">{gig.category}</span>
//                 <span className="gig-rating">⭐ 4.9</span>
//               </div>
//               <h3 className="gig-title">{gig.title}</h3>
//               <p className="gig-author">👤 by {gig.author}</p>
//               <p className="gig-desc">{gig.description}</p>
//               <div className="gig-meta">
//                 <span>📅 {gig.deadline}</span>
//               </div>
//               <div className="gig-bottom">
//                 <span className="gig-price">{gig.price}</span>
//                 <Link href="https://wa.me/919643138042?text=Hi%2C%20I%20saw%20your%20website%20and%20I'm%20interested%20in%20your%20services.">
//                   <button className="gig-btn">Chat Now</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default GigsPage;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./gigsPage.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient"; // ← use the singleton
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

// dropdown label -> regex tests for your stored categories
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

export default function GigsPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let alive = true;
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
        if (alive) setGigs(rows);
      } catch (e) {
        console.error("Error fetching gigs:", e);
        if (alive) setError("Could not load gigs. Please try again later.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false; // avoid state updates after unmount (StrictMode)
    };
  }, []);

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
        <p className="error-text">{error}</p>
      ) : filteredGigs.length === 0 ? (
        <p className="error-text">No gigs found for this category.</p>
      ) : (
        <div className="gigs-grid" id="gigsPage">
          {filteredGigs.map((gig, idx) => (
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
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
