import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FLOORS, STORES, type Floor } from "@/data/stores";
import { cn } from "@/lib/utils";

export function FloorFinder({ dark = false }: { dark?: boolean }) {
  const [floor, setFloor] = useState<Floor>("street-level");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = STORES.filter((s) => s.floor === floor);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const n = (i + d + FLOORS.length) % FLOORS.length;
    setFloor(FLOORS[n].id);
    tabs.current[n]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div role="tablist" aria-label="Choose a level" className="flex flex-col">
          {FLOORS.map((f, i) => {
            const active = f.id === floor;
            return (
              <button
                key={f.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${f.id}`}
                aria-selected={active}
                aria-controls={`panel-${f.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setFloor(f.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex items-center justify-between border-l-4 px-5 py-5 text-left transition-colors",
                  active ? "border-yellow bg-yellow text-accent-foreground" : dark ? "border-ink-border hover:bg-ink-border" : "border-border hover:bg-neutral-surface",
                )}
              >
                <span className="wordmark text-2xl">{f.name}</span>
                <span className="text-sm font-semibold">{STORES.filter((s) => s.floor === f.id).length} listed</span>
              </button>
            );
          })}
        </div>
        <p className={cn("mt-6 text-sm leading-relaxed", dark ? "text-ink-muted" : "text-muted-foreground")}>
          Architectural floor plan and unit positions are pending confirmation from centre management. Levels shown as published in the official directory.
        </p>
      </div>
      <div role="tabpanel" id={`panel-${floor}`} aria-labelledby={`tab-${floor}`} className="lg:col-span-8">
        <ul className={cn("grid gap-px sm:grid-cols-2", dark ? "bg-ink-border" : "bg-border")}>
          {list.map((s) => (
            <li key={s.slug} className={dark ? "bg-ink" : "bg-background"}>
              <Link to="/stores/$slug" params={{ slug: s.slug }} className={cn("flex items-baseline justify-between gap-4 px-5 py-4 transition-colors", dark ? "hover:bg-yellow hover:text-accent-foreground" : "hover:bg-yellow")}>
                <span className="wordmark text-lg">{s.name}</span>
                <span className="shrink-0 text-sm opacity-75">{s.category}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/stores" search={{ floor, q: "", category: "" }} className="mt-6 inline-block font-semibold link-underline">
          Browse {FLOORS.find((f) => f.id === floor)!.name} in the directory
        </Link>
      </div>
    </div>
  );
}
