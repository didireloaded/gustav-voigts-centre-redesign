import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Photo } from "@/components/site/Photo";
import { PHOTOS } from "@/data/centre";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/about")({
  head: () => meta("About — Gustav Voigts Centre", "The story of Gustav Voigts Centre, Namibia's first mall, now a three-storey hub on Independence Avenue in Windhoek.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About the centre" title="Rooted in Namibian history." />
      <section className="container-site grid gap-12 py-20 md:grid-cols-12">
        <div className="gvc-reveal-into-view space-y-6 text-lg leading-relaxed md:col-span-6">
          <p className="text-2xl font-semibold leading-snug">The Gustav Voigts Centre is a landmark of Windhoek — it began as the country's very first mall and today stands as a three-storey hub in the heart of the capital.</p>
          <p className="text-muted-foreground">It is home to established local and international brands: boutiques and curio shops, banks, a pharmacy, a bookshop and fashion outlets.</p>
          <p className="text-muted-foreground">Checkers covers everyday grocery shopping, and the Avani Hotel offers accommodation for travellers and business visitors. A parking entrance on Independence Avenue makes the centre easy to reach.</p>
          <Link to="/stores" search={{ q: "", floor: "", category: "" }} className="inline-block bg-yellow px-6 py-4 font-bold">Explore the directory</Link>
        </div>
        <div className="grid gap-6 md:col-span-6"><Photo src={PHOTOS.mainCourt} alt="Main court" className="gvc-reveal-media aspect-[4/3] w-full" /><Photo src={PHOTOS.avani} alt="Avani Hotel at the centre" className="gvc-reveal-media aspect-[16/9] w-full md:ml-16 md:w-[calc(100%-4rem)]" /></div>
      </section>
    </>
  );
}
