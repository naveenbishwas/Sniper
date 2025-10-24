// "use client";

// import { useState } from "react";
// import Head from "next/head";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   RecaptchaVerifier,
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

//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [message, setMessage] = useState("");

//   // Setup reCAPTCHA
//   const setUpRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//       },
//       auth
//     );
//   };

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     setUpRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
//     try {
//       const result = await signInWithPhoneNumber(auth, phone, appVerifier);
//       setConfirmationResult(result);
//       setMessage("OTP sent successfully!");
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   // Step 2: Verify OTP
//   const verifyOtp = async () => {
//     try {
//       await confirmationResult.confirm(otp);
//       setMessage("✅ Phone number verified successfully!");
//     } catch (error) {
//       setMessage("❌ Invalid OTP.");
//     }
//   };

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

//       // 🎯 Save flags for modal routing
//       // if (role === "beSniper") {
//       //   localStorage.setItem("showBeSniperModal", "true");
//       // }
//       if (role === "Be A Freelancer" || role === "beSniper") {
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
//       const userEmail = user.email.toLowerCase();

//       // 🔹 Step 1: Check if user already exists in Firestore
//       const userRef = doc(db, "users", userEmail);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         // 🧩 User already exists → show message and redirect
//         setErrorMsg("This email is already registered. Please login instead.");
//         await auth.signOut(); // optional: sign them out immediately
//         return;
//       }

//       // 🔹 Step 2: Continue signup if new user
//       // const uniqueId = await generateUniqueId(role, userEmail, name);
//       const uniqueId =
//         localStorage.getItem("uniqueId") ||
//         (await generateUniqueId(name, email, role));

//       // 💾 Save user data in Firestore
//       await setDoc(userRef, {
//         email: userEmail,
//         role: role || "unknown",
//         fullName: name,
//         uniqueId,
//       });

//       // 💾 Save locally
//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("fullName", name);
//       localStorage.setItem("email", userEmail);
//       localStorage.setItem("userRole", role);

//       if (role === "beSniper") {
//         localStorage.setItem("showBeSniperModal", "true");
//       } else if (role === "HireFreelancer") {
//         localStorage.setItem("showHireFreelancerModal", "true");
//       }

//       // 🚀 Redirect
//       window.location.href = "/";
//     } catch (err) {
//       setErrorMsg(err.message || "Google signup failed");
//     }
//   };

//   const pendingAction = localStorage.getItem("pendingAction");

//   if (pendingAction === "hire" || pendingAction === "post-job") {
//     // 🧩 "Hire a Freelancer" or "Post a Job" → same flow (HireFreelancer modal)
//     localStorage.removeItem("pendingAction");
//     localStorage.setItem("showHireFreelancerModal", "true");
//   } else if (pendingAction === "freelancer" || pendingAction === "sniper") {
//     // 🧩 "Join Us" or "Be a Freelancer" → BeSniper modal
//     localStorage.removeItem("pendingAction");
//     localStorage.setItem("showBeSniperModal", "true");
//   }

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
//               <div>
//                 <input
//                   type="tel"
//                   placeholder="+91 9876543210"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <button onClick={sendOtp}>Send OTP</button>

//                 <div id="recaptcha-container"></div>

//                 {confirmationResult && (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="Enter OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                     />
//                     <button onClick={verifyOtp}>Verify OTP</button>
//                   </>
//                 )}

//                 <p>{message}</p>
//               </div>
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

"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
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

  // Get role
  const rawRole = searchParams.get("role");
  const role = rawRole || localStorage.getItem("userRole") || null;

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Setup reCAPTCHA once on mount
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Prevent double initialization
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA solved", response);
            },
          }
        );
      } catch (err) {
        console.warn("reCAPTCHA already initialized or failed:", err);
      }
    }
  }, [auth]);

  // 🔹 Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!phone) return setMessage("Please enter your phone number.");
    if (!phone.startsWith("+"))
      return setMessage("Include country code, e.g. +91XXXXXXXXXX");

    setOtpSending(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setMessage("✅ OTP sent successfully!");
    } catch (error) {
      setMessage("❌ Failed to send OTP: " + error.message);
    } finally {
      setOtpSending(false);
    }
  };

  // 🔹 Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Please enter the OTP.");

    try {
      await confirmationResult.confirm(otp);
      setIsOtpVerified(true);
      setMessage("✅ Phone verified successfully!");
    } catch (error) {
      setMessage("❌ Invalid OTP. Please try again.");
      setIsOtpVerified(false);
    }
  };

  // 🔹 Generate Unique ID
  const generateUniqueId = async (
    role = "unknown",
    email = "",
    fullName = ""
  ) => {
    const normalizedRole = role?.toLowerCase();

    if (normalizedRole === "hirefreelancer") {
      const firstName = fullName.split(" ")[0] || "user";
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }

    if (normalizedRole === "besniper") {
      const randomNum = Math.floor(100 + Math.random() * 900);
      const uniqueId = `hawker${randomNum}`;
      const docRef = doc(db, "uniqueUserIds", uniqueId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return generateUniqueId(role, email, fullName);

      await setDoc(docRef, {
        uniqueId,
        role,
        email,
        name: fullName,
        createdAt: new Date().toISOString(),
      });
      return uniqueId;
    }

    const firstName = fullName.split(" ")[0] || "user";
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  // 🔹 Handle Signup (only allowed after OTP verified)
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!isOtpVerified) {
      setErrorMsg("Please verify your phone number first.");
      return;
    }

    try {
      const beSniperFormRef = doc(db, "be-sniper-forms", email.toLowerCase());
      const beSniperFormSnap = await getDoc(beSniperFormRef);
      if (beSniperFormSnap.exists()) {
        setErrorMsg("This email already used to fill the BeSniper form.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      const uniqueId = await generateUniqueId(role, email, fullName);

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);
      localStorage.setItem("userRole", role);

      await setDoc(doc(db, "users", email.toLowerCase()), {
        email: email.toLowerCase(),
        role: role || "unknown",
        fullName,
        uniqueId,
        phone,
      });

      if (role === "Be A Freelancer" || role === "beSniper") {
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

  // 🔹 Google Signup
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName || "GoogleUser";
      const userEmail = user.email.toLowerCase();

      const userRef = doc(db, "users", userEmail);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setErrorMsg("This email is already registered. Please login instead.");
        await auth.signOut();
        return;
      }

      const uniqueId =
        localStorage.getItem("uniqueId") ||
        (await generateUniqueId(role, userEmail, name));

      await setDoc(userRef, {
        email: userEmail,
        role: role || "unknown",
        fullName: name,
        uniqueId,
      });

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", name);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("userRole", role);

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

      <div className="signup-overlay" onClick={onClose}>
        <div className="signup-container" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={onClose}>
            ✕
          </button>

          <form className="signup-form" onSubmit={handleSignup} noValidate>
            <h2>
              Sign up to{" "}
              {role === "beSniper"
                ? "Be a Freelancer"
                : role === "HireFreelancer"
                ? "Hire a Freelancer"
                : "Get Started"}
            </h2>

            {errorMsg && <p className="error">{errorMsg}</p>}

            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label>Phone Number (with country code)</label>
            <div className="phone-otp-wrapper">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91XXXXXXXXXX"
              />
              <button type="button" onClick={sendOtp} disabled={otpSending}>
                {otpSending ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {confirmationResult && (
              <div className="otp-section">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="button" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </div>
            )}
            <div id="recaptcha-container"></div>
            {message && <p>{message}</p>}

            <button
              type="submit"
              className="submit-btn"
              disabled={!isOtpVerified}
              style={{ opacity: !isOtpVerified ? 0.5 : 1 }}
            >
              Create Account
            </button>

            <div className="or-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              onClick={loginWithGoogle}
              className="btn-google"
            >
              Sign up with Google
            </button>

            <div className="sign-login">
              <p>
                Have an account? <Link href="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
