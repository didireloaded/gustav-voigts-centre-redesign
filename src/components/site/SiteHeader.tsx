import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Clock, MapPin } from "lucide-react";
import { CENTRE } from "@/data/centre";

export const NAV = [
  { to: "/stores", label: "Stores" },
  { to: "/visit", label: "Plan your visit" },
  { to: "/discover", label: "Discover" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:bg-yellow focus:px-4 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      <div className="bg-yellow text-accent-foreground">
        <div className="container-site flex h-9 items-center justify-between gap-4 text-sm font-semibold">
          <span className="flex items-center gap-2"><MapPin className="size-4" aria-hidden />Independence Avenue, Windhoek</span>
          <Link to="/visit" className="hidden items-center gap-2 sm:flex link-underline"><Clock className="size-4" aria-hidden />Mon–Fri 08:30–17:30 · Sat 08:30–13:00</Link>
        </div>
      </div>
      <div className="border-b border-border">
        <nav aria-label="Main" className="container-site flex h-16 items-center justify-between">
          <Link to="/" className="wordmark text-xl leading-none" onClick={() => setOpen(false)}>
            Gustav Voigts<span className="block text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Centre</span>
          </Link>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="font-semibold link-underline py-1" activeProps={{ className: "font-semibold py-1 border-b-2 border-yellow" }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="inline-flex size-11 items-center justify-center md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </div>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[100px] z-40 bg-ink text-ink-foreground md:hidden">
          <ul className="container-site flex flex-col pt-6">
            {NAV.map((n) => (
              <li key={n.to} className="border-b border-ink-border">
                <Link to={n.to} onClick={() => setOpen(false)} className="block py-5 display-lg !text-4xl" activeProps={{ className: "block py-5 display-lg !text-4xl text-yellow" }}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <div className="container-site mt-8 space-y-2 text-ink-muted">
            <a href={CENTRE.phoneHref} className="block text-lg text-ink-foreground">{CENTRE.phone}</a>
            <a href={`mailto:${CENTRE.email}`} className="block">{CENTRE.email}</a>
          </div>
        </div>
      )}
    </header>
  );
}
