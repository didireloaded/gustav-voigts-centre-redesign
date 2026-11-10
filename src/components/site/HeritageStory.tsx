import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { PHOTOS } from "@/data/centre";

const MILESTONES = [
  {
    year: "1971",
    title: "A new centre takes shape.",
    description: "Construction begins on a three-level shopping centre at the site of Wecke & Voigts on the city's main shopping street.",
  },
  {
    year: "1973",
    title: "A place for Windhoek.",
    description: "The new shopping centre is completed, with retail across three levels and parking as part of its original design.",
  },
  {
    year: "Today",
    title: "Still part of everyday life.",
    description: "Gustav Voigts Centre remains a central address for shopping, services and hospitality on Independence Avenue.",
  },
] as const;

/** Source: Wecke & Voigts Group's published history, not imagined archival scenes. */
export function HeritageStory() {
  return (
    <section id="heritage" className="gvc-heritage" aria-labelledby="gvc-heritage-title">
      <div className="container-site gvc-heritage-heading gvc-reveal-into-view">
        <div>
          <p className="gvc-heritage-eyebrow">Part of Windhoek since the 1970s</p>
          <h2 id="gvc-heritage-title">A place with a story.</h2>
        </div>
        <p>Before it became a familiar address for everyday shopping, this was the site of a growing Windhoek business. Its history is part of the city's own changing story.</p>
      </div>
      <div className="container-site gvc-heritage-timeline" aria-label="History of Gustav Voigts Centre">
        {MILESTONES.map((item) => (
          <article className="gvc-heritage-milestone gvc-reveal-into-view" key={item.year}>
            
            <h3>{item.year}</h3>
            <div className="gvc-heritage-rule" aria-hidden="true" />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="container-site gvc-heritage-outro">
        <div className="gvc-heritage-image gvc-reveal-media">
          <Photo src={PHOTOS.mainCourt3} alt="Contemporary photograph of the interior of Gustav Voigts Centre" className="h-full w-full" />
          <span>CONTEMPORARY CENTRE PHOTOGRAPH</span>
        </div>
        <div className="gvc-heritage-next gvc-reveal-into-view">
          <span className="gvc-heritage-eyebrow">The story continues</span>
          <p>A historic address. A centre that continues to serve Windhoek.</p>
          <a href="https://weckevoigts.com/history/" target="_blank" rel="noopener noreferrer">Read the historical source <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
