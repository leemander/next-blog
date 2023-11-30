import { getPosts } from "@/lib/posts";
import Link from "next/link";
import { bitter } from "./layout";
import Image from "next/image";
import { compareDesc } from "date-fns";

export default function Home() {
  const posts = getPosts();
  const sortedPosts = posts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  function renderPosts() {
    return sortedPosts.slice(0, 3).map((post) => (
      <li key={post.slug}>
        <Link href={`/blog/${post.slug}`}>
          <h3 className={`${bitter.className} text-3xl font-bold mb-2`}>
            {post.title}
          </h3>
        </Link>
        {post.img && (
          <Image
            className="square-img"
            src={post.img}
            alt={post.title}
            width={400}
            height={400}
          />
        )}
        <p>
          {post.body.raw.length < 400
            ? post.body.raw
            : `${post.body.raw.slice(0, 400).trim()}...`}
        </p>
      </li>
    ));
  }

  return (
    <main>
      <h2 className={`${bitter.className} text-3xl font-bold mb-8`}>
        Recent Posts
      </h2>
      <ul className="grid gap-8">{renderPosts()}</ul>
    </main>
  );
}
