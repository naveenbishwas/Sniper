// "use client";

// import { useEffect, useState } from "react";
// import "./cardProfile.css";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // your Firebase config
// import Header from "../header/page";
// import Footer from "../footer/page";

// export default function RandomCardsPage() {
//   const [cards, setCards] = useState([]);

//   // useEffect(() => {
//   //   const fetchCards = async () => {
//   //     try {
//   //       const snapshot = await getDocs(collection(db, "sniper-forms"));
//   //       const cardData = snapshot.docs.map((doc) => {
//   //         const data = doc.data();

//   //         // Avoid entries that mistakenly include email or phone numbers in bio or gigDescription
//   //         const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
//   //         const phoneRegex = /\b\d{10,}\b/;
//   //         if (
//   //           emailRegex.test(data.bio || "") ||
//   //           emailRegex.test(data.gigDescription || "") ||
//   //           phoneRegex.test(data.bio || "") ||
//   //           phoneRegex.test(data.gigDescription || "")
//   //         ) {
//   //           return null; // skip this entry
//   //         }

//   //         return {
//   //           // id: doc.id.slice(0, 8),
//   //           id: data.uniqueId || doc.id.slice(0, 8),
//   //           img: `https://randomuser.me/api/portraits/${
//   //             Math.random() > 0.5 ? "men" : "women"
//   //           }/${Math.floor(Math.random() * 100)}.jpg`,
//   //           purpose: data.category || "Freelancer",
//   //           bio: data.bio || "No bio available",
//   //         };
//   //       });

//   //       // Filter out nulls from skipped invalid entries
//   //       setCards(cardData.filter(Boolean));
//   //     } catch (error) {
//   //       console.error("Error fetching cards:", error);
//   //     }
//   //   };

//   //   fetchCards();
//   // }, []);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "sniper-forms"));
//         const cardData = snapshot.docs.map((doc) => {
//           const data = doc.data();

//           // Validation to skip bio or description with email/phone
//           const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
//           const phoneRegex = /\b\d{10,}\b/;
//           if (
//             emailRegex.test(data.bio || "") ||
//             emailRegex.test(data.gigDescription || "") ||
//             phoneRegex.test(data.bio || "") ||
//             phoneRegex.test(data.gigDescription || "")
//           ) {
//             return null;
//           }

//           return {
//             id: data.uniqueId || doc.id.slice(0, 8), // ✅ FIXED LINE
//             img: `https://randomuser.me/api/portraits/${
//               Math.random() > 0.5 ? "men" : "women"
//             }/${Math.floor(Math.random() * 100)}.jpg`,
//             purpose: data.category || "Freelancer",
//             bio: data.bio || "No bio available",
//           };
//         });

//         setCards(cardData.filter(Boolean));
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

import { useEffect, useState } from "react";
import "./cardProfile.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "../header/page";
import Footer from "../footer/page";

export default function RandomCardsPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const snapshot = await getDocs(collection(db, "sniper-forms"));
        const cardData = snapshot.docs
          .map((doc) => {
            const data = doc.data();

            // ✅ Filter out if bio or gigDescription has email or phone
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
              img: data.avatarUrl || "/default-avatar.png", // ✅ Replace with avatar if available
              purpose: data.category || "Freelancer",
              bio: data.bio || "No bio available",
              createdAt: data.createdAt || null, // ✅ Used for sorting
            };
          })
          .filter(Boolean)
          .sort((a, b) =>
            b.createdAt && a.createdAt
              ? new Date(b.createdAt) - new Date(a.createdAt)
              : 0
          );

        setCards(cardData);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">
        <h1>Meet Our Community</h1>
        <div className="cards-grid">
          {cards.map((card, idx) => (
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
