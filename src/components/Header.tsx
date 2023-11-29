import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-red-500 py-8 text-white">
      <div className="container mx-auto  px-4  flex items-center justify-between">
        <h1 className="font-bold text-4xl">BLOG</h1>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
