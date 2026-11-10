import { useState } from "react";
import { cn } from "@/lib/utils";

/** Real centre or tenant photo, with a type-led fallback rather than a broken icon. */
export function Photo({ src, alt, className, label }: { src: string; alt: string; className?: string; label?: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!src || failedSource === src) {
    return (
      <div role="img" aria-label={alt} className={cn("flex items-end justify-start bg-ink p-6 text-ink-foreground md:p-10", className)}>
        <span className="font-display text-2xl font-bold leading-tight md:text-4xl">{label ?? "Gustav Voigts Centre"}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailedSource(src)} className={cn("object-cover", className)} />;
}
