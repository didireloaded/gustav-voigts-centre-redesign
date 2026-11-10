import { useEffect, useRef, useState } from "react";
import { PHOTOS } from "@/data/centre";
import {
  clamp01,
  progressFromSection,
  sceneOpacity,
  segment,
} from "@/lib/geo-intro";

/**
 * First-pass cinematic navigation, without a proprietary map API or invented
 * satellite frames. The location view is typographic, not an accurate street map.
 *
 * The normal homepage is ALWAYS rendered below the section for deep links,
 * no-JS users and those who prefer reduced motion.
 */
const EARTH_IMAGES = [
  "https://svs.gsfc.nasa.gov/vis/a030000/a030600/a030613/blue_marble_apollo_17_19721207_print.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/dc/The_Earth_seen_from_Apollo_17_%28AS17-148-22727%29.jpg",
] as const;

/**
 * Native-scroll, three-beat journey with no forced steps, no session gate and
 * no visible skip control. The full homepage remains available through normal
 * scrolling and the site's navigation. Reduced-motion users see the editorial
 * homepage without a moving intro.
 */
export function GeoIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [earthAsset, setEarthAsset] = useState(0);
  const [mapFailed, setMapFailed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      frameRef.current = 0;
      const el = rootRef.current;
      if (!el || reduced.matches) {
        document.documentElement.classList.remove("gvc-intro-is-active");
        return;
      }
      const rect = el.getBoundingClientRect();
      const next = progressFromSection(rect.top, rect.height, window.innerHeight);
      setProgress((previous) => Math.abs(next - previous) > 0.001 ? next : previous);
      document.documentElement.classList.toggle(
        "gvc-intro-is-active",
        rect.bottom > 100 && rect.top < window.innerHeight && next < 0.98,
      );
    };
    const schedule = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      document.documentElement.classList.remove("gvc-intro-is-active");
    };
  }, []);

  const earthScale = 1 + segment(progress, 0.08, 0.58) * 2.45;
  const earthOpacity = 1 - segment(progress, 0.51, 0.67);
  const regionOpacity = sceneOpacity(progress, 0.29, 0.43, 0.63, 0.79);
  const cityOpacity = sceneOpacity(progress, 0.61, 0.74, 0.93, 1);
  const pinOpacity = segment(progress, 0.72, 0.82);
  const zoomBlur = sceneOpacity(progress, 0.89, 0.95, 0.98, 1) * 5;
  const arrivalOpacity = segment(progress, 0.91, 0.995);

  return (
    <section ref={rootRef} className="gvc-geo-intro" aria-label="Journey to Gustav Voigts Centre">
      <div className="gvc-geo-sticky">
        <div className="gvc-geo-stars" aria-hidden="true" />

        <div
          className="gvc-geo-earth"
          aria-hidden="true"
          style={{
            opacity: earthOpacity,
            transform: `translate(-50%, -50%) scale(${earthScale})`,
            filter: `blur(${zoomBlur}px)`,
          }}
        >
          {earthAsset < EARTH_IMAGES.length ? (
            <img
              src={EARTH_IMAGES[earthAsset]}
              alt=""
              decoding="async"
              loading="eager"
              fetchPriority="high"
              width={960}
              height={960}
              onError={() => setEarthAsset((current) => Math.min(EARTH_IMAGES.length, current + 1))}
            />
          ) : (
            <div className="gvc-geo-planet-fallback" aria-hidden="true" />
          )}
        </div>

        <div
          className="gvc-geo-region"
          style={{
            opacity: regionOpacity,
            transform: `translate(-50%, -50%) scale(${0.9 + segment(progress, 0.3, 0.75) * 1.3})`,
          }}
          aria-hidden="true"
        >
          {!mapFailed && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Namibia-outline.svg"
              className="gvc-geo-map-outline"
              alt=""
              width={673}
              height={602}
              decoding="async"
              loading="lazy"
              onError={() => setMapFailed(true)}
            />
          )}
          <div className="gvc-geo-crosshair" />
          <span className="gvc-geo-kicker">Southern Africa</span>
          <strong>NAMIBIA</strong>
          <span className="gvc-geo-coordinate">22°34′ S · 17°05′ E</span>
        </div>

        <div
          className="gvc-geo-destination"
          aria-hidden="true"
          style={{
            opacity: cityOpacity,
            transform: `translate(-50%, -50%) scale(${0.85 + segment(progress, 0.6, 0.95) * 1.45})`,
            filter: `blur(${zoomBlur}px)`,
          }}
        >
          <span className="gvc-geo-kicker">Namibia · Khomas Region</span>
          <strong>WINDHOEK</strong>
          <div className="gvc-geo-pin-wrap" style={{ opacity: pinOpacity }}>
            <span className="gvc-geo-pin" />
            <span className="gvc-geo-pin-label">
              Gustav Voigts Centre
              <small>Independence Avenue</small>
            </span>
          </div>
        </div>

        <div className="gvc-geo-vignette" aria-hidden="true" />
        <div
          className="gvc-geo-finish"
          aria-hidden="true"
          style={{ opacity: arrivalOpacity }}
        >
          <img src={PHOTOS.entrance} alt="" loading="lazy" decoding="async" />
          <div className="gvc-geo-finish-shade" />
        </div>

        <div className="gvc-geo-topline">
          <span>GUSTAV VOIGTS CENTRE</span>
          <span>WINDHOEK, NAMIBIA</span>
        </div>

        <div className="gvc-geo-bottomline">
          <span className="gvc-geo-scroll-hint">SCROLL TO DISCOVER</span>
          <span className="gvc-geo-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${clamp01(progress)})` }} />
          </span>

        </div>

        <p className="sr-only">
          Scroll through Earth, Namibia and Windhoek to the Gustav Voigts Centre on Independence Avenue.
          The normal homepage follows this scroll-controlled journey.
        </p>

        <a
          className="gvc-geo-credit"
          href="https://science.nasa.gov/resource/the-blue-marble/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Earth imagery: NASA / Apollo 17
        </a>
      </div>
    </section>
  );
}
