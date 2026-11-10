import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone, MapPin } from "lucide-react";
import { floorName, getStore, STORES, telHref } from "@/data/stores";
import { Hours } from "@/components/site/Hours";
import { StoreTile } from "@/components/site/StoreTile";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/stores/$slug")({
  loader: ({ params }) => { const s = getStore(params.slug); if (!s) throw notFound(); return s; },
  head: ({ loaderData, params }) => loaderData
    ? meta(`${loaderData.name} — Gustav Voigts Centre`, `${loaderData.name} (${loaderData.category}) on the ${floorName(loaderData.floor)} of Gustav Voigts Centre, Windhoek. Tel ${loaderData.phone}.`, `/stores/${params.slug}`)
    : { meta: [{ title: "Store not found — Gustav Voigts Centre" }, { name: "robots", content: "noindex" }] },
  component: StorePage,
  notFoundComponent: () => (
    <div className="container-site py-32"><h1 className="display-lg">Store not found.</h1><Link to="/stores" search={{ q: "", floor: "", category: "" }} className="mt-6 inline-block font-semibold underline">Back to the directory</Link></div>
  ),
  errorComponent: () => <div className="container-site py-32"><h1 className="display-lg">This store didn't load.</h1></div>,
});

function StorePage() {
  const s = Route.useLoaderData();
  const nearby = STORES.filter((x) => x.floor === s.floor && x.slug !== s.slug).slice(0, 4);
  return (
    <>
      <section className="bg-neutral-surface">
        <div className="container-site py-16 md:py-24">
          <Link to="/stores" search={{ q: "", floor: "", category: "" }} className="inline-flex items-center gap-2 font-semibold link-underline"><ArrowLeft className="size-4" aria-hidden />All stores</Link>
          <p className="eyebrow mt-10">{s.category}</p>
          <h1 className="display-xl mt-4 max-w-5xl">{s.name}</h1>
        </div>
      </section>
      <section className="container-site grid gap-12 py-16 md:grid-cols-12">
        <dl className="space-y-8 md:col-span-5">
          <div><dt className="eyebrow text-muted-foreground">Level</dt><dd className="mt-2 flex items-center gap-2 text-2xl font-bold"><MapPin className="size-5" aria-hidden />{floorName(s.floor)}</dd></div>
          <div><dt className="eyebrow text-muted-foreground">Telephone</dt><dd className="mt-2"><a href={telHref(s.phone)} className="inline-flex items-center gap-2 bg-yellow px-5 py-3 text-xl font-bold"><Phone className="size-5" aria-hidden />{s.phone}</a></dd></div>
          <div><dt className="eyebrow text-muted-foreground">Listed category</dt><dd className="mt-2 text-lg">{s.listedCategory}</dd></div>
        </dl>
        <div className="md:col-span-7">
          <h2 className="wordmark text-2xl">Centre trading hours</h2>
          <p className="mt-2 text-muted-foreground">Store-specific hours have not been published. Please call {s.name} to confirm.</p>
          <div className="mt-4"><Hours /></div>
        </div>
      </section>
      {nearby.length > 0 && (
        <section className="container-site pb-24">
          <h2 className="wordmark text-3xl">Also on {floorName(s.floor)}</h2>
          <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{nearby.map((x) => <li key={x.slug}><StoreTile store={x} /></li>)}</ul>
        </section>
      )}
    </>
  );
}
