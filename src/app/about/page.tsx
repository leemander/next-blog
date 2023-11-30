import { bitter } from "../layout";
import Image from "next/image";
export default function Page() {
  return (
    <main className="fade-in">
      <h2 className={`${bitter.className} text-3xl font-bold`}>About Me</h2>
      <Image
        className="rect-img mx-auto"
        src="/me.jpeg"
        alt="The author, Lee Mander"
        width={712}
        height={400}
      />
      <p className="my-4 w-1/2 mx-auto">
        Hello! My name is Lee and I made this blog to practice my new Next.js
        skills while celebrated my love of liquid bread. I hope you like it!
        Feel free to check out{" "}
        <a href="https://github.com/leemander">my Github profile</a> to see more
        of what I've been up to.
      </p>
    </main>
  );
}
