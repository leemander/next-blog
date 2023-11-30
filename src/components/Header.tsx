import Link from "next/link";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header className="bg-green-800 text-yellow-300">
      <div
        className={"container mx-auto flex justify-between py-8 items-center"}
      >
        <h1 className={`text-5xl font-bold ${fraunces.className}`}>
          Pub Explorer
        </h1>
        <nav>
          <ul className="flex gap-4 font-semibold text-xl">
            <li>
              <Link className="header__link" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="header__link" href="/blog">
                Archive
              </Link>
            </li>
            <li>
              <Link className="header__link" href="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
