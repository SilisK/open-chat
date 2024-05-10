"use client";

import Comment from "./comment";
import { auth } from "../firebase/firebaseMethods";
import Link from "next/link";

export default function Post({ post, setMessageModal }) {
  return (
    <div className="grid bg-zinc-100 pb-16 text-sm dark:bg-zinc-800 dark:text-white">
      <header className="flex flex-col items-center justify-center pt-8">
        <b className="w-full px-8">
          Convo by{" "}
          <Link href={`/users/${post.author}`} className="font-normal dark:text-sky-300">
            @{post.author}
          </Link>
        </b>
        <div className="w-11/12 flex gap-1 items-center justify-center py-8 rounded-3xl">
          <p className="bg-white p-4 rounded-3xl shadow dark:bg-zinc-500">{post.text}</p>
        </div>
      </header>
      {/*  */}
      <section className="p-8 grid gap-4">
        <b>Comments ({post.comments.length})</b>
        <div className="comments-list grid gap-3">
          {post.comments ? (
            post.comments.map((comment) => (
              <Comment comment={comment} key={crypto.randomUUID()} />
            ))
          ) : (
            <div className="text-sm text-center text-zinc-400">
              No comments yet.
            </div>
          )}
        </div>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (auth.currentUser == null) {
              setMessageModal({
                title: "Unable to comment",
                message: "You must be logged in to post comments.",
                event: () => setMessageModal(),
              });
              return;
            }
          }}
        >
          <input
            type="text"
            placeholder="Respond"
            className="bg-white dark:bg-neutral-300/10"
            required
          />
          <button>Send</button>
        </form>
      </section>
    </div>
  );
}
