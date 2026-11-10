import { clamp01, segment } from "@/lib/scroll-progress";

/**
 * A low-cost photographic crossfade. The outgoing and incoming image opacity
 * always sum to one in each transition, avoiding black flashes.
 * Unlike the old swipe, this requires no animated clipping or mask painting.
 */
export function getArchitecturalScene(value: number) {
  const progress = clamp01(value);
  const toInterior = segment(progress, 0.20, 0.46);
  const toLevels = segment(progress, 0.61, 0.86);

  return {
    progress,
    // Keep the outgoing photograph fully opaque until the incoming
    // photograph has reached opacity 1. This avoids a dark alpha dip.
    exteriorOpacity: 1 - segment(progress, 0.46, 0.52),
    interiorOpacity: toInterior * (1 - segment(progress, 0.86, 0.92)),
    levelsOpacity: toLevels,
    arrivalTextOpacity: 1 - segment(progress, 0.10, 0.26),
    interiorTextOpacity: segment(progress, 0.31, 0.45) * (1 - segment(progress, 0.60, 0.73)),
    levelsTextOpacity: segment(progress, 0.76, 0.89),
    floorReveals: [
      segment(progress, 0.76, 0.83),
      segment(progress, 0.81, 0.89),
      segment(progress, 0.87, 0.95),
    ],
  };
}
