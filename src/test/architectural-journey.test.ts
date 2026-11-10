import { describe, expect, it } from "vitest";
import { getArchitecturalScene } from "@/lib/architectural-journey";

describe("optimized scroll crossfade", () => {
  it("begins on a real exterior photograph with no blank frame", () => {
    const start = getArchitecturalScene(0);
    expect(start.exteriorOpacity).toBe(1);
    expect(start.interiorOpacity).toBe(0);
    expect(start.levelsOpacity).toBe(0);
    expect(start.arrivalTextOpacity).toBe(1);
  });
  it("crossfades from exterior to interior with no image wipe", () => {
    const state = getArchitecturalScene(0.33);
    expect(state.exteriorOpacity).toBe(1);
    expect(state.interiorOpacity).toBeGreaterThan(0);
    expect(state.interiorOpacity).toBeLessThan(1);
  });
  it("crossfades from interior to levels without black gaps", () => {
    const state = getArchitecturalScene(0.74);
    expect(state.interiorOpacity).toBe(1);
    expect(state.levelsOpacity).toBeGreaterThan(0);
    expect(state.levelsOpacity).toBeLessThan(1);
  });
  it("ends on the three listed levels", () => {
    const end = getArchitecturalScene(1);
    expect(end.exteriorOpacity).toBe(0);
    expect(end.interiorOpacity).toBe(0);
    expect(end.levelsOpacity).toBe(1);
    expect(end.levelsTextOpacity).toBe(1);
    expect(end.floorReveals).toEqual([1, 1, 1]);
  });
  it("never requires clip masks or transforms in the scene data", () => {
    const state = getArchitecturalScene(0.5);
    expect("interiorReveal" in state).toBe(false);
    expect("levelsReveal" in state).toBe(false);
    expect("interiorScale" in state).toBe(false);
  });

  it("clamps impossible scroll values and NaN", () => {
    expect(getArchitecturalScene(-8).progress).toBe(0);
    expect(getArchitecturalScene(9).progress).toBe(1);
    expect(getArchitecturalScene(NaN).progress).toBe(0);
  });
}
