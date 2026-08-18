<template>
  <div class="ea">
    <svg class="dg" :viewBox="`0 0 ${VB_W} ${VB_H}`" role="img"
         aria-label="Each story is passed through Gemma 2-9B-IT; token activations after position 50 are averaged per layer, then averaged across stories to give an emotional mean and a neutral mean per layer">

      <!-- Everything except the two mu columns dims at click 5. -->
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
          <text class="tag" :x="ST_X + 14" :y="s.y + ST_H + 20">×12 retellings</text>
        </g>

        <!-- ============ the model ============ -->
        <g class="model">
          <rect class="mbox" :x="M_X" :y="M_Y" :width="M_W" :height="M_H" rx="8" />
          <text class="mlabel" :x="M_X + M_W / 2" :y="M_Y + 24" text-anchor="middle">Gemma 2-9B-IT</text>
          <template v-for="(r, i) in rows" :key="i">
            <g v-if="r.kind === 'row'">
              <rect class="lrow" :class="{ 'is-ell': r.ell }"
                    :x="M_X + 16" :y="r.y" :width="M_W - 32" :height="r.h" rx="4" />
              <text class="lrow-t" :class="{ 'is-ell': r.ell }"
                    :x="M_X + M_W / 2" :y="r.cy + 4" text-anchor="middle">{{ r.label }}</text>
            </g>
            <g v-else class="vdots">
              <circle v-for="k in 3" :key="k" :cx="M_X + M_W / 2" :cy="r.y + 3 + (k - 1) * 7" r="1.6" />
            </g>
          </template>
        </g>

        <!-- ============ the flying story (click 1) ============
             One rose card translates into the model box and shrinks, then stops
             being drawn once it is "inside" at click 2. -->
        <g class="flyer" :class="{ 'is-in': stage >= 1, 'is-gone': stage >= 2 }">
          <rect class="face rose-s" :x="ST_X" :y="STACKS[0].y" :width="ST_W" :height="ST_H" :rx="CARD_R" />
        </g>

        <!-- ============ token strip apparatus (clicks 1-2) ============ -->
        <g class="strip" :class="{ 'is-on': stage >= 1, 'is-gone': stage >= 3 }">
          <text class="cap" :x="TS_X" :y="TS_Y - 14">one story, at layer ℓ</text>
          <rect v-for="(t, i) in TOKENS" :key="i" class="tok"
                :class="{ 'is-dim': stage >= 2 && i < SKIP_N, 'is-swept': stage >= 2 && i >= SKIP_N }"
                :x="TS_X + i * (TOK + 2)" :y="TS_Y" :width="TOK" :height="TOK" rx="2"
                :style="{ '--dx': `${MEAN_X - (TS_X + i * (TOK + 2))}px`, transitionDelay: stage >= 2 ? `${(i - SKIP_N) * 22}ms` : '0ms' }" />

          <!-- the subtle point, on its own click -->
          <g class="skip" :class="{ 'is-on': stage >= 2 }">
            <path class="brace" :d="braceD" />
            <text class="skip-t" :x="TS_X" :y="TS_Y + 36">skip first 50 tokens</text>
            <text class="skip-s" :x="TS_X" :y="TS_Y + 50">(stylized openings)</text>
          </g>
        </g>

        <!-- ============ the per-layer mean cells (click 2) ============
             The collapse, repeated down the stack: one cell on every drawn layer
             row. At click 3 the whole column flies right and becomes mu_e. -->
        <g class="means" :class="{ 'is-on': stage >= 2, 'is-flown': stage >= 3 }">
          <rect v-for="(r, i) in drawn" :key="i" class="mcell"
                :x="MEAN_X" :y="r.cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ transitionDelay: stage >= 2 && stage < 3 ? `${i * 80}ms` : '0ms' }" />
          <text class="cap" :class="{ 'is-on': stage >= 2 }" :x="TS_X" :y="rows.bottom + 26">
            mean over token positions, per layer
          </text>
        </g>

        <!-- The click-2 caption's slot is reused at click 3: same place, next
             sentence, so the eye does not have to find a new line. -->
        <text class="cap cap3" :class="{ 'is-on': stage >= 3 }" :x="TS_X" :y="rows.bottom + 26">
          average across stories → one mean per layer
        </text>

        <!-- ============ ghost streams ============
             One-shot, non-looping — the same idiom ThesisTimeline uses for its
             single pulse. They say "many stories", then get out of the way. -->
        <g v-if="stage >= 3" class="ghosts rose">
          <rect v-for="k in 5" :key="k" class="gcell"
                :x="MEAN_X" :y="rows[3].cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ '--dx': `${MU_E_X - MEAN_X}px`, animationDelay: `${(k - 1) * 120}ms` }" />
          <g class="gdots">
            <circle v-for="k in 3" :key="k" :cx="MEAN_X + 46 + (k - 1) * 9" :cy="rows[3].cy" r="1.8" />
          </g>
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
      <g class="mu rose" :class="{ 'is-on': stage >= 3 }">
        <template v-for="(r, i) in rows" :key="i">
          <rect v-if="r.kind === 'row'" class="cell"
                :x="MU_E_X" :y="r.cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ transitionDelay: stage >= 3 ? `${560 + i * 60}ms` : '0ms' }" />
          <g v-else class="vdots">
            <circle v-for="k in 3" :key="k" :cx="MU_E_X + MU_W / 2" :cy="r.y + 3 + (k - 1) * 7" r="1.6" />
          </g>
        </template>
        <text class="mu-lab" :x="MU_E_X + MU_W / 2" :y="rows.bottom + 20" text-anchor="middle">
          μ<tspan class="sub" dy="3">e</tspan><tspan class="sup" dy="-8">(ℓ)</tspan>
        </text>
      </g>

      <g class="mu blue" :class="{ 'is-on': stage >= 4 }">
        <template v-for="(r, i) in rows" :key="i">
          <rect v-if="r.kind === 'row'" class="cell"
                :x="MU_N_X" :y="r.cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3"
                :style="{ transitionDelay: stage >= 4 ? `${380 + i * 55}ms` : '0ms' }" />
          <g v-else class="vdots">
            <circle v-for="k in 3" :key="k" :cx="MU_N_X + MU_W / 2" :cy="r.y + 3 + (k - 1) * 7" r="1.6" />
          </g>
        </template>
        <text class="mu-lab" :x="MU_N_X + MU_W / 2" :y="rows.bottom + 20" text-anchor="middle">
          μ<tspan class="sub" dy="3">n</tspan><tspan class="sup" dy="-8">(ℓ)</tspan>
        </text>
      </g>

      <!-- ============ the closing bracket (click 5) ============ -->
      <g class="wrap" :class="{ 'is-on': stage >= 5 }">
        <path class="brace" :d="wrapD" />
        <text class="wrap-t" :x="(MU_E_X + MU_N_X + MU_W) / 2" :y="rows.bottom + 62" text-anchor="middle">
          for each of the 50 emotions × each layer
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { C, FONT, VB_W, VB_H, CARD_R, MU_W, MU_H, stackLayout } from '../emotionVizTokens.js'

// stage = $clicks (0-5); every visible state is a pure function of it.
const props = defineProps({ stage: { type: Number, default: 0 } })

/* ---------- geometry ---------- */
const ST_X = 8
const ST_W = 166
const ST_H = 62
const STACKS = [
  // Trimmed to fit ST_W at 11px: the floor on diagram type is the constraint,
  // so the wording gives, not the size.
  { tone: 'rose', y: 58,  head: 'EMOTIONAL', body: ['She sprinted through the', 'dark forest, heart…'] },
  { tone: 'blue', y: 200, head: 'NEUTRAL',   body: ['She walked through the', 'forest along a path.'] },
]

const M_X = 214
const M_Y = 56
const M_W = 170
const rows = stackLayout(94)
const drawn = rows.filter((r) => r.kind === 'row')
const M_H = rows.bottom - M_Y + 18

/* The token strip is 12 drawn squares standing in for one story, aligned to the
   Layer-ℓ row. SKIP_N of them stand in for the 50 dropped positions — the drawn
   count is illustrative; the 50 in the label is the real number. */
const TOK = 12
const TOKENS = Array.from({ length: 12 })
const SKIP_N = 4
const TS_X = 418
const TS_Y = rows[3].cy - TOK / 2
const TS_R = TS_X + TOKENS.length * (TOK + 2) - 2   // right end of the strip

/* The sweep collapses LEFT TO RIGHT onto a single cell at the strip's right
   end; that cell column then flies right again and settles as μₑ. */
const MEAN_X = TS_R - MU_W

const MU_E_X = 696
const MU_N_X = 776

/* A flat square brace: down, across, down. Used twice — under the skipped
   tokens, and under both mu columns at the end. */
const brace = (x1, x2, y, drop) =>
  `M ${x1} ${y} L ${x1} ${y + drop} L ${x2} ${y + drop} L ${x2} ${y}`

const braceD = brace(TS_X, TS_X + SKIP_N * (TOK + 2) - 2, TS_Y + TOK + 4, 8)
const wrapD = brace(MU_E_X - 6, MU_N_X + MU_W + 6, rows.bottom + 34, 10)
</script>

<style scoped>
.ea {
  height: 410px;
  width: 100%;
}

.dg {
  width: 100%;
  height: 100%;
  overflow: visible;
  font-family: v-bind(FONT);
}

/* Click 5: the working recedes, the answer stays. */
.scene {
  opacity: 1;
  transition: opacity 420ms ease;
}

.scene.is-back {
  opacity: 0.35;
}

/* ---- story piles (A -> B seam) ---- */
.face {
  fill: v-bind('C.white');
  stroke-width: 1;
}

.ghost-card {
  fill: v-bind('C.white');
  stroke-width: 1;
  opacity: 0.45;
}

.pile.rose .face,
.pile.rose .ghost-card { stroke: v-bind('C.emotion'); }
.pile.blue .face,
.pile.blue .ghost-card { stroke: v-bind('C.neutral'); }

.pile.rose .band { fill: v-bind('C.emotionSoft'); }
.pile.blue .band { fill: v-bind('C.neutralSoft'); }

.head {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.pile.rose .head { fill: v-bind('C.emotionText'); }
.pile.blue .head { fill: v-bind('C.neutralText'); }

.body {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.ink');
}

.tag {
  font-size: 11px;
  font-weight: 500;
  fill: v-bind('C.desc');
}

/* ---- the model ---- */
.mbox {
  fill: v-bind('C.panel');
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

.mlabel {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  fill: v-bind('C.ink');
}

.lrow {
  fill: v-bind('C.white');
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

.lrow.is-ell {
  fill: v-bind('C.wash');
  stroke: v-bind('C.gray');
}

.lrow-t {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.lrow-t.is-ell {
  font-weight: 600;
  fill: v-bind('C.ink');
}

.vdots circle {
  fill: v-bind('C.gray');
  opacity: 0.7;
}

/* ---- the flying story ---- */
.flyer {
  opacity: 0;
  transform: translate(0, 0) scale(1);
  transform-origin: 91px 89px;
  transition: opacity 200ms ease, transform 450ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.flyer.is-in {
  opacity: 1;
  transform: translate(208px, 62px) scale(0.42);
}

.flyer.is-gone {
  opacity: 0;
  transition: opacity 200ms ease;
}

.rose-s {
  stroke: v-bind('C.emotion');
  fill: v-bind('C.emotionSoft');
}

/* ---- token strip ---- */
.strip {
  opacity: 0;
  transition: opacity 300ms ease;
}

.strip.is-on { opacity: 1; }
.strip.is-gone { opacity: 0; }

.tok {
  fill: v-bind('C.emotionSoft');
  stroke: v-bind('C.emotion');
  stroke-width: 0.8;
  transition: opacity 300ms ease, transform 500ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.tok.is-dim { opacity: 0.15; }

/* The sweep-collapse: every kept square slides left onto the first one and
   fades, leaving the single mean cell that fades in underneath. */
.tok.is-swept {
  opacity: 0;
  transform: translateX(var(--dx));
}

.skip {
  opacity: 0;
  transition: opacity 260ms ease 260ms;
}

.skip.is-on { opacity: 1; }

.brace {
  fill: none;
  stroke: v-bind('C.gray');
  stroke-width: 1;
}

.skip-t {
  font-size: 11px;
  font-weight: 600;
  fill: v-bind('C.ink');
}

.skip-s {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.cap {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

/* ---- per-layer mean cells ---- */
.means .mcell {
  fill: v-bind('C.emotion');
  opacity: 0;
  transition: opacity 260ms ease, transform 520ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.means.is-on .mcell { opacity: 1; }

.means.is-flown .mcell {
  opacity: 0;
  transform: translateX(60px);
  transition-delay: 0ms;
}

.means .cap {
  opacity: 0;
  transition: opacity 260ms ease;
}

.means .cap.is-on { opacity: 1; }
.means.is-flown .cap { opacity: 0; }

.cap3 {
  opacity: 0;
  transition: opacity 260ms ease 420ms;
}

.cap3.is-on { opacity: 1; }

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

.ghosts .gdots circle {
  fill: v-bind('C.emotion');
  animation: blip 500ms ease 620ms 1 both;
}

@keyframes fly-right {
  0%   { opacity: 0.9; transform: translateX(0); }
  70%  { opacity: 0.35; }
  100% { opacity: 0; transform: translateX(var(--dx)); }
}

@keyframes fly-through {
  0%   { opacity: 0.9; transform: translate(0, 0) scale(1); }
  45%  { opacity: 0.7; transform: translate(208px, var(--dy)) scale(0.42); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.2); }
}

@keyframes blip {
  0%, 100% { opacity: 0; }
  50%      { opacity: 0.8; }
}

/* ---- mu columns (the B -> C seam) ---- */
.mu .cell {
  opacity: 0;
  transform: scale(0.4);
  transform-box: fill-box;
  transform-origin: center;
  transition: opacity 260ms ease, transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mu.is-on .cell {
  opacity: 1;
  transform: scale(1);
}

.mu .vdots,
.mu .mu-lab {
  opacity: 0;
  transition: opacity 300ms ease;
}

.mu.is-on .vdots,
.mu.is-on .mu-lab { opacity: 1; }

.mu.rose .cell { fill: v-bind('C.emotion'); }
.mu.blue .cell { fill: v-bind('C.neutralFill'); }

.mu-lab {
  font-size: 14px;
  font-weight: 500;
}

.mu.rose .mu-lab { fill: v-bind('C.emotionText'); }
.mu.blue .mu-lab { fill: v-bind('C.neutralText'); }

.mu-lab .sub { font-size: 10px; }
.mu-lab .sup { font-size: 10px; }

/* ---- closing bracket ---- */
.wrap {
  opacity: 0;
  transition: opacity 320ms ease 200ms;
}

.wrap.is-on { opacity: 1; }

.wrap-t {
  font-size: 12px;
  font-weight: 500;
  fill: v-bind('C.ink');
}

@media (prefers-reduced-motion: reduce) {
  /* Same content on the same click; every draw/scale/translate reveal becomes a
     plain fade, and the ghost streams simply do not run. */
  .scene, .strip, .skip, .cap, .wrap, .mu .vdots, .mu .mu-lab {
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
  }

  .flyer {
    transform: translate(208px, 62px) scale(0.42) !important;
    transition: opacity 150ms ease !important;
  }

  .tok,
  .means .mcell,
  .mu .cell {
    transform: none !important;
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
  }

  .means.is-flown .mcell { opacity: 0; }

  .gcell, .gcard, .ghosts .gdots circle { animation: none; opacity: 0; }
}
</style>
