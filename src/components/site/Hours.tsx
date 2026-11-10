import { CENTRE } from "@/data/centre";
export function Hours({ dark }: { dark?: boolean }) {
  return (
    <div>
      <dl className="divide-y divide-current/15">
        {CENTRE.hours.map((h) => (
          <div key={h.days} className="flex justify-between gap-4 py-3 text-lg"><dt>{h.days}</dt><dd className="font-bold tabular-nums">{h.time}</dd></div>
        ))}
      </dl>
      <p className={`mt-3 text-sm ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>{CENTRE.hoursNote}</p>
    </div>
  );
}
