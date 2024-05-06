import Author from "./author";

export default function Comment({ comment }) {
  return (
    <div className="grid gap-4 bg-white p-4 rounded-3xl">
      <Author author={comment.author} />
      <p className="">{comment.text}</p>
    </div>
  );
}
