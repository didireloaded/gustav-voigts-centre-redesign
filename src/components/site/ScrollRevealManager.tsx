import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * One short-lived observer per page visit. No MutationObserver or repeated
 * whole-document scans as store filters and images update.
 * Content renders visible first and is only prepared below the viewport.
 */
export function ScrollRevealManager() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;

    const selector = ".gvc-scroll-intro, .gvc-reveal-into-view, .gvc-reveal-media, [data-scroll-reveal]";
    const observed: HTMLElement[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("gvc-scroll-active");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.08 },
    );

    const frame = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.92) return;
        element.classList.add("gvc-scroll-prepared");
        observed.push(element);
        observer.observe(element);
      });
    });

    const clearMotion = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      observed.forEach((element) => {
        element.classList.remove("gvc-scroll-prepared", "gvc-scroll-active");
      });
    };
    reduced.addEventListener("change", clearMotion);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", clearMotion);
      observed.forEach((element) => {
        element.classList.remove("gvc-scroll-prepared", "gvc-scroll-active");
      });
    };
  }, [pathname]);

  return null;
}
