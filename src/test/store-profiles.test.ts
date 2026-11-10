import { describe, expect, it } from "vitest";
import { STORES } from "@/data/stores";
import { getStoreProfile, PROFILED_STORE_NAMES } from "@/data/store-profiles";

describe("store detail editorial profiles", () => {
  it("provides a written introduction and photo for all 31 directory businesses", () => {
    expect(PROFILED_STORE_NAMES).toHaveLength(31);
    expect(STORES).toHaveLength(31);
    STORES.forEach((store) => {
      const p = getStoreProfile(store);
      expect(p.introduction.length).toBeGreaterThan(45);
      expect(p.imageUrl.startsWith("https://")).toBe(true);
      expect(p.imageAlt.length).toBeGreaterThan(10);
    });
  });

  it("shows a verified storefront image for Torga Optical", () => {
    const store = STORES.find((s) => s.name === "Torga Optical")!;
    const p = getStoreProfile(store);
    expect(p.specificImage).toBe(true);
    expect(p.imageUrl).toContain("torgaoptical.co.za");
    expect(p.unit).toBe("Shop 6A");
  });

  it("labels general centre photos honestly for independent retailers", () => {
    const store = STORES.find((s) => s.name === "Al Amin")!;
    const p = getStoreProfile(store);
    expect(p.specificImage).toBe(false);
    expect(p.imageCaption).toContain("not this store");
  });
});
