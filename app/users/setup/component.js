"use client";

import LoadingBlock from "@/app/components/loadingBlock";
import Logo from "@/app/components/logo";
import MessageModal from "@/app/components/messageModal";
import {
  auth,
  changeUsername,
  createNewUser,
  doesUsernameExist,
} from "@/app/firebase/firebaseMethods";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [messageModal, setMessageModal] = useState();
  const [loading, setLoading] = useState(false);
  const [inputCount, setInputCount] = useState(0);
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
    <div className="grid place-items-center min-h-screen select-none">
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <form
        className="banner p-8 bg-white rounded grid md:shadow-xl md:border dark:bg-zinc-900 dark:text-white"
        onSubmit={async (e) => {
          e.preventDefault();
          if (username.length < 3) {
            return;
          }
          setLoading(true);
          const isUsernameAlreadyInUse = await doesUsernameExist(username);
          if (isUsernameAlreadyInUse) {
            setMessageModal({
              title: "Username unavailable",
              message:
                "It looks like that username is already in use. Try using a different one.",
              event: () => setMessageModal(),
            });
            setLoading(false);
            return;
          }
          try {
            await changeUsername(username);
            await createNewUser({ username: username });
            router.push("/");
          } catch (error) {
            setLoading(false);
            throw error;
          }
        }}
      >
        <header className="flex justify-center items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold">Pick a username | </h2>
          <Logo size={"small"} />
        </header>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Display Name</label>
          <div className="flex items-center gap-4">
            <input
              className="w-full dark:text-black"
              type="text"
              placeholder="What should we call you?"
              required
              maxLength={30}
              onChange={(e) => {
                let val = e.target.value;
                val = val.replace(/[^a-zA-Z]/g, "");
                e.target.value = val.trim().toLowerCase();
                setInputCount(e.target.value.length);
                setUsername(e.target.value);
              }}
            />
            <p
              className={`${
                inputCount < 3 ? "text-zinc-500/50 dark:text-white/50" : "text-green-500"
              }`}
            >
              {inputCount}/30
            </p>
          </div>
        </section>
        {loading ? (
          <LoadingBlock />
        ) : (
          <div className="grid grid-flow-col gap-4 mx-4">
            <button className="h-max">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
}
