import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreLogo } from "@/components/site/StoreLogo";
import { logoUrlForDomain, storeMonogram } from "@/lib/store-logo";
import { STORES, VERIFIED_BRAND_DOMAINS } from "@/data/stores";

describe("store logo directory metadata", () => {
  it("preserves 31 stores and explicitly resolves unknown domains to null", () => {
    expect(STORES).toHaveLength(31);
    expect(Object.keys(VERIFIED_BRAND_DOMAINS)).toHaveLength(12);
    expect(STORES.find((s) => s.name === "Kalahari Pharmacy")).toMatchObject({
      domain: null,
      logoUrl: null,
    });
    expect(STORES.find((s) => s.name === "Mr Price")?.domain).toBe("mrp.com");
  });

  it("generates only public-CDN URLs and requests true 404 for missing artwork", () => {
    expect(logoUrlForDomain("mrp.com")).toMatch(/^https:\/\/img\.logo\.dev\/mrp\.com\?/);
    expect(logoUrlForDomain("mrp.com")).toContain("fallback=404");
    expect(logoUrlForDomain("mrp.com")).toContain("format=webp");
    expect(logoUrlForDomain(null)).toBeNull();
    expect(logoUrlForDomain("invalid / domain")).toBeNull();
  });

  it("uses compact, intentionally designed initials", () => {
    expect(storeMonogram("Mr Price")).toBe("MRP");
    expect(storeMonogram("Clicks")).toBe("C");
    expect(storeMonogram("Kalahari Pharmacy")).toBe("KP");
  });
});

describe("<StoreLogo />", () => {
  it("renders accessible, lazy logo inside reserved dimensions", () => {
    render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    const img = screen.getByRole("img", { name: "Mr Price logo" });
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.getAttribute("width")).toBe("120");
    expect(img.getAttribute("height")).toBe("64");
    expect(img.getAttribute("class")).toContain("object-contain");
  });

  it("renders a legible monogram for unknown businesses", () => {
    render(<StoreLogo name="Kalahari Pharmacy" domain={null} />);
    expect(screen.getByRole("img", { name: "Kalahari Pharmacy monogram" }).textContent).toBe("KP");
    expect(screen.queryByAltText("Kalahari Pharmacy logo")).toBeNull();
  });

  it("switches to typography if CDN load fails", () => {
    render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    fireEvent.error(screen.getByRole("img", { name: "Mr Price logo" }));
    expect(screen.getByRole("img", { name: "Mr Price monogram" }).textContent).toBe("MRP");
    expect(screen.queryByAltText("Mr Price logo")).toBeNull();
  });

  it("recovers when the component is reused for another domain", () => {
    const { rerender } = render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    fireEvent.error(screen.getByRole("img", { name: "Mr Price logo" }));
    rerender(<StoreLogo name="Clicks" domain="clicks.co.za" />);
    expect(screen.getByRole("img", { name: "Clicks logo" })).toBeTruthy();
  });
  it("does not expose a broken icon when the precomputed URL is absent", () => {
    render(<StoreLogo name="Checkers Liquor Store" domain="checkers.co.za" logoUrl={null} />);
    expect(screen.getByRole("img", { name: "Checkers Liquor Store monogram" }).textContent).toBe("CL");
    expect(screen.queryByAltText("Checkers Liquor Store logo")).toBeNull();
  });

  it("keeps the logo region fixed even when an image fails", () => {
    const { container } = render(<StoreLogo name="Mr Price" domain="mrp.com" />);
    const frame = container.firstElementChild;
    expect(frame?.className).toContain("h-16");
    expect(frame?.className).toContain("w-[120px]");
    fireEvent.error(screen.getByRole("img", { name: "Mr Price logo" }));
    expect(container.firstElementChild).toBe(frame);
    expect(frame?.className).toContain("h-16");
    expect(frame?.className).toContain("w-[120px]");
  });

});
