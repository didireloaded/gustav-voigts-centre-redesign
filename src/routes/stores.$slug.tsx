import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Phone, MapPin } from "lucide-react";
import { floorName, getStore, STORES, telHref } from "@/data/stores";
import { getStoreProfile } from "@/data/store-profiles";
import { Hours } from "@/components/site/Hours";
import { Photo } from "@/components/site/Photo";
import { StoreTile } from "@/components/site/StoreTile";
import { StoreLogo } from "@/components/site/StoreLogo";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/stores/$slug")({
  loader: ({ params }) => {
    const s = getStore(params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData, params }) => loaderData
    ? meta(
        `${loaderData.name} — Gustav Voigts Centre`,
        `${loaderData.name} (${loaderData.category}), ${floorName(loaderData.floor)}, Gustav Voigts Centre in Windhoek. Find the business and published directory contact information.`,
        `/stores/${params.slug}`,
      )
    : { meta: [{ title: "Store not found — Gustav Voigts Centre" }, { name: "robots", content: "noindex" }] },
  component: StorePage,
  notFoundComponent: () => (
    <div className="container-site py-32"><h1 className="display-lg">Store not found.</h1><Link to="/stores" search={{ q: "", floor: "", category: "" }} className="mt-6 inline-block font-semibold underline">Back to the directory</Link></div>
  ),
  errorComponent: () => <div className="container-site py-32"><h1 className="display-lg">This store didn't load.</h1></div>,
});

function StorePage() {
  const store = Route.useLoaderData();
  const profile = getStoreProfile(store);
  const nearby = STORES.filter((other) => other.floor === store.floor && other.slug !== store.slug).slice(0, 4);

  return (
    <>
      <section className="bg-background">
        <div className="container-site pt-8 pb-16 md:pt-12 md:pb-24">
          <Link to="/stores" search={{ q: "", floor: "", category: "" }} className="inline-flex items-center gap-2 font-semibold link-underline">
            <ArrowLeft className="size-4" aria-hidden /> All stores
          </Link>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-5">
              <div className="max-w-[340px]">
                <StoreLogo name={store.name} domain={store.domain} logoUrl={store.logoUrl} loading="eager" size="detail" />
              </div>
              <p className="mt-8 text-sm font-semibold text-muted-foreground">{store.category} · {floorName(store.floor)}</p>
              <h1 className="mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{store.name}</h1>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">{profile.introduction}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={telHref(store.phone)} className="gvc-pressable inline-flex min-h-12 items-center gap-2 bg-ink px-5 py-3 font-semibold text-ink-foreground">
                  <Phone className="size-5" aria-hidden /> Call business
                </a>
                {profile.officialUrl && (
                  <a href={profile.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-ink px-5 py-3 font-semibold">
                    Official website <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
              </div>
            </div>
            <figure className="min-w-0 lg:col-span-7" data-scroll-reveal="media">
              <div className="gvc-store-profile-banner aspect-[5/4] min-h-72 overflow-hidden bg-neutral-surface md:aspect-[6/4]">
                <Photo src={profile.imageUrl} alt={profile.imageAlt} label={store.name} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {profile.imageCaption}
                {profile.sourceUrl && <> · <a href={profile.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Image source</a></>}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-neutral-surface py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-scroll-reveal="text">
            <p className="mb-4 font-semibold text-muted-foreground">About this business</p>
            <h2 className="max-w-lg font-display text-3xl font-bold leading-tight md:text-5xl">{store.name}, at Gustav Voigts Centre.</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">{profile.introduction}</p>
          </div>
          <div className="lg:col-span-6" data-scroll-reveal="text">
            <dl className="grid gap-8 border-t-2 border-ink pt-6 sm:grid-cols-2">
              <div><dt className="text-sm font-semibold text-muted-foreground">Find it</dt><dd className="mt-2 flex items-start gap-2 text-xl font-bold"><MapPin className="mt-1 size-5 shrink-0" aria-hidden />{floorName(store.floor)}{profile.unit ? `, ${profile.unit}` : ""}</dd></div>
              <div><dt className="text-sm font-semibold text-muted-foreground">Directory telephone</dt><dd className="mt-2 text-xl font-bold"><a href={telHref(store.phone)} className="underline underline-offset-4">{store.phone}</a></dd></div>
              <div><dt className="text-sm font-semibold text-muted-foreground">Listed category</dt><dd className="mt-2 text-lg">{store.listedCategory}</dd></div>
            </dl>
            <div className="mt-10 border-t border-border pt-6">
              <h3 className="font-display text-xl font-bold">Opening hours</h3>
              <p className="mt-2 text-muted-foreground">Store-specific hours have not been confirmed in the centre directory. Please contact {store.name} or check its official website for current hours.</p>
              <div className="mt-5"><Hours /></div>
            </div>
          </div>
        </div>
      </section>
      {nearby.length > 0 && (
        <section className="container-site py-20">
          <h2 className="gvc-reveal-into-view wordmark text-3xl md:text-4xl">Also on {floorName(store.floor)}</h2>
          <ul className="mt-8 grid gap-x-7 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
            {nearby.map((other) => <li key={other.slug}><StoreTile store={other} /></li>)}
          </ul>
        </section>
      )}
    </>
  );
}
