"use client";
import { useEffect, useRef, useState } from "react";
import "./gallery-section.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

const mediaItems = [
  {
    id: "v1",
    type: "video",
    title: "Audit of Habits",
    src: "/audit.mp4",
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
    // src: "/franchise.mp4",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842736/franchise_usdgig.mp4",
    poster: "/frenchaise.png",
  },

  {
    id: "v5",
    type: "video",
    title: "The Softest Things Break Too",
    // src: "/softest.mp4",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842753/softest_tp26yf.mp4",
    poster: "/softest.png",
  },
  {
    id: "v6",
    type: "video",
    title: "Princess Aairah Trailer",
    // src: "/price.mp4",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842750/prince_tljaqk.mp4",
    poster: "/price.png",
  },

  {
    id: "v7",
    type: "video",
    title: "Indra",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842741/indra_b9kz96.mp4",
    poster: "/indra.png",
  },

  {
    id: "v8",
    type: "video",
    title: "Kaleidoscope",
    src: "/https://res.cloudinary.com/deg6wt06k/video/upload/v1755842741/kale_bh6zya.mp4",

    poster: "/kale.png",
  },

  {
    id: "v89",
    type: "video",
    title: "Daggers of Treason",
    src: "https://res.cloudinary.com/deg6wt06k/video/upload/v1755842753/dagger_ywk5um.mp4",
    poster: "/dagger.png",
  },
];

export default function GalleryPage() {
  const [openItem, setOpenItem] = useState(null);
  const videoRef = useRef(null);

  const handleOpen = (item) => setOpenItem(item);
  const handleClose = () => {
    // stop video playback & reset
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {}
    }
    setOpenItem(null);
  };

  useEffect(() => {
    if (!openItem) return;

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (
        e.key === "Enter" &&
        document.activeElement?.classList.contains("mg-close")
      ) {
        handleClose();
      }
    };

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openItem]);

  return (
    <>
      <Header />
      <main className="mg-container">
        <h1 className="mg-title">Media Gallery</h1>

        <section className="mg-grid">
          {mediaItems.map((item) => (
            <article
              key={item.id}
              className="mg-card"
              onClick={() => handleOpen(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleOpen(item)
              }
            >
              <div className="mg-thumb">
                {item.type === "image" ? (
                  <img src={item.src} alt={item.alt || item.title} />
                ) : (
                  <>
                    <img
                      src={item.poster || "/media/fallback-poster.jpg"}
                      alt={item.title}
                    />
                    <span className="mg-play" aria-hidden="true">
                      ▶
                    </span>
                  </>
                )}
              </div>
              <h2 className="mg-card-title">{item.title}</h2>
            </article>
          ))}
        </section>

        {openItem && (
          <div
            className="mg-overlay"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target.classList.contains("mg-overlay")) handleClose();
            }}
          >
            <button
              className="mg-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ✕
            </button>

            {openItem.type === "image" ? (
              <div className="mg-lightbox">
                <img
                  className="mg-media"
                  src={openItem.src}
                  alt={openItem.alt || openItem.title}
                />
                <div className="mg-lightbox-title">{openItem.title}</div>
              </div>
            ) : (
              <div className="mg-lightbox">
                <video
                  className="mg-media"
                  ref={videoRef}
                  src={openItem.src}
                  controls
                  autoPlay
                  playsInline
                  poster={openItem.poster}
                />
                <div className="mg-lightbox-title">{openItem.title}</div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
