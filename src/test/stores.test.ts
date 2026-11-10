import { describe, expect, it } from "vitest";
import { STORES } from "@/data/stores";

describe("tenant directory", () => {
  it("lists 31 businesses", () => expect(STORES).toHaveLength(31));
  it("has 10 on Lower Ground, 17 on Street Level, 4 on Upper Level", () => {
    const n = (f: string) => STORES.filter((s) => s.floor === f).length;
    expect([n("lower-ground"), n("street-level"), n("upper-level")]).toEqual([10, 17, 4]);
  });
  it("has unique slugs", () => expect(new Set(STORES.map((s) => s.slug)).size).toBe(31));
});
