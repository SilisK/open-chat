"use client";

import Comment from "./comment";
import { auth, doesUserHaveUsername } from "../firebase/firebaseMethods";
import Link from "next/link";
import Logo from "./logo";
import { useEffect, useState } from "react";

export default function Post({ post, setMessageModal, IsPage }) {
  const [latestCommentsFirst, setLatestComments] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  useEffect(() => {
    const arr = [...post.comments];
    arr.reverse();
    setLatestComments(arr);
  }, []);
  return (
    <div
      className={`grid bg-zinc-100 pb-16 text-sm ${
        IsPage ? "h-full" : ""
      } dark:bg-zinc-800 dark:text-white`}
    >
      {IsPage ? (
        <div className="grid place-items-center">
          <Logo />
        </div>
      ) : null}
      <header className="flex flex-col items-center justify-center pt-8">
        <b className={`${IsPage ? "" : "w-full px-8"}`}>
          Convo by{" "}
          <Link
            href={`/users/${post.author}`}
            className="font-normal dark:text-sky-300"
          >
            @{post.author}
          </Link>
        </b>
        <div className="w-11/12 flex gap-1 items-center justify-center py-8 rounded-3xl">
          <p className="bg-white p-4 rounded-3xl shadow dark:bg-zinc-500">
            {post.text}
          </p>
        </div>
      </header>
      {/*  */}
      <section className={`p-8 grid gap-4 ${IsPage ? "h-max" : ""}`}>
        <b>Comments ({post.comments.length})</b>
        <div className="comments-list grid gap-3">
          {post.comments.length > 0 ? (
            <>
              {post.comments.length > 1 ? (
                <p className="text-right px-4">Latest</p>
              ) : null}
              {latestCommentsFirst.map((comment) => (
                <Comment comment={comment} key={crypto.randomUUID()} />
              ))}
              {post.comments.length > 1 ? (
                <p className="text-right px-4">Oldest</p>
              ) : null}
            </>
          ) : (
            <div className="text-sm text-center text-zinc-400">
              No comments yet.
            </div>
          )}
        </div>
        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (auth.currentUser == null) {
              setMessageModal({
                title: "Unable to comment",
                message: "You must be logged in to post comments.",
                event: () => setMessageModal(),
              });
              return;
            }

            const hasUsername = await doesUserHaveUsername(
              auth.currentUser.uid
            );
            if (!hasUsername) {
              setMessageModal({
                title: "Unable to comment",
                message: "You must choose a username to post comments.",
                event: () => setMessageModal(),
              });
              return;
            }
          }}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              maxLength={280}
              placeholder="Respond"
              className="w-full bg-white dark:bg-neutral-300/10"
              required
              onChange={(e) => {
                setInputCount(e.target.value.length);
              }}
            />
            <p className={`text-xs ${inputCount < 1 ? "opacity-20" : ""}`}>
              {inputCount}/280
            </p>
          </div>
          <button>Send</button>
        </form>
      </section>
    </div>
  );
}
