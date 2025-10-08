"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import "./snapshot.css";

/** === VIDEO ITEMS === */
const videoItems = [
  {
    id: "v1",
    type: "video",
    title: "Audit of Habits",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842724/audit_qxzjzw.mp4",
    poster: "/audit.png",
  },
  {
    id: "v2",
    type: "video",
    title: "Not Indian Enough",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842744/trailer_pyesvr.mp4",
    poster: "/not-india.png",
  },
  {
    id: "v3",
    type: "video",
    title: "Rise of The Fallen",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842694/final_oyshe0.mp4",
    poster: "/rise.png",
  },
  {
    id: "v4",
    type: "video",
    title: "Financial Literacy",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842736/franchise_usdgig.mp4",
    poster: "/frenchaise.png",
  },
];

/** === IMAGE ITEMS === */
const imageItems = [
  {
    id: "i1",
    type: "image",
    title: "Sun Sakeena",
    thumb: "/12.jpeg",
    full: "/sakeena.jpg",
  },
  {
    id: "i2",
    type: "image",
    title: "Daggers",
    thumb: "/dragger-front.png",
    full: "/dagger.jpg",
  },
  {
    id: "i3",
    type: "image",
    title: "Harmonia Beyond Ikigai",
    thumb: "/ikigai-front.png",
    full: "/ikigai.jpg",
  },
  {
    id: "i4",
    type: "image",
    title: "Ocean Dreams",
    thumb: "/ocean.png",
    full: "/ocean-full.jpg",
  },
];

/** === Interleave: one video, one image, repeat === */
function interleaveAlternating(videos, images) {
  const mixed = [];
  const max = Math.max(videos.length, images.length);
  for (let i = 0; i < max; i++) {
    if (videos[i]) mixed.push(videos[i]);
    if (images[i]) mixed.push(images[i]);
  }
  return mixed;
}

const mixedItems = interleaveAlternating(videoItems, imageItems);

export default function MixedGalleryPage() {
  const [open, setOpen] = useState(null);
  const videoRef = useRef(null);

  const onOpen = (item) => setOpen(item);
  const onClose = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {}
    }
    setOpen(null);
  };

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.documentElement.style.overflow = prev || "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
      <Header />
      <main className="gm-container">
        <h1 className="gm-title">Gallery</h1>

        <section className="gm-grid">
          {mixedItems.map((item) => (
            <article
              key={item.id}
              className="gm-card"
              role="button"
              tabIndex={0}
              onClick={() => onOpen(item)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && onOpen(item)
              }
            >
              <div className="gm-thumb">
                {item.type === "image" ? (
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    className="gm-img"
                    sizes="(max-width: 520px) 100vw, (max-width: 980px) 50vw, 33vw"
                  />
                ) : (
                  <>
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="gm-img"
                      sizes="(max-width: 520px) 100vw, (max-width: 980px) 50vw, 33vw"
                    />
                    <span className="gm-play" aria-hidden="true">
                      ▶
                    </span>
                  </>
                )}
              </div>
              <h2 className="gm-card-title">{item.title}</h2>
            </article>
          ))}
        </section>

        {open && (
          <div
            className="gm-overlay"
            role="dialog"
            aria-modal="true"
            onClick={(e) =>
              e.target.classList.contains("gm-overlay") && onClose()
            }
          >
            <button className="gm-close" onClick={onClose} aria-label="Close">
              ✕
            </button>

            <div className="gm-lightbox" onClick={(e) => e.stopPropagation()}>
              {open.type === "image" ? (
                <>
                  <Image
                    className="gm-media"
                    src={open.full}
                    alt={open.title}
                    width={1200}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="gm-lightbox-title">{open.title}</div>
                </>
              ) : (
                <>
                  <video
                    className="gm-media"
                    ref={videoRef}
                    src={open.src}
                    controls
                    autoPlay
                    playsInline
                    poster={open.poster}
                  />
                  <div className="gm-lightbox-title">{open.title}</div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
