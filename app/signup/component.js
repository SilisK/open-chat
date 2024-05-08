"use client";

import Link from "next/link";
import { useState } from "react";
import { auth, signUp } from "../firebase/firebaseMethods";
import MessageModal from "../components/messageModal";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [messageModal, setMessageModal] = useState();
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
        className="banner p-8 grid bg-white rounded-xl md:border"
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
          try {
            const func = await signUp(email, password);
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
          }
        }}
      >
        <header className="text-center">
          <h2 className="text-2xl font-semibold">Sign up for OpenChat.</h2>
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
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-type your password"
            required
            minLength={6}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </section>
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
      </form>
    </div>
  );
}
