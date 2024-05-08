"use client";

import { auth, changeUsername } from "@/app/firebase/firebaseMethods";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserSetup() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="grid place-items-center min-h-screen">
      <form
        className="banner p-8 bg-white rounded grid md:border"
        onSubmit={async (e) => {
          e.preventDefault();
          if (username.length < 3) {
            return;
          }
          try {
            const func = await changeUsername(username);
            router.push("/");
          } catch (error) {
            console.log(error.message);
          }
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
          <button className="h-max">Submit</button>
        </div>
      </form>
    </div>
  );
}
