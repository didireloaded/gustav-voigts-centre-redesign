import { useState } from "react";
import { cn } from "@/lib/utils";
import { logoUrlForDomain } from "@/lib/store-logo";

export type StoreLogoProps = {
  name: string;
  domain: string | null;
  logoUrl?: string | null;
  loading?: "lazy" | "eager";
  size?: "tile" | "detail";
  className?: string;
};

/**
 * An open logo surface, not a white badge or off-white card.
 * No generated/incorrect vendor monograms. When an image is unavailable,
 * the entire name becomes an intentional, readable editorial wordmark.
 */
export function StoreLogo({
  name,
  domain,
  logoUrl,
  loading = "lazy",
  size = "tile",
  className,
}: StoreLogoProps) {
  const source = logoUrl === undefined ? logoUrlForDomain(domain) : logoUrl;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const useImage = Boolean(source && failedSource !== source);

  return (
    <span
      className={cn(
        "gvc-store-logo inline-flex w-full min-w-0 items-center justify-center overflow-hidden bg-transparent",
        size === "detail" ? "h-32 max-w-[340px] md:h-40" : "h-28 md:h-32",
        className,
      )}
    >
      {useImage ? (
        <img
          src={source!}
          alt={`${name} logo`}
          width={320}
          height={160}
          loading={loading}
          decoding="async"
          className="block h-full w-full max-w-[290px] object-contain mix-blend-multiply"
          onError={() => setFailedSource(source)}
        />
      ) : (
        <span
          role="img"
          aria-label={`${name} wordmark`}
          className={cn(
            "max-w-full text-center font-display font-extrabold leading-tight tracking-tight text-ink",
            size === "detail" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
          )}
        >
          {name}
        </span>
      )}
    </span>
  );
}
