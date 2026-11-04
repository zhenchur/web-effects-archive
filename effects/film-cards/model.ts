/** Coverflow geometry, independent of the DOM and the archive's scroll driver. */
export const FILM_CENTER_SPACING = .82;

export function clampPosition(value: number, count: number): number {
  return Math.max(0, Math.min(Math.max(0, count - 1), Number.isNaN(value) ? 0 : value));
}

export function sampleFilmCard(index: number, position: number, width: number) {
  const distance = index - position;
  const absolute = Math.abs(distance);
  const side = Math.sign(distance);
  const travel = Math.min(absolute, 1);
  // The reference translates immediately; its turn catches up as the card
  // joins the side row. This is a spatial curve, not a time delay.
  const fold = travel ** 1.6;
  const tail = Math.max(0, absolute - 1);
  return {
    x: side * width * (travel * FILM_CENTER_SPACING + tail * .27),
    z: -width * fold * .6,
    rotationY: -side * fold * 60,
    // Perspective already makes side cards smaller. Once folded, they only
    // slide along the row; deeper cards do not shrink or recede again.
    scale: 1,
    shade: fold * .18,
    zIndex: 1000 - Math.round(absolute * 100),
  };
}

/** Velocity is in cards per millisecond. A flick adds at most 1.5 cards. */
export function projectFilmRelease(position: number, velocity: number, count: number) {
  const momentum = Number.isFinite(velocity) ? Math.max(-1.5, Math.min(1.5, velocity * 180)) : 0;
  return Math.round(clampPosition(position + momentum, count));
}
