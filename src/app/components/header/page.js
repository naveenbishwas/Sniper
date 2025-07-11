import Link from "next/link";
import "./header.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <Image
          src={"./logo1.jpeg"}
          className="header__logo"
          width={55}
          height={55}
          unoptimized
          alt="logo"
        ></Image>
        <span className="header__brand">BookSnipers</span>
      </div>

      <div className="header__right">
        <Link
          href="/components/signup?role=beSniper"
          className="header__signin"
        >
          Hire a Freelancer
        </Link>
        <Link
          href="/components/signup?role=HireFreelancer"
          className="header__join"
        >
          Be a Freelancer
        </Link>
      </div>
    </header>
  );
}
