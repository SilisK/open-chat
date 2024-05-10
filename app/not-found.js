import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center min-h-screen dark:text-white">
      <header className="grid place-items-center gap-8">
        <h1 className="text-3xl">404 | Not Found</h1>
        <Link href={"/"}>
          <button>Back to OpenChat</button>
        </Link>
      </header>
    </div>
  );
}
