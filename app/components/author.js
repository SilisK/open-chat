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
      className="grid text-black text-sm place-items-center grid-flow-col gap-2 w-max cursor-pointer dark:text-white"
    >
      <Image
        src={profile_icon}
        width={26}
        height={26}
        alt="default user icon"
        className="p-1 bg-white rounded-full bg-zinc-200"
      />
      {IsSelf ? null : <p>{author}</p>}
    </Link>
  );
}
