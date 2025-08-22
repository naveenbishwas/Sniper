import Head from "next/head";
import "./banner.css";
import Link from "next/link";

export default function Banner() {
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
        <div className="sniper-search-section"></div>
        <div className="sniper-buttons">
          <Link href="/signup">
            <button className="btn-black">Hire a Sniper</button>
          </Link>
          <Link href="/signup">
            <button className="btn-white">Be a Sniper</button>
          </Link>
        </div>
      </div>
    </>
  );
}
