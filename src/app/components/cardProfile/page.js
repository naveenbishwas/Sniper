"use client";

import { useEffect, useState } from "react";
import "./cardProfile.css";
import { v4 as uuidv4 } from "uuid";
import Header from "../header/page";
import Footer from "../footer/page";

const samplePurposes = [
  "Looking for Freelance Projects",
  "Hiring Talented Developers",
  "Exploring Remote Opportunities",
  "Ready to Collaborate on Startups",
  "Seeking Creative Designers",
];

const sampleBios = [
  "Frontend Developer with 3+ years experience.",
  "Digital Marketer helping brands grow online.",
  "UI/UX Designer passionate about clean interfaces.",
  "Backend engineer who loves scalable systems.",
  "Business analyst with a knack for automation.",
];

const getRandomImage = () => {
  const id = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${
    id % 2 === 0 ? "men" : "women"
  }/${id}.jpg`;
};

export default function RandomCardsPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = Array.from({ length: 8 }).map(() => ({
      id: uuidv4().slice(0, 8),
      img: getRandomImage(),
      purpose:
        samplePurposes[Math.floor(Math.random() * samplePurposes.length)],
      bio: sampleBios[Math.floor(Math.random() * sampleBios.length)],
    }));
    setCards(newCards);
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
