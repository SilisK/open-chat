"use client";

import { auth, changeUsername } from "@/app/firebase/firebaseMethods";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserSetup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  return (
    <div className="grid place-items-center min-h-screen">
      <form
        className="banner p-8 bg-white rounded grid md:border"
        onSubmit={async (e) => {
          e.preventDefault();
          await changeUsername(username);
          router.push("/");
          console.log(auth.currentUser.displayName);
        }}
      >
        <h2 className="text-2xl font-semibold text-center">
          Choose a username.
        </h2>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Display Name</label>
          <input
            type="text"
            placeholder="What should we call you?"
            required
            onChange={(e) => {
              let val = e.target.value;
              val = val.replace(/[^a-zA-Z]/g, "");
              e.target.value = val.trim().toLowerCase();
              setUsername(e.target.value);
            }}
          />
        </section>
        <div className="grid grid-flow-col gap-4 mx-4">
          <Link href={"/"} className="grid h-max">
            <button>Finish Later</button>
          </Link>
          <button className="h-max">Submit</button>
        </div>
      </form>
    </div>
  );
}
