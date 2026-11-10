import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { PHOTOS } from "@/data/centre";
import { FLOORS, STORES } from "@/data/stores";
import { getArchitecturalScene } from "@/lib/architectural-journey";
import { progressFromSection } from "@/lib/scroll-progress";

const emptySearch = { q: "", floor: "", category: "" };

/**
 * A native-scroll, photo-led journey. The first shot is the exterior,
 * the second is an actual interior photograph, and the third introduces
 * the centre's real three-level directory. No invented architecture or AI art.
 */
export function ArchitecturalJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frameRef.current = 0;
      if (mobile.matches || reducedMotion.matches || !rootRef.current) return;
      const bounds = rootRef.current.getBoundingClientRect();
      if (bounds.bottom < -window.innerHeight || bounds.top > window.innerHeight) return;
      const value = progressFromSection(bounds.top, bounds.height, window.innerHeight);
      setProgress(previous => Math.abs(previous - value) > 0.002 ? value : previous);
    };
    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobile.addEventListener("change", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    requestUpdate();
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobile.removeEventListener("change", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const state = getArchitecturalScene(progress);

  return (
    <section ref={rootRef} id="home-content" tabIndex={-1} className="gvc-architecture scroll-mt-24" aria-label="Discover Gustav Voigts Centre">
      <div className="gvc-architecture-stage">
        <div className="gvc-architecture-art" aria-hidden="true">
          <ScenePhotograph
            src={PHOTOS.entrance}
            priority
            className="gvc-architecture-photo"
            opacity={state.exteriorOpacity}
            scale={state.exteriorScale}
          />
          <ScenePhotograph
            src={PHOTOS.mainCourt3}
            className="gvc-architecture-photo"
            opacity={state.interiorOpacity}
            scale={state.interiorScale}
            reveal={state.interiorReveal}
            revealDirection="side"
          />
          <ScenePhotograph
            src={PHOTOS.atriumLevels}
            className="gvc-architecture-photo"
            opacity={state.levelsOpacity}
            scale={state.levelsScale}
            reveal={state.levelsReveal}
            revealDirection="up"
          />
        </div>
        <div className="gvc-architecture-shade" aria-hidden="true" />
        <div className="gvc-architecture-topline" aria-hidden="true">
          <span>GUSTAV VOIGTS CENTRE</span>
          <span>WINDHOEK · NAMIBIA</span>
        </div>

        <div className="gvc-architecture-copy gvc-architecture-arrival" style={{ opacity: state.arrivalTextOpacity }}>
          <p className="gvc-architecture-kicker"><MapPin size={16} aria-hidden="true" /> Independence Avenue</p>
          <h1>Right in the heart of Windhoek.</h1>
          <p className="gvc-architecture-lead">A little of everything, in one familiar place.</p>
        </div>

        <div className="gvc-architecture-copy gvc-architecture-interior" style={{ opacity: state.interiorTextOpacity }} aria-hidden="true">
          <p className="gvc-architecture-kicker">A closer look</p>
          <p className="gvc-architecture-display">Step inside.</p>
          <p className="gvc-architecture-lead">From everyday essentials to something unexpected.</p>
        </div>

        <div className="gvc-architecture-levels" style={{ opacity: state.levelsTextOpacity }} aria-hidden="true">
          <p className="gvc-architecture-kicker">Explore the centre</p>
          <p className="gvc-architecture-display">Three levels.<br />One destination.</p>
          <div className="gvc-architecture-floor-reveals">
            {FLOORS.map((floor, index) => (
              <div key={floor.id} className="gvc-architecture-floor" style={{ opacity: state.floorReveals[index], transform: `translateY(${(1 - state.floorReveals[index]) * 10}px)` }}>
                <span>{floor.name}</span>
                <span>{STORES.filter(store => store.floor === floor.id).length} listed</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gvc-architecture-controls">
          <div className="gvc-architecture-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${state.progress})` }} />
          </div>
          <div className="gvc-architecture-actions">
            <span className="gvc-architecture-scroll-hint"><ArrowDown size={16} aria-hidden="true" /> Scroll to explore</span>
            <div className="gvc-architecture-buttons">
              
              <Link to="/stores" search={emptySearch} className="gvc-architecture-primary gvc-pressable">Find a store <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="gvc-architecture-simple">
        <div className="gvc-architecture-mobile-hero">
          <ScenePhotograph src={PHOTOS.entrance} className="gvc-architecture-photo" opacity={1} scale={1} priority />
          <div className="gvc-architecture-mobile-tint" aria-hidden="true" />
          <div className="gvc-architecture-mobile-text">
            <p className="gvc-architecture-kicker">Independence Avenue · Windhoek</p>
            <h1>Right in the heart of Windhoek.</h1>
            <p>A little of everything, in one familiar place.</p>
            <div className="gvc-architecture-mobile-actions">
              <Link to="/stores" search={emptySearch} className="gvc-architecture-primary">Find a store <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link to="/visit" className="gvc-architecture-secondary">Plan your visit</Link>
            </div>
          </div>
        </div>
        <div className="gvc-architecture-simple-interior" data-scroll-reveal="media">
          <ScenePhotograph src={PHOTOS.mainCourt3} className="gvc-architecture-simple-photo" opacity={1} scale={1} />
          <div className="gvc-architecture-simple-story">
            <p className="gvc-architecture-kicker">Step inside</p>
            <h2>Explore the centre.</h2>
            <p>Find the stores and services you need across three levels.</p>
          </div>
        </div>
        <div className="gvc-architecture-simple-floors" data-scroll-reveal="text">
          {FLOORS.map(floor => (
            <Link key={floor.id} to="/stores" search={{ q: "", floor: floor.id, category: "" }} className="gvc-architecture-simple-floor">
              <span>{floor.name}</span>
              <span>{STORES.filter(store => store.floor === floor.id).length} businesses <ArrowUpRight size={17} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
      <p className="sr-only">This page uses a scroll-linked photographic journey from the exterior of Gustav Voigts Centre to its interior, showing three levels. You may also navigate directly to the searchable store directory.</p>
    </section>
  );
}

function ScenePhotograph({
  src,
  opacity,
  scale,
  priority = false,
  className,
  reveal = 1,
  revealDirection = "up",
}: {
  src: string;
  opacity: number;
  scale: number;
  priority?: boolean;
  className: string;
  reveal?: number;
  revealDirection?: "up" | "side";
}) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const imageSrc = [src, PHOTOS.mainCourt3].find((candidate) => !failedSources.includes(candidate)) ?? null;
  const clip = revealDirection === "side"
    ? `inset(0 ${(1 - reveal) * 100}% 0 0)`
    : `inset(${(1 - reveal) * 100}% 0 0 0)`;

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `scale(${scale})`,
        clipPath: clip,
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          onError={() => setFailedSources((current) => [...current, imageSrc])}
        />
      )}
    </div>
  );
}
