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
    <div>
      <h2 className={`${bitter.className} text-3xl font-bold mb-4`}>
        {post.title}
      </h2>
      {post.img && (
        <Image
          className="post__img"
          src={post.img}
          alt={post.title}
          width={400}
          height={400}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: post.body.html }}
        className="prose dark:prose-invert"
      ></div>
      {/* @ts-ignore */}
      <Comments postSlug={params.slug} />
      <CommentForm postSlug={params.slug} />
    </div>
  );
}
