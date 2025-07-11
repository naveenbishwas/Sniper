// "use client";

// import { useState } from "react";
// import Head from "next/head";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { useAuth } from "@/context/AuthContext";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import "./signup.css"; // External CSS

// export default function Signup() {
//   const auth = getAuth();
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

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

//       console.log("User signed up:", userCredential.user);
//       setSuccessMsg("Account created successfully!");
//       // Redirect or further action
//       router.push("/components/HireFreelancer");
//     } catch (error) {
//       setErrorMsg(error.message || "Signup failed");
//     }
//   };

//   const loginWithGoogle = async () => {
//     setError("");
//     try {
//       await signInWithPopup(auth, new GoogleAuthProvider());
//       router.push(redirectPath);
//     } catch (err) {
//       setError(err.message || "Google login failed");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Signup Page</title>
//       </Head>
//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSignup}>
//           <h2>Create Account</h2>

//           {errorMsg && <p className="error">{errorMsg}</p>}
//           {successMsg && <p className="success">{successMsg}</p>}

//           <label htmlFor="name">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Your name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />

//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
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
//               name="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               className="toggle-password"
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
//             Login with Google
//           </button>

//           <p className="login-link">
//             Already have an account? <a href="/components/login">Login</a>
//           </p>
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
import "./signup.css"; // External CSS

export default function Signup() {
  const auth = getAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the role from query params: 'beSniper' or 'HireFreelancer'
  const role = searchParams.get("role");

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      setSuccessMsg("Account created successfully!");

      // Redirect based on role
      if (role === "beSniper") {
        router.push("/components/beSniper");
      } else if (role === "HireFreelancer") {
        router.push("/components/HireFreelancer");
      } else {
        router.push("/"); // fallback
      }
    } catch (error) {
      setErrorMsg(error.message || "Signup failed");
    }
  };

  const loginWithGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());

      // Redirect based on role after Google login
      if (role === "beSniper") {
        router.push("/components/beSniper");
      } else if (role === "HireFreelancer") {
        router.push("/components/HireFreelancer");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message || "Google login failed");
    }
  };

  return (
    <>
      <Head>
        <title>Signup Page</title>
      </Head>
      <div className="signup-container">
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
          {successMsg && <p className="success">{successMsg}</p>}

          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
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
            Login with Google
          </button>

          <p className="login-link">
            Already have an account? <a href="/components/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}
