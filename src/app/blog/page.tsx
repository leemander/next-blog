import { getPosts } from "@/lib/posts";
import Link from "next/link";
import { bitter } from "../layout";

export default function Page() {
  const posts = getPosts();
  return (
    <main>
      <h2 className={`${bitter.className} text-3xl font-bold mb-4`}>
        All Posts
      </h2>
      <ul className="grid gap-2">
        {posts.map((post) => {
          return (
            <li key={post.slug} className="text-red-500">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
