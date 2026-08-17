<template>
  <svg class="sw" :viewBox="`0 0 ${W} ${H}`" role="img"
       aria-label="Survival declines with foraging effort; survival-weighted fitness peaks at an intermediate effort that moves left as danger rises">
    <!-- axes -->
    <g class="axis">
      <line :x1="P.l" :y1="P.t" :x2="P.l" :y2="H - P.b" />
      <line :x1="P.l" :y1="H - P.b" :x2="W - P.r" :y2="H - P.b" />
      <template v-for="t in [0, 0.2, 0.4, 0.6, 0.8, 1]" :key="'x' + t">
        <line :x1="X(t)" :y1="H - P.b" :x2="X(t)" :y2="H - P.b + 5" />
        <text :x="X(t)" :y="H - P.b + 18" class="tick">{{ t.toFixed(1) }}</text>
      </template>
      <template v-for="t in [0, 0.5, 1]" :key="'y' + t">
        <line :x1="P.l - 5" :y1="Y(t)" :x2="P.l" :y2="Y(t)" />
        <text :x="P.l - 9" :y="Y(t) + 4" class="tick tick-y">{{ t.toFixed(1) }}</text>
      </template>

      <text :x="(P.l + W - P.r) / 2" :y="H - 6" class="ax-label">
        Foraging effort&nbsp;
        <tspan class="ax-sym">u</tspan>
      </text>

      <!--
        The y-axis carries ONE quantity at stage 0 and THREE from stage 1 on, so
        the label has to change with it. Leaving "Survival S(u)" up while V and W
        are drawn is what made the overlay unreadable.
      -->
      <g :transform="`rotate(-90 14 ${yMid})`">
        <text :x="14" :y="yMid" class="ax-label" :class="{ 'is-gone': stage >= 1 }">
          Survival&nbsp;
          <tspan class="ax-sym">S(u)</tspan>
        </text>
        <text :x="14" :y="yMid" class="ax-label" :class="{ 'is-gone': stage < 1 }">
          Scaled magnitude&nbsp;
          <tspan class="ax-sym">{{ stage >= 2 ? 'S, V, W' : 'S, V' }}</tspan>
        </text>
      </g>
    </g>

    <!--
      STAGE 0 — Bednekoff fig 9.3: survival falls with effort, shape set by z.
      From stage 1 the z = 1 and z = 4 curves are REMOVED, not faded: z is fixed
      at 2 for the rest of the build, and their ghosts collided with the labels.
    -->
    <g class="curves">
      <path v-for="c in zCurves" :key="c.z" :d="c.d" class="s-curve"
            :class="{ 'is-gone': stage >= 1 && c.z !== 2 }" :stroke="c.color" />
      <text v-for="c in zCurves" :key="'l' + c.z" :x="c.lx" :y="c.ly" class="z-label"
            :class="{ 'is-gone': stage >= 1 && c.z !== 2 }" :fill="c.color">
        <tspan>S</tspan><tspan class="sub" dy="4">z = {{ c.z }}</tspan><tspan dy="-4">(u)</tspan>
      </text>
    </g>

    <!-- STAGE 1 — future reproductive value rises linearly -->
    <g class="lyr" :class="{ 'is-on': stage >= 1 }">
      <line :x1="X(0)" :y1="Y(0)" :x2="X(1)" :y2="Y(1)" class="v-line" />
      <text :x="X(0.87)" :y="Y(0.95)" class="v-label">V(u) = &#961;u</text>
      <text :x="X(0.87)" :y="Y(0.95) + 14" class="v-role">future value</text>
    </g>

    <!-- STAGE 2 — the product, with its peak -->
    <g class="lyr" :class="{ 'is-on': stage >= 2 }">
      <path :d="wLow.d" class="w-curve" />
      <line :x1="X(wLow.ustar)" :y1="Y(0)" :x2="X(wLow.ustar)" :y2="Y(wLow.peak)"
            class="drop" />
      <circle :cx="X(wLow.ustar)" :cy="Y(wLow.peak)" r="5" class="dot" />

      <text :x="X(wLow.ustar) + 16" :y="Y(wLow.peak) - 20" class="w-label">
        <tspan>W</tspan><tspan class="sub" dy="4">k = {{ k }}</tspan><tspan dy="-4">(u)</tspan>
      </text>
      <text :x="X(wLow.ustar) + 16" :y="Y(wLow.peak) - 7" class="w-role">low danger</text>

      <text :x="X(wLow.ustar) + 10" :y="Y(0.70)" class="u-star" style="text-anchor: start;">
        <tspan>u*</tspan><tspan class="sub" dy="4">k = {{ k }}</tspan>
        <tspan dy="-4"> = {{ wLow.ustar.toFixed(2) }}</tspan>
      </text>
    </g>

    <!-- STAGE 3 — raise the danger constant; the peak slides left -->
    <g class="lyr" :class="{ 'is-on': stage >= 3 }">
      <path :d="wHigh.d" class="w-curve is-high" />
      <line :x1="X(wHigh.ustar)" :y1="Y(0)" :x2="X(wHigh.ustar)" :y2="Y(wHigh.peak)"
            class="drop is-high" />
      <circle :cx="X(wHigh.ustar)" :cy="Y(wHigh.peak)" r="5" class="dot is-high" />

      <text :x="X(0.015)" :y="Y(0.66)" class="w-label is-high" style="text-anchor: start;">
        <tspan>W</tspan><tspan class="sub" dy="4">k = {{ kHigh }}</tspan><tspan dy="-4">(u)</tspan>
      </text>
      <text :x="X(0.015)" :y="Y(0.66) + 13" class="w-role is-high"
            style="text-anchor: start;">high danger</text>

      <!-- above the orange peak, in the gap between it and the green curve -->
      <text :x="X(wHigh.ustar) - 10" :y="Y(wHigh.peak) - 16" class="u-star is-high"
            style="text-anchor: start;">
        <tspan>u*</tspan><tspan class="sub" dy="4">k = {{ kHigh }}</tspan>
        <tspan dy="-4"> = {{ wHigh.ustar.toFixed(2) }}</tspan>
      </text>

      <!--
        The arrow only, running from the low-danger optimum to the high-danger
        one. Its caption ("more danger → less effort") sits BELOW the plot, on
        the slide — it had no room in here without crossing the drop lines.
      -->
      <path :d="arrow" class="arrow" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

/*
  Bednekoff (2007), "Foraging in the Face of Danger", ch. 9 of Stephens, Brown &
  Ydenberg, Foraging: Behavior and Ecology. §9.4, pp. 311-313.

    S(u) = exp(-k u^z)      survival falls with foraging effort   (fig. 9.3)
    V(u) = ρu               future reproductive value rises linearly
    W(u) = S(u) V(u)        fitness = future value SURVIVAL-WEIGHTED
    u*   = (k z)^(-1/z)     the optimum                           (eq. 9.1)

  u is effort as a fraction of the maximum possible, so it is unitless on [0,1].

  k = 5 is INFERRED here by matching the published curves in fig. 9.3 — the
  chapter never states k, the figure is illustrative. Verified against three
  read-off points per curve.

  Deliberately NOT fig. 9.4 (u* vs expected attacks): stage 0 is a faithful 9.3
  replica and the later stages build on those same curves.

  AXIS NOTE. From stage 1 on, three different quantities share the y-axis, so the
  axis label switches from "Survival S(u)" to "Scaled magnitude — S, V, W". S is
  already on [0,1]; V is drawn with ρ set so V(1) = 1; W is divided by the
  LOW-DANGER peak (the same constant for both W curves, so the high-danger curve
  genuinely sits lower as well as further left). Height is presentational; the
  x-position of each peak is the result.

  Every curve and optimum is subscripted by the parameter that distinguishes it
  — S_(z=…), W_(k=…), u*_(k=…) — so no two objects on the plot are told apart by
  colour alone.
*/
const props = defineProps({
  // 0 = fig 9.3 · 1 = add V(u) · 2 = add W(u) and u* · 3 = raise danger
  stage: { type: Number, default: 0 },
  k: { type: Number, default: 5 },
  kHigh: { type: Number, default: 20 },
})

/*
  The viewBox is WIDE (880 x 330) on purpose. The slide's content column is ~884
  units across but only ~330 tall, so a squarer box would be height-constrained
  and leave dead margins either side. Widening the box lets the plot fill the
  column without taking another pixel of vertical room.
*/
const W = 880
const H = 330
const P = { l: 58, r: 24, t: 18, b: 46 }

const X = u => P.l + u * (W - P.l - P.r)
const Y = v => H - P.b - v * (H - P.t - P.b)
const yMid = (P.t + H - P.b) / 2

const S = (u, k, z) => Math.exp(-k * Math.pow(u, z))
const path = fn => {
  const pts = []
  for (let i = 0; i <= 200; i++) {
    const u = i / 200
    pts.push(`${i ? 'L' : 'M'}${X(u).toFixed(2)},${Y(fn(u)).toFixed(2)}`)
  }
  return pts.join(' ')
}

const zCurves = computed(() =>
  [
    { z: 1, color: '#a86b78', lx: X(0.30), ly: Y(0.13) },
    { z: 2, color: '#1f2937', lx: X(0.62), ly: Y(0.20) },
    { z: 4, color: '#5b7fa6', lx: X(0.82), ly: Y(0.44) },
  ].map(c => ({ ...c, d: path(u => S(u, props.k, c.z)) }))
)

/*
  W(u) = S(u)·ρu. BOTH curves are divided by the SAME constant — the low-danger
  peak — so the high-danger curve sits genuinely lower as well as further left.
  Scaling only sets the height; the x-position of each peak is the message.
*/
const Z = 2
const uStar = k => Math.pow(k * Z, -1 / Z)
const peakRaw = k => S(uStar(k), k, Z) * uStar(k)

const wFor = (k, norm) => ({
  ustar: uStar(k),
  peak: (peakRaw(k) / norm) * 0.9,
  d: path(u => ((S(u, k, Z) * u) / norm) * 0.9),
})
const wLow = computed(() => wFor(props.k, peakRaw(props.k)))
const wHigh = computed(() => wFor(props.kHigh, peakRaw(props.k)))

// horizontal arrow just above the x-axis, pointing LEFT from the low-danger
// optimum to the high-danger one
const arrow = computed(() => {
  const y = Y(0.06)
  const x1 = X(wLow.value.ustar)
  const x2 = X(wHigh.value.ustar)
  return `M${x1},${y} L${x2},${y} M${x2},${y} L${x2 + 9},${y - 4} L${x2 + 9},${y + 4} Z`
})
</script>

<style scoped>
.sw {
  width: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
}

.axis line {
  stroke: #9aa0ab;
  stroke-width: 1;
}

.tick {
  font-size: 11px;
  fill: #6b7280;
  text-anchor: middle;
}

.tick-y {
  text-anchor: end;
}

.ax-label {
  font-size: 12px;
  fill: #4a5568;
  text-anchor: middle;
  transition: opacity 400ms ease;
}

/* the symbol inside an axis label, set apart from the words */
.ax-sym {
  font-weight: 600;
  fill: #1f2937;
}

/* subscript run — the parameter that names a curve */
.sub {
  font-size: 9px;
  font-weight: 600;
}

.s-curve {
  fill: none;
  stroke-width: 2.4;
  transition: opacity 400ms ease;
}

.z-label {
  font-size: 12px;
  font-weight: 600;
  text-anchor: middle;
  transition: opacity 400ms ease;
}

/* removed from the plot, not merely dimmed */
.is-gone {
  opacity: 0;
  pointer-events: none;
}

.lyr {
  opacity: 0;
  transition: opacity 450ms ease;
}

.lyr.is-on {
  opacity: 1;
}

.v-line {
  stroke: #8b919b;
  stroke-width: 1.8;
  stroke-dasharray: 5 4;
}

.v-label {
  font-size: 12px;
  font-weight: 600;
  fill: #6b7280;
  text-anchor: end;
}

.v-role {
  font-size: 10px;
  font-weight: 400;
  fill: #9aa0ab;
  text-anchor: end;
}

.w-curve {
  fill: none;
  stroke: #2f855a;
  stroke-width: 3;
}

.w-curve.is-high {
  stroke: #b7791f;
}

.drop {
  stroke: #2f855a;
  stroke-width: 1.4;
  stroke-dasharray: 3 3;
}

.drop.is-high {
  stroke: #b7791f;
}

.dot {
  fill: #2f855a;
}

.dot.is-high {
  fill: #b7791f;
}

.w-label {
  font-size: 13px;
  font-weight: 700;
  fill: #2f855a;
  text-anchor: start;
}

.w-label.is-high {
  fill: #b7791f;
}

.w-role {
  font-size: 10px;
  font-weight: 500;
  fill: #2f855a;
  opacity: 0.75;
  text-anchor: start;
}

.w-role.is-high {
  fill: #b7791f;
}

.u-star {
  font-size: 12px;
  font-weight: 700;
  fill: #2f855a;
  text-anchor: middle;
}

.u-star.is-high {
  fill: #b7791f;
}

.arrow {
  stroke: #4a5568;
  fill: #4a5568;
  stroke-width: 1.4;
}

</style>
