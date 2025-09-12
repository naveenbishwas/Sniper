"use client";

import { useState } from "react";
import Image from "next/image";
import "./snapshot.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

const images = [
  {
    id: 1,
    thumb: "/12.jpeg",
    full: "/sakeena.jpg",
    title: "Sun Sakeena",
  },
  {
    id: 2,
    thumb: "/dragger-front.png",
    full: "/dagger.jpg",
    title: "Daggers",
  },
  {
    id: 3,
    thumb: "/ikigai-front.png",
    full: "/ikigai.jpg",
    title: "Harmonia Beyond Ikigai",
  },
  {
    id: 1,
    thumb: "/12.jpeg",
    full: "/sakeena.jpg",
    title: "Sun Sakeena",
  },
  {
    id: 2,
    thumb: "/dragger-front.png",
    full: "/dagger.jpg",
    title: "Daggers",
  },
  {
    id: 3,
    thumb: "/ikigai-front.png",
    full: "/ikigai.jpg",
    title: "Harmonia Beyond Ikigai",
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Header />
      <div className="snapshot-page">
        <h1 className="snapshot-title">Image Gallery</h1>
        <div className="snapshot-grid">
          {images.map((img) => (
            <div
              key={img.id}
              className="snapshot-card"
              onClick={() => setSelected(img)}
            >
              <div className="snapshot-image-wrapper">
                <Image
                  src={img.thumb}
                  alt={img.title}
                  fill
                  className="snapshot-thumb"
                />
              </div>
              <div className="snapshot-footer">
                <p className="snapshot-caption">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div
            className="snapshot-modal-overlay"
            onClick={() => setSelected(null)}
          >
            <div
              className="snapshot-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="snapshot-close-btn"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <Image
                src={selected.full}
                alt={selected.title}
                width={800}
                height={500}
                className="snapshot-full-image"
              />
              <p className="snapshot-modal-caption">{selected.title}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
