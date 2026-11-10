import { clamp01, sceneOpacity, segment } from "@/lib/scroll-progress";

/**
 * Maps ordinary vertical scrolling to three photographic story beats.
 * Only existing, accurately attributed photographs may be supplied to the UI.
 * All outputs are normalized and safe for CSS opacity and transforms.
 */
export function getArchitecturalScene(value: number) {
  const progress = clamp01(value);

  return {
    progress,
    exteriorOpacity: 1 - segment(progress, 0.25, 0.43),
    exteriorScale: 1 + 0.18 * segment(progress, 0, 0.45),
    interiorOpacity: sceneOpacity(progress, 0.26, 0.43, 0.69, 0.86),
    interiorScale: 1.08 - 0.08 * segment(progress, 0.31, 0.79),
    levelsOpacity: segment(progress, 0.68, 0.85),
    levelsScale: 1.07 - 0.07 * segment(progress, 0.67, 1),
    arrivalTextOpacity: 1 - segment(progress, 0.14, 0.29),
    interiorTextOpacity: sceneOpacity(progress, 0.36, 0.48, 0.59, 0.72),
    levelsTextOpacity: segment(progress, 0.76, 0.89),
    floorReveals: [
      segment(progress, 0.77, 0.84),
      segment(progress, 0.82, 0.90),
      segment(progress, 0.87, 0.96),
    ],
  };
}
