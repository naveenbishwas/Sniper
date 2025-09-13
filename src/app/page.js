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
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

const slidesToShow = 4;

const categories = [
  {
    image: "/book-cover.png",
    title: "Book Cover Designing",
    desc: "Eye-catching book covers designed to attract readers and reflect your story.",
  },
  {
    image: "/ghost.png",
    title: "Ghostwriting",
    desc: "Professional ghostwriters bring your ideas to life with engaging words.",
  },
  {
    image: "/TRANSLATION-ICON.png",
    title: "Translation",
    desc: "Accurate, culturally relevant translations across multiple languages.",
  },
  {
    image: "/LITERARY.png",
    title: "Literary Representation",
    desc: "Get connected with trusted literary agents to publish and promote your work.",
  },
  {
    image: "/amazon.png",
    title: "Amazon Marketing Services (AMS)",
    desc: "Boost your book’s visibility and sales with expert Amazon marketing strategies.",
  },
  {
    image: "/ILLUSTRATION.png",
    title: "Illustrations",
    desc: "Custom illustrations that add depth, creativity, and appeal to your projects.",
  },
  {
    image: "/VOICOVER.png",
    title: "Voice Over",
    desc: "Professional voice artists deliver clear, expressive, and impactful narration.",
  },
  {
    image: "/VIDEO-EDITING.png",
    title: "Video Editing",
    desc: "High-quality editing to make your videos engaging, polished, and impactful.",
  },
];

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
  const [expanded, setExpanded] = useState(false);
  const total = categories.length;

  // Create clones on both ends for seamless looping
  const extended = useMemo(
    () => [
      ...categories.slice(-slidesToShow),
      ...categories,
      ...categories.slice(0, slidesToShow),
    ],
    [categories]
  );

  // Start from the first "real" slide
  const [index, setIndex] = useState(slidesToShow);
  const [transitionOn, setTransitionOn] = useState(true);

  const trackRef = useRef(null);

  const nextCategorySlide = () => {
    if (transitionOn) setIndex((i) => i + 1);
  };

  const prevCategorySlide = () => {
    if (transitionOn) setIndex((i) => i - 1);
  };

  useEffect(() => {
    const onTransitionEnd = () => {
      // Jump forward (from cloned tail to real head)
      if (index >= total + slidesToShow) {
        setTransitionOn(false);
        setIndex(slidesToShow);
        // Double RAF ensures the DOM applies the snap before re-enabling transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitionOn(true));
        });
      }
      // Jump backward (from cloned head to real tail)
      else if (index <= 0) {
        setTransitionOn(false);
        setIndex(total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitionOn(true));
        });
      }
    };

    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [index, total, slidesToShow]);
  // const boxesToShow = expanded ? totalBoxes : 8;

  // Gallery images
  const items = [
    {
      title: "Total Timepass",
      src: "/tt1.png",
      alt: "Mountain landscape",
      hoverSrc: "/tt2.png",
    },
    {
      title: "Sun Sakeena",
      src: "/12.jpeg", // ✅ leading slash
      hoverSrc: "/12-1.png",
      alt: "Modern architecture",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Dear Remembrance",
      src: "/dear-front.png", // ✅
      hoverSrc: "/dear-back.png",
      alt: "Waterfall",
      creditHref: "https://unsplash.com",
    },
    {
      title: "⁠The Tiger that crashed my wedding",
      src: "/11.jpeg", // ✅
      hoverSrc: "/11-2.png",
      alt: "Nature landscape",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Harmonia",
      src: "/ikigai-front.png", // ✅
      hoverSrc: "/ikigai-back.png",
      alt: "Mountain sunset",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Kalyuga 2",
      src: "/kal-front.png", // ✅
      hoverSrc: "/kal-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Guilt Trip",
      src: "/guilt-front.png", // ✅
      hoverSrc: "/guilt-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "⁠Financial Literacy",
      src: "/financial.jpg", // ✅
      hoverSrc: "/financial-back.jpg",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "The Curse of Wildflower",
      src: "/wild-front.png", // ✅
      hoverSrc: "/wild-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Ekaki",
      src: "/ek1.png", // ✅
      hoverSrc: "/ek2.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },

    {
      title: "The Rise of Immortal",
      src: "/rise2-front.png", // ✅
      hoverSrc: "/rise2-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },

    {
      title: "The Price of Redemption",
      src: "/s1.png", // ✅
      hoverSrc: "/ss2.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },

    {
      title: "The Crown Blood",
      src: "/crown-front.png", // ✅
      hoverSrc: "/crown-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
    {
      title: "Daggers of Treason",
      src: "/dragger-front.png", // ✅
      hoverSrc: "/dragger-back.png",
      alt: "Urban night",
      creditHref: "https://unsplash.com",
    },
  ];

  const gallery = [
    {
      src: "/s1.png",
      alt: "The Prince of Redemption",
    },
    {
      src: "/s2.png",
      alt: "Wings of Thought",
    },
    { src: "/s3.png", alt: "Hi Babe" },
    {
      src: "/s4.png",
      alt: "Money Talks",
    },
    {
      src: "/s5.png",
      alt: "Voyage",
    },
    {
      src: "/s6.png",
      alt: "FrankEnstien",
    },

    {
      src: "/s6.png",
      alt: "Dracula",
    },

    {
      src: "/s7.png",
      alt: "FrankEnstien",
    },
    {
      src: "/s8.png",
      alt: "Jane Eyre",
    },
    {
      src: "/s9.png",
      alt: "The Jungle Book",
    },
    {
      src: "/s10.png",
      alt: "The Upanishads",
    },
  ];

  const columns = [0, 1, 2].map((col) =>
    gallery.filter((_, i) => i % 3 === col)
  );

  function runCounter(el, to) {
    const duration = 1200; // ms
    const start = Number(String(el.textContent).replace(/[^\d]/g, "")) || 0;
    const t0 = performance.now();

    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const val = Math.round(start + (to - start) * p);
      el.textContent = `${val}+`;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const useAboutCountersObserver = () => {
    const rootRef = useRef(null);
    const fired = useRef(false);

    useEffect(() => {
      if (!rootRef.current) return;

      const io = new IntersectionObserver(
        (entries) => {
          if (!fired.current && entries.some((e) => e.isIntersecting)) {
            fired.current = true;
            rootRef.current
              .querySelectorAll("[data-counter-to]")
              .forEach((node) => {
                const to =
                  parseInt(node.getAttribute("data-counter-to"), 10) || 0;
                runCounter(node, to);
              });
          }
        },
        { threshold: 0.35 }
      );

      io.observe(rootRef.current);
      return () => io.disconnect();
    }, []);

    return rootRef;
  };

  const aboutCountersRef = useAboutCountersObserver();

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
      image: "/pranav.jpeg",
      stars: 5,
      text: "Really, I must congratulate the team for designing such a marvelous and thoughtful cover! It's unanimously liked! The cover is so effective!, that I gained 2000 followers on Insta in 5 days, by boosting a reel based on the cover alone! My fullest appreciation for the professional involved in making the cover. I was always a little doubtful as to how a story with a tiger could be marketed in our country. There you proved me wrong.",
      name: "Pranav Mishra",
      title: "The Tiger That Crashed My Wedding",
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

  const steps = [
    {
      id: 1,
      image: "/c-call.jpeg",
      title: "Consultation call",
      description:
        "Our dedicated sales team reaches out to understand your specific needs and project goals.",
    },
    {
      id: 2,
      image: "/p-brief.jpeg",
      title: "Project Brief",
      description:
        "Authors post detailed project requirements on the platform, outlining their specific needs and expectations.",
    },
    {
      id: 3,
      image: "/f-call.jpeg",
      title: "Freelancers Apply",
      description:
        "Qualified service providers submit proposals after carefully reviewing your project requirements.",
    },
    {
      id: 4,
      image: "/p-p.jpeg",
      title: "Project Process",
      description:
        "Our targeted matching system ensures authors connect with the ideal service providers, after which secure payment processing enables the work to get underway.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // const slidesToShow = 4;
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

      <section className="number-stats" ref={aboutCountersRef} id="about">
        <div className="about__stats">
          <div className="stat">
            <div className="stat__num" data-counter-to="1200">
              0+
            </div>
            <div className="stat__label">Authors & Publishers Served</div>
          </div>

          <div className="stat">
            <div className="stat__num" data-counter-to="900">
              0+
            </div>
            <div className="stat__label">Pro Freelancers Onboarded</div>
          </div>

          <div className="stat">
            <div className="stat__num" data-counter-to="1500">
              0+
            </div>
            <div className="stat__label">
              Book Covers & Illustrations Delivered
            </div>
          </div>

          <div className="stat">
            <div className="stat__num" data-counter-to="2200">
              0+
            </div>
            <div className="stat__label">Manuscripts Edited & Proofread</div>
          </div>

          <div className="stat">
            <div className="stat__num" data-counter-to="1100">
              0+
            </div>
            <div className="stat__label">5-Star Client Reviews</div>
          </div>
        </div>
      </section>

      <section className="browse-talent-section" id="service-section">
        <div className="browse-talent-container">
          <h1>Browse Talent By Category</h1>
          <p>Connect with talented freelancers across various fields.</p>
          <div className="browse-buttons">
            <button className="post-job-btn">Post a Job</button>
          </div>

          <div className="slider-container" aria-roledescription="carousel">
            <button
              className="nav-button prev-button"
              onClick={prevCategorySlide}
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
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                ></path>
              </svg>
            </button>

            <div className="slider-wrapper">
              <div className="fade fade-left"></div>
              <div className="fade fade-right"></div>

              <div
                className="slider-track"
                ref={trackRef}
                style={{
                  transform: `translateX(-${(100 / slidesToShow) * index}%)`,
                  transition: transitionOn
                    ? "transform 0.5s ease-in-out"
                    : "none",
                  width: `auto`,
                }}
              >
                {extended.map((cat, i) => (
                  <div className="slide" key={`${cat.title}-${i}`}>
                    <div className="card">
                      <div className="icon">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={50}
                          height={50}
                          unoptimized
                        />
                      </div>
                      <h3>{cat.title}</h3>
                      <p>{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="nav-button next-button"
              onClick={nextCategorySlide}
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
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <hr id="border-line" />

      <section className="integration">
        <div className="integration-df">
          <div className="integration-left">
            {["up", "down", "up"].map((direction, colIdx) => (
              <div
                key={colIdx}
                className={`integration-list-marquee ${direction}`}
              >
                <div className="integration-marquee-inner">
                  {[...columns[colIdx], ...columns[colIdx]].map((item, idx) => (
                    <div key={idx} className="integration-card">
                      {item.href ? (
                        <Link
                          href={item.href}
                          aria-label={item.alt}
                          className="integration-card-link"
                          target="_blank"
                        >
                          <div className="integration-img-wrapper">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              width={185}
                              height={240}
                              className="integration-img"
                              loading="eager"
                            />
                          </div>
                          <h3 className="integration-title">{item.alt}</h3>
                        </Link>
                      ) : (
                        <>
                          <div className="integration-img-wrapper">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              width={185}
                              height={240}
                              className="integration-img"
                              loading="eager"
                            />
                          </div>
                          <h3 className="integration-title">{item.alt}</h3>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="integration-right">
            <h1>Yours can be next!</h1>
            <p>
              Impactful book designs, publishing assets, and campaigns that
              helped authors reach more readers and build lasting brands.
            </p>
            <Link href="/gallery-section">
              <button className="cta-button" id="integration-btn">
                Explore our work
                <span className="arrow-wrapper">
                  <span className="arrow first-arrow">
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
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vetting Section */}
      <section className="vetting-section">
        <div className="vetting-wrapper">
          <div className="vetting-container">
            <div className="vetting-text">
              <h2>Your Journey with Hubhawks Live</h2>
              <p>
                Our talented professionals are ready to bring your ideas to
                life. To go live, start here. Every author begins with an idea —
                a story, a message, a vision waiting to be shared. At Hubhawks
                Live, we help transform that spark into a clear, structured
                journey.
              </p>
              <p>
                From shaping your first draft to refining details and preparing
                for publication, our process ensures your words grow into a
                masterpiece that reaches the readers it deserves.
              </p>

              <p>
                A spark of imagination that deserves to shine. At Hubhawks Live,
                we turn that spark into a structured path, supporting you
                through writing, editing, design, and launch. Our author-first
                approach ensures your story not only comes alive but also
                reaches the right audience, leaving a lasting impact in the
                world of readers.
              </p>

              <div className="vetting-buttons">
                <button className="hire-btn">Hire freelancer</button>
                <button className="learn-btn">Learn more</button>
              </div>

              {/* Trust icons */}
              <div className="vetting-trust">
                {/* Award-winning (medal + star) */}
                <div
                  className="trust-item"
                  role="img"
                  aria-label="Award-Winning Designers"
                >
                  <svg
                    id="award"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    ariaLabel="Medal icon"
                  >
                    <defs>
                      <linearGradient
                        id="medalGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stop-color="#FFC44D" />
                        <stop offset="100%" stop-color="#FF9F1C" />
                      </linearGradient>
                      <filter
                        id="softShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="1.2"
                          stdDeviation="1.2"
                          flood-opacity="0.25"
                        />
                      </filter>
                    </defs>

                    <path
                      d="M16 10 L32 30"
                      stroke="#586CFF"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M64 10 L48 30"
                      stroke="#7A8CFF"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />

                    <circle cx="40" cy="50" r="18" fill="url(#medalGrad)" />
                    <circle
                      cx="40"
                      cy="50"
                      r="18"
                      fill="none"
                      stroke="#E58A00"
                      strokeWidth="2"
                    />

                    <polygon
                      points="
      40,35
      43.8,44.6
      54.8,44.6
      45.9,51.4
      49.0,61
      40,55.3
      31.0,61
      34.1,51.4
      25.2,44.6
      36.2,44.6"
                      fill="#FFFFFF"
                      filter="url(#softShadow)"
                    />
                  </svg>

                  <span>Award-Winning Designers</span>
                </div>

                {/* Author-first (open book + quill) */}
                <div
                  className="trust-item"
                  role="img"
                  aria-label="Author-First Process"
                >
                  <svg viewBox="0 0 64 64" className="ti ti-book">
                    <path
                      d="M8 14c8-4 16-4 24 0v36c-8-4-16-4-24 0V14z"
                      fill="#A066FF"
                    />
                    <path
                      d="M32 14c8-4 16-4 24 0v36c-8-4-16-4-24 0V14z"
                      fill="#6AD1E3"
                    />
                    <path
                      d="M40 20l-8 10 14-6"
                      stroke="#fff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 20h8"
                      stroke="#fff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Author-First Process</span>
                </div>

                {/* Fast turnaround (calendar + check) */}
                <div
                  className="trust-item"
                  role="img"
                  aria-label="Fast Turnaround"
                >
                  <svg viewBox="0 0 64 64" className="ti ti-calendar">
                    <rect
                      x="8"
                      y="12"
                      width="48"
                      height="40"
                      rx="8"
                      fill="#FF6B6B"
                    />
                    <path d="M16 22h32" stroke="#fff" strokeWidth="3" />
                    <path
                      d="M22 34l6 6 14-14"
                      stroke="#fff"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="12" r="4" fill="#fff" />
                    <circle cx="44" cy="12" r="4" fill="#fff" />
                  </svg>
                  <span>Fast Turnaround</span>
                </div>

                {/* Rights-safe (shield + ©) */}
                <div
                  className="trust-item"
                  role="img"
                  aria-label="Rights-Safe & Secure"
                >
                  <svg viewBox="0 0 64 64" className="ti ti-shield">
                    <path
                      d="M32 6l18 6v14c0 13-8 22-18 26-10-4-18-13-18-26V12l18-6z"
                      fill="#00C853"
                    />
                    <circle cx="32" cy="30" r="10" fill="#fff" />
                    <text
                      x="32"
                      y="34"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="#00C853"
                    >
                      ©
                    </text>
                  </svg>
                  <span>Rights-Safe & Secure</span>
                </div>
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

      <section className="teamSection">
        <div className="container">
          <div className="content">
            <div className="textContent" id="meet-title">
              <h2 className="title">Meet Our Team</h2>
              <p className="description">
                Passionate professionals dedicated to delivering excellence Our
                diverse team brings together years of experience, creativity,
                and innovation to every project. We believe in collaboration,
                continuous learning, and pushing boundaries to achieve
                remarkable results.
              </p>

              <div className="stats" id="team-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Team Members</p>
                </div>
                <div className="stat">
                  <h3>10+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>200+</h3>
                  <p>Projects Completed</p>
                </div>
              </div>

              <div className="values">
                <h3>Our Core Values</h3>
                <ul>
                  <li>Innovation and creativity in everything we do</li>
                  <li>Commitment to quality and excellence</li>
                  <li>Collaborative spirit and teamwork</li>
                  <li>Continuous learning and growth</li>
                </ul>
              </div>

              <div className="team-btn">
                <button>Know More</button>
              </div>
            </div>

            <div className="imageContent">
              <div className="imageWrapper">
                <Image
                  src="/team.png"
                  width={0}
                  height={0}
                  alt="team-img"
                  unoptimized
                ></Image>
                <div className="imageOverlay">
                  <p>Together we achieve more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logo-slider">
        <h1>Our Partners</h1>
        <div className="logo-track">
          <div className="logo-item">
            <Image
              src="/audible.png"
              alt="Audible"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/bhari.webp"
              alt="Bhari"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/bloom.png"
              alt="Bloom"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/crosswor.png"
              alt="Crossword"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/finger.png"
              alt="Finger"
              fill
              sizes="160px"
              unoptimized
            />
          </div>

          <div className="logo-item">
            <Image
              src="/harper.avif"
              alt="Harper"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/higgino.png"
              alt="Higgino"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/iroc.jpeg" alt="IROC" fill sizes="160px" unoptimized />
          </div>

          <div className="logo-item">
            <Image
              src="/kunzum.png"
              alt="Kunzum"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/om.png" alt="OM" fill sizes="160px" unoptimized />
          </div>
          <div className="logo-item">
            <Image
              src="/oxford.avif"
              alt="Oxford"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/red.webp" alt="Red" fill sizes="160px" unoptimized />
          </div>
          <div className="logo-item">
            <Image
              src="/sapna.png"
              alt="Sapna"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/scholastic.png"
              alt="Scholastic"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/simon.jpg"
              alt="Simon"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item" id="background">
            <Image
              src="/jaico.png"
              alt="Jaico"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/tara.png" alt="Tara" fill sizes="160px" unoptimized />
          </div>

          {/* Repeat for seamless scroll */}
          <div className="logo-item">
            <Image
              src="/audible.png"
              alt="Audible"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/bhari.webp"
              alt="Bhari"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/bloom.png"
              alt="Bloom"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/crosswor.png"
              alt="Crossword"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/finger.png"
              alt="Finger"
              fill
              sizes="160px"
              unoptimized
            />
          </div>

          <div className="logo-item">
            <Image
              src="/harper.avif"
              alt="Harper"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/higgino.png"
              alt="Higgino"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/iroc.jpeg" alt="IROC" fill sizes="160px" unoptimized />
          </div>

          <div className="logo-item">
            <Image
              src="/kunzum.png"
              alt="Kunzum"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/om.png" alt="OM" fill sizes="160px" unoptimized />
          </div>
          <div className="logo-item">
            <Image
              src="/oxford.avif"
              alt="Oxford"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/red.webp" alt="Red" fill sizes="160px" unoptimized />
          </div>
          <div className="logo-item">
            <Image
              src="/sapna.png"
              alt="Sapna"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/scholastic.png"
              alt="Scholastic"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image
              src="/simon.jpg"
              alt="Simon"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item" id="background">
            <Image
              src="/jaico.png"
              alt="Jaico"
              fill
              sizes="160px"
              unoptimized
            />
          </div>
          <div className="logo-item">
            <Image src="/tara.png" alt="Tara" fill sizes="160px" unoptimized />
          </div>
        </div>
      </div>

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
        </div>
        <a href="#" id="talent-btn">
          View all →
        </a>

        <div className="freelancer-grid">
          {freelancers.map((f, i) => (
            <article className="freelancer-card v2" key={i}>
              <div className="freelancer-media">
                <Image
                  src={f.image}
                  alt={f.name}
                  width={0}
                  height={0}
                  className="freelancer-image"
                  unoptimized
                />
              </div>

              <div className="freelancer-body">
                <h3 className="freelancer-name">{f.name}</h3>
                <p className="freelancer-subtitle">{f.title}</p>
                <p className="freelancer-role">{f.desc}</p>

                <div className="freelancer-actions v2">
                  <button className="hire-btn">Hire</button>
                  {/* Optional secondary link — keep if you want */}
                  {/* <a href="#" className="ghost-link">View Profile</a> */}
                </div>
              </div>
            </article>
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

        <div className="mmg-root">
          <div ref={progressRef} className="mmg-scroll-indicator" />

          <div className="mmg-container">
            <div className="mmg-gallery">
              {items.map((item, idx) => (
                <article
                  key={idx}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className="mmg-item"
                  style={{ ["--delay"]: String(idx + 1) }}
                >
                  <div className="mmg-item-inner">
                    {/* Default image controls layout height */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="mmg-img default-img"
                      loading="lazy"
                    />

                    {/* Hover image layered on top only when present */}
                    {item.hoverSrc && (
                      <img
                        src={item.hoverSrc}
                        alt={`${item.alt} (hover)`}
                        className="mmg-img hover-img"
                        loading="lazy"
                      />
                    )}

                    <div className="mmg-overlay">
                      <h2 className="mmg-card-title">{item.title}</h2>
                      <p className="mmg-card-desc">{item.desc}</p>
                    </div>
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
              <button onClick={handlePrev}>
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button onClick={handleNext}>
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
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
          <h2 className="snipers-title">Our Freelancers Have Got You</h2>
          <p className="snipers-desc">
            Join thousands of authors who trust HubHawks Live for their
            publishing needs. From cover design to marketing campaigns, our
            expert freelancer deliver results with precision.
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
