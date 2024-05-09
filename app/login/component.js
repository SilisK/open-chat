"use client";

import Link from "next/link";
import { useState } from "react";
import { auth, doesUsernameExist, signIn } from "../firebase/firebaseMethods";
import { useRouter } from "next/navigation";
import MessageModal from "../components/messageModal";
import LoadingBlock from "../components/loadingBlock";
import Logo from "../components/logo";

export default function Component() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageModal, setMessageModal] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <div className="select-none grid place-items-center min-h-screen">
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <form
        className="banner p-8 grid bg-white rounded-xl md:shadow-xl md:border"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
            await signIn(email, password);
            const isUsernameAlreadyInUse = await doesUsernameExist(
              auth.currentUser.displayName
            );
            if (isUsernameAlreadyInUse) router.push("/");
            else router.push("/users/setup");
          } catch (error) {
            setMessageModal({
              title: "Log In Failed",
              message: "Make sure your email and password are correct.",
              event: () => setMessageModal(),
            });
            setLoading(false);
          }
        }}
      >
        <header className="text-center flex items-center justify-center gap-2 pointer-events-none">
          <h2 className="text-2xl font-semibold">Log in |</h2>
          <Logo />
        </header>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        {loading ? (
          <LoadingBlock />
        ) : (
          <>
            <section className="grid p-4">
              <button>Submit</button>
            </section>
            <section className="grid place-items-center grid-flow-col">
              <div className="flex gap-2">
                Don't have an account?
                <span>
                  <Link href={"signup"}>Sign Up</Link>
                </span>
              </div>
            </section>
          </>
        )}
      </form>
    </div>
  );
}
