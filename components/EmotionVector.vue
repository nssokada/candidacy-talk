<!--
  EmotionVector.vue — slide C of the emotion-vector sequence, and the one that
  does the work: the raw contrast d still contains topic, "topic" is the neutral
  subspace, so project it out.

  THE 3D BEAT (click 3). The PC plane is drawn as a polygon whose corners are
  already perspective-projected in JS (`proj()` below, matching CSS's
  `perspective(900px) rotateX(θ)` exactly). Its RESTING transform is therefore
  the identity — the geometry on screen is plain 2D SVG that any renderer gets
  right. The tilt-in is an extra rotateX layered on top that animates back to
  zero, so the 3D transform is only ever in flight, never load-bearing at rest.
  That is deliberately safer than tilting a flat rect and trusting the browser
  to put its edges where the projection lines expect them.

  The whole scene — plane, clouds, d, ṽ, v — lives in one `.space` group, which
  takes a small rotateX at click 3 so the picture gains depth all at once
  instead of a 3D plane crashing a 2D scene. Because EVERY piece of geometry is
  inside that group, nothing can drift out of alignment with anything else.

  FALLBACK (build only on visible breakage): if 3D transforms on SVG groups
  misbehave in some renderer, delete the two `transform` declarations on
  `.space.is-deep` and `.pc-plane` — the resting geometry is already correct and
  the slide degrades to the same picture without the tilt. No click logic
  changes. Presentation is from Chromium, where this is fine.
-->
<template>
  <div class="ev">
    <svg class="dg" :viewBox="`0 0 ${VB_W} ${VB_H}`" role="img"
         aria-label="At one layer, the emotional and neutral means become two centroids; their difference d is decomposed into a component in the neutral principal-component plane and an orthogonal residual, which is normalized to the unit emotion vector">

      <defs>
        <marker id="ev-d" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" :fill="C.raw" />
        </marker>
        <marker id="ev-p" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" :fill="C.gray" />
        </marker>
        <marker id="ev-v" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" :fill="C.vecText" />
        </marker>
        <marker id="ev-fan" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" :fill="C.gray" />
        </marker>
      </defs>

      <!-- ============ stage 0: the mu columns, exactly as slide B left them ============
           Same cells, same hues, same labels, same stack pattern — the B -> C
           seam. Only the position changes. -->
      <g class="cols" :class="{ 'is-gone': stage >= 1 }">
        <rect class="hl" :x="MU_E_X - 8" :y="rowL.cy - MU_H / 2 - 5"
              :width="MU_N_X + MU_W + 8 - (MU_E_X - 8)" :height="MU_H + 10" rx="5" />
        <g v-for="col in COLS" :key="col.tone" class="mu" :class="col.tone">
          <template v-for="(r, i) in rows" :key="i">
            <rect v-if="r.kind === 'row'" class="cell" :class="{ 'is-pick': i === 3 }"
                  :x="col.x" :y="r.cy - MU_H / 2" :width="MU_W" :height="MU_H" rx="3" />
            <g v-else class="vdots">
              <circle v-for="k in 3" :key="k" :cx="col.x + MU_W / 2" :cy="r.y + 3 + (k - 1) * 7" r="1.6" />
            </g>
          </template>
        </g>
        <text class="cap" :x="(MU_E_X + MU_N_X + MU_W) / 2" :y="rows.bottom + 50" text-anchor="middle">
          fix a single layer ℓ
        </text>
      </g>

      <!-- ============ the space ============ -->
      <g class="space" :class="{ 'is-deep': stage >= 3 }">

        <!-- light gray axes, behind everything -->
        <g class="axes" :class="{ 'is-on': stage >= 1 }">
          <line :x1="AX_X" :y1="110" :x2="AX_X" :y2="AX_Y" />
          <line :x1="AX_X" :y1="AX_Y" :x2="548" :y2="AX_Y" />
        </g>

        <!-- ---------- the PC plane (click 3) ---------- -->
        <g class="pc-plane" :class="{ 'is-on': stage >= 3, 'is-back': stage >= 5 }">
          <polygon class="plane" :points="planePts" />
          <line v-for="(f, i) in fans" :key="i" class="fan"
                :x1="f.x1" :y1="f.y1" :x2="f.x2" :y2="f.y2" marker-end="url(#ev-fan)" />
        </g>

        <!-- ---------- dot clouds (click 1) ----------
             Jitter is generated from a fixed seed, never Math.random(): a
             re-render or a backward step has to redraw the identical cloud. -->
        <g class="clouds" :class="{ 'is-on': stage >= 1, 'is-back': stage >= 5 }">
          <circle v-for="p in blueDots" :key="`n${p.i}`" class="dot blue" :cx="p.x" :cy="p.y" r="2.2"
                  :style="{ transitionDelay: stage >= 1 ? `${p.i * 6}ms` : '0ms' }" />
          <circle v-for="p in roseDots" :key="`e${p.i}`" class="dot rose" :cx="p.x" :cy="p.y" r="2.2"
                  :style="{ transitionDelay: stage >= 1 ? `${p.i * 6}ms` : '0ms' }" />
        </g>

        <!-- ---------- centroids: what the two mu cells become ---------- -->
        <g class="cents" :class="{ 'is-on': stage >= 1, 'is-back': stage >= 5 }">
          <g class="x-mark blue">
            <line :x1="B.x - 7" :y1="B.y - 7" :x2="B.x + 7" :y2="B.y + 7" />
            <line :x1="B.x - 7" :y1="B.y + 7" :x2="B.x + 7" :y2="B.y - 7" />
          </g>
          <g class="x-mark rose">
            <line :x1="R.x - 7" :y1="R.y - 7" :x2="R.x + 7" :y2="R.y + 7" />
            <line :x1="R.x - 7" :y1="R.y + 7" :x2="R.x + 7" :y2="R.y - 7" />
          </g>
        </g>

        <!-- ---------- d (click 2) ---------- -->
        <g class="dvec" :class="{ 'is-on': stage >= 2, 'is-back': stage >= 5 }">
          <line class="d-line" :x1="B.x" :y1="B.y" :x2="R.x" :y2="R.y"
                marker-end="url(#ev-d)" :style="{ '--len': dLen }" />
          <!-- Only the glyph rides the arrow; "raw emotion contrast" sits under
               the equation, where there is room for it to be legible. -->
          <text class="d-lab" :x="(B.x + R.x) / 2 - 30" :y="(B.y + R.y) / 2 - 12">d</text>
        </g>

        <!-- ---------- the decomposition (click 4) ---------- -->
        <g class="decomp" :class="{ 'is-on': stage >= 4, 'is-back': stage >= 5 }">
          <line class="drop" :x1="R.x" :y1="R.y" :x2="F.x" :y2="F.y" :style="{ '--len': F.y - R.y }" />
          <line class="pd" :x1="B.x" :y1="B.y" :x2="F.x" :y2="F.y"
                marker-end="url(#ev-p)" :style="{ '--len': F.x - B.x }" />
          <text class="pd-lab" :x="(B.x + F.x) / 2" :y="F.y + 18" text-anchor="middle">P d</text>
        </g>

        <!-- ---------- v-tilde (click 4) and v (click 5) ---------- -->
        <g class="vtil" :class="{ 'is-on': stage >= 4, 'is-gone': stage >= 5 }">
          <line :x1="F.x" :y1="F.y" :x2="R.x" :y2="R.y" marker-end="url(#ev-v)" />
          <text class="v-lab" :x="F.x + 12" :y="(F.y + R.y) / 2">residual</text>
        </g>

        <g class="vunit" :class="{ 'is-on': stage >= 5 }">
          <line :x1="F.x" :y1="F.y" :x2="F.x" :y2="V_TIP" marker-end="url(#ev-v)" />
          <line class="tick" :x1="F.x - 6" :y1="V_TIP" :x2="F.x + 6" :y2="V_TIP" />
          <text class="v-lab strong" :x="F.x + 12" :y="(F.y + V_TIP) / 2">unit</text>
        </g>
      </g>

      <!-- ---------- what a dot is (click 1) ----------
           Shares its slot with the plane's gloss: click 3 replaces this line
           rather than adding a second one below it. -->
      <g class="pcap" :class="{ 'is-on': stage >= 1, 'is-gone': stage >= 3 }">
        <text :x="70" :y="352">each dot = one story's mean activation at layer ℓ</text>
      </g>

      <!-- ---------- the plane's gloss (click 3) ---------- -->
      <g class="pcap" :class="{ 'is-on': stage >= 3, 'is-gone': stage >= 5 }">
        <text :x="70" :y="352">top-k PCs of neutral stories ≈ topic/content variation</text>
        <text class="dim" :x="70" :y="368">k: smallest with cumulative variance ≥ τ = 0.5</text>
      </g>

      <!-- ---------- the problem, stated (click 3) ---------- -->
      <g class="note" :class="{ 'is-on': stage >= 3, 'is-back': stage >= 6 }">
        <rect :x="34" :y="46" :width="374" :height="66" rx="6" />
        <line class="spine" :x1="34" :y1="46" x2="34" :y2="112" />
        <text v-for="(ln, i) in NOTE" :key="i" :x="48" :y="66 + i * 16">{{ ln }}</text>
      </g>

      <!-- ---------- the steering strip (click 6) ---------- -->
      <g class="strip" :class="{ 'is-on': stage >= 6 }">
        <rect :x="0" :y="352" :width="VB_W" :height="VB_H - 352" />
        <line class="rule" :x1="0" :y1="352" :x2="VB_W" :y2="352" />
      </g>
    </svg>

    <!-- ============ equations ============
         KaTeX in positioned HTML rather than SVG text: the deck already renders
         its maths with KaTeX, and re-drawing sub/superscripts by hand in SVG
         would not match. Positions are px against the 884-wide content column,
         which is what the SVG's viewBox maps to 1:1; Slidev scales the whole
         page uniformly, so both track together. -->
    <!-- The stage-0 mu labels, echoing slide 32's. KaTeX rather than SVG text:
         a tspan-stacked sub/superscript sits side by side instead of one above
         the other, and puts the mu in Inter next to equations that set it in
         KaTeX_Math. -->
    <div v-for="col in COLS" :key="`lab-${col.tone}`"
         class="mu-lab" :class="[col.tone, { 'is-gone': stage >= 1 }]"
         :style="{ left: `${col.x + MU_W / 2}px`, top: `${rows.bottom + 6}px` }"
         v-html="col.tex" />

    <!-- The DIAGRAM recedes at click 5, not the maths. Dimming this equation
         washed out the definition of d at exactly the moment the audience is
         asked to compare it with v-tilde on the line below. -->
    <div class="eq eq-d" :class="{ 'is-on': stage >= 2 }" v-html="EQ_D" />

    <div class="eq eq-vt" :class="{ 'is-on': stage >= 4 }" v-html="EQ_VT" />
    <div class="gloss gl-vt" :class="{ 'is-on': stage >= 4 }">P: top-k neutral PCs at layer ℓ, row-stacked</div>

    <div class="eq eq-v" :class="{ 'is-on': stage >= 5 }" v-html="EQ_V" />
    <div class="gloss gl-v amber" :class="{ 'is-on': stage >= 5 }">one unit vector per emotion, per layer</div>

    <div class="eq eq-steer" :class="{ 'is-on': stage >= 6 }" v-html="EQ_STEER" />
    <div class="gloss gl-steer" :class="{ 'is-on': stage >= 6 }">
      added during inference — c is a fraction of typical residual-stream norm at layer ℓ
    </div>
  </div>
</template>

<script setup>
import katex from 'katex'

// Defined up here because COLS uses it: `const` is not hoisted.
const K = (s) => katex.renderToString(s, { throwOnError: false })
import { C, FONT, VB_W, VB_H, MU_W, MU_H, cloud, stackLayout } from '../emotionVizTokens.js'

// stage = $clicks (0-6); every visible state is a pure function of it.
const props = defineProps({ stage: { type: Number, default: 0 } })

/* ---------- stage 0: the mu columns, in slide B's own geometry ---------- */
const rows = stackLayout(94)
const rowL = rows[3]
const MU_E_X = 120
const MU_N_X = 200
const COLS = [
  { tone: 'rose', x: MU_E_X, tex: K('\\mu_e^{(\\ell)}') },
  { tone: 'blue', x: MU_N_X, tex: K('\\mu_n^{(\\ell)}') },
]

/* ---------- the scene ----------
   The plane is anchored at the NEUTRAL centroid, which is the honest picture:
   the subspace being projected out is the neutral stories' own variation, so it
   passes through their mean and the blue cloud lies in it. */
const B = { x: 250, y: 285 }   // mu_n — also the plane's origin
const R = { x: 450, y: 160 }   // mu_e
const AX_X = 95
const AX_Y = 330

const blueDots = cloud(40, B.x, B.y, 56, 24, 4242)
const roseDots = cloud(40, R.x, R.y, 50, 22, 1337)

const dLen = Math.hypot(R.x - B.x, R.y - B.y)

/* ---------- the projection ----------
   Mirrors CSS `transform: perspective(D) rotateX(THETA)` about (B.x, B.y):
   rotateX sends (x, y, 0) to (x, y·cosθ, y·sinθ); the perspective divide is
   then 1 − z/D. Keeping this in JS is what lets the plane's resting geometry be
   ordinary 2D SVG that the projection lines can be drawn against. */
const THETA = (58 * Math.PI) / 180
const D = 900
function proj(x, y) {
  const lx = x - B.x
  const ly = y - B.y
  const w = 1 - (ly * Math.sin(THETA)) / D
  return { x: B.x + lx / w, y: B.y + (ly * Math.cos(THETA)) / w }
}

const HALF_W = 215
const HALF_H = 78
const planePts = [
  [B.x - HALF_W, B.y - HALF_H],
  [B.x + HALF_W, B.y - HALF_H],
  [B.x + HALF_W, B.y + HALF_H],
  [B.x - HALF_W, B.y + HALF_H],
].map(([x, y]) => { const p = proj(x, y); return `${p.x.toFixed(1)},${p.y.toFixed(1)}` }).join(' ')

// Four in-plane directions, fanning from the origin: "this plane has structure".
const fans = [[-150, -52], [140, -46], [-118, 60], [126, 56]].map(([dx, dy]) => {
  const a = proj(B.x, B.y)
  const b = proj(B.x + dx, B.y + dy)
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
})

/* The foot of d's tip on the plane. Local y = B.y is the plane's own mid-line,
   which projects to a horizontal at B.y — so P d draws as an in-plane
   horizontal and the residual is a clean vertical. */
const F = { x: R.x, y: B.y }
const V_TIP = B.y - 88   // unit length, against the residual's 125

const NOTE = [
  'still entangled with topic — "running through a forest"',
  'fires motor & spatial directions whether the runner',
  'is afraid or excited',
]

/* ---------- equations ---------- */
const EQ_D = K('d = \\mu_e^{(\\ell)} - \\mu_n^{(\\ell)}')
const EQ_VT = K('\\tilde v = (I - P^{\\top} P)\\,(\\mu_e^{(\\ell)} - \\mu_n^{(\\ell)})')
const EQ_V = K('v = \\tilde v \\,/\\, \\lVert \\tilde v \\rVert')
const EQ_STEER = K('h^{(\\ell)} \\leftarrow h^{(\\ell)} + c \\cdot \\lVert \\bar h^{(\\ell)} \\rVert \\cdot v_e^{(\\ell)}')
</script>

<style scoped>
.ev {
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

/* ---- stage 0: mu columns ---- */
.cols {
  opacity: 1;
  transition: opacity 300ms ease;
}

/* The columns do not just vanish: the picked row's two cells carry the eye out
   to where the centroids appear, and the rest fades under them. */
.cols.is-gone { opacity: 0; }

.mu .cell {
  transition: transform 520ms cubic-bezier(0.16, 0.84, 0.44, 1), opacity 300ms ease;
}

.cols.is-gone .mu.rose .cell.is-pick { transform: translate(315px, -125px) scale(0.5); }
.cols.is-gone .mu.blue .cell.is-pick { transform: translate(35px, 88px) scale(0.5); }

.mu.rose .cell { fill: v-bind('C.emotion'); }
.mu.blue .cell { fill: v-bind('C.neutralFill'); }

.hl {
  fill: v-bind('C.wash');
  stroke: v-bind('C.gray');
  stroke-width: 1;
}

.vdots circle {
  fill: v-bind('C.gray');
  opacity: 0.7;
}

/* KaTeX labels laid over the SVG at the foot of each column — same treatment,
   same size, as slide 32's, so the seam holds through the typography too. */
.mu-lab {
  position: absolute;
  transform: translateX(-50%);
  opacity: 1;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.mu-lab.is-gone { opacity: 0; }
.mu-lab.rose { color: v-bind('C.emotionText'); }
.mu-lab.blue { color: v-bind('C.neutralText'); }
.mu-lab :deep(.katex) { font-size: 0.95rem; }

.cap {
  font-size: 12px;
  font-weight: 500;
  fill: v-bind('C.ink');
}

/* ---- the space ---- */
.space {
  transform-box: view-box;
  transform-origin: 250px 285px;
  transition: transform 700ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

/* Click 3: the whole picture gains depth at once. See the header comment — this
   is the only transform whose RESTING state uses 3D, and losing it costs the
   slide nothing but the squash. */
.space.is-deep {
  transform: perspective(900px) rotateX(12deg);
}

.axes line {
  stroke: v-bind('C.axisFaint');
  stroke-width: 1;
}

.axes {
  opacity: 0;
  transition: opacity 400ms ease;
}

.axes.is-on { opacity: 1; }

/* ---- the PC plane ---- */
.pc-plane {
  opacity: 0;
  transform-box: view-box;
  transform-origin: 250px 285px;
  transform: perspective(900px) rotateX(-34deg);
  transition: opacity 420ms ease, transform 700ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.pc-plane.is-on {
  opacity: 1;
  transform: none;
}

.pc-plane.is-back { opacity: 0.25; }

.plane {
  fill: v-bind('C.planeFill');
  fill-opacity: 0.85;
  stroke: v-bind('C.gray');
  stroke-width: 1;
  stroke-opacity: 0.55;
}

.fan {
  stroke: v-bind('C.gray');
  stroke-width: 1.2;
  opacity: 0.65;
}

/* ---- clouds ---- */
.dot {
  opacity: 0;
  transition: opacity 260ms ease;
}

.clouds.is-on .dot { opacity: 0.75; }
.clouds.is-back .dot { opacity: 0.2; transition-delay: 0ms !important; }

.dot.rose { fill: v-bind('C.emotion'); }
.dot.blue { fill: v-bind('C.neutralFill'); }

/* ---- centroids ---- */
.cents {
  opacity: 0;
  transition: opacity 300ms ease 240ms;
}

.cents.is-on { opacity: 1; }
.cents.is-back { opacity: 0.3; }

.x-mark line {
  stroke-width: 2.6;
  stroke-linecap: round;
}

.x-mark.rose line { stroke: v-bind('C.emotionText'); }
.x-mark.blue line { stroke: v-bind('C.neutralText'); }

/* ---- d ----
   The group must start at opacity 0, not rely on the line's stroke-dashoffset:
   an arrow's marker-end is painted at the endpoint whatever the dash state, so
   a hidden-by-dashoffset line still leaks its arrowhead onto earlier clicks. */
.dvec { opacity: 0; transition: opacity 300ms ease; }
.dvec.is-on { opacity: 1; }
.dvec.is-back { opacity: 0.25; }

.d-line {
  stroke: v-bind('C.raw');
  stroke-width: 2.4;
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  transition: stroke-dashoffset 500ms ease;
}

.dvec.is-on .d-line { stroke-dashoffset: 0; }

.d-lab,
.pd-lab,
.v-lab {
  opacity: 0;
  transition: opacity 260ms ease 380ms;
}

.dvec.is-on .d-lab,
.decomp.is-on .pd-lab,
.vtil.is-on .v-lab,
.vunit.is-on .v-lab { opacity: 1; }

.d-lab {
  font-size: 15px;
  font-weight: 700;
  font-style: italic;
  fill: v-bind('C.rawText');
}

/* ---- decomposition ---- */
.decomp { opacity: 0; transition: opacity 300ms ease; }
.decomp.is-on { opacity: 1; }
.decomp.is-back { opacity: 0.25; }

.drop {
  stroke: v-bind('C.gray');
  stroke-width: 1;
  stroke-dasharray: 3 3;
  opacity: 0;
  transition: opacity 260ms ease;
}

.decomp.is-on .drop { opacity: 0.8; }

.pd {
  stroke: v-bind('C.rawSoft');
  stroke-width: 2.2;
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  transition: stroke-dashoffset 420ms ease 220ms;
}

.decomp.is-on .pd { stroke-dashoffset: 0; }

.pd-lab {
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  fill: v-bind('C.rawText');
}

/* ---- residual and unit ---- */
.vtil,
.vunit {
  opacity: 0;
  transform-box: view-box;
  transform-origin: 450px 285px;
}

.vtil {
  transition: opacity 300ms ease 520ms;
}

.vtil.is-on { opacity: 1; }
.vtil.is-gone { opacity: 0; transition: opacity 200ms ease; }

/* The rescale to unit length: v enters at the residual's length and shrinks to
   its own, so the eye reads one arrow being normalized, not two arrows. */
.vunit {
  transform: scaleY(1.42);
  transition: opacity 260ms ease, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.vunit.is-on {
  opacity: 1;
  transform: scaleY(1);
}

.vtil line,
.vunit line {
  stroke: v-bind('C.vecText');
  stroke-width: 2.6;
}

.vunit line { stroke-width: 3.4; }

.vunit .tick {
  stroke-width: 2;
}

.v-lab {
  font-size: 11px;
  font-weight: 500;
  fill: v-bind('C.vecText');
}

.v-lab.strong { font-weight: 700; font-size: 12px; }

/* ---- plane gloss ---- */
.pcap {
  opacity: 0;
  transition: opacity 300ms ease 320ms;
}

.pcap.is-on { opacity: 1; }
.pcap.is-gone { opacity: 0; transition-delay: 0ms; }

.pcap text {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

.pcap .dim { font-size: 11px; }

/* ---- the annotation ---- */
.note {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 300ms ease, transform 300ms ease;
}

.note.is-on {
  opacity: 1;
  transform: translateY(0);
}

/* At the steering click the annotation has done its job; letting it sit at full
   strength over a dimmed diagram makes it the brightest thing on the slide. */
.note.is-back { opacity: 0.4; }

.note rect {
  fill: v-bind('C.panel');
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

.note .spine {
  stroke: v-bind('C.rawText');
  stroke-width: 3;
  opacity: 0.65;
}

.note text {
  font-size: 11px;
  font-weight: 400;
  fill: v-bind('C.desc');
}

/* ---- steering strip ---- */
.strip {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 320ms ease, transform 380ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.strip.is-on {
  opacity: 1;
  transform: translateY(0);
}

.strip rect { fill: v-bind('C.panel'); }

.strip .rule {
  stroke: v-bind('C.rule');
  stroke-width: 1;
}

/* ---- equations ---- */
.eq,
.gloss {
  position: absolute;
  opacity: 0;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.eq.is-on,
.gloss.is-on { opacity: 1; }

/* No is-back state for equations: once a formula is on the slide it stays fully
   legible. Only the drawing behind it recedes. */

.eq :deep(.katex) { font-size: 1.02rem; }

.gloss {
  font-size: 11px;
  font-weight: 400;
  color: v-bind('C.desc');
  line-height: 1.35;
}

.gloss.amber { color: v-bind('C.vecText'); font-weight: 500; }

.eq-d     { left: 578px; top: 84px; }
.eq-vt    { left: 578px; top: 152px; width: 300px; }
.gl-vt    { left: 578px; top: 184px; width: 300px; }
.eq-v     { left: 578px; top: 226px; }
.gl-v     { left: 578px; top: 258px; width: 300px; }
.eq-steer { left: 0; right: 0; top: 364px; text-align: center; }
.eq-steer :deep(.katex) { font-size: 1.18rem; }
.gl-steer { left: 0; right: 0; top: 392px; text-align: center; }

/* `raw emotion contrast` sits under the d equation as well as beside the arrow;
   the on-canvas one is the label, this one is the anchor. */
.eq-d::after {
  content: 'raw emotion contrast';
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: v-bind('C.rawText');
}

@media (prefers-reduced-motion: reduce) {
  /* Same content on the same click. The one place in the sequence where reduced
     motion changes geometry rather than just timing: the plane appears already
     at its resting angle instead of rotating into it. */
  .cols, .axes, .dot, .cents, .dvec, .decomp, .pcap, .note, .strip, .eq, .gloss {
    transition: opacity 150ms ease !important;
    transition-delay: 0ms !important;
  }

  .mu .cell { transition: opacity 150ms ease !important; }
  .cols.is-gone .mu .cell.is-pick { transform: none !important; }

  .space, .space.is-deep { transform: none !important; transition: none !important; }

  .pc-plane {
    transform: none !important;
    transition: opacity 150ms ease !important;
  }

  .d-line, .pd {
    stroke-dasharray: none !important;
    stroke-dashoffset: 0 !important;
  }

  .note, .strip { transform: none !important; }

  .vtil, .vunit {
    transform: none !important;
    transition: opacity 150ms ease !important;
  }
}
</style>
