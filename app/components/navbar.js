"use client";

import Link from "next/link";
import Author from "./author";
import dark_icon from "../assets/icons/dark.png";
import light_icon from "../assets/icons/light.png";
import create_icon from "../assets/icons/create-post.png";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar({ user }) {
  // const [isDarkTheme, setIsDarkTheme] = useState();
  // useEffect(() => {
  //   if (
  //     localStorage.getItem("theme") === "dark" ||
  //     (!localStorage.getItem("theme") &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }

  //   if (localStorage.getItem("theme")) {
  //     setIsDarkTheme(localStorage.getItem("theme") == "dark");
  //   } else {
  //     setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
  //   }
  // }, []);
  return (
    <div className="bg-zinc-100 text-sm bg-white absolute w-full bottom-0 left-0 grid bg-white p-4 dark:bg-zinc-900 dark:text-white">
      {user ? (
        <div className="grid grid-flow-col justify-evenly place-items-center">
          {/* <Image
            src={create_icon}
            width={26}
            height={26}
            unoptimized
            className="cursor-pointer"
          /> */}
          <Author IsSelf />
          {/* <Image
            onClick={() => {
              localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
              setIsDarkTheme(!isDarkTheme);
            }}
            src={isDarkTheme ? dark_icon : light_icon}
            width={26}
            height={26}
            unoptimized
            className="cursor-pointer"
          /> */}
        </div>
      ) : (
        <p className="text-center">
          Join the conversation — <Link href={"/login"}>Log In</Link>
        </p>
      )}
    </div>
  );
}
