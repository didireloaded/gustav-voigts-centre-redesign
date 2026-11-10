import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Photo } from "@/components/site/Photo";
import { PHOTOS } from "@/data/centre";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/discover")({
  head: () => meta("Discover — Gustav Voigts Centre", "Highlights of Gustav Voigts Centre: the main court, the Avani Hotel, Clicks, Torga Optical and the Wellness Centre.", "/discover"),
  component: Discover,
});

const items = [
  { t: "The main court", d: "The heart of the centre, connecting shops on Street Level.", img: PHOTOS.mainCourt3, slug: null },
  { t: "Avani Hotel", d: "Accommodation on the Upper Level, in the middle of the city.", img: PHOTOS.avani2, slug: "avani-hotel" },
  { t: "Clicks", d: "Health and beauty on Street Level.", img: PHOTOS.clicks, slug: "clicks" },
  { t: "Torga Optical", d: "Optometrist on the Lower Ground.", img: PHOTOS.torga, slug: "torga-optical" },
  { t: "Wellness Centre", d: "Beauty and health treatments on Street Level.", img: PHOTOS.wellness, slug: "wellness-centre" },
  { t: "Flowers", d: "Flower Love on Street Level.", img: PHOTOS.flowers, slug: "flower-love" },
];

function Discover() {
  return (
    <>
      <PageHero eyebrow="Discover" title="Highlights of the centre." intro="No current events or promotions have been published. This page will carry them once confirmed by centre management." />
      <section className="container-site grid gap-x-8 gap-y-16 py-20 md:grid-cols-2">
        {items.map((i, n) => (
          <article key={i.t} className={n % 2 ? "md:mt-24" : ""}>
            <Photo src={i.img} alt={i.t} className="aspect-[4/3] w-full" />
            <h2 className="wordmark mt-6 text-3xl">{i.t}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{i.d}</p>
            {i.slug ? <Link to="/stores/$slug" params={{ slug: i.slug }} className="mt-3 inline-block font-semibold link-underline">View details</Link>
              : <Link to="/visit" className="mt-3 inline-block font-semibold link-underline">Plan your visit</Link>}
          </article>
        ))}
      </section>
    </>
  );
}
