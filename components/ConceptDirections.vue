<!--
  ConceptDirections.vue — slide 30, the concept slide that opens the Study 2
  method sequence: ANY direction in activation space can carry a concept, and a
  transformer's only moves are reads and writes of directions.

  THREE SCENES, ONE CANVAS. Stage 0 and click 1 are one scene that accumulates;
  clicks 2 and 3 each REPLACE the scene before them. Incoming scenes fade and
  rise over 250ms; outgoing scenes leave at 0ms (the house rule — a delayed exit
  makes a backward step look broken). Every visible state is a pure function of
  `stage`, so 3 -> 1 -> 3 lands exactly where it started.

  TWO THINGS THIS SLIDE OWES ITS NEIGHBOURS, and both are load-bearing:

  1. The band at click 2 is drawn from the same TOKENS as slide 33's grid, so
     that grid reads as "the band you already saw, stacked 42 deep".
  2. The pseudo-3D axes use `perspective()` from emotionVizTokens — the same tilt
     slide 34's neutral-PC plane rests at. This slide is where the audience
     learns that visual language; slide 34 spends it.

  The scene-3 cartoon (two context clouds, one shared displacement) is the naive
  version of slide 34's clicks 1-2. Same shapes on purpose: cartoon first, rigor
  later. The presenter notes carry the caveat that our stories are free
  retellings rather than the minimal pairs drawn here.
-->
<template>
  <div class="cd">
    <svg class="dg" :viewBox="`0 0 ${VB_W} ${VB_H}`" role="img"
         aria-label="Three scenes. First, king and queen plotted as nearly identical vectors in a toy three-dimensional space, with the king-to-queen displacement parallel to the man-to-woman displacement. Second, one band of the residual stream, read from and written to by attention and MLP blocks. Third, hateful and loving contexts forming two clusters whose topic-matched pairs are displaced along one shared direction.">

      <defs>
        <marker id="cd-rose" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" :fill="C.emotion" />
        </marker>
        <marker id="cd-rose-soft" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" :fill="C.emotion" opacity="0.55" />
        </marker>
        <marker id="cd-axis" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" :fill="C.axis" />
        </marker>
        <marker id="cd-op" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" :fill="C.raw" />
        </marker>

        <!-- The ghost arrow is DASHED, so its dash pattern is already spoken for
             and it cannot be drawn by animating stroke-dashoffset the way the
             hero arrow is. Instead a clip rectangle wipes across it, left to
             right, which reveals the dashes and the arrowhead in stroke order —
             the same gesture, by another mechanism. -->
        <clipPath id="cd-ghost-wipe" clipPathUnits="userSpaceOnUse">
          <!-- Driven entirely from `stage`, not from a `.ghost.is-on` descendant
               rule: this rect lives in <defs>, so it is NOT inside the .ghost
               group it belongs to and no selector rooted there can reach it. -->
          <rect class="wipe" :x="WIPE.x" :y="WIPE.y" :width="WIPE.w" :height="WIPE.h"
                :style="wipeStyle()" />
        </clipPath>
      </defs>

      <!-- The sub-caption is drawn INSIDE the svg rather than as a sibling div:
           a real sub-caption element would eat into the 410px the component is
           given, and VB_H has to stay equal to that height or every user unit
           stops being one CSS pixel. -->
      <text class="sub" :x="0" :y="15">the linear representation hypothesis</text>

      <!-- ==================================================================
           SCENE 1 (stage 0 + click 1) — words are vectors
           ================================================================== -->
      <g class="scene" :class="{ 'is-on': stage <= 1 }">

        <!-- toy axes. Labelled `illustrative` on the slide because they are:
             real features are neither axis-aligned nor this few. -->
        <g class="axes">
          <line :x1="O.x" :y1="O.y" :x2="AXIS.authority.x" :y2="AXIS.authority.y" marker-end="url(#cd-axis)" />
          <line :x1="O.x" :y1="O.y" :x2="AXIS.gender.x" :y2="AXIS.gender.y" marker-end="url(#cd-axis)" />
          <line :x1="O.x" :y1="O.y" :x2="AXIS.formality.x" :y2="AXIS.formality.y" marker-end="url(#cd-axis)" />
        </g>
        <text class="ax-lab" :x="AXIS.authority.x + 9" :y="AXIS.authority.y + 5">authority</text>
        <text class="ax-lab" :x="AXIS.gender.x - 9" :y="AXIS.gender.y - 6" text-anchor="end">gender  M → F</text>
        <text class="ax-lab" :x="AXIS.formality.x" :y="AXIS.formality.y - 11" text-anchor="middle">formality</text>
        <text class="tag" :x="O.x - 10" :y="O.y + 16" text-anchor="end">illustrative axes</text>

        <!-- The ghost pair, click 1. The two dots arrive first and the arrow is
             then drawn between them, in the same direction the hero arrow was
             just drawn: the parallelism is something the audience WATCHES
             happen, not something they have to notice about two static arrows. -->
        <g class="ghost" :class="{ 'is-on': stage >= 1 }">
          <circle class="dot gray-soft g-in" :cx="W.man.x" :cy="W.man.y" r="4.5" :style="d1(240)" />
          <circle class="dot rose-soft g-in" :cx="W.woman.x" :cy="W.woman.y" r="4.5" :style="d1(300)" />
          <line class="arr-ghost" :x1="GHOST.x1" :y1="GHOST.y1" :x2="GHOST.x2" :y2="GHOST.y2"
                :stroke-dasharray="`5 4`" marker-end="url(#cd-rose-soft)"
                clip-path="url(#cd-ghost-wipe)" />
          <text class="w-lab soft g-in" :x="W.man.x - 10" :y="W.man.y + 16" text-anchor="end"
                :style="d1(760)">man</text>
          <text class="w-lab rose soft g-in" :x="W.woman.x + 10" :y="W.woman.y + 5"
                :style="d1(820)">woman</text>
        </g>

        <!-- the hero pair. The arrowhead is a separate 2px stub: an SVG marker
             is drawn at the vertex regardless of the dash pattern, so leaving it
             on the dash-drawn line would park a rose head on `queen` before the
             arrow had left `king`. -->
        <g class="pair">
          <line class="arr"
                :x1="HERO.x1" :y1="HERO.y1" :x2="HERO.x2" :y2="HERO.y2"
                :stroke-dasharray="HERO.len" :stroke-dashoffset="stage >= 1 ? 0 : HERO.len" />
          <line class="arr head" :class="{ 'is-on': stage >= 1 }"
                :x1="HERO.x2 - HERO.ux * 2" :y1="HERO.y2 - HERO.uy * 2"
                :x2="HERO.x2" :y2="HERO.y2" marker-end="url(#cd-rose)" />
          <circle class="dot gray" :cx="W.king.x" :cy="W.king.y" r="5" />
          <circle class="dot rose" :cx="W.queen.x" :cy="W.queen.y" r="5" />
          <text class="w-lab" :x="W.king.x - 11" :y="W.king.y + 5" text-anchor="end">king</text>
          <text class="w-lab rose" :x="W.queen.x + 11" :y="W.queen.y - 5">queen</text>
        </g>

        <!-- readouts + the annotation, parked in the clear upper right. No dot
             swatches: the names are already set in each dot's own colour on the
             plot, which is what ties the two together. -->
        <g class="key">
          <text class="k-name" :x="KEY_X" :y="70">king</text>
          <text class="k-num" :x="KEY_X + 52" :y="70">[0.6, 0.6, 0.1]</text>
          <text class="k-name rose" :x="KEY_X" :y="92">queen</text>
          <text class="k-num rose" :x="KEY_X + 52" :y="92">[0.63, 0.55, 0.9]</text>
          <line class="leader" :x1="KEY_X - 8" :y1="132" :x2="W.queen.x + 26" :y2="W.queen.y + 9" />
          <text class="note" :x="KEY_X" :y="136">nearly identical vectors —</text>
          <text class="note" :x="KEY_X" :y="154">except one dimension</text>
        </g>

        <g class="cap-g" :class="{ 'is-on': stage >= 1 }">
          <text class="cap" :x="0" :y="352">{{ CAP1[0] }}</text>
          <text class="cap" :x="0" :y="371">{{ CAP1[1] }}</text>
        </g>
      </g>

      <!-- ==================================================================
           SCENE 2 (click 2) — the residual stream, and its only two moves
           ================================================================== -->
      <g class="scene" :class="{ 'is-on': stage === 2 }">

        <!-- The stream ASSEMBLES rather than appearing: the two components drop
             in, the band fills left to right one token at a time, and only then
             do the reads and writes connect them. That order is the caption's
             sentence, staged — components, stream, and the two moves between. -->
        <g class="blocks">
          <template v-for="(b, bi) in BLOCKS" :key="b.label">
            <rect class="blk stg up" :x="b.x" :y="BLK_Y" :width="BLK_W" :height="BLK_H" rx="6"
                  :style="d2(40 + bi * 60)" />
            <text class="blk-t stg up" :x="b.x + BLK_W / 2" :y="BLK_Y + BLK_H / 2 + 5" text-anchor="middle"
                  :style="d2(90 + bi * 60)">{{ b.label }}</text>
            <!-- read: band -> block.  write: block -> band.  Direction is the
                 only cue that distinguishes them, which is the point. -->
            <line class="op stg" :x1="b.x + 45" :y1="BAND_Y - 6" :x2="b.x + 45" :y2="BLK_Y + BLK_H + 6"
                  marker-end="url(#cd-op)" :style="d2(430 + bi * 60)" />
            <line class="op stg" :x1="b.x + BLK_W - 45" :y1="BLK_Y + BLK_H + 6" :x2="b.x + BLK_W - 45" :y2="BAND_Y - 6"
                  marker-end="url(#cd-op)" :style="d2(480 + bi * 60)" />
          </template>
        </g>

        <!-- one band of the stream: one cell per token position. Shade encodes
             activation magnitude — the same convention slide 33's grid uses.
             Each cell's target opacity IS its magnitude, so the reveal has to be
             bound inline rather than driven by a class. -->
        <g class="band">
          <rect v-for="(t, i) in TOKENS" :key="`c${i}`" class="scell"
                :x="cellX(i)" :y="BAND_Y" :width="CELL_W" :height="CELL_H" rx="5"
                :style="cellStyle(i)" />
          <rect class="pick stg" :x="cellX(PICK) - 2.5" :y="BAND_Y - 2.5"
                :width="CELL_W + 5" :height="CELL_H + 5" rx="7" :style="d2(600)" />
          <text v-for="(t, i) in TOKENS" :key="`t${i}`" class="tok stg"
                :x="cellX(i) + CELL_W / 2" :y="BAND_Y + CELL_H + 16" text-anchor="middle"
                :style="d2(220 + i * 16)">{{ t }}</text>
        </g>

        <line class="stub stg" :x1="cellX(PICK) + CELL_W / 2" :y1="272" :x2="cellX(PICK) + CELL_W / 2" :y2="284"
              :style="d2(650)" />
        <text class="note stg" :x="cellX(PICK) + CELL_W / 2" :y="296" text-anchor="middle" :style="d2(690)">
          each column is <tspan class="mathish">h</tspan> — the running vector for that token
        </text>

        <text class="cap stg" :x="0" :y="336" :style="d2(740)">{{ CAP2[0] }}</text>
        <text class="cap stg" :x="0" :y="355" :style="d2(780)">{{ CAP2[1] }}</text>
      </g>

      <!-- ==================================================================
           SCENE 3 (click 3) — whole contexts move the same way
           ================================================================== -->
      <g class="scene" :class="{ 'is-on': stage === 3 }">

        <g class="axes flat stg" :style="d3(0)">
          <line :x1="S3.ox" :y1="S3.oy" :x2="S3.ox" :y2="70" />
          <line :x1="S3.ox" :y1="S3.oy" :x2="790" :y2="S3.oy" />
        </g>

        <ellipse class="cloud gray stg grow" :cx="HATE.cx" :cy="HATE.cy" :rx="HATE.rx" :ry="HATE.ry"
                 :style="d3(40, `${HATE.cx}px ${HATE.cy}px`)" />
        <ellipse class="cloud rose stg grow" :cx="LOVE.cx" :cy="LOVE.cy" :rx="LOVE.rx" :ry="LOVE.ry"
                 :style="d3(100, `${LOVE.cx}px ${LOVE.cy}px`)" />
        <text class="cl-lab stg" :x="HATE.cx" :y="HATE.cy - HATE.ry - 12" text-anchor="middle"
              :style="d3(160)">hateful contexts</text>
        <text class="cl-lab rose stg" :x="LOVE.cx" :y="LOVE.cy + LOVE.ry + 22" text-anchor="middle"
              :style="d3(200)">loving contexts</text>

        <!-- thin rays from the origin: these are vectors, not free-floating dots -->
        <line v-for="(p, i) in S3_PTS" :key="`r${i}`" class="ray stg"
              :x1="S3.ox" :y1="S3.oy" :x2="p.x" :y2="p.y" :style="d3(180 + i * 30)" />

        <!-- The two matched-pair displacements. They draw TOGETHER, on one
             delay: the whole claim of this scene is that the two contexts move
             the same way, and watching one stroke chase the other would say the
             opposite. Heads land as the strokes arrive (see the hero arrow). -->
        <template v-for="(s, i) in S3_ARROWS" :key="`a${i}`">
          <line class="arr" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2"
                :stroke-dasharray="s.len" :stroke-dashoffset="stage === 3 ? 0 : s.len"
                :style="d3(420)" />
          <line class="arr head stg" :x1="s.x2 - s.ux * 2" :y1="s.y2 - s.uy * 2"
                :x2="s.x2" :y2="s.y2" marker-end="url(#cd-rose)" :style="d3(800)" />
        </template>

        <line class="leader stg" :x1="480" :y1="138" :x2="480" :y2="154" :style="d3(900)" />
        <text class="dir-lab stg" :x="480" :y="130" text-anchor="middle" :style="d3(930)">the “love” direction</text>

        <template v-for="(p, i) in S3_PTS" :key="`p${i}`">
          <circle class="dot stg" :class="p.tone" :cx="p.x" :cy="p.y" r="4.5" :style="d3(210 + i * 30)" />
          <text class="s-lab stg" :class="p.tone" :x="p.lx" :y="p.ly" :text-anchor="p.anchor"
                :style="d3(330 + i * 30)">{{ p.text }}</text>
        </template>

        <text class="cap stg" :x="0" :y="364" :style="d3(980)">{{ CAP3[0] }}</text>
        <text class="cap stg" :x="0" :y="383" :style="d3(1020)">{{ CAP3[1] }}</text>
      </g>
    </svg>

    <!-- The two operations, in KaTeX over the svg. Same treatment as slide 34's
         equations: the deck sets its maths in KaTeX, and a tspan-stacked
         superscript would put a transpose beside the h instead of above it.
         Positions are px against the 884-wide column the viewBox maps 1:1. -->
    <div class="op-lab" :class="{ 'is-on': stage === 2 }"
         :style="{ left: '248px', top: '178px', transform: 'translateX(-100%)', ...d2(520) }">
      <span>read</span><span v-html="EQ_READ" />
    </div>
    <div class="op-lab" :class="{ 'is-on': stage === 2 }"
         :style="{ left: '636px', top: '178px', ...d2(570) }">
      <span>write</span><span v-html="EQ_WRITE" />
    </div>
  </div>
</template>

<script setup>
import katex from 'katex'
import { C, FONT, MONO, VB_W, VB_H, TOKENS, perspective } from '../emotionVizTokens.js'

const K = (s) => katex.renderToString(s, { throwOnError: false })

// stage = $clicks (0-3); every visible state is a pure function of it.
const props = defineProps({ stage: { type: Number, default: 0 } })

/* ---------- staging ----------
   Each scene is choreographed by per-element transition DELAYS. The delay must
   collapse to 0 the moment the scene is not showing, or stepping backwards
   would play the choreography in reverse over a second and a half — the deck's
   rule is that entrances stage and exits are instant. So the delay is a
   function of stage, exactly like everything else on the slide.

   d1 = click 1 within scene 1;  d2 = scene 2;  d3 = scene 3. */
const delay = (on, ms, origin) => ({
  transitionDelay: on ? `${ms}ms` : '0ms',
  ...(origin ? { transformOrigin: origin } : {}),
})
const d1 = (ms) => delay(props.stage >= 1, ms)
const d2 = (ms) => delay(props.stage === 2, ms)
const d3 = (ms, origin) => delay(props.stage === 3, ms, origin)

/* ==========================================================================
   SCENE 1 — the toy space

   Three axes from ONE projection: `authority` and `gender` are directions in
   the ground plane, `formality` is height above it. The ground plane is tilted
   by exactly the angle slide 34's PC plane rests at, which is why a point's
   depth compresses and shrinks the way the audience will need it to there.
   ========================================================================== */
const O = { x: 120, y: 300 }

const AX = {
  authority: { u: 240, v: -50 },   // right, and slightly toward the viewer
  gender:    { u: 175, v: 250 },   // right, and away
  formality: 150,                  // straight up
}

/* (authority, formality, gender), each in [0, 1] -> screen.

   Infinity = no perspective divide. See the note on `perspective()`: with the
   divide in, the two displacement arrows converge by several degrees and the
   slide quietly contradicts its own caption. */
function pt(a, f, g) {
  const p = perspective(
    a * AX.authority.u + g * AX.gender.u,
    a * AX.authority.v + g * AX.gender.v,
    f * AX.formality,
    Infinity,
  )
  return { x: O.x + p.x, y: O.y + p.y }
}

const AXIS = {
  authority: pt(1, 0, 0),
  gender:    pt(0, 0, 1),
  formality: pt(0, 1, 0),
}

/* king and queen differ by 0.03 in authority and 0.05 in formality, and by 0.8
   in gender: "nearly identical vectors — except one dimension" has to be true
   of the numbers on the slide, not just of the picture.

   man and woman carry the SAME displacement (+0.03, -0.05, +0.80), offset from
   the hero pair by +0.30 in authority and -0.40 in formality. That offset is
   chosen for the PICTURE, not for the semantics — it puts ~95px between the two
   arrows so they read as two, and the axes are labelled illustrative precisely
   so nobody reads a claim off man's authority coordinate. */
const W = {
  king:  pt(0.60, 0.60, 0.10),
  queen: pt(0.63, 0.55, 0.90),
  man:   pt(0.90, 0.20, 0.10),
  woman: pt(0.93, 0.15, 0.90),
}

/* Trim both ends so the arrowhead lands beside the dot, not on top of it. */
function seg(p, q, tA, tB) {
  const dx = q.x - p.x
  const dy = q.y - p.y
  const L = Math.hypot(dx, dy)
  const ux = dx / L
  const uy = dy / L
  return {
    x1: p.x + ux * tA, y1: p.y + uy * tA,
    x2: q.x - ux * tB, y2: q.y - uy * tB,
    len: L - tA - tB, ux, uy,
  }
}

const HERO = seg(W.king, W.queen, 8, 9)
const GHOST = seg(W.man, W.woman, 8, 9)

/* The box the ghost arrow's wipe sweeps across. Padded so the dashes and the
   arrowhead are never clipped at rest, and anchored on its own left edge. */
const WIPE = {
  x: Math.min(GHOST.x1, GHOST.x2) - 14,
  y: Math.min(GHOST.y1, GHOST.y2) - 16,
  w: Math.abs(GHOST.x2 - GHOST.x1) + 28,
  h: Math.abs(GHOST.y2 - GHOST.y1) + 32,
}

/* The transition is inline and conditional rather than in the stylesheet, for
   the same reason every other reveal here puts it on the is-on rule: at stage 0
   there must be no transition at all, or stepping back would play the wipe
   closed over half a second instead of cutting. */
const wipeStyle = () => ({
  transformOrigin: `${WIPE.x}px ${WIPE.y + WIPE.h / 2}px`,
  transform: props.stage >= 1 ? 'scaleX(1)' : 'scaleX(0)',
  transition: props.stage >= 1
    ? 'transform 480ms cubic-bezier(0.16, 0.84, 0.44, 1) 360ms'
    : 'none',
})

const KEY_X = 600

const CAP1 = [
  'The concept is the direction of the displacement, not an axis: king → queen and man → woman move the same way.',
  'Any direction in the space can carry a concept.',
]

/* ==========================================================================
   SCENE 2 — one band of the residual stream

   Cells are gray here, not rose: on this slide the band is the machinery, and
   rose is reserved for the concept direction. Slide 33 re-colours the same
   drawing once "emotional" and "neutral" mean something.
   ========================================================================== */
const CELL_W = 48
const CELL_H = 32
const CELL_GAP = 8
const BAND_W = TOKENS.length * (CELL_W + CELL_GAP) - CELL_GAP
const BAND_X = (VB_W - BAND_W) / 2
const BAND_Y = 214
const cellX = (i) => BAND_X + i * (CELL_W + CELL_GAP)

/* Fixed, not random: a re-render mid-talk must not reshade the band. */
const MAG = [0.42, 0.66, 0.35, 0.78, 0.30, 0.55, 0.88, 0.38, 0.72, 0.50, 0.61, 0.44]
const PICK = 8   // "heart" — a token whose vector plainly carries more than a word

/* A cell's resting opacity IS its activation magnitude, so its reveal cannot be
   a class — the target differs per cell. Bound inline, staggered left to right
   so the band fills in reading order. */
const cellStyle = (i) => ({
  opacity: props.stage === 2 ? 0.3 + 0.6 * MAG[i] : 0,
  transitionDelay: props.stage === 2 ? `${180 + i * 16}ms` : '0ms',
})

const BLK_Y = 92
const BLK_H = 52
const BLK_W = 200
const BLOCKS = [
  { label: 'attention', x: (VB_W - (2 * BLK_W + 58)) / 2 },
  { label: 'MLP',       x: (VB_W - (2 * BLK_W + 58)) / 2 + BLK_W + 58 },
]

const EQ_READ = K('h^{\\top} v')
const EQ_WRITE = K('h + v')

const CAP2 = [
  "Every component's only moves are linear: project h onto a direction, or add a direction to h.",
  "Concepts-as-directions is the stream's native code — and anything the model can write, we can write too.",
]

/* ==========================================================================
   SCENE 3 — the cartoon of the method

   Matched pairs, same content and opposite feeling, displaced along one shared
   direction. Slide 34 does this for real; here it is a picture you can hold.
   ========================================================================== */
const S3 = { ox: 110, oy: 330 }
const HATE = { cx: 330, cy: 145, rx: 88, ry: 56 }
const LOVE = { cx: 640, cy: 235, rx: 92, ry: 58 }

/* Sentence labels sit on the OUTSIDE of each cluster — above the gray one, below
   the rose one — because the arrows leave the gray cluster to the right and
   arrive at the rose one from the upper left. Everything else collides. */
const S3_PTS = [
  { x: 312, y: 124, tone: 'gray', text: 'I hate the world',  lx: 312, ly: 108, anchor: 'middle' },
  { x: 352, y: 168, tone: 'gray', text: 'I dislike cats',    lx: 344, ly: 172, anchor: 'end' },
  { x: 612, y: 189, tone: 'rose', text: 'I love the world',  lx: 612, ly: 209, anchor: 'middle' },
  { x: 652, y: 233, tone: 'rose', text: 'I adore cats',      lx: 652, ly: 253, anchor: 'middle' },
]

// world -> world and cats -> cats: same delta, by construction.
const S3_ARROWS = [
  seg(S3_PTS[0], S3_PTS[2], 8, 9),
  seg(S3_PTS[1], S3_PTS[3], 8, 9),
]

const CAP3 = [
  'Matched pairs — same content, opposite feeling — displace along one shared direction.',
  'Average many such displacements and you have the concept vector. (This is the whole method, in miniature.)',
]
</script>

<style scoped>
.cd {
  position: relative;
  height: 410px;
  width: 100%;
}

.dg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  font-family: v-bind(FONT);
}

/* ---- scenes ----
   The GROUP only gates visibility — it comes up fast and flat, because the
   choreography belongs to the elements inside it. A slow fade on the group
   plus staged children reads as mush; a quick group plus staged children reads
   as the picture assembling itself.

   Declaring the transition only on `.is-on` is what buys the instant exit, and
   it is what makes stepping backwards land on the same picture the forward step
   drew. */
.scene {
  opacity: 0;
  pointer-events: none;
}

.scene.is-on {
  opacity: 1;
  transition: opacity 140ms ease;
}

/* ---- staged reveals ----
   The hidden state carries NO transition, so every exit is instantaneous; the
   transition lives on the `.is-on` rule and the delay comes from d2()/d3(),
   which return 0ms whenever the scene is off. Add `up` to rise into place,
   `grow` to scale up about a bound origin. */
.stg { opacity: 0; }
.stg.up { transform: translateY(9px); }
.stg.grow { transform: scale(0.9); }

/* --soft, not a literal 1: several of these elements are deliberately faint at
   rest (the rays, the ghost pair), and a reveal that ended at full opacity
   would quietly restyle them. Each such element declares its own resting
   opacity as --soft and NOTHING declares opacity directly, so the hidden state
   stays a clean 0. */
.scene.is-on .stg {
  opacity: var(--soft, 1);
  transform: none;
  transition: opacity 260ms ease, transform 320ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.g-in { opacity: 0; }

.ghost.is-on .g-in {
  opacity: var(--soft, 1);
  transition: opacity 240ms ease;
}

/* ---- type ---- */
.sub {
  font-size: 14px;
  font-weight: 400;
  fill: #5b6472;   /* .wet-sub's colour: this line stands in for that element */
}

.cap {
  font-size: 13px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.cap-g {
  opacity: 0;
}

.cap-g.is-on {
  opacity: 1;
  transition: opacity 250ms ease 120ms;
}

.note {
  font-size: 12px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.mathish {
  font-family: 'KaTeX_Math', 'Crimson Pro', Georgia, serif;
  font-style: italic;
  font-size: 13px;
}

.tag {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.ax-lab {
  font-size: 12px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.w-lab {
  font-size: 12.5px;
  font-weight: 500;
  fill: v-bind('C.inkDeep');
}

.w-lab.rose { fill: v-bind('C.emotionText'); }
.w-lab.soft { --soft: 0.78; font-weight: 400; }

.k-name {
  font-size: 12.5px;
  font-weight: 500;
  fill: v-bind('C.inkDeep');
}

.k-name.rose { fill: v-bind('C.emotionText'); }

.k-num {
  font-family: v-bind(MONO);
  font-size: 11.5px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.k-num.rose { fill: v-bind('C.emotionText'); }

/* ---- scene 1 geometry ---- */
.axes line {
  stroke: v-bind('C.axis');
  stroke-width: 1.2;
}

.axes.flat line {
  stroke: v-bind('C.axisFaint');
  stroke-width: 1.4;
}

.dot { fill: v-bind('C.gray'); }
.dot.rose { fill: v-bind('C.emotion'); }
.dot.gray { fill: v-bind('C.gray'); }
.dot.gray-soft { fill: v-bind('C.gray'); --soft: 0.62; }
.dot.rose-soft { fill: v-bind('C.emotion'); --soft: 0.72; }

/* The hero arrow DRAWS on click 1 — stroke-dashoffset, the deck's own idiom.
   It is declared once, so the transition rides the offset binding rather than a
   class, and stepping back simply restores the offset. */
.arr {
  stroke: v-bind('C.emotion');
  stroke-width: 2.4;
  fill: none;
  transition: stroke-dashoffset 450ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

/* The head lands as the stroke arrives, not before it. */
.arr.head { opacity: 0; }
.arr.head.is-on { opacity: 1; transition: opacity 140ms ease 380ms; }

.arr-ghost {
  stroke: v-bind('C.emotion');
  stroke-width: 1.9;
  fill: none;
  opacity: 0.75;
}

/* The group itself no longer fades: every child hides on its own (the dots and
   labels via .g-in, the arrow via the wipe), which is what lets them arrive in
   sequence instead of together. */

.leader {
  stroke: v-bind('C.axis');
  stroke-width: 1;
}

/* ---- scene 2 ---- */
.blk {
  fill: v-bind('C.raw');
  fill-opacity: 0.15;
  stroke: v-bind('C.raw');
  stroke-width: 1.1;
}

.blk-t {
  font-size: 13px;
  font-weight: 500;
  fill: v-bind('C.rawText');
}

.op {
  stroke: v-bind('C.raw');
  stroke-width: 1.6;
}

.scell { fill: v-bind('C.gray'); }

/* Opacity is bound inline (it encodes magnitude), so only the transition lives
   here — and only while the scene is up, which keeps the exit instant. */
.scene.is-on .scell { transition: opacity 260ms ease; }

.pick {
  fill: none;
  stroke: v-bind('C.emotionText');
  stroke-width: 1.5;
}

.tok {
  font-family: v-bind(MONO);
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.stub {
  stroke: v-bind('C.axis');
  stroke-width: 1;
}

.op-lab {
  position: absolute;
  display: flex;
  align-items: baseline;
  gap: 7px;
  font-family: v-bind(FONT);
  font-size: 12.5px;
  color: v-bind('C.rawText');
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
}

.op-lab.is-on {
  opacity: 1;
  transition: opacity 250ms ease;
}

.op-lab :deep(.katex) { font-size: 1.05em; }

/* ---- scene 3 ---- */
.cloud {
  stroke-width: 1;
}

.cloud.gray {
  fill: v-bind('C.gray');
  fill-opacity: 0.09;
  stroke: v-bind('C.gray');
  stroke-opacity: 0.35;
}

.cloud.rose {
  fill: v-bind('C.emotion');
  fill-opacity: 0.14;
  stroke: v-bind('C.emotion');
  stroke-opacity: 0.5;
}

.cl-lab {
  font-size: 12.5px;
  font-weight: 500;
  fill: v-bind('C.gray');
}

.cl-lab.rose { fill: v-bind('C.emotionText'); }

.ray {
  stroke: v-bind('C.axis');
  stroke-width: 0.9;
  --soft: 0.75;
}

.s-lab {
  font-size: 11.5px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.s-lab.rose { fill: v-bind('C.emotionText'); }

.dir-lab {
  font-size: 12.5px;
  font-weight: 500;
  fill: v-bind('C.emotionText');
}

/* ---- reduced motion ----
   Same content on the same click; every reveal becomes a plain fade, the scene
   swaps become crossfades, and the hero arrow is simply there. */
@media (prefers-reduced-motion: reduce) {
  .scene, .scene.is-on, .cap-g, .cap-g.is-on, .op-lab, .op-lab.is-on,
  .arr.head, .arr.head.is-on, .stg, .scene.is-on .stg, .g-in, .ghost.is-on .g-in {
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
    transform: none !important;
  }

  /* Both arrow-drawing mechanisms stop being animations and become states.
     The wipe still opens — it is what makes the ghost arrow visible at all —
     it just opens instantly. */
  .arr { transition: none !important; }
  .wipe { transition: none !important; }
}
</style>
