"use client";

import Author from "./author";
import Comment from "./comment";
import { auth } from "../firebase/firebaseMethods";

export default function Post({ post, setMessageModal }) {
  return (
    <div className="grid gap-16 bg-zinc-100 border-b p-8 pb-20">
      <header className="">
        <Author author={post.author} />
      </header>
      <p className="text-center">{post.text}</p>
      {/*  */}
      <section className="grid gap-4">
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
                message: "You be must logged in to post comments.",
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
