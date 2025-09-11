"use client";

import { useState } from "react";
import Image from "next/image";
import "./snapshot.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

const images = [
  {
    id: 1,
    thumb: "/images/thumb1.jpg",
    full: "/images/full1.jpg",
    title: "Cover Design 1",
  },
  {
    id: 2,
    thumb: "/images/thumb2.jpg",
    full: "/images/full2.jpg",
    title: "Cover Design 2",
  },
  {
    id: 3,
    thumb: "/images/thumb3.jpg",
    full: "/images/full3.jpg",
    title: "Cover Design 3",
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Header />
      <div className="galleryPage">
        <h1 className="title">Image Gallery</h1>
        <div className="grid">
          {images.map((img) => (
            <div key={img.id} className="card" onClick={() => setSelected(img)}>
              <Image
                src={img.thumb}
                alt={img.title}
                width={400}
                height={250}
                className="thumb"
              />
              <p>{img.title}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="modalOverlay" onClick={() => setSelected(null)}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <button className="closeBtn" onClick={() => setSelected(null)}>
                ✕
              </button>
              <Image
                src={selected.full}
                alt={selected.title}
                width={800}
                height={500}
                className="fullImage"
              />
              <p className="caption">{selected.title}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
