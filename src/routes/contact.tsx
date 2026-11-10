import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CENTRE } from "@/data/centre";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact — Gustav Voigts Centre", "Call +264 61 423 220 or email reception for enquiries about Gustav Voigts Centre, Windhoek.", "/contact"),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(2, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});
type F = z.infer<typeof schema>;

function Contact() {
  const [v, setV] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(v);
    if (!r.success) { setErr(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErr({});
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    window.location.href = `mailto:${CENTRE.email}?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
  };
  const field = (k: keyof F, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="eyebrow">{label}</label>
      {k === "message"
        ? <textarea id={k} rows={6} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={`${k}-err`} className="mt-2 w-full border-2 border-input bg-background p-4 text-lg focus:border-ink" />
        : <input id={k} type={type} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={`${k}-err`} className="mt-2 h-14 w-full border-2 border-input bg-background px-4 text-lg focus:border-ink" />}
      {err[k] && <p id={`${k}-err`} className="mt-1 text-sm font-semibold text-destructive">{err[k]}</p>}
    </div>
  );
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the centre." intro="For leasing, centre management and general enquiries. For a specific store, use the number on its directory page." />
      <section className="container-site grid gap-16 py-20 md:grid-cols-12">
        <div className="gvc-reveal-into-view space-y-6 md:col-span-5">
          <a href={CENTRE.phoneHref} className="flex items-center gap-4 border-t-4 border-ink pt-6"><Phone className="size-6" aria-hidden /><span className="wordmark text-3xl">{CENTRE.phone}</span></a>
          <a href={`mailto:${CENTRE.email}`} className="flex items-center gap-4 border-t-4 border-ink pt-6"><Mail className="size-6" aria-hidden /><span className="wordmark break-all text-2xl">{CENTRE.email}</span></a>
          <address className="border-t-4 border-ink pt-6 text-lg not-italic">Gustav Voigts Centre, Independence Avenue, Windhoek, Namibia</address>
        </div>
        <form noValidate onSubmit={submit} className="space-y-6 md:col-span-7" aria-label="Enquiry form">
          {field("name", "Name")}{field("email", "Email", "email")}{field("subject", "Subject")}{field("message", "Message")}
          <button type="submit" className="bg-ink px-8 py-4 font-bold text-ink-foreground hover:bg-yellow hover:text-accent-foreground">Send enquiry</button>
          <p className="text-sm text-muted-foreground">This opens your email app with your message addressed to centre reception. Nothing is stored on this website.</p>
        </form>
      </section>
    </>
  );
}
