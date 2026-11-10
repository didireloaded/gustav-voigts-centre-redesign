export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-border bg-neutral-surface">
      <div className="container-site grid gap-8 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <p className="eyebrow"><span className="mr-3 inline-block h-3 w-3 bg-yellow align-middle" aria-hidden />{eyebrow}</p>
          <h1 className="display-xl mt-6">{title}</h1>
        </div>
        {intro && <p className="self-end text-lg leading-relaxed text-muted-foreground md:col-span-4">{intro}</p>}
      </div>
    </section>
  );
}
