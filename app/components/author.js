import Image from "next/image";
import profile_icon from "../assets/icons/profile.png";
import Link from "next/link";

export default function Author({ author, IsSelf }) {
  return (
    <Link
      href={IsSelf ? "login" : ""}
      className="grid place-items-center grid-flow-col gap-2 w-max cursor-pointer"
    >
      <Image
        src={profile_icon}
        width={32}
        height={32}
        className="rounded-full p-1 bg-zinc-200"
      />
      <h2 className="text-xl flex gap-1">
        {IsSelf ? <p>Chatting as </p> : null}
        {author}
      </h2>
    </Link>
  );
}
