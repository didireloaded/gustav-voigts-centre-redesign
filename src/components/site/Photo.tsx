import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/** Official centre photograph with a typographic fallback if the image is unavailable. */
export function Photo({ src, alt, className, label }: { src: string; alt: string; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div role="img" aria-label={alt} className={cn("flex flex-col items-start justify-end gap-2 bg-neutral-surface p-6 text-muted-foreground", className)}>
        <ImageOff className="size-5" aria-hidden />
        <span className="eyebrow">{label ?? "Photograph unavailable"}</span>
      </div>
    );
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={cn("object-cover", className)} />;
}
