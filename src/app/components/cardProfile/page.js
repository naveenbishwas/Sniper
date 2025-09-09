// // "use client";

// // import { useEffect, useState } from "react";
// // import "./cardProfile.css";
// // import { collection, getDocs } from "firebase/firestore";
// // import { db } from "@/lib/firebase"; // your Firebase config
// // import Header from "../header/page";
// // import Footer from "../footer/page";

// // export default function RandomCardsPage() {
// //   const [cards, setCards] = useState([]);

// //   // useEffect(() => {
// //   //   const fetchCards = async () => {
// //   //     try {
// //   //       const snapshot = await getDocs(collection(db, "sniper-forms"));
// //   //       const cardData = snapshot.docs.map((doc) => {
// //   //         const data = doc.data();

// //   //         // Avoid entries that mistakenly include email or phone numbers in bio or gigDescription
// //   //         const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
// //   //         const phoneRegex = /\b\d{10,}\b/;
// //   //         if (
// //   //           emailRegex.test(data.bio || "") ||
// //   //           emailRegex.test(data.gigDescription || "") ||
// //   //           phoneRegex.test(data.bio || "") ||
// //   //           phoneRegex.test(data.gigDescription || "")
// //   //         ) {
// //   //           return null; // skip this entry
// //   //         }

// //   //         return {
// //   //           // id: doc.id.slice(0, 8),
// //   //           id: data.uniqueId || doc.id.slice(0, 8),
// //   //           img: `https://randomuser.me/api/portraits/${
// //   //             Math.random() > 0.5 ? "men" : "women"
// //   //           }/${Math.floor(Math.random() * 100)}.jpg`,
// //   //           purpose: data.category || "Freelancer",
// //   //           bio: data.bio || "No bio available",
// //   //         };
// //   //       });

// //   //       // Filter out nulls from skipped invalid entries
// //   //       setCards(cardData.filter(Boolean));
// //   //     } catch (error) {
// //   //       console.error("Error fetching cards:", error);
// //   //     }
// //   //   };

// //   //   fetchCards();
// //   // }, []);

// //   useEffect(() => {
// //     const fetchCards = async () => {
// //       try {
// //         const snapshot = await getDocs(collection(db, "sniper-forms"));
// //         const cardData = snapshot.docs.map((doc) => {
// //           const data = doc.data();

// //           // Validation to skip bio or description with email/phone
// //           const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
// //           const phoneRegex = /\b\d{10,}\b/;
// //           if (
// //             emailRegex.test(data.bio || "") ||
// //             emailRegex.test(data.gigDescription || "") ||
// //             phoneRegex.test(data.bio || "") ||
// //             phoneRegex.test(data.gigDescription || "")
// //           ) {
// //             return null;
// //           }

// //           return {
// //             id: data.uniqueId || doc.id.slice(0, 8), // ✅ FIXED LINE
// //             img: `https://randomuser.me/api/portraits/${
// //               Math.random() > 0.5 ? "men" : "women"
// //             }/${Math.floor(Math.random() * 100)}.jpg`,
// //             purpose: data.category || "Freelancer",
// //             bio: data.bio || "No bio available",
// //           };
// //         });

// //         setCards(cardData.filter(Boolean));
// //       } catch (error) {
// //         console.error("Error fetching cards:", error);
// //       }
// //     };

// //     fetchCards();
// //   }, []);

// //   return (
// //     <>
// //       <Header />
// //       <div className="page-container">
// //         <h1>Meet Our Community</h1>
// //         <div className="cards-grid">
// //           {cards.map((card, idx) => (
// //             <div key={idx} className="card">
// //               <img src={card.img} alt="avatar" />
// //               <p className="uid">ID: {card.id}</p>
// //               <p className="purpose">{card.purpose}</p>
// //               <p className="bio">{card.bio}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import "./cardProfile.css";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Header from "../header/page";
// import Footer from "../footer/page";

// export default function RandomCardsPage() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "sniper-forms"));
//         const cardData = snapshot.docs
//           .map((doc) => {
//             const data = doc.data();

//             // ✅ Filter out if bio or gigDescription has email or phone
//             const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
//             const phoneRegex = /\b\d{10,}\b/;
//             if (
//               emailRegex.test(data.bio || "") ||
//               emailRegex.test(data.gigDescription || "") ||
//               phoneRegex.test(data.bio || "") ||
//               phoneRegex.test(data.gigDescription || "")
//             ) {
//               return null;
//             }

//             return {
//               id: data.uniqueId || doc.id.slice(0, 8),
//               img: data.avatarUrl || "/default-avatar.png", // ✅ Replace with avatar if available
//               purpose: data.category || "Freelancer",
//               bio: data.bio || "No bio available",
//               createdAt: data.createdAt || null, // ✅ Used for sorting
//             };
//           })
//           .filter(Boolean)
//           .sort((a, b) =>
//             b.createdAt && a.createdAt
//               ? new Date(b.createdAt) - new Date(a.createdAt)
//               : 0
//           );

//         setCards(cardData);
//       } catch (error) {
//         console.error("Error fetching cards:", error);
//       }
//     };

//     fetchCards();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="page-container">
//         <h1>Meet Our Community</h1>
//         <div className="cards-grid">
//           {cards.map((card, idx) => (
//             <div key={idx} className="card">
//               <img src={card.img} alt="avatar" />
//               <p className="uid">ID: {card.id}</p>
//               <p className="purpose">{card.purpose}</p>
//               <p className="bio">{card.bio}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import "./cardProfile.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "../header/page";
import Footer from "../footer/page";

export default function RandomCardsPage() {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dropdown labels (as shown in your screenshot)
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

  // Map dropdown label -> regex(es) that match your stored purpose like "copywriting", "graphic-designing", etc.
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
    "Full Stack Developers / Web Development": [
      /full[\s-]*stack|web[\s-]*dev/i,
    ],
    "Content Writers / Content Writing": [
      /content[\s-]*writing|content[\s-]*writer/i,
    ],
    "Emcees / Event Coordination": [/emcee|event[\s-]*coordination/i],
  };

  // Firestore Timestamp/date helper
  const toDate = (v) => (v?.toDate ? v.toDate() : v ? new Date(v) : null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const snapshot = await getDocs(collection(db, "sniper-forms"));
        const cardData = snapshot.docs
          .map((doc) => {
            const data = doc.data();

            // Filter out entries with email/phone in bio/description
            const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
            const phoneRegex = /\b\d{10,}\b/;
            if (
              emailRegex.test(data.bio || "") ||
              emailRegex.test(data.gigDescription || "") ||
              phoneRegex.test(data.bio || "") ||
              phoneRegex.test(data.gigDescription || "")
            ) {
              return null;
            }

            return {
              id: data.uniqueId || doc.id.slice(0, 8),
              img: data.avatarUrl || "/t1.jpg",
              purpose: (data.category || "Freelancer").toString(),
              bio: data.bio || "No bio available",
              createdAt: data.createdAt || null,
            };
          })
          .filter(Boolean)
          .sort((a, b) => toDate(b.createdAt) - toDate(a.createdAt) || 0);

        setCards(cardData);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  // Filtering logic using the regex map above
  const filteredCards = useMemo(() => {
    if (selectedCategory === "All") return cards;

    const tests = CATEGORY_TESTS[selectedCategory];
    if (!tests) return cards;

    return cards.filter((c) => {
      const hay = `${c.purpose}`; // you can append bio if you want to widen match:  + " " + c.bio
      return tests.some((rx) => rx.test(hay));
    });
  }, [cards, selectedCategory]);

  return (
    <>
      <Header />
      <div className="page-container">
        <h1>Meet Our Community</h1>

        {/* Filter Bar */}
        <div className="filters-bar">
          <div className="filters-inner">
            <div className="filter-group">
              <label htmlFor="category-select" className="filter-label">
                Select Category
              </label>
              <div className="select-wrap">
                <select
                  id="category-select"
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

            <div className="result-pill" title="Visible profiles">
              {filteredCards.length} profiles
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {filteredCards.map((card, idx) => (
            <div key={idx} className="card">
              <img src={card.img} alt="avatar" />
              <p className="uid">ID: {card.id}</p>
              <p className="purpose">{card.purpose}</p>
              <p className="bio">{card.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
