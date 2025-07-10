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
        <div className="sniper-search-section"></div>
        <div className="sniper-buttons">
          <button className="btn-black">Hire a Sniper</button>
          <button className="btn-white">Be a Sniper</button>
        </div>
      </div>
    </>
  );
}
