// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { useAuth } from "@/context/AuthContext";
// import { useHasMounted } from "@/hooks/useHasMounted";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// import "./login.css";

// export default function LoginClient() {
//   const hasMounted = useHasMounted();
//   const router = useRouter();
//   const params = useSearchParams();
//   const redirectPath = params.get("redirect") || "/components/gigsPage";
//   const [showPassword, setShowPassword] = useState(false);

//   const { user, loading } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (hasMounted && !loading && user) {
//       router.replace(redirectPath);
//     }
//   }, [hasMounted, user, loading, router, redirectPath]);

//   const loginWithEmail = async () => {
//     setError("");
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push(redirectPath);
//     } catch (err) {
//       if (err.code === "auth/user-not-found") {
//         setError("User not found. Please sign up first.");
//       } else if (err.code === "auth/wrong-password") {
//         setError("Incorrect password.");
//       } else {
//         setError(err.message || "Login failed");
//       }
//     }
//   };

//   const loginWithGoogle = async () => {
//     setError("");
//     try {
//       await signInWithPopup(auth, new GoogleAuthProvider());
//       router.push(redirectPath);
//       router.push("/components/PostLoginRedirect");
//     } catch (err) {
//       setError(err.message || "Google login failed");
//     }
//   };

//   if (!hasMounted) return null;

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//         <h2>Login</h2>
//         {error && <p className="error-msg">⚠️ {error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <div className="password-wrapper">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         <button type="button" onClick={loginWithEmail} className="btn-black">
//           Login with Email
//         </button>

//         <button type="button" onClick={loginWithGoogle} className="btn-google">
//           Login with Google
//         </button>

//         <p className="signup-link">
//           Dont have an account? <a href="/components/signup">Sign up</a>
//         </p>
//         <p className="forget-password-link">
//           <a href="/components/forgetPassword">Forget Password?</a>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { useHasMounted } from "@/hooks/useHasMounted";

import "./login.css";

export default function LoginClient() {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const params = useSearchParams();

  // Optional: get role from query params and store it
  const role = params.get("role");
  if (role) {
    localStorage.setItem("userRole", role); // beSniper or HireFreelancer
  }

  const [showPassword, setShowPassword] = useState(false);
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasMounted && !loading && user) {
      router.replace("/components/PostLoginRedirect"); // Redirect if already logged in
    }
  }, [hasMounted, user, loading, router]);

  const loginWithEmail = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/components/PostLoginRedirect");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("⚠️ User not found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setError("⚠️ Incorrect password.");
      } else {
        setError(err.message || "⚠️ Login failed.");
      }
    }
  };

  const loginWithGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/components/PostLoginRedirect");
    } catch (err) {
      setError(err.message || "⚠️ Google login failed.");
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
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

        <button type="button" onClick={loginWithEmail} className="btn-black">
          Login with Email
        </button>

        <button type="button" onClick={loginWithGoogle} className="btn-google">
          Login with Google
        </button>

        <p className="signup-link">
          Don’t have an account? <a href="/components/signup">Sign up</a>
        </p>
        <p className="forget-password-link">
          <a href="/components/forgetPassword">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}
