"use client";

import Link from "next/link";
import Author from "./author";

export default function Navbar({ user }) {
  return (
    <nav className="bg-zinc-300 text-sm bg-white fixed w-full bottom-0 left-1/2 -translate-x-1/2 grid bg-white p-4 dark:bg-zinc-900 dark:text-white">
      {user ? (
        <div className="grid grid-flow-col justify-evenly place-items-center">
          <Author IsSelf />
        </div>
      ) : (
        <p className="text-center">
          Join the conversation — <Link href={"/login"}>Log In</Link>
        </p>
      )}
    </nav>
  );
}
