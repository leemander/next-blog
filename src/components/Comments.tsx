import { WEB_SITE } from "config";
import { Bitter } from "next/font/google";
const bitter = Bitter({ subsets: ["latin"] });

export default async function Comments({ postSlug }: { postSlug: string }) {
  const comments = [];

  try {
    const commentsResult = await fetch(`${WEB_SITE}/api/comments/${postSlug}`, {
      next: { revalidate: 0 },
    });
    const response = await commentsResult.json();
    comments.push(...response.comments.rows);
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="grid gap-4">
      <hr className="my-8 border-neutral-400" />
      <h3 className={"text-2xl font-bold " + bitter.className}>Comments</h3>
      {comments.length ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <h4 className="text-lg font-bold">{comment.username} says...</h4>
            <p>{comment.content}</p>
            <hr className="my-4 border-neutral-400" />
          </div>
        ))
      ) : (
        <p className="mb-4">No comments yet.</p>
      )}
    </section>
  );
}
