import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Hours } from "@/components/site/Hours";
import { Photo } from "@/components/site/Photo";
import { FloorFinder } from "@/components/site/FloorFinder";
import { CENTRE, PHOTOS } from "@/data/centre";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/visit")({
  head: () => meta("Plan your visit — Gustav Voigts Centre", "Directions to Gustav Voigts Centre on Independence Avenue, Windhoek, parking entrance and general trading hours.", "/visit"),
  component: Visit,
});

function Visit() {
  return (
    <>
      <PageHero eyebrow="Plan your visit" title="On Independence Avenue." intro="In the centre of Windhoek, with a parking entrance directly off Independence Avenue." />
      <section className="container-site grid gap-16 py-20 md:grid-cols-2">
        <div>
          <h2 className="gvc-reveal-into-view display-lg">Getting here</h2>
          <address className="mt-6 text-xl not-italic leading-relaxed">Gustav Voigts Centre<br />Independence Avenue<br />Windhoek, Namibia</address>
          <a href={CENTRE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-yellow px-6 py-4 font-bold">Open in Google Maps</a>
          <h2 className="gvc-reveal-into-view display-lg mt-16">Parking</h2>
          <p className="mt-4 text-lg text-muted-foreground">The centre's published information places the parking entrance on Independence Avenue. For current charges, available spaces or access questions, please call centre reception.</p>
        </div>
        <div className="space-y-6">
          <Photo src={PHOTOS.entrance} alt="Exterior entrance of Gustav Voigts Centre" className="gvc-reveal-media aspect-[4/3] w-full" />
          <h2 className="wordmark text-3xl">Trading hours</h2>
          <Hours />
        </div>
      </section>
      <section className="bg-ink py-24 text-ink-foreground"><div className="container-site"><h2 className="gvc-reveal-into-view display-lg mb-12">Find your level</h2><FloorFinder dark /></div></section>
    </>
  );
}
