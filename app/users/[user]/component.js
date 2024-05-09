"use client";

import { useParams } from "next/navigation";
import profile_icon from "../../assets/icons/profile.png";
import Image from "next/image";

export default function UserPageComponent() {
  const params = useParams();
  return (
    <main className="border-x w-full h-screen overflow-hidden lg:fixed lg:left-1/2 lg:-translate-x-1/2">
      <header className="grid place-items-center py-16">
        <div className="flex flex-col gap-4 items-center">
          <Image
            src={profile_icon}
            width={64}
            height={64}
            alt="default user icon"
            className="rounded-full p-1 bg-zinc-200"
          />
          <h1 className="text-xl">{params.user}</h1>
        </div>
      </header>
      <section>
        
      </section>
    </main>
  );
}
