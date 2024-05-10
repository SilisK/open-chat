import Link from "next/link";
import Author from "./author";
import dark_icon from "../assets/icons/dark.png";
import light_icon from "../assets/icons/light.png";
import create_icon from "../assets/icons/create-post.png";
import Image from "next/image";

export default function Navbar({ user }) {
  return (
    <div className="bg-zinc-100 text-sm bg-white absolute w-full bottom-0 left-0 grid grid-flow-col justify-evenly place-items-center bg-white p-4">
      {user ? (
        <>
          <Image
            src={create_icon}
            width={26}
            height={26}
            unoptimized
            className="cursor-pointer"
          />
          <Author IsSelf />
          <Image
            src={dark_icon}
            width={26}
            height={26}
            unoptimized
            className="cursor-pointer"
          />
        </>
      ) : (
        <p>
          Join the conversation — <Link href={"/login"}>Log In</Link>
        </p>
      )}
    </div>
  );
}
