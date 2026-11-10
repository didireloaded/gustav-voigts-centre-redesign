import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { PHOTOS } from "@/data/centre";
import { FLOORS, STORES } from "@/data/stores";
import { getArchitecturalScene } from "@/lib/architectural-journey";
import { progressFromSection } from "@/lib/scroll-progress";

const emptySearch = { q: "", floor: "", category: "" };
const floorCounts = FLOORS.map(
  (floor) => STORES.filter((store) => store.floor === floor.id).length,
);
const initial = getArchitecturalScene(0);

/**
 * Real centre photos with a compositor-friendly crossfade.
 *
 * No React state update on scroll. A single passive scroll listener schedules
 * one animation-frame update, changing only opacity and the progress scale.
 * Mobile and reduced-motion visitors get a useful static composition.
 */
export function ArchitecturalJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const exteriorRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const insideTextRef = useRef<HTMLDivElement>(null);
  const levelsTextRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const floorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = -1;

    const update = () => {
      frameRef.current = 0;
      if (mobile.matches || reduced.matches || !rootRef.current) return;
      const bounds = rootRef.current.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const next = progressFromSection(bounds.top, bounds.height, window.innerHeight);
      if (Math.abs(next - last) < 0.002) return;
      last = next;
      const state = getArchitecturalScene(next);

      const setOpacity = (ref: RefObject<HTMLDivElement | null>, value: number) => {
        if (ref.current) ref.current.style.opacity = value.toFixed(3);
      };
      setOpacity(exteriorRef, state.exteriorOpacity);
      setOpacity(interiorRef, state.interiorOpacity);
      setOpacity(levelsRef, state.levelsOpacity);
      setOpacity(arrivalRef, state.arrivalTextOpacity);
      setOpacity(insideTextRef, state.interiorTextOpacity);
      setOpacity(levelsTextRef, state.levelsTextOpacity);

      state.floorReveals.forEach((value, index) => {
        const row = floorRefs.current[index];
        if (row) row.style.opacity = value.toFixed(3);
      });
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${next.toFixed(3)})`;
      }
    };

    const schedule = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="home-content"
      tabIndex={-1}
      className="gvc-architecture scroll-mt-24"
      aria-label="Discover Gustav Voigts Centre"
    >
      <div className="gvc-architecture-stage">
        <div className="gvc-architecture-art" aria-hidden="true">
          <ScenePhotograph
            src={PHOTOS.entrance}
            className="gvc-architecture-photo"
            priority
            layerRef={exteriorRef}
            initialOpacity={initial.exteriorOpacity}
          />
          <ScenePhotograph
            src={PHOTOS.mainCourt3}
            className="gvc-architecture-photo"
            layerRef={interiorRef}
            initialOpacity={initial.interiorOpacity}
          />
          <ScenePhotograph
            src={PHOTOS.atriumLevels}
            className="gvc-architecture-photo"
            layerRef={levelsRef}
            initialOpacity={initial.levelsOpacity}
          />
        </div>
        <div className="gvc-architecture-shade" aria-hidden="true" />
        <div className="gvc-architecture-topline" aria-hidden="true">
          <span>GUSTAV VOIGTS CENTRE</span>
          <span>WINDHOEK · NAMIBIA</span>
        </div>

        <div
          ref={arrivalRef}
          className="gvc-architecture-copy gvc-architecture-arrival"
          style={{ opacity: initial.arrivalTextOpacity }}
        >
          <p className="gvc-architecture-kicker">
            <MapPin size={16} aria-hidden="true" /> Independence Avenue
          </p>
          <h1>Right in the heart of Windhoek.</h1>
          <p className="gvc-architecture-lead">
            A little of everything, in one familiar place.
          </p>
        </div>

        <div
          ref={insideTextRef}
          className="gvc-architecture-copy gvc-architecture-interior"
          style={{ opacity: initial.interiorTextOpacity }}
          aria-hidden="true"
        >
          <p className="gvc-architecture-kicker">A closer look</p>
          <p className="gvc-architecture-display">Step inside.</p>
          <p className="gvc-architecture-lead">
            Shopping and services in the centre of Windhoek.
          </p>
        </div>

        <div
          ref={levelsTextRef}
          className="gvc-architecture-levels"
          style={{ opacity: initial.levelsTextOpacity }}
          aria-hidden="true"
        >
          <p className="gvc-architecture-kicker">Explore the centre</p>
          <p className="gvc-architecture-display">Three levels. One destination.</p>
          <div className="gvc-architecture-floor-reveals">
            {FLOORS.map((floor, index) => (
              <div
                key={floor.id}
                ref={(node) => { floorRefs.current[index] = node; }}
                className="gvc-architecture-floor"
                style={{ opacity: initial.floorReveals[index] }}
              >
                <span>{floor.name}</span>
                <span>{floorCounts[index]} listed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gvc-architecture-controls">
          <div className="gvc-architecture-progress" aria-hidden="true">
            <span ref={progressRef} style={{ transform: "scaleX(0)" }} />
          </div>
          <div className="gvc-architecture-actions">
            <span className="gvc-architecture-scroll-hint">
              <ArrowDown size={16} aria-hidden="true" /> Scroll to explore
            </span>
            <div className="gvc-architecture-buttons">
              <Link
                to="/stores"
                search={emptySearch}
                className="gvc-architecture-primary gvc-pressable"
              >
                Find a store <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="gvc-architecture-simple">
        <div className="gvc-architecture-mobile-hero">
          <ScenePhotograph
            src={PHOTOS.entrance}
            className="gvc-architecture-photo"
            initialOpacity={1}
            priority
          />
          <div className="gvc-architecture-mobile-tint" aria-hidden="true" />
          <div className="gvc-architecture-mobile-text">
            <p className="gvc-architecture-kicker">
              Independence Avenue · Windhoek
            </p>
            <h1>Right in the heart of Windhoek.</h1>
            <p>A little of everything, in one familiar place.</p>
            <div className="gvc-architecture-mobile-actions">
              <Link to="/stores" search={emptySearch} className="gvc-architecture-primary">
                Find a store <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/visit" className="gvc-architecture-secondary">
                Plan your visit
              </Link>
            </div>
          </div>
        </div>

        <div className="gvc-architecture-simple-interior" data-scroll-reveal="media">
          <ScenePhotograph
            src={PHOTOS.mainCourt3}
            className="gvc-architecture-simple-photo"
            initialOpacity={1}
          />
          <div className="gvc-architecture-simple-story">
            <p className="gvc-architecture-kicker">Step inside</p>
            <h2>Explore the centre.</h2>
            <p>Find the businesses and services listed across three levels.</p>
          </div>
        </div>
        <div className="gvc-architecture-simple-floors" data-scroll-reveal="text">
          {FLOORS.map((floor, index) => (
            <Link
              key={floor.id}
              to="/stores"
              search={{ q: "", floor: floor.id, category: "" }}
              className="gvc-architecture-simple-floor"
            >
              <span>{floor.name}</span>
              <span>{floorCounts[index]} businesses <ArrowUpRight size={17} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Explore actual photographs of Gustav Voigts Centre, its interior and
        the three listed shopping levels. The store directory is always available.
      </p>
    </section>
  );
}

function ScenePhotograph({
  src,
  initialOpacity,
  priority = false,
  className,
  layerRef,
}: {
  src: string;
  initialOpacity: number;
  priority?: boolean;
  className: string;
  layerRef?: RefObject<HTMLDivElement | null>;
}) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  // These are all actual photos published by the centre, never stock or mock images.
  const imageSrc = [src, PHOTOS.mainCourt3, PHOTOS.entrance2]
    .find((candidate) => !failedSources.includes(candidate)) ?? null;
  return (
    <div ref={layerRef} className={className} style={{ opacity: initialOpacity }}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          onError={() => setFailedSources((current) => [...current, imageSrc])}
        />
      )}
    </div>
  );
}
