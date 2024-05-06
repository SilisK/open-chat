import Author from "./components/author";
import Post from "./components/post";

const posts = [
  {
    id: 1,
    author: "John Doe",
    text: "Just had an amazing day at the beach!",
    likes: 25,
    comments: [
      {
        id: 101,
        author: "Jane Smith",
        text: "Sounds awesome! Wish I could've been there.",
      },
      {
        id: 102,
        author: "Mike Johnson",
        text: "Me too!",
      },
    ],
  },
  {
    id: 2,
    author: "Alice Brown",
    text: "Finished reading a great book today!",
    likes: 36,
    comments: [
      {
        id: 201,
        author: "Bob Green",
        text: "What book was it?",
      },
      {
        id: 202,
        author: "Carol White",
        text: "I'm looking for recommendations!",
      },
    ],
  },
  {
    id: 3,
    author: "David Lee",
    text: "Just launched my new website. Check it out!",
    likes: 48,
    comments: [
      {
        id: 301,
        author: "Emily Black",
        text: "Looks great! I love the design.",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="grid min-h-screen">
      {posts.map((post) => (
        <Post post={post} key={crypto.randomUUID()} />
      ))}
      {/* Profile */}
      <div className="w-max fixed right-0 top-4 backdrop-blur bg-white/50 p-4 rounded-l-xl">
        <Author author={posts[0].author} IsSelf/>
      </div>
    </main>
  );
}
