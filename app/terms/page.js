import terms from "../assets/terms";
import Logo from "../components/logo";

export default function Terms() {
  return (
    <main className="min-h-screen p-4 md:border-x dark:text-white">
      <header className="grid grid-flow-col gap-4 place-items-center py-8 border-b mb-4">
        <div className="flex gap-1">
          <h1 className="text-xl font-semibold">
            {terms.termsOfService.title} |
          </h1>
          <Logo />
        </div>
      </header>
      <div className="grid gap-8 p-8">
        {terms.termsOfService.sections.map((section, i) => (
          <section className="grid gap-2" key={crypto.randomUUID()}>
            <h2 className="text-xl">
              {i + 1}. {section.title}
            </h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
