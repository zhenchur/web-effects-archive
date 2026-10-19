/** Read-only Cinema 4D scene measurements, in the scene's native units. */
export const CINEMA_MODEL = {
  planeWidth: 400,
  planeHeight: 86.77616756322344,
  depth: 50,
  depthRatio: 50 / 86.77616756322344,
  cameraDistance: 300,
  cameraDistanceToHeight: 300 / 86.77616756322344,
  focalLength: 22,
  sensorWidth: 36,
  focalPixelsPerViewportWidth: 22 / 36,
  durationFrames: 60,
  halfDurationFrames: 30,
  framesPerSecond: 30,
  bankDegrees: 10,
  easeControlPoints: [0.838, 0, 0.162, 1] as const,
} as const

export type CinemaPhase = 'incoming' | 'outgoing'

/** All angles are CSS degrees; CSS Y and Z are opposite to the scene axes. */
export interface CinemaPose {
  frame: number
  pitch: number
  bank: number
  parentBank: number
  childBank: number
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

/**
 * Exact cubic-bezier(.838, 0, .162, 1) evaluation by solving its time axis.
 * Each 30-frame C4D segment has horizontal tangents 25.14 frames long.
 * A monotonic solve also handles the long, crossing tangent handles here.
 */
export function cinemaEase(progress: number): number {
  const x = clamp01(Number.isFinite(progress) ? progress : 0)
  if (x === 0 || x === 1 || x === 0.5) return x

  let low = 0
  let high = 1
  for (let iteration = 0; iteration < 36; iteration += 1) {
    const t = (low + high) / 2
    const inverse = 1 - t
    const time = 3 * inverse * inverse * t * 0.838
      + 3 * inverse * t * t * 0.162
      + t * t * t
    if (time < x) low = t
    else high = t
  }

  const t = (low + high) / 2
  return t * t * (3 - 2 * t)
}

/**
 * Original scene: 0..30 is arrival, 30..60 is departure, with no added hold.
 * The +90 degree static plane orientation is absorbed into the DOM plane.
 * Parent and child bank must remain separate, on opposite sides of pitch.
 */
export function sampleCinemaPose(frame: number): CinemaPose {
  const safeFrame = Math.max(0, Math.min(
    CINEMA_MODEL.durationFrames,
    Number.isFinite(frame) ? frame : 0,
  ))
  const incoming = safeFrame <= CINEMA_MODEL.halfDurationFrames
  const phaseProgress = incoming
    ? safeFrame / CINEMA_MODEL.halfDurationFrames
    : (safeFrame - CINEMA_MODEL.halfDurationFrames) / CINEMA_MODEL.halfDurationFrames
  const progress = cinemaEase(phaseProgress)
  const pitch = (incoming ? -90 * (1 - progress) : 90 * progress) || 0
  const bank = incoming
    ? CINEMA_MODEL.bankDegrees * (1 - progress)
    : CINEMA_MODEL.bankDegrees * progress

  return { frame: safeFrame, pitch, bank, parentBank: -bank || 0, childBank: bank }
}

export function sampleCinemaPhase(phase: CinemaPhase, progress: number): CinemaPose {
  const position = clamp01(Number.isFinite(progress) ? progress : 0)
  return sampleCinemaPose(
    (phase === 'outgoing' ? CINEMA_MODEL.halfDurationFrames : 0)
      + position * CINEMA_MODEL.halfDurationFrames,
  )
}

/**
 * Column-vector order, applied right to left. The translation describes the
 * orbit about an axis behind the text; no independent vertical lift is added.
 * Use on a layer with a centered transform origin and preserve-3d ancestry.
 */
export function cinemaTransform(pose: CinemaPose, depthPx: number): string {
  return `translateZ(${-depthPx}px) rotateZ(${pose.parentBank}deg) rotateX(${pose.pitch}deg) rotateZ(${pose.childBank}deg) translateZ(${depthPx}px)`
}
