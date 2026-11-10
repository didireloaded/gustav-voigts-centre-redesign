import { useEffect } from "react";

/**
 * Adds browser-independent editorial reveals to real sections after hydration.
 * Only content below the fold is prepared; without JavaScript everything stays
 * visible. Filtered store results are never delayed by this effect.
 */
export function ScrollRevealManager() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window) || !("MutationObserver" in window)) return;

    const seen = new WeakSet<Element>();
    const selector = ".gvc-scroll-intro, .gvc-reveal-into-view, .gvc-reveal-media, [data-scroll-reveal]";
    let frame = 0;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("gvc-scroll-active");
          observer.unobserve(entry.target);
        }
      }
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    });

    const scan = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        const rect = element.getBoundingClientRect();
        // Do not hide initial page content or an element scrolled into view
        // before hydration. Only sections that are still below the fold animate.
        if (rect.top < window.innerHeight * 0.92) return;
        element.classList.add("gvc-scroll-prepared");
        observer.observe(element);
      });
    };
    const queueScan = () => {
      if (!frame) frame = requestAnimationFrame(scan);
    };
    const container = document.getElementById("main") ?? document.body;
    const changes = new MutationObserver(queueScan);
    changes.observe(container, { childList: true, subtree: true });
    queueScan();

    const onReducedMotionChange = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      document.querySelectorAll(".gvc-scroll-prepared").forEach((node) => {
        node.classList.remove("gvc-scroll-prepared");
        node.classList.remove("gvc-scroll-active");
      });
    };
    reduced.addEventListener("change", onReducedMotionChange);

    return () => {
      changes.disconnect();
      observer.disconnect();
      reduced.removeEventListener("change", onReducedMotionChange);
      if (frame) cancelAnimationFrame(frame);
      document.querySelectorAll(".gvc-scroll-prepared").forEach((node) => {
        node.classList.remove("gvc-scroll-prepared");
        node.classList.remove("gvc-scroll-active");
      });
    };
  }, []);
  return null;
}
