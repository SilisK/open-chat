"use client";

import { useParams } from "next/navigation";
import profile_icon from "../../assets/icons/profile.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  auth,
  getAllPosts,
  getIdByUsername,
  getUser,
  verifyAuthByUsername,
} from "@/app/firebase/firebaseMethods";
import LoadingBlock from "@/app/components/loadingBlock";
import back_icon from "../../assets/icons/back.png";
import Link from "next/link";
import share_icon from "../../assets/icons/share.png";
import MessageModal from "@/app/components/messageModal";

function CreatePostElement({ isMyProfile }) {
  if (isMyProfile) {
    return (
      <section className="flex flex-col items-center gap-4 p-8 bg-zinc-100/50">
        <h2 className="text-xl font-semibold text-left w-full">Create</h2>
        <form className="w-11/12 grid gap-4">
          <input
            type="text"
            placeholder="Say something"
            className="bg-zinc-100"
            required
          />
          <button>Post</button>
        </form>
      </section>
    );
  }
  return <></>;
}

export default function UserPageComponent() {
  const params = useParams();
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
    <main className="select-none relative border-x min-h-screen overflow-hidden">
      {messageModal ? (
        <MessageModal
          title={messageModal.title}
          message={messageModal.message}
          event={messageModal.event}
        />
      ) : null}
      <header className="grid place-items-center pt-16">
        <Link href={"/"} className="absolute top-10 left-10">
          <Image src={back_icon} width={32} height={32} unoptimized />
        </Link>
        {isMyProfile ? (
          <p
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => {}}
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
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location);
                setMessageModal({
                  title: "Link Copied",
                  message: `You can now share @${params.user}.`,
                  event: () => setMessageModal(),
                });
              }}
            >
              <Image src={share_icon} width={24} height={24} unoptimized />{" "}
              <p>Share</p>
            </div>
          </div>
        </div>
      </header>
      <section className="grid gap-4 p-8 bg-zinc-100/50">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div>
          {loading ? (
            <LoadingBlock />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div className="p-8 grid gap-8 text-center" key={post.id}>
                <p>{post.text}</p>
                <button>View Post</button>
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
