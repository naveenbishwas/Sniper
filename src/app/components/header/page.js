"use client";

import Image from "next/image";
import "./header.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export default function Header({ onSignupClick }) {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null); // <-- no TS type
  const [uniqueId, setUniqueId] = useState(null);
  const [open, setOpen] = useState(false);
  const popRef = useRef(null); // <-- no generic

  // ---- Read basics from localStorage
  useEffect(() => {
    const fullName = localStorage.getItem("fullName") || "";
    const email = localStorage.getItem("email") || "";
    const role = localStorage.getItem("role") || "";
    const id = localStorage.getItem("uniqueId");

    if (fullName || email || role) {
      setUser({ name: fullName, email, role });
    }
    if (id) setUniqueId(id);
  }, []);

  // ---- Fallback: if we have email but not uniqueId, look it up by email
  useEffect(() => {
    const fetchIdByEmail = async () => {
      if (!user?.email || uniqueId) return;

      const q = query(
        collection(db, "uniqueUserIds"),
        where("email", "==", user.email),
        limit(1)
      );

      const snap = await getDocs(q);
      if (!snap.empty) {
        const doc = snap.docs[0];
        const id = doc.data()?.uniqueId || doc.id;
        setUniqueId(id);
        localStorage.setItem("uniqueId", id);
      }
    };

    fetchIdByEmail().catch(() => {});
  }, [user?.email, uniqueId]);

  // ---- Hide/Show header on scroll
  useEffect(() => {
    let lastScrollY = 0;
    const controlHeader = () => {
      setShow(window.scrollY <= lastScrollY);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, []);

  // ---- Close popover on outside click/ESC
  useEffect(() => {
    const onDown = (e) => {
      if (open && popRef.current && !popRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const initial = (user?.name || "").trim().charAt(0).toUpperCase() || null;

  return (
    <header
      className="header"
      style={{ transform: show ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="header__left">
        <Link href="/">
          <Image
            src="/p.png"
            // src="/l.png"
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

        {initial ? (
          <div className="account-wrap">
            <button
              id="avatar"
              // className="user-avatar"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              title={user?.name || "Account"}
            >
              {initial}
            </button>

            {open && (
              <div className="account-popover" role="dialog" ref={popRef}>
                <div className="acc-header">
                  <div className="acc-initial">{initial}</div>
                  <div className="acc-meta">
                    <strong className="acc-name">{user?.name || "User"}</strong>
                    {user?.email && (
                      <div className="acc-email">{user.email}</div>
                    )}
                    {user?.role && <div className="acc-role">{user.role}</div>}
                  </div>
                </div>

                <div className="acc-row">
                  <span className="acc-label">Unique ID</span>
                  <code className="acc-id">{uniqueId || "Fetching…"}</code>
                </div>

                <div className="acc-row acc-actions">
                  <button
                    className="acc-copy"
                    onClick={() => {
                      if (!uniqueId) return;
                      navigator.clipboard.writeText(uniqueId);
                    }}
                  >
                    Copy ID
                  </button>
                  <Link href="/profile" className="acc-link">
                    My Profile
                  </Link>
                </div>

                <div className="acc-footer">
                  <button
                    id="signout"
                    className="acc-signout"
                    onClick={() => {
                      ["fullName", "email", "role", "uniqueId"].forEach((k) =>
                        localStorage.removeItem(k)
                      );
                      location.reload();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="login-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
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
