import { describe, expect, it } from "vitest";
import { STORES } from "@/data/stores";
import { getStoreProfile, PROFILED_STORE_NAMES } from "@/data/store-profiles";

describe("source-grounded business profiles", () => {
  it("has exactly 31 directory listings and introduces each from real directory fields", () => {
    expect(STORES).toHaveLength(31);
    STORES.forEach((store) => {
      const profile = getStoreProfile(store);
      expect(profile.introduction.length).toBeGreaterThan(45);
      expect(profile.introduction).toContain(store.name);
    });
  });

  it("does not generate unrelated store banners for unverified businesses", () => {
    const store = STORES.find((s) => s.name === "Al Amin")!;
    const profile = getStoreProfile(store);
    expect(profile.imageUrl).toBeNull();
    expect(profile.imageAlt).toBeNull();
    expect(profile.specificImage).toBe(false);
  });

  it("uses tenant-attributed images only for the three source-grounded brands", () => {
    const withPhotos = STORES.filter((s) => getStoreProfile(s).imageUrl);
    expect(withPhotos.map((s) => s.name).sort()).toEqual([
      "Avani Hotel",
      "Clicks",
      "Torga Optical",
    ]);
  });

  it("uses the official Torga Optical branch details where verified", () => {
    const store = STORES.find((s) => s.name === "Torga Optical")!;
    const profile = getStoreProfile(store);
    expect(profile.specificImage).toBe(true);
    expect(profile.imageUrl).toContain("torgaoptical.co.za");
    expect(profile.unit).toBe("Shop 6A");
    expect(profile.phoneOverride).toBe("083 377 5540");
    expect(profile.officialUrl).toBe("https://torga.com.na/stores/gustav-voigts-centre");
  });

  it("keeps the source-derived descriptions separate from generic directory entries", () => {
    expect(PROFILED_STORE_NAMES).toEqual(expect.arrayContaining([
      "Torga Optical",
      "Avani Hotel",
      "Clicks",
    ]));
    expect(PROFILED_STORE_NAMES).toHaveLength(3);
  });
});
