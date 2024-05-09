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
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <form
        className="banner p-8 bg-white rounded grid md:shadow-xl md:border"
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
        <header className="flex justify-center items-center gap-2 text-center pointer-events-none">
          <h2 className="text-2xl font-semibold">Pick a username | </h2>
          <Logo size={"small"} />
        </header>
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
          <div className="py-8">
            <b>Rules</b>
            <p className="text-sm">- Needs at least 3 characters</p>
            <p className="text-sm">- Contains only letters</p>
          </div>
          <p>This will be your unique OpenChat handle <b>(ex. @hiresiliskleemoff)</b></p>
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
