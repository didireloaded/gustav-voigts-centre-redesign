import { describe, expect, it } from "vitest";
import { clamp01, progressFromSection, sceneOpacity, segment } from "@/lib/scroll-progress";

describe("scroll-linked scene progression", () => {
  it("normalizes native scroll position without intercepting the browser", () => {
    expect(progressFromSection(0, 3600, 900)).toBe(0);
    expect(progressFromSection(-1350, 3600, 900)).toBe(0.5);
    expect(progressFromSection(-2700, 3600, 900)).toBe(1);
  });
  it("clamps overscroll and works with short sections", () => {
    expect(progressFromSection(300, 1000, 900)).toBe(0);
    expect(progressFromSection(-9999, 1000, 900)).toBe(1);
    expect(clamp01(Number.NaN)).toBe(0);
  });
  it("interpolates individual camera beats from scroll progress", () => {
    expect(segment(0.2, 0.2, 0.6)).toBe(0);
    expect(segment(0.6, 0.2, 0.6)).toBe(1);
    expect(sceneOpacity(0.5, 0.2, 0.4, 0.65, 0.8)).toBe(1);
    expect(sceneOpacity(0.9, 0.2, 0.4, 0.65, 0.8)).toBe(0);
  });
});
