import { useEffect } from "react";

export default function MessageModal({ title, message, event }) {
  return (
    <div className="fixed grid place-items-center w-screen h-screen bg-black/50 text-white backdrop-blur z-10">
      <div className="grid place-items-center text-center gap-8 bg-zinc-400 p-8 sm:rounded">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p>{message}</p>
        <button onClick={() => event()}>Confirm</button>
      </div>
    </div>
  );
}
