"use client";
import { useState } from "react";
import "./masonory.css";

const MasonryGallery = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  // Fallback images
  const defaultImages = [
    { src: "https://picsum.photos/300/400?random=1", alt: "Random 1" },
    { src: "https://picsum.photos/300/600?random=2", alt: "Random 2" },
    { src: "https://picsum.photos/300/350?random=3", alt: "Random 3" },
    { src: "https://picsum.photos/300/500?random=4", alt: "Random 4" },
    { src: "https://picsum.photos/300/450?random=5", alt: "Random 5" },
    { src: "https://picsum.photos/300/550?random=6", alt: "Random 6" },
    { src: "https://picsum.photos/300/380?random=7", alt: "Random 7" },
    { src: "https://picsum.photos/300/480?random=8", alt: "Random 8" },
    { src: "https://picsum.photos/300/420?random=9", alt: "Random 9" },
    { src: "https://picsum.photos/300/520?random=10", alt: "Random 10" },
  ];

  const imagesToRender = images?.length ? images : defaultImages;

  return (
    <section className="masonrySection">
      <div className="container">
        <h2 className="title">Image Gallery</h2>
        <div className="masonry">
          {imagesToRender.map((image, index) => (
            <div
              key={index}
              className={`masonryItem ${
                loadedImages.has(index) ? "loaded" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt || ""}
                className="masonryImage"
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
              />
              {image.caption && <div className="caption">{image.caption}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryGallery;
