import { getComments } from "@/lib/comments";

export default async function Comments({ postSlug }: { postSlug: string }) {
  const WEBSITE_URL = "https://next-blog-leem.vercel.app/";

  const comments = [];

  try {
    const commentsResult = await fetch(
      `${WEBSITE_URL}/api/comments/${postSlug}`,
      { next: { revalidate: 5 } }
    );
    const response = await commentsResult.json();
    comments.push(...response.comments.rows);
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="grid gap-4">
      <hr className="my-8 border-neutral-400" />
      <h3 className="text-2xl font-bold">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h4 className="text-lg font-bold">{comment.username} says...</h4>
          <p>{comment.content}</p>
          <hr className="my-4 border-neutral-400" />
        </div>
      ))}
      <h3 className="text-2xl font-bold">Leave a comment:</h3>
      <form
        action={`/api/comments/${postSlug}`}
        className={`grid gap-8`}
        method="POST"
      >
        <label className="grid gap-2 font-semibold " htmlFor="username">
          Username:
          <input
            className=" border-neutral-400 border-solid border-2 p-2 font-normal"
            type="text"
            name="username"
            id="username"
          />
        </label>
        <label className="grid gap-2 font-semibold" htmlFor="comment">
          Comment:
          <textarea
            className=" border-neutral-400 border-solid border-2 mx-1 p-2 font-normal"
            name="comment"
            id="comment"
            cols={30}
            rows={10}
          />
        </label>
        <button
          className="block w-fit px-6 py-4 font-semibold bg-red-500 text-white rounded"
          type="submit"
        >
          Post
        </button>
      </form>
    </section>
  );
}
