/** Coverflow geometry, independent of the DOM and the archive's scroll driver. */
export function clampPosition(value: number, count: number): number {
  return Math.max(0, Math.min(Math.max(0, count - 1), Number.isNaN(value) ? 0 : value));
}

export function sampleFilmCard(index: number, position: number, width: number) {
  const distance = index - position;
  const absolute = Math.abs(distance);
  const side = Math.sign(distance);
  const fold = Math.min(absolute, 1);
  const tail = Math.max(0, absolute - 1);
  return {
    x: side * width * (fold * .74 + tail * .27),
    z: -width * (fold * .42 + tail * .06),
    rotationY: -side * fold * 58,
    scale: 1 - fold * .045 - Math.min(tail, 6) * .012,
    shade: Math.min(.62, absolute * .19),
    zIndex: 1000 - Math.round(absolute * 100),
  };
}

/** Velocity is in cards per millisecond. A flick adds at most 1.5 cards. */
export function projectFilmRelease(position: number, velocity: number, count: number) {
  const momentum = Number.isFinite(velocity) ? Math.max(-1.5, Math.min(1.5, velocity * 180)) : 0;
  return Math.round(clampPosition(position + momentum, count));
}
