"use client";

import Comment from "./comment";
import { auth } from "../firebase/firebaseMethods";
import Link from "next/link";

export default function Post({ post, setMessageModal }) {
  return (
    <div className="grid bg-zinc-100 pb-16 text-sm">
      <header className="flex flex-col items-center justify-center pt-8">
        <b className="w-full px-8">
          Convo by <Link href={`/users/${post.author}`} className="font-normal">@{post.author}</Link>
        </b>
        <div className="w-11/12 flex gap-1 items-center justify-center py-8 rounded-3xl">
          <p className="bg-white p-4 rounded-3xl shadow">{post.text}</p>
        </div>
      </header>
      {/*  */}
      <section className="p-8 grid gap-4">
        <b>Comments</b>
        <div className="grid gap-4">
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
            className="bg-white"
            required
          />
          <button>Send</button>
        </form>
      </section>
    </div>
  );
}
