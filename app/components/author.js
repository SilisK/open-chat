"use client";

import Image from "next/image";
import profile_icon from "../assets/icons/profile.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseMethods";

export default function Author({ author, IsSelf }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function endpoint() {
    if (user) {
      if (user.displayName) {
        return user.displayName;
      } else {
        return "setup";
      }
    }
  }

  return (
    <Link
      href={`/users/${IsSelf ? endpoint() : author}`}
      className="grid text-black place-items-center grid-flow-col gap-2 w-max cursor-pointer"
    >
      <Image
        src={profile_icon}
        width={32}
        height={32}
        alt="default user icon"
        className="rounded-full p-1 bg-zinc-200"
      />
      <div>{IsSelf ? "My Profile" : author}</div>
    </Link>
  );
}
