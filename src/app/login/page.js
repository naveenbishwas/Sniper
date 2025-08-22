// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { useAuth } from "@/context/AuthContext";
// import { useHasMounted } from "@/hooks/useHasMounted";
// import "./login.css";

// export default function LoginPage() {
//   const hasMounted = useHasMounted();
//   const router = useRouter();
//   const params = useSearchParams();
//   const redirectPath = params.get("redirect") || "/components/HireFreelancer";
//   const [showPassword, setShowPassword] = useState(false);

//   const { user, loading } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

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
//             id="password"
//             name="password"
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
//           Don’t have an account? <a href="/components/signup">Sign up</a>
//         </p>

//         <p className="forget-password-link">
//           <a href="/components/forgetPassword">Forget Password?</a>
//         </p>
//       </form>
//     </div>
//   );
// }
// app/components/login/page.js
import { Suspense } from "react";
import LoginClient from "./loginClient";

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<p>Loadings login...</p>}>
      <LoginClient />
    </Suspense>
  );
}
