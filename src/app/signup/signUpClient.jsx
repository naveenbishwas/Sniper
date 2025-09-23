// "use client";

// import { useState } from "react";
// import Head from "next/head";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { useRouter, useSearchParams } from "next/navigation";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Link from "next/link";
// import "./signup.css";

// export default function SignupModal({ onClose }) {
//   const auth = getAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const rawRole = searchParams.get("role");
//   const role = rawRole || localStorage.getItem("userRole") || null;

//   const [showPassword, setShowPassword] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // ✅ Unique ID generator
//   const generateUniqueId = async (name, email) => {
//     const cleanedName = name.toLowerCase().replace(/\s/g, "");
//     const randomNum = Math.floor(100 + Math.random() * 900);
//     const uniqueId = `${cleanedName}${randomNum}`;

//     const docRef = doc(db, "uniqueUserIds", uniqueId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) return generateUniqueId(name, email);

//     await setDoc(docRef, {
//       uniqueId,
//       createdAt: new Date().toISOString(),
//       email,
//       name,
//     });

//     return uniqueId;
//   };

//   // ✅ Email/Password Signup Handler
//   // const handleSignup = async (e) => {
//   //   e.preventDefault();
//   //   setErrorMsg("");

//   //   if (!fullName || !email || !password) {
//   //     setErrorMsg("All fields are required.");
//   //     return;
//   //   }

//   //   try {
//   //     await createUserWithEmailAndPassword(auth, email, password);

//   //     const uniqueId = await generateUniqueId(fullName, email);
//   //     localStorage.setItem("uniqueId", uniqueId);
//   //     localStorage.setItem("fullName", fullName);
//   //     localStorage.setItem("email", email);

//   //     const userEmail = email.toLowerCase();
//   //     await setDoc(doc(db, "users", userEmail), {
//   //       email: userEmail,
//   //       role: role || "unknown",
//   //       fullName,
//   //     });

//   //     if (role === "beSniper") {
//   //       localStorage.setItem("showBeSniperModal", "true");
//   //     } else if (role === "HireFreelancer") {
//   //       localStorage.setItem("showHireFreelancerModal", "true");
//   //     }

//   //     window.location.href = "/";
//   //   } catch (error) {
//   //     setErrorMsg(
//   //       error.code === "auth/email-already-in-use"
//   //         ? "This email is already registered. Please login."
//   //         : error.message || "Signup failed"
//   //     );
//   //   }
//   // };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!fullName || !email || !password) {
//       setErrorMsg("All fields are required.");
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);

//       const uniqueId = await generateUniqueId(fullName, email);
//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("fullName", fullName);
//       localStorage.setItem("email", email);

//       // ✅ FIX: Save user data to Firestore
//       const userEmail = email.toLowerCase();
//       await setDoc(doc(db, "users", userEmail), {
//         email: userEmail,
//         role: role || "unknown",
//         fullName,
//       });

//       // ✅ Store modal flags for redirection
//       if (role === "beSniper") {
//         localStorage.setItem("showBeSniperModal", "true");
//       } else if (role === "HireFreelancer") {
//         localStorage.setItem("showHireFreelancerModal", "true");
//       }

//       window.location.href = "/";
//     } catch (error) {
//       setErrorMsg(
//         error.code === "auth/email-already-in-use"
//           ? "This email is already registered. Please login."
//           : error.message || "Signup failed"
//       );
//     }
//   };

//   // ✅ Google Signup Handler
//   const loginWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const name = user.displayName || "googleuser";
//       const userEmail = user.email;

//       const uniqueId = await generateUniqueId(name, userEmail);

//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("fullName", name);
//       localStorage.setItem("email", userEmail);

//       if (role === "beSniper") {
//         localStorage.setItem("showBeSniperModal", "true");
//       } else if (role === "HireFreelancer") {
//         localStorage.setItem("showHireFreelancerModal", "true");
//       }

//       window.location.href = "/";
//     } catch (err) {
//       setErrorMsg(err.message || "Google signup failed");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Signup</title>
//       </Head>

//       {/* <div className="modal-overlay" onClick={onClose}></div> */}

//       <div
//         className="signup-overlay"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="signup-title"
//       >
//         <div className="signup-container">
//           <button
//             className="close-modal"
//             onClick={onClose}
//             aria-label="Close sign up dialog"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 16 16"
//               aria-hidden="true"
//             >
//               <path
//                 fill="currentColor"
//                 d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
//               />
//             </svg>
//           </button>

//           <form className="signup-form" onSubmit={handleSignup} noValidate>
//             <h2 id="signup-title">
//               Sign up to{" "}
//               {role === "beSniper"
//                 ? "Be a Sniper"
//                 : role === "HireFreelancer"
//                 ? "Hire a Freelancer"
//                 : "Get Started"}
//             </h2>

//             {errorMsg && (
//               <p className="error" role="alert">
//                 {errorMsg}
//               </p>
//             )}

//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Your name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//               autoComplete="name"
//             />

//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               autoComplete="email"
//             />

//             <label htmlFor="password">Password</label>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="new-password"
//               />
//               <button
//                 id="show"
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-pressed={showPassword}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>

//             <button type="submit" className="submit-btn">
//               Create Account
//             </button>

//             <div className="or-divider" aria-hidden="true">
//               <span>or</span>
//             </div>

//             <button
//               type="button"
//               onClick={loginWithGoogle}
//               className="btn-google"
//             >
//               <svg className="g-logo" viewBox="0 0 48 48" aria-hidden="true">
//                 <path
//                   fill="#FFC107"
//                   d="M43.6 20.5H42V20H24v8h11.3C33.6 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.7 29.3 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.5-.2-3-.4-4.5z"
//                 />
//                 <path
//                   fill="#FF3D00"
//                   d="M6.3 14.7l6.6 4.8C14.5 16.5 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.7 29.3 5 24 5 16.1 5 9.3 9.6 6.3 14.7z"
//                 />
//                 <path
//                   fill="#4CAF50"
//                   d="M24 45c5.1 0 9.8-1.9 13.4-5.1l-6.2-5.1C29.2 36 26.7 37 24 37c-5.1 0-9.4-3.3-10.9-7.9l-6.6 5.1C9.4 40.3 16.1 45 24 45z"
//                 />
//                 <path
//                   fill="#1976D2"
//                   d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.7 5.6-7.3 6.8l6.2 5.1C36.7 41.1 44 36.5 44 25c0-1.5-.2-3-.4-4.5z"
//                 />
//               </svg>
//               Sign up with Google
//             </button>

//             <div className="sign-login">
//               <p>
//                 Have an account?
//                 <span>
//                   <Link href="/login">Login</Link>
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Head from "next/head";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import "./signup.css";

export default function SignupModal({ onClose }) {
  const auth = getAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawRole = searchParams.get("role");
  const role = rawRole || localStorage.getItem("userRole") || null;

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Unique ID generator
  // const generateUniqueId = async (name, email) => {
  //   const cleanedName = name.toLowerCase().replace(/\s/g, "");
  //   const randomNum = Math.floor(100 + Math.random() * 900);
  //   const uniqueId = `${cleanedName}${randomNum}`;

  //   const docRef = doc(db, "uniqueUserIds", uniqueId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) return generateUniqueId(name, email);

  //   await setDoc(docRef, {
  //     uniqueId,
  //     createdAt: new Date().toISOString(),
  //     email,
  //     name,
  //   });

  //   return uniqueId;
  // };

  const generateUniqueId = async (role = "unknown", email = "", name = "") => {
    // decide prefix based on role
    let prefix = "user"; // fallback
    if (role === "beSniper" || role === "BeFreelancer") {
      prefix = "hawkee";
    } else if (role === "HireFreelancer") {
      prefix = "hawker";
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueId = `${prefix}${randomNum}`;

    const docRef = doc(db, "uniqueUserIds", uniqueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return generateUniqueId(role, email, name); // retry
    }

    await setDoc(docRef, {
      uniqueId,
      role: role || "unknown",
      createdAt: new Date().toISOString(),
      email: email || "",
      name: name || "",
    });

    return uniqueId;
  };

  // Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const uniqueId = await generateUniqueId(fullName, email);
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);

      const userEmail = email.toLowerCase();
      await setDoc(doc(db, "users", userEmail), {
        email: userEmail,
        role: role || "unknown",
        fullName,
      });

      if (role === "beSniper") {
        localStorage.setItem("showBeSniperModal", "true");
      } else if (role === "HireFreelancer") {
        localStorage.setItem("showHireFreelancerModal", "true");
      }

      window.location.href = "/";
    } catch (error) {
      setErrorMsg(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login."
          : error.message || "Signup failed"
      );
    }
  };

  // Google Signup
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const name = user.displayName || "googleuser";
      const userEmail = user.email;

      const uniqueId = await generateUniqueId(name, userEmail);

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", name);
      localStorage.setItem("email", userEmail);

      if (role === "beSniper") {
        localStorage.setItem("showBeSniperModal", "true");
      } else if (role === "HireFreelancer") {
        localStorage.setItem("showHireFreelancerModal", "true");
      }

      window.location.href = "/";
    } catch (err) {
      setErrorMsg(err.message || "Google signup failed");
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      {/* Single overlay = backdrop + centering */}
      <div
        className="signup-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        onClick={onClose} /* close on backdrop click */
      >
        <div
          className="signup-container"
          onClick={(e) =>
            e.stopPropagation()
          } /* don't close when clicking inside */
        >
          <button
            className="close-modal"
            onClick={onClose}
            aria-label="Close sign up dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>

          <form className="signup-form" onSubmit={handleSignup} noValidate>
            <h2 id="signup-title">
              Sign up to{" "}
              {role === "beSniper"
                ? "Be a Freelancer"
                : role === "HireFreelancer"
                ? "Hire a Freelancer"
                : "Get Started"}
            </h2>

            {errorMsg && (
              <p className="error" role="alert">
                {errorMsg}
              </p>
            )}

            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                id="show"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>

            <div className="or-divider" aria-hidden="true">
              <span>or</span>
            </div>

            <button
              type="button"
              onClick={loginWithGoogle}
              className="btn-google"
            >
              <svg className="g-logo" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.6 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.7 29.3 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.5-.2-3-.4-4.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.5 16.5 18.8 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.7 29.3 5 24 5 16.1 5 9.3 9.6 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 45c5.1 0 9.8-1.9 13.4-5.1l-6.2-5.1C29.2 36 26.7 37 24 37c-5.1 0-9.4-3.3-10.9-7.9l-6.6 5.1C9.4 40.3 16.1 45 24 45z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.7 5.6-7.3 6.8l6.2 5.1C36.7 41.1 44 36.5 44 25c0-1.5-.2-3-.4-4.5z"
                />
              </svg>
              Sign up with Google
            </button>

            <div className="sign-login">
              <p>
                Have an account?
                <span>
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
