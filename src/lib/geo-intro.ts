/** Utilities for a scroll-linked intro with native page scrolling. */
export const clamp01 = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

export function segment(progress: number, start: number, end: number) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp01((progress - start) / (end - start));
}

export function sceneOpacity(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) {
  return segment(progress, enterStart, enterEnd) *
    (1 - segment(progress, exitStart, exitEnd));
}

/**
 * Maps the native scroll position of the section to 0–1 without intercepting
 * scrolling, wheel events, keyboard input, or touch gestures.
 */
export function progressFromSection(top: number, height: number, viewport: number) {
  const travel = Math.max(1, height - viewport);
  return clamp01(-top / travel);
}
