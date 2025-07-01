import Head from "next/head";
import "./banner.css";

export default function Banner() {
  return (
    <>
      <Head>
        <title>Snipers Landing</title>
      </Head>
      <div className="sniper-hero">
        <h1 className="sniper-title">
          The Snipers will take it
          <br />
          from here
        </h1>
        <p className="sniper-subtitle">
          Connect with expert book service professionals who deliver precision
          results. From cover design to marketing campaigns, our snipers hit the
          target every time.
        </p>
        <div className="sniper-search-section">
          <div className="search-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
              type="text"
              placeholder="Try 'book trailer for fantasy novel'"
              className="sniper-input"
            />
            <button className="sniper-search-btn">Search</button>
          </div>
        </div>
        <div className="sniper-buttons">
          <button className="btn-black">Hire a Sniper</button>
          <button className="btn-white">Be a Sniper</button>
        </div>
      </div>
    </>
  );
}
