// "use client";

// import Image from "next/image";
// import "./header.css";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Header({ onSignupClick }) {
//   const [show, setShow] = useState(true);

//   let lastScrollY = 0;

//   useEffect(() => {
//     const controlHeader = () => {
//       if (window.scrollY > lastScrollY) {
//         setShow(false); // scroll down
//       } else {
//         setShow(true); // scroll up
//       }
//       lastScrollY = window.scrollY;
//     };

//     window.addEventListener("scroll", controlHeader);
//     return () => window.removeEventListener("scroll", controlHeader);
//   }, []);
//   return (
//     <header
//       className="header"
//       style={{ transform: show ? "translateY(0)" : "translateY(-100%)" }}
//     >
//       <div className="header__left">
//         <Link href="/">
//           <Image
//             src={"/logo3.png"}
//             className="header__logo"
//             width={55}
//             height={55}
//             unoptimized
//             alt="logo"
//           />
//         </Link>
//       </div>

//       <div className="header__right">
//         <button
//           className="header__signin"
//           onClick={() => onSignupClick("beSniper")}
//         >
//           Be a Freelancer
//         </button>

//         <button
//           className="header__join"
//           onClick={() => onSignupClick("HireFreelancer")}
//         >
//           Hire a Freelancer
//         </button>

//         <Link href="/login" className="login-btn">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="23"
//             height="23"
//             fill="currentColor"
//             className="bi bi-person-circle"
//             viewBox="0 0 16 16"
//           >
//             <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//             <path
//               fillRule="evenodd"
//               d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
//             />
//           </svg>
//           <p>Login</p>
//         </Link>
//       </div>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import "./header.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ onSignupClick }) {
  const [show, setShow] = useState(true);
  const [userInitial, setUserInitial] = useState(null);

  useEffect(() => {
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      setUserInitial(fullName.charAt(0).toUpperCase());
    }
  }, []);

  let lastScrollY = 0;

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scroll down
      } else {
        setShow(true); // scroll up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, []);

  return (
    <header
      className="header"
      style={{ transform: show ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="header__left">
        <Link href="/">
          <Image
            src={"/logo3.png"}
            className="header__logo"
            width={55}
            height={55}
            unoptimized
            alt="logo"
          />
        </Link>
      </div>

      <div className="header__right">
        <button
          className="header__signin"
          onClick={() => onSignupClick("beSniper")}
        >
          Be a Freelancer
        </button>

        <button
          className="header__join"
          onClick={() => onSignupClick("HireFreelancer")}
        >
          Hire a Freelancer
        </button>

        {userInitial ? (
          <div className="user-avatar">{userInitial}</div>
        ) : (
          <Link href="/login" className="login-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <p>Login</p>
          </Link>
        )}
      </div>
    </header>
  );
}
