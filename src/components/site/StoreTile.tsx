import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StoreLogo } from "@/components/site/StoreLogo";
import { floorName, type Store } from "@/data/stores";

/** Big unobstructed brand marks, minimal separators and no logo backgrounds. */
export function StoreTile({ store }: { store: Store }) {
  return (
    <Link
      to="/stores/$slug"
      params={{ slug: store.slug }}
      className="gvc-store-tile group flex h-full min-h-72 flex-col justify-between gap-5 border-b border-border bg-background px-5 py-7 no-underline transition-colors hover:bg-neutral-surface focus-visible:bg-neutral-surface md:px-7"
    >
      <div className="flex min-h-36 items-center justify-center">
        <StoreLogo name={store.name} domain={store.domain} logoUrl={store.logoUrl} />
      </div>
      <div className="space-y-3">
        <h2 className="wordmark text-xl leading-tight md:text-2xl">{store.name}</h2>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 space-y-1 text-sm">
            <p className="text-muted-foreground">{store.category}</p>
            <p className="font-semibold">{floorName(store.floor)}</p>
          </div>
          <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
        </div>
      </div>
    </Link>
  );
}
