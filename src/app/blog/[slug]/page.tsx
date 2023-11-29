import Comments from "@/components/Comments";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

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
      <h2 className="font-bold text-2xl mb-4">{post.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: post.body.html }}
        className="prose dark:prose-invert"
      ></div>
      {/* @ts-ignore */}
      <Comments postSlug={params.slug} />
    </div>
  );
}
