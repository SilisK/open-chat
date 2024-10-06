"use client";

import LoadingBlock from "@/app/components/loadingBlock";
import MessageModal from "@/app/components/messageModal";
import Navbar from "@/app/components/navbar";
import Post from "@/app/components/post";
import { auth, getPost } from "@/app/firebase/firebaseMethods";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostComponent({ post, postId }) {
	const [messageModal, setMessageModal] = useState();
	return (
		<div>
			{messageModal ? (
				<MessageModal
					title={messageModal.title}
					message={messageModal.message}
					event={messageModal.event}
				/>
			) : null}
			<Post
				post={{ ...post, id: postId }}
				IsPage
				setMessageModal={setMessageModal}
			/>
			<Navbar user={auth.currentUser} />
		</div>
	);
}

export default function Component() {
	const router = useRouter();
	const params = useParams();
	const [post, setPost] = useState();
	const [loading, setLoading] = useState(true);
	async function findPost() {
		try {
			const tryPost = await getPost(params.post);
			setPost(tryPost);
			if(!tryPost) {
        router.push("/404");
      }
      else {
        setLoading(false);
      }
		} catch (error) {
			router.push("/404");
			throw error;
		}
	}
	useEffect(() => {
		findPost();
	}, []);
	return (
		<main className="relative grid min-h-screen overflow-hidden select-none dark:border-zinc-500 dark:text-white">
			{loading ? (
				<LoadingBlock />
			) : (
				<PostComponent post={post} postId={params.post} />
			)}
		</main>
	);
}
