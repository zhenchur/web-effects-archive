/** Coverflow geometry, independent of the DOM and the archive's scroll driver. */
export const FILM_CENTER_SPACING = .82;
const FILM_SIDE_SPACING = .27;

export function clampPosition(value: number, count: number): number {
  return Math.max(0, Math.min(Math.max(0, count - 1), Number.isNaN(value) ? 0 : value));
}

export function sampleFilmCard(index: number, position: number, width: number) {
  const distance = index - position;
  const absolute = Math.abs(distance);
  const side = Math.sign(distance);
  const travel = Math.min(absolute, 1);
  // The two central cards share a linear turn, keeping their combined angle
  // near 60 degrees. A slower incoming unfold preserves room between them.
  const fold = travel;
  // Center spacing must open up during a handoff: linear X lets the projected
  // faces intersect. This width-relative curve matches the measured edge gap
  // and joins the side row with the same horizontal speed at travel = 1.
  const offset = absolute * FILM_SIDE_SPACING
    + (FILM_CENTER_SPACING - FILM_SIDE_SPACING) * Math.sin(travel * Math.PI / 2);
  return {
    x: side * width * offset,
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
