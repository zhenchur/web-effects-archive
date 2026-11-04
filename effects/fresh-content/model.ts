export interface DrumLayoutOptions {
  height: number
  fontSize: number
  lineCount: number
  /** Stage-local vertical center of the largest line. Defaults to height / 2. */
  focusY?: number
  /** The CSS line-height multiplier used by every row. */
  lineHeight?: number
  /** Optional extra spacing as a fraction of line-height. Defaults to zero. */
  gap?: number
  /** Smallest font-size ratio, including while a row crosses a viewport edge. */
  minScale?: number
  /** Width of the central lens relative to the stage height. Defaults to .45. */
  spread?: number
}

export interface DrumLayout {
  readonly height: number
  readonly focusY: number
  readonly fontSize: number
  readonly lineCount: number
  readonly lineHeight: number
  readonly gap: number
  readonly pitch: number
  readonly minScale: number
  readonly spread: number
  readonly curveWidth: number
  readonly lensAmplitude: number
}

export interface DrumLineSample {
  /** Stage-local position of the line's center, in pixels. */
  y: number
  /** Font-size ratio; apply to fontSize rather than a CSS scale transform. */
  scale: number
  opacity: number
  visible: boolean
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value))

const finite = (value: number | undefined, fallback: number, minimum: number, maximum: number) =>
  clamp(typeof value === 'number' && Number.isFinite(value) ? value : fallback, minimum, maximum)

/**
 * A reversible typographic lens with shared boundaries between adjacent rows.
 *
 * Map each source-row boundary d through B(d) = pitch * (minScale * d +
 * lensAmplitude * tanh(d / curveWidth)). A row occupies B(d-.5)..B(d+.5),
 * so its font size and center derive from the same two edges. Adjacent line
 * boxes meet exactly with the default zero gap, even between scroll steps.
 * The positive linear term carries readable rows beyond both viewport edges;
 * there is no asymptotic disappearance or opacity fade before clipping.
 */
export function createDrumLayout(options: DrumLayoutOptions): DrumLayout {
  const height = finite(options.height, 800, 1, 1_000_000)
  const fontSize = finite(options.fontSize, 128, 1, 1_000_000)
  const lineCount = Math.floor(finite(options.lineCount, 1, 1, 1_000_000))
  const lineHeight = finite(options.lineHeight, 0.9, 0.1, 10)
  const gap = finite(options.gap, 0, 0, 10)
  const minScale = finite(options.minScale, 0.16, 0.01, 1)
  const spread = finite(options.spread, 0.45, 0.05, 4)
  const focusY = finite(options.focusY, height / 2, 0, height)
  const pitch = fontSize * lineHeight * (1 + gap)
  // Matching stage-relative width keeps mobile and desktop lens shapes alike.
  const curveWidth = Math.max(0.25, height / pitch * spread)
  const lensAmplitude = (1 - minScale) / (2 * Math.tanh(0.5 / curveWidth))

  return Object.freeze({
    height,
    focusY,
    fontSize,
    lineCount,
    lineHeight,
    gap,
    pitch,
    minScale,
    spread,
    curveWidth,
    lensAmplitude,
  })
}

/** Progress 0 focuses the first row; progress 1 focuses the final row. */
export function sampleDrumLine(layout: DrumLayout, index: number, progress: number): DrumLineSample {
  if (!Number.isInteger(index) || index < 0 || index >= layout.lineCount) {
    return { y: layout.focusY, scale: 0, opacity: 0, visible: false }
  }

  const position = finite(progress, 0, 0, 1) * (layout.lineCount - 1)
  const offset = index - position
  const before = Math.tanh((offset - 0.5) / layout.curveWidth)
  const after = Math.tanh((offset + 0.5) / layout.curveWidth)
  const y = layout.focusY + layout.pitch * (
    layout.minScale * offset + layout.lensAmplitude * (before + after) / 2
  )
  const scale = clamp(
    layout.minScale + layout.lensAmplitude * (after - before),
    layout.minScale,
    1,
  )
  const halfHeight = layout.fontSize * layout.lineHeight * scale / 2

  return { y, scale, opacity: 1, visible: y + halfHeight > 0 && y - halfHeight < layout.height }
}
