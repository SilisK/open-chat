"use client";

import { useParams, useRouter } from "next/navigation";
import profile_icon from "../../assets/icons/profile.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  auth,
  getAllPosts,
  getIdByUsername,
  getUser,
  logOut,
  verifyAuthByUsername,
} from "@/app/firebase/firebaseMethods";
import LoadingBlock from "@/app/components/loadingBlock";
import back_icon from "../../assets/icons/back.png";
import Link from "next/link";
import share_icon from "../../assets/icons/share.png";
import MessageModal from "@/app/components/messageModal";
import like_icon from "../../assets/icons/like.png";
import comment_icon from "../../assets/icons/comment.png";

function CreatePostElement({ isMyProfile }) {
  const [inputCount, setInputCount] = useState(0);
  if (isMyProfile) {
    return (
      <section className="flex flex-col items-center gap-4 p-8">
        <h2 className="text-xl font-semibold text-left w-full">Create</h2>
        <form
          className="w-11/12 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
          }}
        >
          <div className="flex gap-2">
            <textarea
              type="text"
              maxLength={280}
              placeholder="Say something"
              className="w-full p-2 rounded-xl resize-none bg-zinc-100 dark:text-black"
              required
              onChange={(e) => {
                setInputCount(e.target.value.length);
              }}
            ></textarea>
            <p className={`flex items-end text-xs ${inputCount < 1 ? "opacity-20" : ""}`}>
              {inputCount}/280
            </p>
          </div>
          <button>Post</button>
        </form>
      </section>
    );
  }
  return <></>;
}

export default function UserPageComponent() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState();
  const [joinDate, setJoinDate] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [isMyProfile, setIsMine] = useState();
  const [messageModal, setMessageModal] = useState();
  async function getUserData() {
    try {
      const tryUser = await getUser(params.user);
      const data = tryUser.data();
      setUser(data);

      const joinDateObject = new Date(data.created);
      const year = joinDateObject.getFullYear();
      setJoinDate(year);
    } catch (error) {
      router.push("/404");
      throw error;
    }
  }

  async function getUserPosts() {
    try {
      const postsToStore = [];
      const tryId = await getIdByUsername(params.user);
      const tryPosts = await getAllPosts();
      tryPosts.forEach((post) => {
        if (post.authorId == tryId) {
          postsToStore.push(post);
        }
      });
      setPosts(postsToStore);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  async function checkAuth() {
    const isMine = await verifyAuthByUsername(params.user);
    setIsMine(isMine);
  }

  useEffect(() => {
    getUserData();
    getUserPosts();
    checkAuth();
  }, []);
  return (
    <main className="select-none relative min-h-screen overflow-hidden md:border-x dark:text-white dark:border-zinc-500">
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <header className="grid place-items-center pt-16">
        <Link
          href={"/"}
          className="absolute top-10 left-10 text-4xl text-black dark:text-white"
        >
          <p>{"<"}</p>
        </Link>
        {isMyProfile ? (
          <p
            className="absolute top-10 right-10 cursor-pointer"
            onClick={async () => {
              try {
                await logOut();
                router.push("/login");
              } catch (error) {
                setMessageModal({
                  title: "Unable to log out",
                  message:
                    "Something went wrong when processing your request, please try again later.",
                  event: () => setMessageModal(),
                });
                throw error;
              }
            }}
          >
            Log Out
          </p>
        ) : null}
        <div className="w-full flex flex-col gap-4 items-center">
          <Image
            src={profile_icon}
            width={64}
            height={64}
            alt="default user icon"
            className="rounded-full p-1 bg-zinc-200"
          />
          <h1 className="text-xl">{params.user}</h1>
          <div className="flex justify-between p-8 w-full text-center">
            {parseInt(joinDate) ? <p>Joined {joinDate}</p> : null}
            <div
              className="flex items-center gap-1 cursor-pointer p-2 rounded-xl dark:bg-zinc-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location);
                setMessageModal({
                  title: "Link Copied",
                  message: `You can now share @${params.user}.`,
                  event: () => setMessageModal(),
                });
              }}
            >
              <Image src={share_icon} width={20} height={20} unoptimized />{" "}
              <p>Share</p>
            </div>
          </div>
        </div>
      </header>
      <section className="grid gap-4 p-8">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div>
          {loading ? (
            <LoadingBlock />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div className="grid gap-4 text-center md:p-8" key={post.id}>
                <b className="flex justify-end">💬 {post.comments.length}</b>
                <p className="bg-white p-4 rounded-3xl shadow dark:bg-zinc-500">
                  {post.text}
                </p>
                <Link href={`/posts/${post.id}`} className="grid">
                  <button>View Post</button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No posts yet.</p>
          )}
        </div>
      </section>
      <CreatePostElement isMyProfile={isMyProfile} />
    </main>
  );
}
