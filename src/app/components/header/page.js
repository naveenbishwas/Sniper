import Link from "next/link";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <span className="header__icon-wrapper">
          <svg
            className="header__logo"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f4c200"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        </span>
        <span className="header__brand">BookSnipers</span>
      </div>

      <div className="header__right">
        <Link href="/signin" className="header__signin">
          Sign In
        </Link>
        <Link href="/join" className="header__join">
          Join
        </Link>
      </div>
    </header>
  );
}
