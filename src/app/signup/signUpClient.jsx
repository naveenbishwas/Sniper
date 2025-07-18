// "use client";

// import { useState, useEffect } from "react";
// import Head from "next/head";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { useRouter, useSearchParams } from "next/navigation";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // Make sure this is correct path
// import "./signup.css";
// import Link from "next/link";

// export default function Signup() {
//   const auth = getAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const rawRole = searchParams.get("role");
//   const role = rawRole || localStorage.getItem("userRole") || null;

//   useEffect(() => {
//     if (!role) {
//       router.push("/");
//     } else {
//       localStorage.setItem("userRole", role);
//     }
//   }, [role]);

//   const [showPassword, setShowPassword] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // ✅ Unique ID function
//   const generateUniqueId = async (name) => {
//     const cleanedName = name.toLowerCase().replace(/\s/g, "");
//     const randomNum = Math.floor(100 + Math.random() * 900);
//     const uniqueId = `${cleanedName}${randomNum}`;

//     const docRef = doc(db, "uniqueUserIds", uniqueId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return generateUniqueId(name); // retry if already exists
//     }

//     await setDoc(docRef, {
//       uniqueId,
//       createdAt: new Date().toISOString(),
//       email,
//       name,
//     });

//     return uniqueId;
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!fullName || !email || !password) {
//       setErrorMsg("All fields are required.");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // ✅ Generate & Save Unique ID
//       const uniqueId = await generateUniqueId(fullName);
//       localStorage.setItem("uniqueId", uniqueId);
//       console.log(uniqueId);

//       // ✅ Save other form values (optional)
//       localStorage.setItem("fullName", fullName);
//       localStorage.setItem("email", email);

//       // ✅ Redirect to respective form
//       if (role === "beSniper") {
//         router.push("/components/beSniper");
//       } else if (role === "HireFreelancer") {
//         router.push("/components/HireFreelancer");
//       } else {
//         router.push("/");
//       }
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         setErrorMsg("This email is already registered. Please login.");
//       } else {
//         setErrorMsg(error.message || "Signup failed");
//       }
//     }
//   };

//   const loginWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, new GoogleAuthProvider());

//       // Optionally generate unique ID for Google users as well
//       const uniqueId = await generateUniqueId(fullName || "googleuser");
//       console.log(uniqueId);
//       localStorage.setItem("uniqueId", uniqueId);

//       if (role === "beSniper") {
//         router.push("/components/beSniper");
//       } else if (role === "HireFreelancer") {
//         router.push("/components/HireFreelancer");
//       } else {
//         router.push("/");
//       }
//     } catch (err) {
//       setErrorMsg(err.message || "Google login failed");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Signup Page</title>
//       </Head>
//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSignup}>
//           <h2>
//             Sign up to{" "}
//             {role === "beSniper"
//               ? "Hire a Freelancer"
//               : role === "HireFreelancer"
//               ? "Be a Freelancer"
//               : "Get Started"}
//           </h2>

//           {errorMsg && <p className="error">{errorMsg}</p>}

//           <label htmlFor="name">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Your name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />

//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               id="show"
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           <button type="submit" className="submit-btn">
//             Sign Up
//           </button>
//           <button
//             type="button"
//             onClick={loginWithGoogle}
//             className="btn-google"
//           >
//             Signup with Google
//           </button>

//           <div className="sign-login">
//             <p>
//               Dont have account
//               <span>
//                 <Link href="/login">Login</Link>
//               </span>
//             </p>
//           </div>
//         </form>
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
import { db } from "@/lib/firebase"; // ✅ adjust if your path differs
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

  const generateUniqueId = async (name) => {
    const cleanedName = name.toLowerCase().replace(/\s/g, "");
    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueId = `${cleanedName}${randomNum}`;

    const docRef = doc(db, "uniqueUserIds", uniqueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return generateUniqueId(name);

    await setDoc(docRef, {
      uniqueId,
      createdAt: new Date().toISOString(),
      email,
      name,
    });

    return uniqueId;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const uniqueId = await generateUniqueId(fullName);
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);

      // ✅ Store flow state and redirect
      if (role === "beSniper") {
        localStorage.setItem("showBeSniperModal", "true");
      } else if (role === "HireFreelancer") {
        localStorage.setItem("showHireFreelancerModal", "true");
      }

      window.location.href = "/"; // ✅ redirect to homepage
    } catch (error) {
      setErrorMsg(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login."
          : error.message || "Signup failed"
      );
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      const uniqueId = await generateUniqueId(fullName || "googleuser");
      localStorage.setItem("uniqueId", uniqueId);

      if (role === "beSniper") {
        localStorage.setItem("showBeSniperModal", "true");
      } else if (role === "HireFreelancer") {
        localStorage.setItem("showHireFreelancerModal", "true");
      }
      window.location.href = "/";
    } catch (err) {
      setErrorMsg(err.message || "Google login failed");
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <div className="modal-overlay" onClick={onClose}></div>
      <div className="signup-container">
        <button className="close-modal" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>

        <form className="signup-form" onSubmit={handleSignup}>
          <h2>
            Sign up to{" "}
            {role === "beSniper"
              ? "Hire a Freelancer"
              : role === "HireFreelancer"
              ? "Be a Freelancer"
              : "Get Started"}
          </h2>

          {errorMsg && <p className="error">{errorMsg}</p>}

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            />
            <button
              id="show"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <button
            type="button"
            onClick={loginWithGoogle}
            className="btn-google"
          >
            Signup with Google
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
    </>
  );
}
