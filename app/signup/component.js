"use client";

import Link from "next/link";
import { useState } from "react";
import { auth, signUp } from "../firebase/firebaseMethods";
import MessageModal from "../components/messageModal";
import { useRouter } from "next/navigation";
import LoadingBlock from "../components/loadingBlock";
import Logo from "../components/logo";

export default function Component() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [messageModal, setMessageModal] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <main className="select-none grid place-items-center min-h-screen py-16">
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <form
        className="banner p-2 grid bg-white md:rounded-xl md:p-8 md:shadow-xl md:border dark:bg-zinc-900 dark:text-white"
        onSubmit={async (e) => {
          e.preventDefault();
          if (password != verifyPassword) {
            setMessageModal({
              title: "Verify Password",
              message: "Your passwords do not match, please try again.",
              event: () => setMessageModal(),
            });
            return;
          }
          setLoading(true);
          try {
            await signUp(email, password);
            if (auth.currentUser.displayName) router.push("/");
            else router.push("/users/setup");
          } catch (error) {
            let errorMessage;
            switch (error.message) {
              case "Firebase: Error (auth/email-already-in-use).":
                errorMessage = `${email} is already being used, please try a different email.`;
                break;
            }
            setMessageModal({
              title: "Account Creation Failed",
              message: errorMessage,
              event: () => setMessageModal(),
            });
            setLoading(false);
          }
        }}
      >
        <header className="flex justify-center items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold pointer-events-none">
            Sign up |{" "}
          </h2>
          <Logo size={"small"} />
        </header>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Email</label>
          <input
            className="dark:text-black"
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Password</label>
          <input
            className="dark:text-black"
            type="password"
            placeholder="Enter your password"
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Confirm Password</label>
          <input
            className="dark:text-black"
            type="password"
            placeholder="Re-type your password"
            required
            minLength={6}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </section>
        <section className="h-max p-4">
          <div className="flex items-center gap-1 justify-center">
            <input type="checkbox" required />
            <p className="text-center">
              I agree to the <Link href={"/terms"}>terms</Link> of OpenChat.
            </p>
          </div>
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
                Already have an account?
                <span>
                  <Link href={"login"}>Log In</Link>
                </span>
              </div>
            </section>
          </>
        )}
      </form>
    </main>
  );
}
