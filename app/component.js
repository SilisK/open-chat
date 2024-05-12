"use client";

import { useEffect, useState } from "react";
import Post from "./components/post";
import { auth, getAllPosts } from "./firebase/firebaseMethods";
import LoadingBlock from "./components/loadingBlock";
import MessageModal from "./components/messageModal";
import Navbar from "./components/navbar";

export default function HomePage() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [allPosts, setAllPosts] = useState();
  const [messageModal, setMessageModal] = useState();

  async function getPosts() {
    try {
      setInitializing(true);
      const posts = await getAllPosts();
      setAllPosts(posts);
      setInitializing(false);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <main className="relative grid min-h-screen select-none dark:border-zinc-500">
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <div className="overflow-y-scroll">
        {initializing ? (
          <LoadingBlock />
        ) : allPosts ? (
          allPosts.map((post) => (
            <Post
              post={post}
              setMessageModal={setMessageModal}
              key={crypto.randomUUID()}
            />
          ))
        ) : (
          <div className="p-2 flex items-center h-full text-center">
            <div className="w-full flex flex-col gap-4 items-center">
              <p>No posts yet. Be the first.</p>
              <form className="w-11/12 grid gap-4">
                <input
                  type="text"
                  placeholder="Say something"
                  className="bg-zinc-100"
                  required
                />
                <button>Send</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Navbar user={user} />
    </main>
  );
}
