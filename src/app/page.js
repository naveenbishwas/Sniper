import Image from "next/image";
import "./page.css";
import Header from "./components/header/page";
import Banner from "./components/banner/page";

export default function Home() {
  const categories = [
    {
      name: "Book Trailers",
      icon: "🎥",
      image: "./1.jpeg",
      highlight: true,
    },
    {
      name: "Editing & Proofreading",
      icon: "🖊️",
      image: "./2.jpeg",
    },
    {
      name: "Cover Design",
      icon: "🎨",
      image: "./3.jpeg",
    },
    {
      name: "Book Marketing",
      icon: "📈",
      image: "./4.jpeg",
    },
    {
      name: "Formatting",
      icon: "📄",
      image: "./5.jpeg",
    },
    {
      name: "Translation",
      icon: "🌐",
      image: "./6.jpeg",
    },
    {
      name: "Ghost Writing",
      icon: "⚡",
      image: "./7.jpeg",
    },
    {
      name: "Beta Reading",
      icon: "👤",
      image: "./8.jpeg",
    },
  ];

  const steps = [
    {
      icon: "👥",
      title: "Sales Team Connects",
      description:
        "Our sales representatives like Tanvi reach out to authors who need book services, identifying their specific requirements.",
    },
    {
      icon: "📄",
      title: "Author Posts Gig",
      description:
        "Authors like Ratna Jyoti post their project details, budget, and timeline on BookSnipers platform.",
    },
    {
      icon: "👥",
      title: "Service Providers Apply",
      description:
        "Qualified professionals review the gig and submit proposals with their portfolio and pricing.",
    },
    {
      icon: "✅",
      title: "Project Completion",
      description:
        "Author selects the best provider, work gets completed, and everyone gets paid securely.",
    },
  ];

  return (
    <div className="">
      <Header />
      <Banner />

      <div className="category-section">
        <h2 className="category-title">Explore by category</h2>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="category-card">
              <div
                className="category-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <span className="category-icon">{cat.icon}</span>
              </div>
              <div
                className={`category-label ${cat.highlight ? "highlight" : ""}`}
              >
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="how-it-works">
        <h2 className="how-title">How BookSnipers Works</h2>
        <p className="how-subtitle">
          Our precision approach ensures authors get connected with the right
          service providers for their specific needs
        </p>
        <div className="how-steps">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{idx + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
