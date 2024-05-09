import { useEffect } from "react";

export default function MessageModal({ title, message, event }) {
  return (
    <div className="fixed grid place-items-center w-screen h-screen bg-black/50 text-white backdrop-blur z-10">
      <div className="grid place-items-center text-center bg-white text-black p-20 md:shadow-xl sm:rounded-xl">
        <div className="grid gap-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p>{message}</p>
          <button onClick={() => event()}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
