"use client";

import Image from "next/image";
import "./page.css";
import Header from "./components/header/page";
import Banner from "./components/banner/page";
import Footer from "./components/footer/page";
import SignupModal from "./signup/signUpClient";
import GigsPage from "./components/gigsPage/page";
import BeSniperModal from "./components/beSniper/page";
import HireFreelancer from "./components/HireFreelancer/page";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home({ images }) {
  const [showSignup, setShowSignup] = useState(false);
  const [showBeSniper, setShowBeSniper] = useState(false);
  const [showHire, setShowHire] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [role, setRole] = useState(null);
  const [current, setCurrent] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const progressRef = useRef(null);
  const itemsRef = useRef([]);

  // Gallery images
  const items = [
    {
      title: "Alpine Majesty",
      desc: "Towering peaks pierce through misty clouds in this dramatic mountain landscape.",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Mountain landscape",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Urban Symmetry",
      desc: "Glass and steel create mesmerizing patterns in modern architectural design.",
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Modern architecture",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Nature's Power",
      desc: "A majestic waterfall cascades through lush green forest.",
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Waterfall",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Golden Hour",
      desc: "Warm sunlight bathes the landscape in ethereal golden tones.",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Mountain sunset",
      creditHref: "https://unsplash.com",
    },
    {
      title: "City Lights",
      desc: "The urban landscape comes alive with countless twinkling lights.",
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Serene Waters",
      desc: "A pristine lake reflects the surrounding landscape like a mirror.",
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Nature landscape",
      creditHref: "https://unsplash.com",
    },
  ];

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const winScroll = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const progress = Math.min(100, (winScroll / height) * 100);
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for fade-up animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mmg-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
      color: "var(--themeColor)",
    },
    {
      image: "/t2.jpg",
      stars: 4,
      text: "Dolor sit amet consectetur adipiscing elit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.",
      name: "Laura White",
      title: "Design Director at Bright",
      color: "var(--themeColor)",
    },
    {
      image: "/t3.jpg",
      stars: 5,
      text: "Amazing team! Really helped streamline our workflow and project delivery. Couldn’t recommend more.",
      name: "Mohit Sharma",
      title: "CEO at TechWay",
      color: "var(--themeColor)",
    },
  ];

  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  const defaultImages = [
    // { src: "https://picsum.photos/300/400?random=1", alt: "Random 1" },
    // { src: "https://picsum.photos/300/600?random=2", alt: "Random 2" },
    // { src: "https://picsum.photos/300/350?random=3", alt: "Random 3" },
    // { src: "https://picsum.photos/300/500?random=4", alt: "Random 4" },
    // { src: "https://picsum.photos/300/450?random=5", alt: "Random 5" },
    // { src: "https://picsum.photos/300/550?random=6", alt: "Random 6" },
    // { src: "https://picsum.photos/300/380?random=7", alt: "Random 7" },
    { src: "./9.jpeg", alt: "Random 8" },
    { src: "./9.jpeg", alt: "Random 8" },
    { src: "./9.jpeg", alt: "Random 8" },
    { src: "./9.jpeg", alt: "Random 8" },
    { src: "./9.jpeg", alt: "Random 8" },
    { src: "https://picsum.photos/300/420?random=9", alt: "Random 9" },
    { src: "https://picsum.photos/300/520?random=10", alt: "Random 10" },
  ];

  const imagesToRender = images?.length ? images : defaultImages;

  // const projects = [
  //   {
  //     title: "The Curse of the Wildflower",
  //     author: "Smriti Sinha",
  //     image: "./9.jpeg",
  //   },
  //   {
  //     title: "A Century Between Us",
  //     author: "Gayatri Chandrasekharan",
  //     image: "./10.jpeg",
  //   },
  //   {
  //     title: "The Tiger That Crashed My Wedding",
  //     author: "Pranav Mishra",
  //     image: "./11.jpeg",
  //   },
  //   {
  //     title: "Sun Sakeena",
  //     author: "Saadat Hasan Manto",
  //     image: "./12.jpeg",
  //   },
  // ];

  const steps = [
    {
      id: 1,
      image: "/process1.png",
      title: "Consultation call",
      description:
        "Our dedicated sales team reaches out to understand your specific needs and project goals.",
    },
    {
      id: 2,
      image: "/process2.png",
      title: "Project Brief",
      description:
        "Authors post detailed project requirements on the platform, outlining their specific needs and expectations.",
    },
    {
      id: 3,
      image: "/process1.png",
      title: "Freelancers Apply",
      description:
        "Qualified service providers submit proposals after carefully reviewing your project requirements.",
    },
    {
      id: 4,
      image: "/process2.png",
      title: "Project Process",
      description:
        "Our targeted matching system ensures authors connect with the ideal service providers, after which secure payment processing enables the work to get underway.",
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 4;
  const nextSlide = () =>
    setCurrentIndex((p) => (p >= categories.length - slidesToShow ? 0 : p + 1));
  const prevSlide = () =>
    setCurrentIndex((p) => (p <= 0 ? categories.length - slidesToShow : p - 1));

  const handleNext = () => {
    setAnimationClass("slide-right");
    setTimeout(() => setCurrent((p) => (p + 1) % testimonials.length), 50);
  };
  const handlePrev = () => {
    setAnimationClass("slide-left");
    setTimeout(
      () => setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1)),
      50
    );
  };

  const { image, stars, text, name, title, color } = testimonials[current];

  useEffect(() => {
    const t = setTimeout(() => setAnimationClass(""), 500);
    return () => clearTimeout(t);
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
              <p>Connect with talented freelancers across various fields.</p>
            </span>
            <div className="browse-buttons">
              <button className="post-job-btn">Post a Job</button>
            </div>
          </div>

          <div className="category-cards">
            <div className="slider-container" aria-roledescription="carousel">
              <button
                className="nav-button prev-button"
                onClick={prevSlide}
                aria-label="Previous"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              <div className="slider-wrapper">
                <div className="fade fade-left" aria-hidden="true"></div>
                <div className="fade fade-right" aria-hidden="true"></div>

                <div
                  className="slider-track"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / slidesToShow)
                    }%)`,
                  }}
                >
                  {categories.map((cat, index) => (
                    <div className="slide" key={index}>
                      <div className="card">
                        <div className="icon">{cat.icon}</div>
                        <h3>{cat.title}</h3>
                        <p>{cat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="nav-button next-button"
                onClick={nextSlide}
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr id="border-line" />

      <section className="vetting-section">
        <div className="vetting-wrapper">
          <div className="vetting-container">
            <div className="vetting-text">
              <h2>Your Journey with Hubhawks live</h2>
              <p>
                Our talented professionals are ready to bring your ideas to
                life. To go live, start here
              </p>
              <div className="vetting-buttons">
                <button className="hire-btn">Hire freelancer</button>
                <button className="learn-btn">Learn more</button>
              </div>
            </div>

            <div className="vetting-scrollable">
              {steps.map((step) => (
                <div className="vetting-card" key={step.id}>
                  <div className="vetting-image">
                    <Image
                      src={step.image}
                      width={350}
                      height={220}
                      alt={step.title}
                      unoptimized
                    />
                  </div>
                  <div className="vetting-info">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hero-section">
        <div id="dark-overlay"></div>
        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-text">
              <h1>Experience freelance talent like never before</h1>
              <p>
                Partnering with top freelancers can elevate your projects and
                drive results. Our platform connects you with skilled
                professionals ready to tackle your unique challenges.
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
                unoptimized
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

      {/* ===== Projects with Masonry Gallery Section ===== */}
      <div className="projects-section">
        <h2 className="projects-title">How Far We Have Come</h2>
        <p className="projects-subtitle">
          Our snipers have delivered exceptional results for authors across
          genres. See some of our recent cover design projects.
        </p>
        {/* <div className="masonry">
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
        </div> */}
        <div className="mmg-root">
          <div ref={progressRef} className="mmg-scroll-indicator" />

          <div className="mmg-container">
            <h1 className="mmg-title">Inspiring Gallery</h1>

            <div className="mmg-gallery">
              {items.map((item, idx) => (
                <article
                  key={idx}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className="mmg-item"
                  style={{ ["--delay"]: String(idx + 1) }}
                >
                  <div className="mmg-item-inner">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="mmg-img"
                      loading="lazy"
                    />

                    <div className="mmg-overlay">
                      <h2 className="mmg-card-title">{item.title}</h2>
                      <p className="mmg-card-desc">{item.desc}</p>
                    </div>

                    <a
                      href={item.creditHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mmg-credit"
                    >
                      Photo by Unsplash
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
              <p className="testimonial-title" style={{ color }}>
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
