import { Link } from "@tanstack/react-router";
import { CENTRE } from "@/data/centre";
import { NAV } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-site grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-yellow">Visit</p>
          <address className="mt-4 not-italic text-lg leading-relaxed">
            Gustav Voigts Centre<br />Independence Avenue<br />Windhoek, Namibia
          </address>
          <a href={CENTRE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold link-underline">Get directions</a>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-yellow">Contact</p>
          <ul className="mt-4 space-y-2 text-lg">
            <li><a href={CENTRE.phoneHref} className="link-underline">{CENTRE.phone}</a></li>
            <li><a href={`mailto:${CENTRE.email}`} className="link-underline break-all">{CENTRE.email}</a></li>
            <li><a href={CENTRE.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a></li>
          </ul>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <p className="eyebrow text-yellow">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-lg">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="link-underline">{n.label}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div className="container-site overflow-hidden">
        <p aria-hidden className="wordmark select-none whitespace-nowrap text-[clamp(3.5rem,13.5vw,13rem)] leading-[0.8] tracking-[-0.05em]">Gustav Voigts</p>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-ink-border py-6 text-sm text-ink-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Gustav Voigts Centre, Windhoek.</p>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>{CENTRE.hoursNote.split(".")[0]}.</p>
          <a href="https://logo.dev" target="_blank" rel="noopener noreferrer" className="w-fit underline-offset-4 hover:underline focus-visible:underline">
            Logos provided by Logo.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
