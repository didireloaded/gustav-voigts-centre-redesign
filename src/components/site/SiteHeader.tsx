import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
      if (!focusables.length) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!panelRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeAfterNavigation = () => {
    setOpen(false);
    requestAnimationFrame(() => document.getElementById("main")?.focus());
  };

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
          <button
            ref={triggerRef}
            className="inline-flex size-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block size-6">
              <Menu className={`gvc-menu-icon absolute inset-0 size-6 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X className={`gvc-menu-icon absolute inset-0 size-6 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </span>
          </button>
        </nav>
      </div>
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={open}
        aria-hidden={!open}
        inert={!open}
        data-open={open ? "true" : "false"}
        className="gvc-menu-panel fixed inset-x-0 bottom-0 top-[100px] z-40 overflow-y-auto bg-ink text-ink-foreground md:hidden"
      >
        <ul className="container-site flex flex-col pt-6">
          {NAV.map((n) => (
            <li key={n.to} className="border-b border-ink-border">
              <Link to={n.to} onClick={closeAfterNavigation} className="block py-5 display-lg !text-4xl" activeProps={{ className: "block py-5 display-lg !text-4xl text-yellow" }}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="container-site mt-8 space-y-2 pb-12 text-ink-muted">
          <a href={CENTRE.phoneHref} className="block text-lg text-ink-foreground">{CENTRE.phone}</a>
          <a href={`mailto:${CENTRE.email}`} className="block">{CENTRE.email}</a>
        </div>
      </div>
    </header>
  );
}
