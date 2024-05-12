"use client";
import { useRouter } from "next/navigation";
import Logo from "./components/logo";

export async function generateMetadata({ params }) {
  return {
    title: "Not Found",
    description: "OpenChat | Join the conversation.",
  };
}
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="grid place-items-center min-h-screen dark:text-white">
      <header className="grid place-items-center gap-8">
        <Logo />
        <h1 className="text-3xl">404 | Not Found</h1>
        <button
        className="px-8"
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </button>
      </header>
    </div>
  );
}
