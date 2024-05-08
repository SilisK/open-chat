"use client";

import { useEffect, useState } from "react";
import Author from "./components/author";
import Post from "./components/post";
import { auth } from "./firebase/firebaseMethods";
import Link from "next/link";

const posts = [
  {
    id: 1,
    author: "johndoe",
    text: "Just had an amazing day at the beach!",
    likes: 25,
    comments: [
      {
        id: 101,
        author: "janesmith",
        text: "Sounds awesome! Wish I could've been there.",
      },
      {
        id: 102,
        author: "mikejohnson",
        text: "Me too!",
      },
    ],
  },
  {
    id: 2,
    author: "alicebrown",
    text: "Finished reading a great book today!",
    likes: 36,
    comments: [
      {
        id: 201,
        author: "bobgreen",
        text: "What book was it?",
      },
      {
        id: 202,
        author: "carolwhite",
        text: "I'm looking for recommendations!",
      },
    ],
  },
  {
    id: 3,
    author: "davidlee",
    text: "Just launched my new website. Check it out!",
    likes: 48,
    comments: [
      {
        id: 301,
        author: "emilyblack",
        text: "Looks great! I love the design.",
      },
    ],
  },
];

export default function HomePage() {
  const [user, setUser] = useState(null);

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
  return (
    <main className="grid min-h-screen">
      {posts.map((post) => (
        <Post post={post} key={crypto.randomUUID()} />
      ))}
      {/* Profile */}
      <div className="w-max fixed right-0 top-4 backdrop-blur bg-white/50 p-4 rounded-l-xl">
        {user ? (
          <Author author={posts[0].author} IsSelf />
        ) : (
          <p>
            Join the conversation — <Link href={"/login"}>Log In</Link>
          </p>
        )}
      </div>
    </main>
  );
}
