/** Coverflow geometry, independent of the DOM and the archive's scroll driver. */
export const FILM_CENTER_SPACING = .82;
const FILM_SIDE_SPACING = .27;

export interface FilmCardPose {
  x: number;
  z: number;
  rotationY: number;
  scale: number;
  shade: number;
  zIndex: number;
}

export function clampPosition(value: number, count: number): number {
  return Math.max(0, Math.min(Math.max(0, count - 1), Number.isNaN(value) ? 0 : value));
}

/** Pass an output object to reuse it across frames without allocating a pose. */
export function sampleFilmCard(index: number, position: number, width: number, output?: FilmCardPose): FilmCardPose {
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
  const sine = absolute >= 1 ? 1 : absolute === 0 ? 0 : Math.sin(travel * Math.PI / 2);
  const offset = absolute * FILM_SIDE_SPACING
    + (FILM_CENTER_SPACING - FILM_SIDE_SPACING) * sine;
  const pose = output ?? { x: 0, z: 0, rotationY: 0, scale: 1, shade: 0, zIndex: 0 };
  pose.x = side * width * offset;
  pose.z = -width * fold * .6;
  pose.rotationY = -side * fold * 60;
  // Perspective already makes side cards smaller. Once folded, they only
  // slide along the row; deeper cards do not shrink or recede again.
  pose.scale = 1;
  pose.shade = fold * .18;
  pose.zIndex = 1000 - Math.round(absolute * 100);
  return pose;
}

/** Velocity is in cards per millisecond. A flick adds at most 1.5 cards. */
export function projectFilmRelease(position: number, velocity: number, count: number) {
  const momentum = Number.isFinite(velocity) ? Math.max(-1.5, Math.min(1.5, velocity * 180)) : 0;
  return Math.round(clampPosition(position + momentum, count));
}
