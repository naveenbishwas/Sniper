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
        <span className="header__brand">HubHawks Live</span>
      </div>

      <div className="header__right">
        <Link href="/login" className="login-btn">
          Login
        </Link>
        <Link href="/signup?role=beSniper" className="header__signin">
          Be a Freelancer
        </Link>
        <Link href="/signup?role=HireFreelancer" className="header__join">
          Hire a Freelancer
        </Link>
      </div>
    </header>
  );
}
