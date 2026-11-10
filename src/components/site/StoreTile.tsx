import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StoreLogo } from "@/components/site/StoreLogo";
import { floorName, type Store } from "@/data/stores";

/** Real logos where the source is known; typographic identity otherwise. */
export function StoreTile({ store }: { store: Store }) {
  return (
    <Link
      to="/stores/$slug"
      params={{ slug: store.slug }}
      className="group relative flex min-h-60 flex-col justify-between gap-5 bg-background p-6 transition-colors hover:bg-yellow focus-visible:bg-yellow"
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <StoreLogo name={store.name} domain={store.domain} logoUrl={store.logoUrl} />
        <span className="max-w-32 text-right text-sm font-semibold leading-snug text-muted-foreground group-hover:text-accent-foreground">
          {store.category}
        </span>
      </div>
      <span className="wordmark text-2xl">{store.name}</span>
      <span className="flex items-center justify-between gap-2 text-sm font-semibold">
        {floorName(store.floor)}
        <ArrowUpRight
          className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
