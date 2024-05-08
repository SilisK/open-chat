import Author from "./author";
import Comment from "./comment";

export default function Post({ post }) {
  return (
    <div className="grid gap-16 bg-zinc-100 border-b p-8">
      <header className="">
        <Author author={post.author} />
      </header>
      <p className="text-center">{post.text}</p>
      {/*  */}
      <section className="grid gap-4">
        <div className="grid gap-4">
          {post.comments.map((comment) => (
            <Comment comment={comment} key={crypto.randomUUID()} />
          ))}
        </div>
        <form className="grid gap-4">
          <input
            type="text"
            placeholder="Respond"
            className="bg-white"
            required
          />
          <button>Send</button>
        </form>
      </section>
    </div>
  );
}
