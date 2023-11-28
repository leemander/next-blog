import { getComments } from "@/lib/comments";

export default async function Comments({ postSlug }: { postSlug: string }) {
  const WEBSITE_URL = "http://localhost:3000";

  const comments = [];

  try {
    const commentsResult = await fetch(
      `${WEBSITE_URL}/api/comments/${postSlug}`,
      { next: { revalidate: 5 } }
    );
    const response = await commentsResult.json();
    console.log(response);
    comments.push(...response.comments.rows);
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="grid gap-4">
      <hr className="my-8" />
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h4>{comment.username} says...</h4>
          <p>{comment.content}</p>
        </div>
      ))}
      <h3>Leave a comment:</h3>
      <form
        action={`/api/comments/${postSlug}`}
        className={`grid`}
        method="POST"
      >
        <label htmlFor="username">
          Username:
          <input type="text" name="username" id="username" />
        </label>
        <label htmlFor="comment">
          Comment:
          <textarea name="comment" id="comment" cols={30} rows={10} />
        </label>
        <button type="submit">Post</button>
      </form>
    </section>
  );
}
