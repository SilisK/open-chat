"use client";

import { useEffect, useState } from "react";
import Author from "./components/author";
import Post from "./components/post";
import {
  auth,
  getAllPosts,
  getAllUsers,
  logOut,
} from "./firebase/firebaseMethods";
import Link from "next/link";
import LoadingBlock from "./components/loadingBlock";
import MessageModal from "./components/messageModal";

export default function HomePage() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState();
  const [allPosts, setAllPosts] = useState();
  const [messageModal, setMessageModal] = useState();

  async function getUsers() {
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async function getPosts() {
    try {
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
    setInitializing(true);
    getUsers();
    getPosts();
  }, []);
  return (
    <main className="grid border-x h-screen overflow-hidden">
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
      {/* Profile */}
      <div className="w-full grid place-items-center bg-white p-4">
        {user ? (
          <Author IsSelf />
        ) : (
          <p>
            Join the conversation — <Link href={"/login"}>Log In</Link>
          </p>
        )}
      </div>
    </main>
  );
}
