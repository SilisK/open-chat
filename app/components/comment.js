import { timeAgo } from "../assets/helper";
import Author from "./author";

export default function Comment({ comment }) {
	return (
		<div className="grid gap-4 bg-white p-4 rounded-xl h-max dark:bg-zinc-500">
			<div className="flex justify-between w-full">
				<Author author={comment.author} />
				{comment.timestamp && <p>{timeAgo(comment.timestamp?.seconds)}</p>}
			</div>
			<p>{comment.text}</p>
		</div>
	);
}
