/**
 * Publishable Logo.dev token only. A secret token must NEVER enter client code.
 * Replace the public token when regenerating public credentials if needed.
 */
export const LOGO_DEV_PUBLIC_TOKEN = "pk_DNqcLwSoQ-KEyFw6g4YQXA";

const domainPattern = /^(?!-)[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

/**
 * The fallback=404 flag is important: Logo.dev otherwise returns its own
 * generated monogram, masking missing brand artwork from our UI.
 */
export function logoUrlForDomain(domain: string | null): string | null {
  if (!domain || !domainPattern.test(domain)) return null;
  const host = encodeURIComponent(domain.toLowerCase());
  return `https://img.logo.dev/${host}?token=${encodeURIComponent(LOGO_DEV_PUBLIC_TOKEN)}&format=webp&size=200&fallback=404`;
}

const brandedInitials: Record<string, string> = {
  "Mr Price": "MRP",
  Pepstores: "PEP",
  "Checkers Supermarket": "C",
  "Checkers Liquor Store": "CL",
  "Standard Bank Namibia Limited": "SB",
  "Avani Hotel": "AV",
  "OK Furniture": "OK",
};

export function storeMonogram(name: string): string {
  if (brandedInitials[name]) return brandedInitials[name];
  const words = name.replace(/\([^)]*\)/g, "").match(/[\p{L}\p{N}]+/gu) ?? [];
  if (!words.length) return "?";
  if (words.length === 1) return words[0].slice(0, 1).toLocaleUpperCase();
  return words.slice(0, 2).map((word) => word[0]).join("").toLocaleUpperCase();
}
