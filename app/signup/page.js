import Link from "next/link";

export default function Signup() {
  return (
    <div className="grid place-items-center min-h-screen">
      <form className="banner p-8 grid bg-white rounded-xl md:border">
        <header className="text-center">
          <h2 className="text-2xl font-semibold">Sign up for OpenChat.</h2>
        </header>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Email</label>
          <input type="email" placeholder="Enter your email" required />
        </section>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Password</label>
          <input type="password" placeholder="Enter your password" required />
        </section>
        <section className="grid h-max gap-4 p-4">
          <label className="px-4">Confirm Password</label>
          <input type="password" placeholder="Re-type your password" required />
        </section>
        <section className="grid p-4">
          <button>Submit</button>
        </section>
        <section className="grid place-items-center grid-flow-col">
          <div className="flex gap-2">
            Already have an account?
            <span>
              <Link href={"login"}>Login</Link>
            </span>
          </div>
        </section>
      </form>
    </div>
  );
}
