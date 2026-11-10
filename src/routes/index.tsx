import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Clock, MapPin, ShoppingBasket, Landmark, BedDouble, Pill, Gem, Shirt } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { StoreTile } from "@/components/site/StoreTile";
import { FloorFinder } from "@/components/site/FloorFinder";
import { Hours } from "@/components/site/Hours";
import { PHOTOS, CENTRE } from "@/data/centre";
import { STORES } from "@/data/stores";
import { meta } from "@/lib/meta";
import { GeoIntro } from "@/components/site/GeoIntro";
import { ArchitecturalJourney } from "@/components/site/ArchitecturalJourney";
import { HeritageStory } from "@/components/site/HeritageStory";

export const Route = createFileRoute("/")({
  head: () => meta("Gustav Voigts Centre — Shopping in the heart of Windhoek", "A little of everything on Independence Avenue: 31 listed businesses across three levels, from groceries and fashion to banking and the Avani Hotel.", "/"),
  component: Home,
});

const featured = ["checkers-supermarket", "mr-price", "clicks", "avani-hotel", "standard-bank-namibia-limited", "pave-jewellers", "kalahari-pharmacy", "oupas-biltong-shop"];
const services = [
  { icon: ShoppingBasket, t: "Groceries", d: "Checkers Supermarket and Checkers Liquor Store on the Lower Ground.", q: "Food & Groceries" },
  { icon: Shirt, t: "Fashion", d: "Mr Price, Ackermans, Pepstores, Holtz and independent boutiques.", q: "Fashion & Accessories" },
  { icon: Pill, t: "Health & beauty", d: "Clicks, Kalahari Pharmacy, Torga Optical and wellness services.", q: "Beauty & Health" },
  { icon: Landmark, t: "Banking & exchange", d: "Standard Bank and Nova Cambios Bureau de Change.", q: "Financial" },
  { icon: Gem, t: "Jewellers & crafts", d: "Pave Jewellers, Patric Mavros and Blu-tique crafts & curios.", q: "Jewellers" },
  { icon: BedDouble, t: "Stay", d: "The Avani Hotel on the Upper Level.", q: "Accommodation" },
];

function Home() {
  return (
    <>
      <GeoIntro />
      <ArchitecturalJourney />

      <section id="welcome" className="container-site scroll-mt-28 grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <p className="eyebrow md:col-span-3">Welcome</p>
        <div className="md:col-span-9">
          <h2 className="gvc-scroll-intro display-lg max-w-4xl">Namibia's first mall, still at the centre of the capital.</h2>
          <div className="gvc-reveal-into-view mt-10 grid gap-8 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
            <p>Gustav Voigts Centre began as the country's very first mall and today rises over three levels on Independence Avenue.</p>
            <p>Groceries, fashion, a pharmacy, banking, jewellers, a bookshop and the Avani Hotel — {STORES.length} businesses currently listed in the directory.</p>
          </div>
          <dl className="gvc-reveal-into-view mt-12 grid grid-cols-2 border-t-4 border-ink pt-6 sm:max-w-md">
            <div><dt className="text-sm font-semibold text-muted-foreground">Levels</dt><dd className="display-lg">3</dd></div>
            <div><dt className="text-sm font-semibold text-muted-foreground">Listed businesses</dt><dd className="display-lg">{STORES.length}</dd></div>
          </dl>
        </div>
      </section>

      <HeritageStory />

      <section className="bg-ink py-24 text-ink-foreground">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6"><h2 className="gvc-scroll-intro display-lg">Plan your visit</h2><Link to="/visit" className="font-semibold link-underline">All visitor information</Link></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[{ i: MapPin, t: "Getting here", d: CENTRE.address, img: PHOTOS.entrance, to: "/visit" as const },
              { i: Car, t: "Parking", d: "Parking entrance on Independence Avenue.", img: PHOTOS.entrance2, to: "/visit" as const },
              { i: Clock, t: "Trading hours", d: "Mon–Fri 08:30–17:30 · Sat 08:30–13:00 · Sun 09:00–13:00", img: PHOTOS.mainCourt2, to: "/visit" as const }].map((c) => (
              <Link key={c.t} to={c.to} className="group block gvc-reveal-into-view">
                <div className="gvc-reveal-media aspect-[4/3] overflow-hidden"><Photo src={c.img} alt={c.t} className="h-full w-full transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="mt-5 flex items-center gap-3"><c.i className="size-5 text-yellow" aria-hidden /><h3 className="wordmark text-2xl">{c.t}</h3></div>
                <p className="mt-2 text-ink-muted">{c.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-24">
        <div className="flex flex-wrap items-end justify-between gap-6"><h2 className="gvc-scroll-intro display-lg">In the centre</h2><Link to="/stores" search={{ q: "", floor: "", category: "" }} className="font-semibold link-underline">All {STORES.length} businesses</Link></div>
        <ul className="gvc-reveal-into-view mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => STORES.find((x) => x.slug === s)!).map((s) => <li key={s.slug}><StoreTile store={s} /></li>)}
        </ul>
      </section>

      <section className="bg-neutral-surface py-24">
        <div className="container-site">
          <p className="eyebrow">Floor finder</p>
          <h2 className="gvc-scroll-intro display-lg mb-12 mt-4">Three levels. Pick one.</h2>
          <FloorFinder />
        </div>
      </section>

      <section className="container-site py-24">
        <h2 className="gvc-scroll-intro display-lg max-w-3xl">Everyday errands, under one roof.</h2>
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.t} className="gvc-reveal-into-view border-t-4 border-ink pt-6">
              <s.icon className="size-7" aria-hidden />
              <h3 className="wordmark mt-4 text-2xl">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
              <Link to="/stores" search={{ q: "", floor: "", category: s.q }} className="mt-4 inline-block font-semibold link-underline">View stores</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-yellow text-accent-foreground">
        <div className="container-site grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <h2 className="gvc-reveal-into-view display-lg">See you on Independence Avenue.</h2>
          <div><Hours /><a href={CENTRE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-ink px-6 py-4 font-bold text-ink-foreground">Get directions <ArrowRight className="size-5" aria-hidden /></a></div>
        </div>
      </section>
    </>
  );
}
