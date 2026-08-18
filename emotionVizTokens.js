/* -----------------------------------------------------------------------------
   emotionVizTokens.js — shared palette + geometry for the emotion-vector
   extraction sequence (EmotionCorpus / EmotionActivations / EmotionVector).

   Every hue the three components draw comes from here. No component hardcodes a
   colour: the sequence has to read as one object moving across three slides, and
   that only holds if the rose/blue/purple/amber roles are defined once.

   The palette is the deck's, not a new one. Each role carries the deck's
   two-tone treatment — a fill/dot hue plus a deepened companion for text, the
   move VennJoin.vue and ThesisTimeline.vue already make (11px of #e8bd8a on
   white is unreadable, so amber text is #b3813f).

   The blue is NOT invented: VennJoin's effort lobe is fill #8fa9c9 at 0.30
   opacity over white with a #5b7fa6 stroke. The flat fill below is that
   composite (0.30 * #8fa9c9 over #ffffff), so a solid blue card here and the
   translucent blue lobe on slide 8 are the same blue.
   ----------------------------------------------------------------------------- */

export const C = {
  // emotional / rose — VennJoin's threat lobe, ThesisTimeline's c2
  emotion:     '#d09aa4',
  emotionText: '#a86b78',
  emotionSoft: '#f3e3e6', // 0.30 over white, for card fills

  // neutral / blue — VennJoin's effort lobe
  neutral:     '#5b7fa6',
  neutralFill: '#8fa9c9',
  neutralText: '#4a6a8c',
  neutralSoft: '#dfe6ef', // 0.30 * #8fa9c9 over white — the VennJoin composite

  // raw contrast d — ThesisTimeline's c1 purple
  raw:         '#9b8ec4',
  rawText:     '#6d5f9e',
  rawSoft:     '#a79bc4', // the in-plane component P d: the same purple, greyed

  // the answer, v-tilde and v — ThesisTimeline's c3 amber
  vec:         '#e8bd8a',
  vecText:     '#b3813f',

  // structure
  gray:        '#8b919b',
  axis:        '#c8ccd3',
  axisFaint:   '#e6e9ee', // the scatter's own axes: present, never competing
  desc:        '#7c848f',
  rule:        '#dfe2e7',
  ink:         '#4a5568',
  inkDeep:     '#2d3748', // the deck's body-copy ink, for numerals that carry weight
  white:       '#ffffff',

  // surfaces — no hue, but they belong here so a card fill is never guessed at
  panel:       '#fbfbfc', // prompt box, model box, the steering strip
  wash:        '#f2f4f7', // a highlighted row
  thumbFill:   '#eef0f3', // topic-thumbnail placeholder
  planeFill:   '#eceff3', // the neutral-PC plane
}

/* Type. Crimson Pro h1 is drawn by the academic-content layout; everything a
   component draws is Inter, in SVG <text> so it escapes the global
   `div { font-family: Inter !important; font-weight: 300 !important }` in
   style.css (101-106). Mono is the deck's own — slides.md frontmatter loads
   Fira Code. */
export const FONT = "'Inter', sans-serif"
export const MONO = "'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace"

/* Geometry. Authored against the academic-content content column (884px) and
   the 410-414px content height the deck's other diagram slides reserve. */
export const VB_W = 884
export const VB_H = 414

/* Easings, lifted from the idioms already in the deck. */
export const EASE_ZOOM = 'cubic-bezier(0.16, 0.84, 0.44, 1)' // ThesisTimeline's slot collapse
export const EASE_POP  = 'cubic-bezier(0.34, 1.56, 0.64, 1)' // ThesisTimeline's dot pop

/* Card geometry, shared across the A -> B seam. A's click-4 story pair and B's
   stage-0 story stacks must read as the same object; that only works if the
   corner radius and stroke come from one place. */
export const CARD_R = 6

/* Deterministic jitter for slide C's dot clouds.

   Math.random() is banned here: every visible state has to be a pure function of
   $clicks, and a re-render (or a backward step, or a reload mid-talk) that
   reshuffles the cloud would break that. mulberry32 is a 32-bit PRNG — same seed,
   same cloud, forever. */
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* A gaussian-ish cloud of n points about (cx, cy), squashed to the ellipse
   (sx, sy). Sum-of-three-uniforms stands in for a normal: cheap, and it keeps
   every point inside a bounded radius so the cloud can't throw an outlier
   across the slide. */
/* -----------------------------------------------------------------------------
   The layer stack and the mu columns.

   These live here, not in a component, because they are the B -> C seam: the mu
   columns EmotionActivations leaves on screen and the ones EmotionVector opens
   on have to be the same object — same cell size, same cell count, same hue,
   same label style — or slide C's first move (the columns morphing into
   centroids) reads as a new diagram rather than a continuation.

   The pattern is Gemma 2-9B-IT's 42 layers drawn as four concrete rows with two
   elided runs. Concrete 42, never "Layer L".
   ----------------------------------------------------------------------------- */
export const STACK = [
  { kind: 'row', label: 'Layer 1' },
  { kind: 'row', label: 'Layer 2' },
  { kind: 'dots' },
  { kind: 'row', label: 'Layer ℓ', ell: true },
  { kind: 'dots' },
  { kind: 'row', label: 'Layer 42' },
]

export const ROW_H = 26
export const ROW_GAP = 6
export const DOTS_H = 20

/* Lay the pattern out from y0 down: one entry per STACK item with its box and
   centre line. The drawn rows are what a mu column puts a cell on. */
export function stackLayout(y0) {
  let y = y0
  const out = STACK.map((s) => {
    const h = s.kind === 'row' ? ROW_H : DOTS_H
    const e = { ...s, y, h, cy: y + h / 2 }
    y += h + ROW_GAP
    return e
  })
  out.bottom = y - ROW_GAP
  return out
}

export const MU_W = 30 // mu-column cell width
export const MU_H = 20 // mu-column cell height

export function cloud(n, cx, cy, sx, sy, seed) {
  const r = rng(seed)
  const pts = []
  for (let i = 0; i < n; i++) {
    const gx = (r() + r() + r()) / 1.5 - 1
    const gy = (r() + r() + r()) / 1.5 - 1
    pts.push({ x: cx + gx * sx, y: cy + gy * sy, i })
  }
  return pts
}
