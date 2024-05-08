"use client";

import { useEffect, useState } from "react";
import Author from "./components/author";
import Post from "./components/post";
import { auth, getCollection } from "./firebase/firebaseMethods";
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
  {
    id: 2,
    author: "sarahbrown",
    text: "Enjoying a cozy evening with a good book and hot cocoa.",
    likes: 52,
    comments: [
      {
        id: 201,
        author: "davidgreen",
        text: "That sounds like the perfect way to unwind!",
      },
      {
        id: 202,
        author: "emilywhite",
        text: "I wish I could join you!",
      },
    ],
  },
  {
    id: 3,
    author: "alexturner",
    text: "Just finished an intense workout session 💪 Feeling pumped!",
    likes: 36,
    comments: [
      {
        id: 301,
        author: "nataliecole",
        text: "Way to go! Keep up the great work!",
      },
      {
        id: 302,
        author: "samjones",
        text: "You're an inspiration!",
      },
    ],
  },
  {
    id: 4,
    author: "laurasmith",
    text: "Exploring new hiking trails today. Nature is so rejuvenating!",
    likes: 48,
    comments: [
      {
        id: 401,
        author: "chrisbrown",
        text: "Which trail are you on? I'm looking for new ones to explore!",
      },
      {
        id: 402,
        author: "jessicathomas",
        text: "I love hiking! It's the best way to connect with nature.",
      },
    ],
  },
  {
    id: 5,
    author: "markwright",
    text: "Cooked a delicious homemade meal for dinner tonight. Bon appétit!",
    likes: 64,
    comments: [
      {
        id: 501,
        author: "rachelwilson",
        text: "What did you make? I'm always looking for new recipes.",
      },
      {
        id: 502,
        author: "andrewmartinez",
        text: "Looks amazing! Save me a plate next time 😉",
      },
    ],
  },
];

export default function HomePage() {
  const [user, setUser] = useState(null);

  async function getAllUsers() {
    try {
      const users = await getCollection("users");
      console.log(users);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async function getAllPosts() {
    try {
      const userIds = await getAllUsers();
      userIds.forEach((id) => {});
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
    getAllUsers();
  }, []);
  return (
    <main className="grid h-screen overflow-hidden lg:fixed lg:left-1/2 lg:-translate-x-1/2">
      <div className="overflow-y-scroll">
        {posts.map((post) => (
          <Post post={post} key={crypto.randomUUID()} />
        ))}
      </div>
      {/* Profile */}
      <div className="grid place-items-center bg-white border-x p-4">
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
