export default async function Comments({ postSlug }: { postSlug: string }) {
  return (
    <section>
      <h3>Comments</h3>
      <h4>Leave a comment:</h4>
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
