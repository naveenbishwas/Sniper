import Image from "next/image";
import "./page.css";
import Header from "./components/header/page";
import Banner from "./components/banner/page";
import Footer from "./components/footer/page";
import { useAuth } from "@/context/AuthContext";
import Signup from "./signup/page";
import GigsPage from "./components/gigsPage/page";

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
        "Authors like Ratna Jyoti post their project details, budget, and timeline on HubHawks Live platform.",
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

  const gigs = [
    {
      category: "Video Production",
      title: "Book Trailer for Fantasy Novel",
      author: "Ratna Jyoti",
      description:
        "Need a compelling 60-second book trailer for my fantasy novel 'The Mystic Realm'...",
      duration: "7 days",
      proposals: "12",
      price: "$500 - $1,000",
      rating: "4.8",
    },
    {
      category: "Design",
      title: "Professional Book Cover Design",
      author: "Aditi Sharma",
      description:
        "Looking for a modern, eye-catching cover design for my romance novel...",
      duration: "5 days",
      proposals: "8",
      price: "$200 - $400",
      rating: "4.9",
    },
    {
      category: "Editing",
      title: "Comprehensive Book Editing",
      author: "Vikram Singh",
      description:
        "Need thorough editing for my 80,000-word historical fiction manuscript...",
      duration: "10 days",
      proposals: "5",
      price: "$600 - $800",
      rating: "4.7",
    },
    {
      category: "Marketing",
      title: "Social Media Marketing Campaign",
      author: "Priya Mehta",
      description:
        "Create and execute a 30-day social media marketing strategy for book launch...",
      duration: "6 days",
      proposals: "10",
      price: "$300 - $500",
      rating: "4.6",
    },
  ];

  const projects = [
    {
      title: "The Curse of the Wildflower",
      author: "Smriti Sinha",
      image: "./9.jpeg",
    },
    {
      title: "A Century Between Us",
      author: "Gayatri Chandrasekharan",
      image: "./10.jpeg",
    },
    {
      title: "The Tiger That Crashed My Wedding",
      author: "Pranav Mishra",
      image: "./11.jpeg",
    },
    {
      title: "Sun Sakeena",
      author: "Saadat Hasan Manto",
      image: "./12.jpeg",
    },
  ];

  return (
    <div className="main-page">
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
        <h2 className="how-title">How HubHawks Live Works</h2>
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

      <div className="gigs-section">
        <h2 className="gigs-title">Active Gigs</h2>
        <p className="gigs-subtitle">
          Browse current projects posted by authors looking for professional
          book services
        </p>
        <div className="gigs-grid">
          {gigs.map((gig, idx) => (
            <div
              key={idx}
              className={`gig-card ${idx === 1 ? "featured" : ""}`}
            >
              <div className="gig-top">
                <span className="gig-tag">{gig.category}</span>
                <span className="gig-rating">⭐ {gig.rating}</span>
              </div>
              <h3 className="gig-title">{gig.title}</h3>
              <p className="gig-author">👤 by {gig.author}</p>
              <p className="gig-desc">{gig.description}</p>
              <div className="gig-meta">
                <span>⏱ {gig.duration}</span>
                <span>{gig.proposals} proposals</span>
              </div>
              <div className="gig-bottom">
                <span className="gig-price">{gig.price}</span>
                <button className="gig-btn">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-btn">
          <button>View All Gigs</button>
        </div>
      </div>

      <div className="sniper-cta">
        <div className="sniper-cta-left">
          <h2>Become a sniper and start earning</h2>
          <p className="subtext">
            Monetize your book-related expertise as a side hustle
          </p>
          <ul className="sniper-list">
            <li>✅&nbsp;&nbsp; Choose a gig that stands out</li>
            <li>✅ &nbsp;&nbsp;Get noticed with professional portfolios</li>
            <li>
              ✅&nbsp;&nbsp; Develop a freelance business around your
              book-related talents
            </li>
          </ul>
          <button className="yellow-btn">Be a Sniper</button>
        </div>
        <div className="sniper-cta-right">
          <h3>Ready to get started?</h3>
          <p>
            Join thousands of book service providers already earning on HubHawks
            Live
          </p>
          <div className="sniper-stats">
            <div>
              <h4>500+</h4>
              <p>Active Freelancers</p>
            </div>
            <div>
              <h4>95%</h4>
              <p>Order Completion</p>
            </div>
            <div>
              <h4>4.9⭐</h4>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <h2 className="projects-title">How Far We Have Come</h2>
        <p className="projects-subtitle">
          Our snipers have delivered exceptional results for authors across
          genres. See some of our recent cover design projects.
        </p>
        <div className="projects-grid">
          {projects.map((item, idx) => (
            <div className="project-card" key={idx}>
              <img
                src={item.image}
                alt={item.title}
                className="project-image"
              />
              <h3 className="project-name">{item.title}</h3>
              <p className="project-author">by {item.author}</p>
              <span className="project-tag">Cover Design</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-box">
          <div className="stat">
            <h3>500+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat">
            <h3>98%</h3>
            <p>Client Satisfaction</p>
          </div>
          <div className="stat">
            <h3>50+</h3>
            <p>Expert Snipers</p>
          </div>
        </div>
      </div>

      <div className="snipers-support-section">
        <div className="snipers-icon">
          <svg
            id="logo-icon"
            className="header__logo"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f4c200"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        </div>

        <h2 className="snipers-title">Our Snipers Have Got You</h2>
        <p className="snipers-desc">
          Join thousands of authors who trust HubHawks Live for their publishing
          needs. From cover design to marketing campaigns, our expert snipers
          deliver results with precision.
        </p>

        <div className="snipers-cta">
          <button className="snipers-btn">Join Us</button>
          <div className="snipers-trust">
            <p>Trusted by 10,000+ authors</p>
            <div className="snipers-avatars">
              <div className="avatar yellow"></div>
              <div className="avatar orange"></div>
              <div className="avatar dark"></div>
              <div className="avatar number">+10k</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
