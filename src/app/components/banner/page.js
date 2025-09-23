import Head from "next/head";
import "./banner.css";
import Link from "next/link";

export default function Banner({ onSignupClick }) {
  return (
    <>
      <Head>
        <title>Snipers Landing</title>
      </Head>
      <div className="sniper-hero">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h1 className="sniper-title">We will take it from here!</h1>
        <p className="sniper-subtitle">
          Connect with book service professionals who are committed to
          delivering flawless results. From cover design to marketing campaigns,
          we hit the target every time.
        </p>
        <div className="sniper-search-section"></div>
        <div className="sniper-buttons">
          <button
            className="btn-black"
            onClick={() => onSignupClick("HireFreelancer")}
          >
            Hire a Sniper
          </button>
          <button
            className="btn-white"
            onClick={() => onSignupClick("beSniper")}
          >
            Be a Sniper
          </button>
        </div>
      </div>
    </>
  );
}
