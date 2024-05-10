import Author from "./author";

export default function Comment({ comment }) {
  return (
    <div className="grid gap-4 bg-white p-4 rounded-3xl h-max dark:bg-zinc-500">
      <Author author={comment.author} />
      <p>{comment.text}</p>
    </div>
  );
}
