import { useCallback, useEffect, useRef, useState } from "react";
import {
  clamp01,
  INTRO_SESSION_KEY,
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
export function GeoIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);

  const skip = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      // Storage can be unavailable in private browsing; skipping still works.
    }
    document.documentElement.classList.remove("gvc-intro-is-active");
    setDismissed(true);
    requestAnimationFrame(() => {
      document.getElementById("home-content")?.scrollIntoView({ block: "start" });
      document.getElementById("home-content")?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      // Native navigation remains usable without browser storage.
    }
    if (reduced.matches || mobile.matches || alreadySeen) {
      setDismissed(true);
      return;
    }

    let frame = 0;
    let markedSeen = false;

    const render = () => {
      frame = 0;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = progressFromSection(rect.top, rect.height, window.innerHeight);
      setProgress((prev) => Math.abs(next - prev) >= 0.001 ? next : prev);
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      document.documentElement.classList.toggle(
        "gvc-intro-is-active",
        visible && next < 0.94,
      );
      if (next >= 0.92 && !markedSeen) {
        markedSeen = true;
        try {
          sessionStorage.setItem(INTRO_SESSION_KEY, "1");
        } catch {
          // The session flag is an enhancement, not a requirement.
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const disableOnPreference = () => {
      if (reduced.matches || mobile.matches) {
        document.documentElement.classList.remove("gvc-intro-is-active");
        setDismissed(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", disableOnPreference);
    mobile.addEventListener("change", disableOnPreference);
    render();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", disableOnPreference);
      mobile.removeEventListener("change", disableOnPreference);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("gvc-intro-is-active");
    };
  }, []);

  if (dismissed) return null;

  const earthScale = 1 + segment(progress, 0.07, 0.63) * 3.1;
  const earthOpacity = 1 - segment(progress, 0.55, 0.77);
  const regionOpacity = sceneOpacity(progress, 0.24, 0.39, 0.66, 0.79);
  const cityOpacity = sceneOpacity(progress, 0.57, 0.69, 0.92, 1);
  const pinOpacity = segment(progress, 0.70, 0.82);
  const zoomBlur = segment(progress, 0.86, 1) * 8;

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
          <img
            src="https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/1000/1133/AS17-148-22727_lrg.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1881&w=1881"
            alt=""
            decoding="async"
            loading="eager"
            fetchPriority="high"
            width={960}
            height={960}
          />
        </div>

        <div
          className="gvc-geo-region"
          style={{
            opacity: regionOpacity,
            transform: `translate(-50%, -50%) scale(${0.9 + segment(progress, 0.3, 0.75) * 1.3})`,
          }}
          aria-hidden="true"
        >
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
          style={{ opacity: segment(progress, 0.94, 1) }}
        />

        <div className="gvc-geo-topline">
          <span>GUSTAV VOIGTS CENTRE</span>
          <span>WINDHOEK, NAMIBIA</span>
        </div>

        <div className="gvc-geo-bottomline">
          <span className="gvc-geo-scroll-hint">SCROLL TO DISCOVER</span>
          <span className="gvc-geo-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${clamp01(progress)})` }} />
          </span>
          <a
            href="#home-content"
            className="gvc-geo-skip"
            onClick={(event) => {
              event.preventDefault();
              skip();
            }}
          >
            Skip intro
          </a>
        </div>

        <p className="sr-only">
          Scroll through Earth, Namibia and Windhoek to the Gustav Voigts Centre on Independence Avenue.
          You can skip this introduction to access the homepage immediately.
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
