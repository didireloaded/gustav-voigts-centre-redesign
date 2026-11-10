import { describe, expect, it } from "vitest";
import { getArchitecturalScene } from "@/lib/architectural-journey";

describe("architectural journey timeline", () => {
  it("starts with the genuine exterior and a readable arrival headline", () => {
    const start = getArchitecturalScene(0);
    expect(start.exteriorOpacity).toBe(1);
    expect(start.arrivalTextOpacity).toBe(1);
    expect(start.interiorOpacity).toBe(0);
    expect(start.interiorReveal).toBe(0);
    expect(start.levelsReveal).toBe(0);
    expect(start.levelsOpacity).toBe(0);
    expect(start.progress).toBe(0);
  });
  it("crossfades into the real interior as native scroll advances", () => {
    const middle = getArchitecturalScene(0.5);
    expect(middle.exteriorOpacity).toBe(0);
    expect(middle.interiorOpacity).toBe(1);
    expect(middle.interiorReveal).toBe(1);
    expect(middle.levelsOpacity).toBe(0);
    expect(middle.interiorTextOpacity).toBeGreaterThan(0);
  });
  it("reveals all three levels before leaving the story", () => {
    const end = getArchitecturalScene(1);
    expect(end.levelsOpacity).toBe(1);
    expect(end.levelsReveal).toBe(1);
    expect(end.levelsTextOpacity).toBe(1);
    expect(end.floorReveals).toEqual([1, 1, 1]);
  });
  it("clamps overscroll and invalid progress without NaN output", () => {
    expect(getArchitecturalScene(-3).progress).toBe(0);
    expect(getArchitecturalScene(4).progress).toBe(1);
    expect(getArchitecturalScene(NaN).progress).toBe(0);
  });
});
