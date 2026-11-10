import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { floorName, type Store } from "@/data/stores";

/** Typeset wordmark tile — no brand logos are reproduced until supplied by tenants. */
export function StoreTile({ store }: { store: Store }) {
  return (
    <Link to="/stores/$slug" params={{ slug: store.slug }} className="group relative flex min-h-44 flex-col justify-between bg-background p-6 transition-colors hover:bg-yellow focus-visible:bg-yellow">
      <span className="eyebrow text-muted-foreground group-hover:text-accent-foreground">{store.category}</span>
      <span className="wordmark text-2xl">{store.name}</span>
      <span className="flex items-center justify-between text-sm font-semibold">
        {floorName(store.floor)}
        <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
