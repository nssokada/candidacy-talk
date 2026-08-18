<!--
  EmotionActivations.vue — slide B: where the vectors actually come from.

  The picture is the transformer's residual stream drawn honestly: one COLUMN
  per token of the story, one BAND per block, and a cell at every intersection —
  the residual-stream vector at that token after that block. That is the object
  being averaged, so the slide has to show it rather than gesture at a stack of
  opaque "Layer" boxes with a token strip floating off to one side.

  Depth runs downward to match the mu columns slide C opens on (Layer 1 at the
  top). The layer-row pattern itself comes from emotionVizTokens so the B -> C
  seam cannot drift.
-->
<template>
  <div class="ea">
    <svg class="dg" :viewBox="`0 0 ${VB_W} ${VB_H}`" role="img"
         aria-label="Each story is passed through Gemma 2-9B-IT. The residual stream is drawn as a grid: one column per token, one band per transformer block, a vector at every intersection. Dropping the first 50 token positions and averaging the rest gives one mean per layer, and averaging across stories gives an emotional and a neutral mean.">

      <g class="scene" :class="{ 'is-back': stage >= 5 }">

        <!-- ============ story stacks (stage 0) ============
             Same card style as EmotionCorpus click 4 — the A -> B seam. The
             x12 depth stack is what B adds; A's pair does not have it. -->
        <g v-for="s in STACKS" :key="s.tone" class="pile" :class="s.tone">
          <rect v-for="k in 3" :key="k" class="ghost-card"
                :x="ST_X + (4 - k) * 4" :y="s.y + (4 - k) * 4"
                :width="ST_W" :height="ST_H" :rx="CARD_R" />
          <rect class="face" :x="ST_X" :y="s.y" :width="ST_W" :height="ST_H" :rx="CARD_R" />
          <rect class="band" :x="ST_X" :y="s.y" :width="ST_W" height="18" :rx="CARD_R" />
          <rect class="band" :x="ST_X" :y="s.y + 9" :width="ST_W" height="9" />
          <text class="head" :x="ST_X + 10" :y="s.y + 13">{{ s.head }}</text>
          <text v-for="(ln, j) in s.body" :key="ln" class="body"
                :x="ST_X + 10" :y="s.y + 34 + j * 14">{{ ln }}</text>
          <text class="tag" :x="ST_X + 12" :y="s.y + ST_H + 20">×12 retellings</text>
        </g>

        <!-- ============ the model ============ -->
        <!-- Right-aligned to the layer labels: the rotated token strings climb
             up-and-right out of the grid, so anything left-aligned here runs
             straight into "She" and "spr". -->
        <text class="mlabel" :x="LAB_X" :y="GRID_TOP - 30" text-anchor="end">Gemma 2-9B-IT</text>

        <!-- depth axis -->
        <g class="depth">
          <line :x1="AX_X" :y1="GRID_TOP + 4" :x2="AX_X" :y2="rows.bottom - 4"
                marker-end="url(#ea-depth)" />
          <text :x="AX_X - 7" :y="(GRID_TOP + rows.bottom) / 2"
                text-anchor="middle" :transform="`rotate(-90 ${AX_X - 7} ${(GRID_TOP + rows.bottom) / 2})`">depth</text>
        </g>

        <!-- token strings, above their own columns -->
        <g class="toks" :class="{ 'is-cut': stage >= 2 }">
          <text v-for="(t, i) in TOKENS" :key="i" class="tok-t" :class="{ 'is-dim': i < SKIP_N }"
                :x="colX(i)" :y="GRID_TOP - 12"
                :transform="`rotate(-45 ${colX(i)} ${GRID_TOP - 12})`">{{ t }}</text>
        </g>

        <!-- the residual streams: one vertical line per token, running through
             every block. Drawn first so the bands and cells sit on top. -->
        <line v-for="(t, i) in TOKENS" :key="`s${i}`" class="stream"
              :x1="colX(i)" :y1="GRID_TOP - 6" :x2="colX(i)" :y2="rows.bottom + 6" />

        <!-- the blocks -->
        <template v-for="(r, i) in rows" :key="i">
          <g v-if="r.kind === 'row'">
            <rect class="blk" :class="{ 'is-ell': r.ell }"
                  :x="GRID_L" :y="r.y" :width="GRID_R - GRID_L" :height="r.h" rx="4" />
            <text class="lrow-t" :class="{ 'is-ell': r.ell }" :x="LAB_X" :y="r.cy + 4"
                  text-anchor="end">{{ r.label }}</text>
          </g>
          <g v-else class="vdots">
            <circle v-for="k in 3" :key="k" :cx="LAB_X - 14" :cy="r.y + 3 + (k - 1) * 7" r="1.6" />
          </g>
        </template>

        <!-- one cell per (token, block): the residual-stream vector there.
             This is the object everything downstream averages. -->
        <g class="cells" :class="{ 'is-on': stage >= 1, 'is-swept': stage >= 2 }">
          <template v-for="(r, ri) in drawn" :key="ri">
            <rect v-for="(t, i) in TOKENS" :key="`${ri}-${i}`" class="cell"
                  :class="{ 'is-drop': stage >= 2 && i < SKIP_N, 'is-kept': stage >= 2 && i >= SKIP_N }"
                  :x="colX(i) - CELL_W / 2" :y="r.cy - CELL_H / 2"
                  :width="CELL_W" :height="CELL_H" rx="2"
                  :style="cellStyle(ri, i)" />
          </template>
        </g>

        <!-- The story going in. It is a TRANSITION, not a state: it flies to the
             grid and is fully faded by the time click 1 settles, so no resting
             state ever has a card parked on top of a cell. -->
        <g class="flyer" :class="{ 'is-in': stage >= 1 }">
          <rect class="face rose-s" :x="ST_X" :y="STACKS[0].y" :width="ST_W" :height="ST_H" :rx="CARD_R" />
        </g>

        <!-- ============ the skipped opening (click 2) ============ -->
        <g class="skip" :class="{ 'is-on': stage >= 2 }">
          <path class="brace" :d="braceD" />
          <text class="skip-t" :x="GRID_L + 4" :y="rows.bottom + 34">skip first 50 tokens</text>
          <text class="skip-s" :x="GRID_L + 4" :y="rows.bottom + 48">(stylized openings)</text>
        </g>

        <!-- ============ per-layer means (click 2) ============ -->
        <g class="means" :class="{ 'is-on': stage >= 2, 'is-flown': stage >= 3 }">
          <rect v-for="(r, i) in drawn" :key="i" class="mcell"
                :x="MEAN_X" :y="r.cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ transitionDelay: stage >= 2 && stage < 3 ? `${420 + i * 80}ms` : '0ms' }" />
        </g>

        <!-- captions share one slot: each click replaces the sentence rather
             than stacking another line under it. -->
        <text class="cap" :class="{ 'is-on': stage < 1 }" :x="GRID_L" :y="CAP_Y">
          each column is one token's residual stream · each band a transformer block
        </text>
        <text class="cap" :class="{ 'is-on': stage === 1 }" :x="GRID_L" :y="CAP_Y">
          one activation vector per token, per layer
        </text>
        <text class="cap" :class="{ 'is-on': stage === 2 }" :x="GRID_L" :y="CAP_Y">
          mean over the kept token positions, per layer
        </text>
        <text class="cap" :class="{ 'is-on': stage >= 3 }" :x="GRID_L" :y="CAP_Y">
          average across stories → one mean per layer
        </text>

        <!-- ============ ghost streams ============
             One-shot, non-looping — the idiom ThesisTimeline uses for its single
             pulse. They say "many stories", then get out of the way. -->
        <g v-if="stage >= 3" class="ghosts rose">
          <rect v-for="k in 5" :key="k" class="gcell"
                :x="MEAN_X" :y="rows[3].cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ '--dx': `${MU_E_X - MEAN_X}px`, animationDelay: `${(k - 1) * 120}ms` }" />
        </g>
        <g v-if="stage >= 4" class="ghosts blue">
          <rect v-for="k in 2" :key="k" class="gcard"
                :x="ST_X" :y="STACKS[1].y" :width="ST_W" :height="ST_H" :rx="CARD_R"
                :style="{ '--dx': `${MU_N_X - ST_X}px`, '--dy': `${rows[3].cy - STACKS[1].y - ST_H / 2}px`, animationDelay: `${(k - 1) * 160}ms` }" />
        </g>
      </g>

      <!-- ============ the mu columns ============
           NOT inside .scene: at click 5 everything else recedes and these stay
           lit. This is the state EmotionVector's stage 0 echoes. -->
      <g v-for="col in MU" :key="col.tone" class="mu" :class="[col.tone, { 'is-on': stage >= col.at }]">
        <template v-for="(r, i) in rows" :key="i">
          <rect v-if="r.kind === 'row'" class="cell"
                :x="col.x" :y="r.cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ transitionDelay: stage >= col.at ? `${col.lag + i * 60}ms` : '0ms' }" />
          <g v-else class="vdots">
            <circle v-for="k in 3" :key="k" :cx="col.x + MU_W / 2" :cy="r.y + 3 + (k - 1) * 7" r="1.6" />
          </g>
        </template>
      </g>

      <!-- ============ the closing bracket (click 5) ============ -->
      <g class="wrap" :class="{ 'is-on': stage >= 5 }">
        <path class="brace" :d="wrapD" />
        <text class="wrap-t" :x="(MU_E_X + MU_N_X + MU_W) / 2" :y="rows.bottom + 62" text-anchor="middle">
          for each of the 50 emotions × each layer
        </text>
      </g>

      <defs>
        <marker id="ea-depth" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" :fill="C.gray" />
        </marker>
      </defs>
    </svg>

    <!-- The mu labels are KaTeX in positioned HTML, not SVG text.
         Hand-stacking a sub- and a superscript with tspan dy puts them SIDE BY
         SIDE rather than one above the other, and the mu itself comes out in
         Inter — so the same symbol appeared in two different typefaces on the
         same slide as the equations. Positions are px against the 884x410
         content column, which the SVG viewBox now maps to 1:1. -->
    <div v-for="col in MU" :key="`lab-${col.tone}`"
         class="mu-lab" :class="[col.tone, { 'is-on': stage >= col.at }]"
         :style="{ left: `${col.x + MU_W / 2}px`, top: `${rows.bottom + 6}px` }"
         v-html="col.tex" />
  </div>
</template>

<script setup>
import katex from 'katex'
import { C, FONT, MONO, VB_W, VB_H, CARD_R, MU_W, MU_H, stackLayout, TOKENS } from '../emotionVizTokens.js'

const K = (s) => katex.renderToString(s, { throwOnError: false })

// stage = $clicks (0-5); every visible state is a pure function of it.
const props = defineProps({ stage: { type: Number, default: 0 } })

/* ---------- story stacks ---------- */
const ST_X = 0
const ST_W = 150
const ST_H = 62
const STACKS = [
  { tone: 'rose', y: 78,  head: 'EMOTIONAL', body: ['She sprinted through', 'the dark forest…'] },
  { tone: 'blue', y: 212, head: 'NEUTRAL',   body: ['She walked through', 'the forest…'] },
]

/* ---------- the residual-stream grid ----------
   TOKENS comes from emotionVizTokens: slide 30 draws one band with these exact
   strings, so this grid reads as "the band you already saw, stacked 42 deep". */
const SKIP_N = 4   // drawn stand-in for the 50 dropped positions

const LAB_X = 246
const AX_X = 186     // depth axis, clear of the widest layer label ("Layer 42")
const GRID_L = 258
const COL_W = 29
const colX = (i) => GRID_L + 12 + i * COL_W
const GRID_R = colX(TOKENS.length - 1) + 14

const rows = stackLayout(94)
const drawn = rows.filter((r) => r.kind === 'row')
const GRID_TOP = rows[0].y

const CELL_W = 19
const CELL_H = 13

/* The sweep collapses the kept cells rightward onto one cell per row, which then
   flies right again and settles as μₑ. */
const MEAN_X = GRID_R + 16
const MU_E_X = 700
const MU_N_X = 782
const MU = [
  { tone: 'rose', x: MU_E_X, at: 3, lag: 620, tex: K('\\mu_e^{(\\ell)}') },
  { tone: 'blue', x: MU_N_X, at: 4, lag: 380, tex: K('\\mu_n^{(\\ell)}') },
]

const CAP_Y = rows.bottom + 76

/* Per-cell transition. Stagger runs on the way IN only — a delayed exit makes
   backward stepping feel broken, so every hidden state transitions at 0ms. */
function cellStyle(ri, i) {
  const s = { '--dx': `${MEAN_X + MU_W / 2 - colX(i)}px` }
  if (props.stage === 1) s.transitionDelay = `${i * 26 + ri * 40}ms`
  else if (props.stage >= 2 && i >= SKIP_N) s.transitionDelay = `${(i - SKIP_N) * 26 + ri * 70}ms`
  else s.transitionDelay = '0ms'
  return s
}

const brace = (x1, x2, y, drop) =>
  `M ${x1} ${y} L ${x1} ${y + drop} L ${x2} ${y + drop} L ${x2} ${y}`

const braceD = brace(colX(0) - CELL_W / 2, colX(SKIP_N - 1) + CELL_W / 2, rows.bottom + 8, 8)
const wrapD = brace(MU_E_X - 6, MU_N_X + MU_W + 6, rows.bottom + 34, 10)
</script>

<style scoped>
.ea {
  position: relative;
  height: 410px;
  width: 100%;
}

.dg {
  width: 100%;
  height: 100%;
  overflow: visible;
  /* Diagram text lives in SVG text elements on purpose: style.css forces
     Inter/300 onto every div inside .slidev-layout, and SVG text escapes it. */
  font-family: v-bind(FONT);
}

.scene { opacity: 1; transition: opacity 420ms ease; }
.scene.is-back { opacity: 0.35; }

/* ---- story piles (A -> B seam) ---- */
.face { fill: v-bind('C.white'); stroke-width: 1; }
.ghost-card { fill: v-bind('C.white'); stroke-width: 1; opacity: 0.45; }

.pile.rose .face, .pile.rose .ghost-card { stroke: v-bind('C.emotion'); }
.pile.blue .face, .pile.blue .ghost-card { stroke: v-bind('C.neutral'); }
.pile.rose .band { fill: v-bind('C.emotionSoft'); }
.pile.blue .band { fill: v-bind('C.neutralSoft'); }

.head { font-size: 9px; font-weight: 600; letter-spacing: 0.06em; }
.pile.rose .head { fill: v-bind('C.emotionText'); }
.pile.blue .head { fill: v-bind('C.neutralText'); }

.body { font-size: 11px; font-weight: 400; fill: v-bind('C.ink'); }
.tag { font-size: 11px; font-weight: 500; fill: v-bind('C.desc'); }

/* ---- model furniture ---- */
.mlabel {
  font-size: 12px;
  font-weight: 600;
  fill: v-bind('C.ink');
}

.depth line { stroke: v-bind('C.gray'); stroke-width: 1; opacity: 0.55; }

.depth text {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  fill: v-bind('C.gray');
}

.lrow-t { font-size: 11px; font-weight: 400; fill: v-bind('C.desc'); }
.lrow-t.is-ell { font-weight: 600; fill: v-bind('C.ink'); }

.vdots circle { fill: v-bind('C.gray'); opacity: 0.7; }

/* ---- the grid itself ---- */
.tok-t {
  font-family: v-bind(MONO);
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.ink');
  text-anchor: start;
  transition: opacity 300ms ease;
}

.toks.is-cut .tok-t.is-dim { opacity: 0.25; }

/* The residual stream: one line per token position, running through every
   block. Light enough that the cells read as the content. */
.stream {
  stroke: v-bind('C.axisFaint');
  stroke-width: 1;
}

/* A transformer block, spanning every token position. */
.blk {
  fill: v-bind('C.panel');
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

.blk.is-ell {
  fill: v-bind('C.wash');
  stroke: v-bind('C.gray');
}

.cell {
  fill: v-bind('C.emotion');
  opacity: 0;
  transition: opacity 260ms ease, transform 460ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.cells.is-on .cell { opacity: 0.92; }

/* Dropped positions stay put and fade back; kept ones slide right onto the mean
   cell and hand over to it. */
.cells.is-swept .cell.is-drop { opacity: 0.12; }

.cells.is-swept .cell.is-kept {
  opacity: 0;
  transform: translateX(var(--dx));
}

/* ---- the flying story ---- */
/* Visible only in flight: opacity is 0 at BOTH ends, held up by a delay while
   the card travels, then dropped. Stepping back re-arms it without leaving
   anything behind. */
.flyer {
  opacity: 0;
  transform: translate(0, 0) scale(1);
  transform-box: view-box;
  transform-origin: 75px 109px;
  transition: opacity 180ms ease, transform 0ms;
}

.flyer.is-in {
  opacity: 0;
  transform: translate(214px, -8px) scale(0.28);
  transition: opacity 200ms ease 420ms, transform 560ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

/* The fade-out is the only thing that keeps it off the grid, so a browser that
   skips the animation must not leave it showing. */
.flyer.is-in > * { animation: flash-through 620ms ease 1 both; }

@keyframes flash-through {
  0%   { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; }
}

.rose-s { stroke: v-bind('C.emotion'); fill: v-bind('C.emotionSoft'); }

/* ---- the skipped opening ---- */
.skip { opacity: 0; transition: opacity 260ms ease 200ms; }
.skip.is-on { opacity: 1; }

.brace { fill: none; stroke: v-bind('C.gray'); stroke-width: 1; }

.skip-t { font-size: 11px; font-weight: 600; fill: v-bind('C.ink'); }
.skip-s { font-size: 11px; font-weight: 400; fill: v-bind('C.desc'); }

/* ---- per-layer means ---- */
.means .mcell {
  fill: v-bind('C.emotion');
  opacity: 0;
  transition: opacity 260ms ease, transform 520ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.means.is-on .mcell { opacity: 1; }

.means.is-flown .mcell {
  opacity: 0;
  transform: translateX(50px);
  transition-delay: 0ms;
}

/* ---- captions ---- */
.cap {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
  opacity: 0;
  transition: opacity 260ms ease;
}

.cap.is-on { opacity: 1; }

/* ---- ghost streams: one shot, no loop ---- */
.gcell {
  fill: v-bind('C.emotion');
  animation: fly-right 620ms cubic-bezier(0.16, 0.84, 0.44, 1) 1 both;
}

.gcard {
  fill: v-bind('C.neutralSoft');
  stroke: v-bind('C.neutral');
  stroke-width: 1;
  animation: fly-through 900ms cubic-bezier(0.16, 0.84, 0.44, 1) 1 both;
}

@keyframes fly-right {
  0%   { opacity: 0.9; transform: translateX(0); }
  70%  { opacity: 0.35; }
  100% { opacity: 0; transform: translateX(var(--dx)); }
}

@keyframes fly-through {
  0%   { opacity: 0.9; transform: translate(0, 0) scale(1); }
  45%  { opacity: 0.7; transform: translate(210px, var(--dy)) scale(0.3); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.2); }
}

/* ---- mu columns (the B -> C seam) ---- */
.mu .cell {
  opacity: 0;
  transform: scale(0.4);
  transform-box: fill-box;
  transform-origin: center;
  transition: opacity 260ms ease, transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mu.is-on .cell { opacity: 1; transform: scale(1); }

.mu .vdots { opacity: 0; transition: opacity 300ms ease; }
.mu.is-on .vdots { opacity: 1; }

.mu.rose .cell { fill: v-bind('C.emotion'); }
.mu.blue .cell { fill: v-bind('C.neutralFill'); }

/* KaTeX labels, laid over the SVG at the foot of each column. */
.mu-lab {
  position: absolute;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.mu-lab.is-on { opacity: 1; }
.mu-lab.rose { color: v-bind('C.emotionText'); }
.mu-lab.blue { color: v-bind('C.neutralText'); }
.mu-lab :deep(.katex) { font-size: 0.95rem; }

/* ---- closing bracket ---- */
.wrap { opacity: 0; transition: opacity 320ms ease 200ms; }
.wrap.is-on { opacity: 1; }
.wrap-t { font-size: 12px; font-weight: 500; fill: v-bind('C.ink'); }

@media (prefers-reduced-motion: reduce) {
  /* Same content on the same click; every draw/slide reveal becomes a fade and
     the ghost streams simply do not run. */
  .scene, .skip, .cap, .wrap, .mu .vdots, .mu-lab, .tok-t {
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
  }

  .flyer, .flyer.is-in {
    opacity: 0 !important;
    transform: none !important;
    transition: none !important;
  }

  .flyer.is-in > * { animation: none; opacity: 0; }

  .cell, .means .mcell, .mu .cell {
    transform: none !important;
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
  }

  .cells.is-swept .cell.is-kept { opacity: 0; }
  .means.is-flown .mcell { opacity: 0; }

  .gcell, .gcard { animation: none; opacity: 0; }
}
</style>
