import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { StoreTile } from "@/components/site/StoreTile";
import { CATEGORIES, FLOORS, STORES } from "@/data/stores";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

type S = { q: string; floor: string; category: string };
export const Route = createFileRoute("/stores/")({
  validateSearch: (s: Record<string, unknown>): S => ({ q: String(s["q"] ?? ""), floor: String(s["floor"] ?? ""), category: String(s["category"] ?? "") }),
  head: () => meta("Store directory — Gustav Voigts Centre", "Search all 31 listed businesses at Gustav Voigts Centre by name, category and level.", "/stores"),
  component: Stores,
});

function Stores() {
  const { q, floor, category } = Route.useSearch();
  const nav = useNavigate({ from: "/stores/" });
  const set = (p: Partial<S>) => nav({ search: (prev) => ({ ...prev, ...p }), replace: true });
  const list = STORES.filter((s) => (!floor || s.floor === floor) && (!category || s.category === category) && (!q || (s.name + " " + s.category).toLowerCase().includes(q.toLowerCase())));
  const chip = (active: boolean) => cn("border-2 px-4 py-2 text-sm font-semibold transition-colors", active ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-ink");

  return (
    <>
      <header className="bg-neutral-surface">
        <div className="container-site grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-24">
          <div className="md:col-span-8">
            <h1 className="display-xl">Find a store.</h1>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:col-span-4">{STORES.length} businesses listed across three levels at Gustav Voigts Centre.</p>
        </div>
      </header>
      <section className="container-site py-12">
        <label htmlFor="store-search" className="eyebrow">Search</label>
        <div className="relative mt-3">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2" aria-hidden />
          <input id="store-search" type="search" value={q} onChange={(e) => set({ q: e.target.value })} placeholder="Store name or category" className="h-14 w-full border-2 border-ink bg-background pl-12 pr-4 text-lg outline-none" />
        </div>
        <fieldset className="mt-8"><legend className="eyebrow mb-3">Level</legend>
          <div className="flex flex-wrap gap-2">
            <button aria-pressed={!floor} className={chip(!floor)} onClick={() => set({ floor: "" })}>All levels</button>
            {FLOORS.map((f) => <button key={f.id} aria-pressed={floor === f.id} className={chip(floor === f.id)} onClick={() => set({ floor: f.id })}>{f.name}</button>)}
          </div>
        </fieldset>
        <fieldset className="mt-6"><legend className="eyebrow mb-3">Category</legend>
          <div className="flex flex-wrap gap-2">
            <button aria-pressed={!category} className={chip(!category)} onClick={() => set({ category: "" })}>All</button>
            {CATEGORIES.map((c) => <button key={c} aria-pressed={category === c} className={chip(category === c)} onClick={() => set({ category: c })}>{c}</button>)}
          </div>
        </fieldset>
        <div className="mt-10 flex items-center justify-between border-b-4 border-ink pb-3">
          <p aria-live="polite" className="font-semibold">{list.length} {list.length === 1 ? "business" : "businesses"}</p>
          {(q || floor || category) && <button onClick={() => set({ q: "", floor: "", category: "" })} className="inline-flex items-center gap-1 font-semibold link-underline"><X className="size-4" aria-hidden />Clear filters</button>}
        </div>
        {list.length ? (
          <ul key={`${floor}|${category}`} className={`mt-3 grid gap-x-7 gap-y-6 bg-background sm:grid-cols-2 xl:grid-cols-3 ${q.trim() ? "" : "gvc-filter-stagger"}`}>{list.map((s, index) => <li key={s.slug} style={{ animationDelay: `${Math.min(index, 5) * 30}ms` }}><StoreTile store={s} /></li>)}</ul>
        ) : <p className="py-16 text-lg text-muted-foreground">No businesses match. Try another search or clear the filters.</p>}
      </section>
    </>
  );
}
