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

  // Get role from query or localStorage
  const rawRole = searchParams.get("role");
  const role = rawRole || localStorage.getItem("userRole") || null;

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Unique ID generator
  const generateUniqueId = async (
    role = "unknown",
    email = "",
    fullName = ""
  ) => {
    const normalizedRole = role?.toLowerCase();

    // 🔹 For HireFreelancer → use first name only
    if (normalizedRole === "hirefreelancer") {
      const firstName = fullName.split(" ")[0] || "user";
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }

    // 🔹 For beSniper → generate hawker### unique ID
    if (normalizedRole === "besniper") {
      const randomNum = Math.floor(100 + Math.random() * 900);
      const uniqueId = `hawker${randomNum}`;

      // Check Firestore duplicates
      const docRef = doc(db, "uniqueUserIds", uniqueId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return generateUniqueId(role, email, fullName);

      // Save to Firestore
      await setDoc(docRef, {
        uniqueId,
        role,
        email,
        name: fullName,
        createdAt: new Date().toISOString(),
      });

      return uniqueId;
    }

    // 🔹 Default fallback
    const firstName = fullName.split(" ")[0] || "user";
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  // ✅ Email/Password Signup
  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setErrorMsg("");

  //   if (!fullName || !email || !password) {
  //     setErrorMsg("All fields are required.");
  //     return;
  //   }

  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);

  //     const uniqueId = await generateUniqueId(role, email, fullName);

  //     // 🧠 Save data locally
  //     localStorage.setItem("uniqueId", uniqueId);
  //     localStorage.setItem("fullName", fullName);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("userRole", role);

  //     // 💾 Save user data in Firestore
  //     const userEmail = email.toLowerCase();
  //     await setDoc(doc(db, "users", userEmail), {
  //       email: userEmail,
  //       role: role || "unknown",
  //       fullName,
  //       uniqueId,
  //     });

  //     // 🎯 Save flags for modal routing
  //     if (role === "beSniper") {
  //       localStorage.setItem("showBeSniperModal", "true");
  //     } else if (role === "HireFreelancer") {
  //       localStorage.setItem("showHireFreelancerModal", "true");
  //     }

  //     // 🚀 Redirect
  //     window.location.href = "/";
  //   } catch (error) {
  //     setErrorMsg(
  //       error.code === "auth/email-already-in-use"
  //         ? "This email is already registered. Please login."
  //         : error.message || "Signup failed"
  //     );
  //   }
  // };
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      // ✅ Step 1: Check if email already exists in be-sniper-forms
      const beSniperFormRef = doc(db, "be-sniper-forms", email.toLowerCase());
      const beSniperFormSnap = await getDoc(beSniperFormRef);

      if (beSniperFormSnap.exists()) {
        setErrorMsg(
          "This email was already used to fill the BeSniper form. Please use a different email."
        );
        return; // Stop here — don’t create account
      }

      // ✅ Step 2: Proceed with signup
      await createUserWithEmailAndPassword(auth, email, password);

      const uniqueId = await generateUniqueId(role, email, fullName);

      // 🧠 Save data locally
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);
      localStorage.setItem("userRole", role);

      // 💾 Save user data in Firestore
      const userEmail = email.toLowerCase();
      await setDoc(doc(db, "users", userEmail), {
        email: userEmail,
        role: role || "unknown",
        fullName,
        uniqueId,
      });

      // 🎯 Save flags for modal routing
      // if (role === "beSniper") {
      //   localStorage.setItem("showBeSniperModal", "true");
      // }
      if (role === "Be A Freelancer" || role === "beSniper") {
        localStorage.setItem("showBeSniperModal", "true");
      } else if (role === "HireFreelancer") {
        localStorage.setItem("showHireFreelancerModal", "true");
      }

      // 🚀 Redirect
      window.location.href = "/";
    } catch (error) {
      setErrorMsg(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login."
          : error.message || "Signup failed"
      );
    }
  };

  // ✅ Google Signup
  // const loginWithGoogle = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     const name = user.displayName || "GoogleUser";
  //     const userEmail = user.email;

  //     const uniqueId = await generateUniqueId(role, userEmail, name);

  //     // Save to localStorage
  //     localStorage.setItem("uniqueId", uniqueId);
  //     localStorage.setItem("fullName", name);
  //     localStorage.setItem("email", userEmail);
  //     localStorage.setItem("userRole", role);

  //     if (role === "beSniper") {
  //       localStorage.setItem("showBeSniperModal", "true");
  //     } else if (role === "HireFreelancer") {
  //       localStorage.setItem("showHireFreelancerModal", "true");
  //     }

  //     window.location.href = "/";
  //   } catch (err) {
  //     setErrorMsg(err.message || "Google signup failed");
  //   }
  // };

  // ✅ Google Signup
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const name = user.displayName || "GoogleUser";
      const userEmail = user.email.toLowerCase();

      // 🔹 Step 1: Check if user already exists in Firestore
      const userRef = doc(db, "users", userEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // 🧩 User already exists → show message and redirect
        setErrorMsg("This email is already registered. Please login instead.");
        await auth.signOut(); // optional: sign them out immediately
        return;
      }

      // 🔹 Step 2: Continue signup if new user
      // const uniqueId = await generateUniqueId(role, userEmail, name);
      const uniqueId =
        localStorage.getItem("uniqueId") ||
        (await generateUniqueId(name, email, role));

      // 💾 Save user data in Firestore
      await setDoc(userRef, {
        email: userEmail,
        role: role || "unknown",
        fullName: name,
        uniqueId,
      });

      // 💾 Save locally
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", name);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("userRole", role);

      if (role === "beSniper") {
        localStorage.setItem("showBeSniperModal", "true");
      } else if (role === "HireFreelancer") {
        localStorage.setItem("showHireFreelancerModal", "true");
      }

      // 🚀 Redirect
      window.location.href = "/";
    } catch (err) {
      setErrorMsg(err.message || "Google signup failed");
    }
  };

  // ✅ Check if user clicked a CTA before signup
  // const pendingAction = localStorage.getItem("pendingAction");

  // if (pendingAction === "hire") {
  //   localStorage.removeItem("pendingAction");
  //   localStorage.setItem("showHireFreelancerModal", "true");
  // } else if (pendingAction === "freelancer") {
  //   localStorage.removeItem("pendingAction");
  //   localStorage.setItem("showBeSniperModal", "true");
  // } else if (pendingAction === "post-job") {
  //   localStorage.removeItem("pendingAction");
  //   window.location.href = "/post-job";
  // }

  const pendingAction = localStorage.getItem("pendingAction");

  if (pendingAction === "hire" || pendingAction === "post-job") {
    // 🧩 "Hire a Freelancer" or "Post a Job" → same flow (HireFreelancer modal)
    localStorage.removeItem("pendingAction");
    localStorage.setItem("showHireFreelancerModal", "true");
  } else if (pendingAction === "freelancer" || pendingAction === "sniper") {
    // 🧩 "Join Us" or "Be a Freelancer" → BeSniper modal
    localStorage.removeItem("pendingAction");
    localStorage.setItem("showBeSniperModal", "true");
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <div
        className="signup-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        onClick={onClose}
      >
        <div className="signup-container" onClick={(e) => e.stopPropagation()}>
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
                Have an account?{" "}
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

//   // Get role from query or localStorage
//   const rawRole = searchParams.get("role");
//   const role = rawRole || localStorage.getItem("userRole") || null;

//   const [showPassword, setShowPassword] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // ✅ Unique ID generator
//   const generateUniqueId = async (
//     role = "unknown",
//     email = "",
//     fullName = ""
//   ) => {
//     const normalizedRole = role?.toLowerCase();

//     // 🔹 For HireFreelancer → use first name only
//     if (normalizedRole === "hirefreelancer") {
//       const firstName = fullName.split(" ")[0] || "user";
//       return firstName.charAt(0).toUpperCase() + firstName.slice(1);
//     }

//     // 🔹 For beSniper → generate hawker### unique ID
//     if (normalizedRole === "besniper") {
//       const randomNum = Math.floor(100 + Math.random() * 900);
//       const uniqueId = `hawker${randomNum}`;

//       // Check Firestore duplicates
//       const docRef = doc(db, "uniqueUserIds", uniqueId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) return generateUniqueId(role, email, fullName);

//       // Save to Firestore
//       await setDoc(docRef, {
//         uniqueId,
//         role,
//         email,
//         name: fullName,
//         createdAt: new Date().toISOString(),
//       });

//       return uniqueId;
//     }

//     // 🔹 Default fallback
//     const firstName = fullName.split(" ")[0] || "user";
//     return firstName.charAt(0).toUpperCase() + firstName.slice(1);
//   };

//   // ✅ Email/Password Signup
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!fullName || !email || !password) {
//       setErrorMsg("All fields are required.");
//       return;
//     }

//     try {
//       // ✅ Step 1: Check if email already exists in be-sniper-forms
//       const beSniperFormRef = doc(db, "be-sniper-forms", email.toLowerCase());
//       const beSniperFormSnap = await getDoc(beSniperFormRef);

//       if (beSniperFormSnap.exists()) {
//         setErrorMsg(
//           "This email was already used to fill the BeSniper form. Please use a different email."
//         );
//         return; // Stop here — don’t create account
//       }

//       // ✅ Step 2: Proceed with signup
//       await createUserWithEmailAndPassword(auth, email, password);

//       const uniqueId = await generateUniqueId(role, email, fullName);

//       // 🧠 Save data locally
//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("fullName", fullName);
//       localStorage.setItem("email", email);
//       localStorage.setItem("userRole", role);

//       // 💾 Save user data in Firestore
//       const userEmail = email.toLowerCase();
//       await setDoc(doc(db, "users", userEmail), {
//         email: userEmail,
//         role: role || "unknown",
//         fullName,
//         uniqueId,
//       });

//       // ✅ Trigger Google Sheets sync
//       fetch("https://script.google.com/macros/s/AKfycbzXYZ1234abc/exec", {
//         method: "GET",
//         mode: "cors",
//       }).catch((err) => console.error("Sync trigger failed:", err));

//       // 🎯 Save flags for modal routing
//       if (role === "beSniper") {
//         localStorage.setItem("showBeSniperModal", "true");
//       } else if (role === "HireFreelancer") {
//         localStorage.setItem("showHireFreelancerModal", "true");
//       }

//       // 🚀 Redirect
//       window.location.href = "/";
//     } catch (error) {
//       setErrorMsg(
//         error.code === "auth/email-already-in-use"
//           ? "This email is already registered. Please login."
//           : error.message || "Signup failed"
//       );
//     }
//   };

//   // ✅ Google Signup
//   const loginWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const name = user.displayName || "GoogleUser";
//       const userEmail = user.email;

//       const uniqueId = await generateUniqueId(role, userEmail, name);

//       // Save to localStorage
//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("fullName", name);
//       localStorage.setItem("email", userEmail);
//       localStorage.setItem("userRole", role);

//       // ✅ Trigger Google Sheets sync
//       fetch("https://script.google.com/macros/s/AKfycbzXYZ1234abc/exec", {
//         method: "GET",
//         mode: "cors",
//       }).catch((err) => console.error("Sync trigger failed:", err));

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

//       <div
//         className="signup-overlay"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="signup-title"
//         onClick={onClose}
//       >
//         <div className="signup-container" onClick={(e) => e.stopPropagation()}>
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
//                 ? "Be a Freelancer"
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
//                 Have an account?{" "}
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
