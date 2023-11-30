import { WEB_SITE } from "config";
import FormStatusButton from "./FormStatusButton";
import { saveComment } from "@/lib/comments";
// gives us a way to reload page after data updates.
import { revalidatePath } from "next/cache";

export function CommentForm({ postSlug }: { postSlug: string }) {
  console.log("This is running on the browser");

  // When our form action fires, this function runs the createComments function. No more visiting our API!

  async function handleFormSubmit(formData: FormData) {
    "use server";
    console.log("submitting the form");
    const username = formData.get("username") as string;
    const comment = formData.get("comment") as string;

    await saveComment(username, comment, postSlug);
    revalidatePath(`$/blog/${postSlug}`);
  }

  return (
    <>
      <h3 className="text-2xl font-bold">Leave a comment:</h3>
      <form className={`grid gap-8`} action={handleFormSubmit}>
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
        <FormStatusButton />
      </form>
    </>
  );
}
