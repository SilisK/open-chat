"use client";

import { useEffect, useState } from "react";
import Author from "./author";
import Comment from "./comment";
import LoadingBlock from "./loadingBlock";
import { getAllComments } from "../firebase/firebaseMethods";

export default function Post({ post }) {
  const [initializing, setInitializing] = useState(true);
  const [allComments, setComments] = useState();
  async function getComments() {
    try {
      const comments = await getAllComments(post.id);
      setInitializing(false);
      setComments(comments);
      return comments;
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="grid gap-16 bg-zinc-100 border-b p-8 pb-20">
      <header className="">
        <Author author={post.author} />
      </header>
      <p className="text-center">{post.text}</p>
      {/*  */}
      <section className="grid gap-4">
        <div className="grid gap-4">
          {initializing ? (
            <LoadingBlock />
          ) : allComments ? (
            allComments.map((comment) => (
              <Comment comment={comment} key={crypto.randomUUID()} />
            ))
          ) : (
            <div className="text-sm text-center text-zinc-400">
              No comments yet.
            </div>
          )}
        </div>
        <form className="grid gap-4">
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
