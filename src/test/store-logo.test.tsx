import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreLogo } from "@/components/site/StoreLogo";
import { logoUrlForDomain } from "@/lib/store-logo";
import { STORES, VERIFIED_BRAND_DOMAINS } from "@/data/stores";

describe("store brand images", () => {
  it("preserves all 31 shops and 12 independently researched domains", () => {
    expect(STORES).toHaveLength(31);
    expect(Object.keys(VERIFIED_BRAND_DOMAINS)).toHaveLength(12);
    expect(STORES.find((s) => s.name === "Kalahari Pharmacy")?.logoUrl).toBeNull();
  });

  it("keeps the Logo.dev token publishable and asks for a 404 on missing artwork", () => {
    const url = logoUrlForDomain("mrp.com");
    expect(url).toContain("img.logo.dev/mrp.com");
    expect(url).toContain("fallback=404");
    expect(logoUrlForDomain(null)).toBeNull();
  });

  it("renders a large logo on an open transparent surface", () => {
    const { container } = render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    const image = screen.getByRole("img", { name: "Mr Price logo" });
    expect(image.getAttribute("loading")).toBe("lazy");
    expect(image.getAttribute("width")).toBe("320");
    expect(image.getAttribute("class")).toContain("object-contain");
    expect(container.firstElementChild?.className).toContain("bg-transparent");
  });

  it("renders the complete business name when a logo is unknown", () => {
    render(<StoreLogo name="Kalahari Pharmacy" domain={null} />);
    expect(screen.getByRole("img", { name: "Kalahari Pharmacy wordmark" }).textContent).toBe("Kalahari Pharmacy");
  });

  it("replaces failed artwork with the full business name", () => {
    render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    fireEvent.error(screen.getByRole("img", { name: "Mr Price logo" }));
    expect(screen.getByRole("img", { name: "Mr Price wordmark" }).textContent).toBe("Mr Price");
  });

  it("recovers for a changed logo source when a tile is reused", () => {
    const { rerender } = render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    fireEvent.error(screen.getByRole("img", { name: "Mr Price logo" }));
    rerender(<StoreLogo name="Clicks" domain="clicks.co.za" />);
    expect(screen.getByRole("img", { name: "Clicks logo" })).toBeTruthy();
  });
});
