import terms from "../assets/terms";
import Logo from "../components/logo";

export default function Terms() {
  return (
    <main className="min-h-screen p-4 dark:text-white dark:border-zinc-500">
      <header className="grid grid-flow-col gap-4 place-items-center py-8 mb-4 dark:border-zinc-500">
        <div className="flex gap-1">
          <h1 className="text-3xl font-bold">
            {terms.termsOfService.title} <span className="font-normal">|</span>
          </h1>
          <Logo />
        </div>
      </header>
      <div className="grid gap-16 md:p-8">
        {terms.termsOfService.sections.map((section, i) => (
          <section className="grid gap-4" key={crypto.randomUUID()}>
            <h2 className="text-xl font-semibold">
              {i + 1}. {section.title}
            </h2>
            <p className="text-sm md:text-base">{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
