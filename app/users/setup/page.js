"use client";

import Link from "next/link";
import { useState } from "react";

export default function UserSetup() {
  const [username, setUsername] = useState("");
  return (
    <div className="grid place-items-center min-h-screen">
      <form className="banner p-8 bg-white rounded grid md:border">
        <h2 className="text-2xl font-semibold text-center">
          Choose a username.
        </h2>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Display Name</label>
          <input
            type="text"
            placeholder="What should we call you?"
            required
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
          />
        </section>
        <div className="grid grid-flow-col gap-4">
          <Link href={"/"} className="grid h-max">
            <button>Finish Later</button>
          </Link>
          <button className="h-max">Submit</button>
        </div>
      </form>
    </div>
  );
}
