"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { WEB_SITE } from "config";

/// ... imports here

export function CommentForm({ postSlug }: { postSlug: string }) {
  // the router hook to trigger a page refresh
  const router = useRouter();

  // the react useTransition hook to manage client/server data upodates
  // without refreshing the page. isPending gives us the ability to know
  // show a spinner or similar
  const [isPending, startTransition] = useTransition();

  // runs when onSubmit event fires, uses fetch to send a POST request to
  // our API comment route, and then refreshes the page data to show the comment
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("submiting the form");

    // prevent the form submitting and redircting us to the action location
    event.preventDefault();

    // get the form input values
    // @ts-ignore
    const username = event.target["username"].value;
    // @ts-ignore
    const comment = event.target["comment"].value;

    // create a FormData object and append our values to send to the API
    const formData = new FormData();
    formData.append("username", username);
    formData.append("comment", comment);

    // POST the FormData to the API
    const res = await fetch(`${WEB_SITE}/api/comments/${postSlug}`, {
      body: formData,
      method: "POST",
    });

    // Refresh the current route and fetch new data from the server without
    // losing client-side browser or React state.
    startTransition(() => {
      router.refresh();
      console.log("reloaded the page data");
    });

    // @ts-ignore
    event.target["username"].value = "";
    // @ts-ignore
    event.target["comment"].value = "";
  }

  // the handleFormSubmit fuction is passed to the onSubmit event handler on the form
  return (
    <>
      <h3 className="text-2xl font-bold">Leave a comment:</h3>
      <form className={`grid gap-8`} onSubmit={handleFormSubmit}>
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
          disabled={isPending}
        >
          {isPending ? "Sending comment..." : "Send comment"}
        </button>
      </form>
    </>
  );
}
