import { CommentForm } from "@/components/CommentForm";
import Comments from "@/components/Comments";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { bitter } from "@/app/layout";
import Image from "next/image";

type BlogPostParams = {
  params: {
    slug: string;
  };
};

// this builds all the params for ALL blog posts when the website is deployed
export function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export default function BlogPost({ params }: BlogPostParams) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="fade-in">
      <h2 className={`${bitter.className} text-3xl font-bold mb-4`}>
        {post.title}
      </h2>
      {post.img && (
        <Image
          className="rect-img mx-auto"
          src={post.img}
          alt={post.title}
          width={712}
          height={400}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: post.body.html }}
        className="prose dark:prose-invert grid gap-4"
      ></div>
      {/* @ts-ignore */}
      <Comments postSlug={params.slug} />
      <CommentForm postSlug={params.slug} />
    </main>
  );
}
