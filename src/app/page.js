"use client";

import Image from "next/image";
import "./page.css";
import Header from "./components/header/page";
import Banner from "./components/banner/page";
import Footer from "./components/footer/page";
import { useAuth } from "@/context/AuthContext";
import SignupModal from "./signup/signUpClient";
import GigsPage from "./components/gigsPage/page";
import BeSniperModal from "./components/beSniper/page";
import HireFreelancer from "./components/HireFreelancer/page";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showBeSniper, setShowBeSniper] = useState(false);
  const [showHire, setShowHire] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [role, setRole] = useState(null);
  const [current, setCurrent] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const [animationClass, setAnimationClass] = useState("");
  const [showAll, setShowAll] = useState(false);

  const freelancers = [
    {
      name: "Liam Wilson",
      title: "Data Analyst",
      desc: "Transforming data into actionable insights for informed decision-making.",
      image: "/p1.jpg",
    },
    {
      name: "Sarah Lee",
      title: "Content Writer",
      desc: "Creating stunning visuals that capture your brand’s essence.",
      image: "/p2.jpg",
    },
    {
      name: "Noah Taylor",
      title: "Video Editor",
      desc: "Creating seamless mobile experiences across platforms.",
      image: "/p3.jpg",
    },
    {
      name: "Emma Davis",
      title: "Social Media Manager",
      desc: "Building brand awareness through engaging social media strategies.",
      image: "/p4.jpg",
    },
  ];

  const testimonials = [
    {
      image: "/t1.jpg",
      stars: 5,
      text: "Lorem ipsum dolor sit amet consectetur non adipiscing elit gravida posuere odio metus adipiscing tincidunt venenatis amet sagittis tellus porttitor enim blandit venenatis tellus.",
      name: "Randall Robertson",
      title: "Project lead at Agency",
      logo: "/agency-logo.png",
      color: "var(--themeColor)",
    },
    {
      image: "/t2.jpg",
      stars: 4,
      text: "Dolor sit amet consectetur adipiscing elit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.",
      name: "Laura White",
      title: "Design Director at Bright",
      logo: "/bright-logo.png",
      color: "var(--themeColor)",
    },
    {
      image: "/t3.jpg",
      stars: 5,
      text: "Amazing team! Really helped streamline our workflow and project delivery. Couldn’t recommend more.",
      name: "Mohit Sharma",
      title: "CEO at TechWay",
      logo: "/techway-logo.png",
      color: "var(--themeColor)",
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

  const categories = [
    {
      icon: "🌐",
      title: "Digital Marketing",
      desc: "Bring your vision to life with digital marketing professionals ready to assist you.",
    },
    {
      icon: "✏️",
      title: "Graphic & Design",
      desc: "Bring your vision to life with creative graphic design professionals ready to assist you.",
    },
    {
      icon: "🖥️",
      title: "Programming & Tech",
      desc: "Bring your vision to life with technologists around the world ready to assist you.",
    },
    {
      icon: "📢",
      title: "Sales & Marketing",
      desc: "Scale your outreach with top sales experts.",
    },
    {
      icon: "📚",
      title: "Writing & Translation",
      desc: "Craft content or translate ideas with language pros.",
    },
    {
      icon: "🎥",
      title: "Video & Animation",
      desc: "Engaging visuals brought to life by experts.",
    },
    {
      icon: "🎵",
      title: "Music & Audio",
      desc: "Audio editing, production, and music pros.",
    },
    {
      icon: "🔍",
      title: "SEO Services",
      desc: "Boost your rankings with SEO strategies.",
    },
    {
      icon: "📱",
      title: "Mobile App Dev",
      desc: "Create stunning apps for Android & iOS.",
    },
    {
      icon: "🧮",
      title: "Data Entry",
      desc: "Reliable and fast data entry services.",
    },
    {
      icon: "🛒",
      title: "eCommerce Dev",
      desc: "Build your online store with eCommerce devs.",
    },
    {
      icon: "📈",
      title: "Finance & Accounting",
      desc: "Manage your money with expert guidance.",
    },
    {
      icon: "👨‍⚖️",
      title: "Legal Consulting",
      desc: "Legal professionals at your service.",
    },
    {
      icon: "🧠",
      title: "AI & Machine Learning",
      desc: "Smart solutions powered by AI.",
    },
    {
      icon: "👔",
      title: "Business Consulting",
      desc: "Strategic advice to scale your business.",
    },
    {
      icon: "🧪",
      title: "Engineering & Architecture",
      desc: "Real-world builds & virtual plans.",
    },
    {
      icon: "🤝",
      title: "Customer Support",
      desc: "Keep clients happy with support experts.",
    },
  ];

  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  const length = testimonials.length;

  const handleNext = () => {
    setAnimationClass("slide-right");
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 50); // triggers animation smoothly
  };

  const handlePrev = () => {
    setAnimationClass("slide-left");
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }, 50);
  };

  const { image, stars, text, name, title, logo, color } =
    testimonials[current];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass(""); // remove class after animation finishes
    }, 500); // match animation-duration

    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    document.body.style.overflow = showSignup || showSteps ? "hidden" : "auto";
  }, [showSignup, showSteps]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localStorage.getItem("showBeSniperModal") === "true") {
        setShowSteps(true);
        localStorage.removeItem("showBeSniperModal");
      }

      if (localStorage.getItem("showHireFreelancerModal") === "true") {
        setShowHire(true);
        localStorage.removeItem("showHireFreelancerModal");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSignup || showSteps ? "hidden" : "auto";
  }, [showSignup, showSteps]);

  const handleSignupClick = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    setShowSignup(true);
  };

  return (
    <div className="main-page">
      <Header onSignupClick={handleSignupClick} />
      <Banner />

      <section className="browse-talent-section">
        <div className="browse-talent-container">
          <div className="browse-talent-container-df">
            <span>
              <h1>Browse talent by category</h1>
              <p>
                Connect with talented freelancers across various fields. Our
                platform offers a diverse range of services to meet your project
                needs.
              </p>
            </span>
            <div className="browse-buttons">
              <button className="post-job-btn">Post a Job</button>
            </div>
          </div>

          <div className="category-cards">
            {visibleCategories.map((cat, index) => (
              <div className="card" key={index}>
                <div className="icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>
          <span className="view-all-btn">
            <a
              className="view-categories-link"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View Less" : "View all categories"}
            </a>
          </span>
        </div>
      </section>

      <hr id="border-line" />

      <section className="vetting-section">
        <div className="vetting-wrapper">
          <div className="vetting-container">
            {/* Left Sticky Column */}
            <div className="vetting-text">
              <h2>How HubHawks Live Works</h2>
              <p>
                Our precision approach ensures authors get connected with the
                right service providers for their specific needs
              </p>
              <div className="vetting-buttons">
                <button className="hire-btn">Hire freelancer</button>
                <button className="learn-btn">Learn more</button>
              </div>
            </div>

            <div className="vetting-scrollable">
              {[1, 2, 3, 4].map((item, index) => (
                <div className="vetting-card" key={index}>
                  <div className="vetting-image">
                    <Image
                      src={`/process${item % 2 === 0 ? "2" : "1"}.png`}
                      width={350}
                      height={220}
                      alt={`process-${item}`}
                      unoptimized
                    />
                  </div>
                  <div className="vetting-info">
                    <span className="discount">{item}% off pass</span>
                    <h3>In-depth skill review</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur lorem non
                      adipiscing elit convallis dolor ut enim.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hero-section">
        <div className="" id="dark-overlay"></div>
        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-text">
              <h1>Experience freelance talent like never before</h1>
              <p>
                Partnering with top freelancers can elevate your projects and
                drive results. Our platform connects you with skilled
                professionals ready to tackle your unique challenges. Experience
                the flexibility and expertise that comes with freelance
                collaboration.
              </p>
              <div className="hero-buttons">
                <button className="orange-btn">Post a Job</button>
                <a href="#" className="browse-link">
                  Browse Freelancers →
                </a>
              </div>
            </div>
          </div>

          <div className="hero-cards">
            <div className="hero-card">
              <h3>Diverse Talent Pool</h3>
              <p>
                Toffee sweet macaroon chocolate cake lollipop shortbread. Sugar
                plum topping cake toffee powder cupcake tiramisu apple pie.
              </p>
              <a href="#">Browse Freelancers →</a>
            </div>
            <div className="hero-card">
              <h3>Easily post Jobs</h3>
              <p>
                Toffee sweet macaroon chocolate cake lollipop shortbread. Sugar
                plum topping cake toffee powder cupcake tiramisu apple pie.
              </p>
              <a href="#">Post a Job →</a>
            </div>
            <div className="hero-card">
              <h3>Manage Contracts</h3>
              <p>
                Toffee sweet macaroon chocolate cake lollipop shortbread. Sugar
                plum topping cake toffee powder cupcake tiramisu apple pie.
              </p>
              <a href="#">Sign up →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="freelancer-section">
        <h1>Vetted talent at your fingertips!</h1>
        <div className="freelancer-header">
          <p>Discover skilled freelancers ready to assist you.</p>
          <a href="#">View all →</a>
        </div>

        <div className="freelancer-grid">
          {freelancers.map((freelancer, index) => (
            <div className="freelancer-card" key={index}>
              <Image
                src={freelancer.image}
                alt={freelancer.name}
                width={0}
                height={0}
                className="freelancer-image"
              />
              <h3>{freelancer.name}</h3>
              <span>{freelancer.title}</span>
              <p className="desc">{freelancer.desc}</p>
              <div className="freelancer-actions">
                <button>View Profile</button>
                <a href="#">Book a Call →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="sniper-cta">
        <div className="sniper-cta-left">
          <h2>Become a sniper and start earning</h2>
          <p className="subtext">
            Monetize your book-related expertise as a side hustle
          </p>
          <ul className="sniper-list">
            <li>✅ Choose a gig that stands out</li>
            <li>✅ Get noticed with professional portfolios</li>
            <li>
              ✅ Develop a freelance business around your book-related talents
            </li>
          </ul>
          <button className="yellow-btn">Be a Freelancer</button>
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

        <span>
          <Link href="/gallery-section">
            <button className="view-btn">View All</button>
          </Link>
        </span>
      </div>

      <section className="testimonial-section">
        <div className="testimonial-wrapper">
          <div className="testimonial-left">
            <h2>Here’s what our great customers say.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed
              accumsan ultrices aliquam nibh lectus non feugiat placerat ut
              facilisis velit neque.
            </p>
            <div className="testimonial-buttons">
              <button onClick={handlePrev}>&larr;</button>
              <button onClick={handleNext}>&rarr;</button>
            </div>
          </div>

          <div className={`testimonial-card ${animationClass}`}>
            <div className="testimonial-photo">
              <Image src={image} alt={name} width={0} height={0} unoptimized />
            </div>
            <div className="testimonial-content">
              <div className="testimonial-stars">
                {"★".repeat(stars)}
                {"☆".repeat(5 - stars)}
              </div>
              <p className="testimonial-text">{text}</p>
              <h4>{name}</h4>
              <p className="testimonial-title" style={{ color: color }}>
                {title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="sniper-support-df">
        <div className="snipers-support-section">
          <div className="snipers-icon">
            <svg
              id="logo-icon"
              className="header__logo"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            Join thousands of authors who trust HubHawks Live for their
            publishing needs. From cover design to marketing campaigns, our
            expert snipers deliver results with precision.
          </p>
          <div className="snipers-cta">
            <button className="snipers-btn">Join Us</button>
            <button className="snipers-btn" id="post">
              Post a Job
            </button>
          </div>
        </div>
      </div>

      <Footer />
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showSteps && <BeSniperModal onClose={() => setShowSteps(false)} />}
      {showHire && <HireFreelancer onClose={() => setShowHire(false)} />}
    </div>
  );
}
