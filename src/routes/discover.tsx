import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Photo } from "@/components/site/Photo";
import { PHOTOS } from "@/data/centre";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/discover")({
  head: () => meta("Discover — Gustav Voigts Centre", "Photographs of the centre and published tenant images from Gustav Voigts Centre in Windhoek.", "/discover"),
  component: Discover,
});

const items = [
  { t: "The main court", d: "A view of the centre’s main court, from its published photo gallery.", img: PHOTOS.mainCourt3, slug: null },
  { t: "Avani Hotel", d: "Accommodation on the Upper Level, in the middle of the city.", img: PHOTOS.avani2, slug: "avani-hotel" },
  { t: "Clicks", d: "Health and beauty on Street Level.", img: PHOTOS.clicks, slug: "clicks" },
  { t: "Torga Optical", d: "Optometrist on the Lower Ground.", img: PHOTOS.torga, slug: "torga-optical" },
];

function Discover() {
  return (
    <>
      <PageHero eyebrow="Discover" title="Highlights of the centre." intro="Take a closer look at Gustav Voigts Centre and some of the businesses featured in its published photo gallery." />
      <section className="container-site grid gap-x-8 gap-y-16 py-20 md:grid-cols-2">
        {items.map((i, n) => (
          <article key={i.t} className={n % 2 ? "gvc-reveal-into-view md:mt-24" : "gvc-reveal-into-view"}>
            <Photo src={i.img} alt={i.t} className="gvc-reveal-media aspect-[4/3] w-full" />
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
