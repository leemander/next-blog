"use client";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function FormStatusButton() {
  const { pending } = useFormStatus();
  //useFormStatus must be used within a form
  return (
    <button
      className="block w-fit px-6 py-4 font-semibold bg-red-500 text-white rounded"
      type="submit"
      disabled={pending}
    >
      {pending ? "Sending comment..." : "Send comment"}
    </button>
  );
}
