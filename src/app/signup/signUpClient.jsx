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
// import { generateUniqueId } from "@/lib/generateUniqueId"; // ✅ IMPORT
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

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!fullName || !email || !password) {
//       setErrorMsg("All fields are required.");
//       return;
//     }

//     try {
//       const userDocRef = doc(db, "users", email);
//       const userSnapshot = await getDoc(userDocRef);

//       if (userSnapshot.exists()) {
//         const existingRole = userSnapshot.data().role;
//         if (existingRole !== role) {
//           setErrorMsg(
//             `This email is already registered as a ${existingRole}. You can't register again as ${role}.`
//           );
//           return;
//         }
//       }

//       await createUserWithEmailAndPassword(auth, email, password);

//       const uniqueId = await generateUniqueId(fullName, email, role); // ✅ USE SHARED FUNCTION
//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("fullName", fullName);
//       localStorage.setItem("email", email);

//       await setDoc(userDocRef, {
//         email,
//         name: fullName,
//         role,
//         uniqueId,
//         createdAt: new Date().toISOString(),
//       });

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

//   const loginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, new GoogleAuthProvider());
//       const user = result.user;

//       const userDocRef = doc(db, "users", user.email);
//       const userSnapshot = await getDoc(userDocRef);

//       if (userSnapshot.exists()) {
//         const existingRole = userSnapshot.data().role;

//         if (existingRole !== role) {
//           setErrorMsg(
//             `This email is already registered as a ${existingRole}. You can't register again as ${role}.`
//           );
//           return;
//         }

//         localStorage.setItem("userRole", existingRole);
//         router.replace(
//           existingRole === "beSniper"
//             ? "/components/gigsPage"
//             : "/components/cardProfile"
//         );
//         return;
//       }

//       const uniqueId = await generateUniqueId(
//         user.displayName || "googleuser",
//         user.email,
//         role
//       ); // ✅

//       await setDoc(userDocRef, {
//         email: user.email,
//         name: user.displayName || "Google User",
//         role,
//         uniqueId,
//         createdAt: new Date().toISOString(),
//       });

//       localStorage.setItem("userRole", role);
//       localStorage.setItem("email", user.email);
//       localStorage.setItem("uniqueId", uniqueId);

//       router.replace(
//         role === "beSniper" ? "/components/gigsPage" : "/components/cardProfile"
//       );
//     } catch (err) {
//       setErrorMsg(err.message || "Google signup failed");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Signup</title>
//       </Head>

//       <div className="modal-overlay" onClick={onClose}></div>
//       <div className="signup-container">
//         <button className="close-modal" onClick={onClose}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="currentColor"
//             className="bi bi-x"
//             viewBox="0 0 16 16"
//           >
//             <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
//           </svg>
//         </button>

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
//               Have an account?
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

  // ✅ Unique ID generator
  const generateUniqueId = async (name, email) => {
    const cleanedName = name.toLowerCase().replace(/\s/g, "");
    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueId = `${cleanedName}${randomNum}`;

    const docRef = doc(db, "uniqueUserIds", uniqueId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return generateUniqueId(name, email);

    await setDoc(docRef, {
      uniqueId,
      createdAt: new Date().toISOString(),
      email,
      name,
    });

    return uniqueId;
  };

  // ✅ Email/Password Signup Handler
  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setErrorMsg("");

  //   if (!fullName || !email || !password) {
  //     setErrorMsg("All fields are required.");
  //     return;
  //   }

  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);

  //     const uniqueId = await generateUniqueId(fullName, email);
  //     localStorage.setItem("uniqueId", uniqueId);
  //     localStorage.setItem("fullName", fullName);
  //     localStorage.setItem("email", email);

  //     const userEmail = email.toLowerCase();
  //     await setDoc(doc(db, "users", userEmail), {
  //       email: userEmail,
  //       role: role || "unknown",
  //       fullName,
  //     });

  //     if (role === "beSniper") {
  //       localStorage.setItem("showBeSniperModal", "true");
  //     } else if (role === "HireFreelancer") {
  //       localStorage.setItem("showHireFreelancerModal", "true");
  //     }

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
      await createUserWithEmailAndPassword(auth, email, password);

      const uniqueId = await generateUniqueId(fullName, email);
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);

      // ✅ FIX: Save user data to Firestore
      const userEmail = email.toLowerCase();
      await setDoc(doc(db, "users", userEmail), {
        email: userEmail,
        role: role || "unknown",
        fullName,
      });

      // ✅ Store modal flags for redirection
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

  // ✅ Google Signup Handler
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
