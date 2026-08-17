<template>
  <div class="tt" :class="{ 'is-open': stage >= 1 }" :style="{ '--axis-len': AXIS_W }">
    <!-- The proposal view. At stage 0 this slot is the full 414px tall and the
         cards sit dead centre, matching the standalone "Thesis proposal" slide.
         From stage 1 the slot collapses to a header strip and the cards ride up
         with it. -->
    <div class="cards-slot">
      <ChapterMap :active="activeChapter" :compact="stage >= 1" />
    </div>

    <svg
      class="tl"
      :viewBox="`0 0 ${VB_W} ${VB_H}`"
      role="img"
      aria-label="Project timeline from August 2026 to December 2027, with chapter milestones and the thesis defense"
    >
      <!-- axis -->
      <line
        class="axis"
        :x1="AXIS_L" :y1="AXIS_Y" :x2="AXIS_R" :y2="AXIS_Y"
      />
      <text class="year" :x="AXIS_L - 12" :y="AXIS_Y + 3.5" text-anchor="end">AUG 2026</text>

      <!-- milestones -->
      <g
        v-for="m in milestones"
        :key="m.id"
        class="ms"
        :class="[`c${m.chapter}`, { 'is-on': stage >= m.reveal, 'is-emph': m.emphasis }]"
      >
        <line
          class="stem"
          :x1="m.x" :y1="AXIS_Y" :x2="m.x" :y2="m.stemEnd"
          :style="{ '--len': m.stemLen, transitionDelay: delay(m, 120) }"
        />
        <circle
          class="dot"
          :cx="m.x" :cy="AXIS_Y" :r="m.emphasis ? 7 : 5"
          :style="{ transitionDelay: delay(m, 0) }"
        />
        <circle
          v-if="m.emphasis"
          class="pulse"
          :cx="m.x" :cy="AXIS_Y" r="7"
        />
        <g class="label" :style="{ transitionDelay: delay(m, 240) }">
          <text class="ms-date" :x="m.x" :y="m.dateY" text-anchor="middle">{{ m.date }}</text>
          <text
            v-for="(t, i) in m.label"
            :key="t"
            class="ms-desc"
            :x="m.x"
            :y="m.descY[i]"
            text-anchor="middle"
          >{{ t }}</text>
        </g>
      </g>

      <!-- legend -->
      <g class="legend" :class="{ 'is-on': stage >= 5 }">
        <g v-for="(l, i) in legend" :key="l.label">
          <circle :class="`lg-dot c${l.chapter}`" :cx="legendX(i)" :cy="LEGEND_Y - 3.5" r="4" />
          <text class="lg-label" :x="legendX(i) + 10" :y="LEGEND_Y">{{ l.label }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChapterMap from './ChapterMap.vue'

// stage = $clicks (0-5). Every visible state below is a pure function of it, so
// stepping backwards restores the previous state for free — no imperative state
// beyond the click counter Slidev already owns.
const props = defineProps({
  stage: { type: Number, default: 0 },
})

/* -------------------------------------------------------------------------
   Geometry. Authored against the deck's own canvas, not a 1920x1080 stage:
   academic-content gives an 884px content column, and the slide reserves the
   same 414px content height the standalone proposal slide uses. The card strip
   takes 96px of that, leaving 318px for this SVG at 1:1.
   ------------------------------------------------------------------------- */
const VB_W = 884
const VB_H = 318
const AXIS_L = 86
const AXIS_R = 812
const AXIS_W = AXIS_R - AXIS_L
const AXIS_Y = 136
const LEGEND_Y = 292
const SPAN = 16 // months from Aug 2026 (0) to Dec 2027 (16)

// Where a label block sits, per side and tier. `above` blocks are positioned by
// their bottom edge and grow upward; `below` blocks by their top edge.
const SLOTS = {
  'above-1': { edge: 64, stemEnd: 70 },
  'above-2': { edge: 96, stemEnd: 102 },
  'below-1': { edge: 168, stemEnd: 162 },
  'below-2': { edge: 218, stemEnd: 212 },
}

const DATE_H = 11 // date baseline offset from block top
const LINE_H = 15

// chapter -> the click that loads it
const REVEAL = { 1: 2, 2: 3, 3: 4, 0: 5 }

const RAW = [
  { id: 'ch1-sample',   chapter: 1, month: 1,  date: 'Sep 2026', label: ['Replication', 'sample collected'], side: 'below', tier: 1 },
  { id: 'ch1-ms',       chapter: 1, month: 3,  date: 'Nov 2026', label: ['Ch1 manuscript', 'submitted'],     side: 'below', tier: 2 },
  { id: 'ch2-workshop', chapter: 2, month: 1,  date: 'Sep 2026', label: ['NeurIPS/ICLR', 'workshop sub.'],   side: 'above', tier: 1 },
  { id: 'ch2-neurips',  chapter: 2, month: 9,  date: 'May 2027', label: ['NeurIPS', 'submission'],           side: 'above', tier: 1 },
  { id: 'ch3-pilot',    chapter: 3, month: 4,  date: 'Dec 2026', label: ['VR pilot data'],                   side: 'above', tier: 2 },
  { id: 'ch3-collect',  chapter: 3, month: 7,  date: 'Mar 2027', label: ['VR data collection', 'complete'],  side: 'below', tier: 1 },
  { id: 'ch3-ms',       chapter: 3, month: 15, date: 'Nov 2027', label: ['Ch3 manuscript', 'preparation'],   side: 'above', tier: 1 },
  { id: 'thesis-draft', chapter: 0, month: 12, date: 'Aug 2027', label: ['Thesis draft'],                    side: 'below', tier: 1 },
  { id: 'defense',      chapter: 0, month: 16, date: 'Dec 2027', label: ['Defense'],                         side: 'below', tier: 1, emphasis: true },
]

// Two milestones share Sep 2026; nudge their dots apart so the axis reads as two
// events rather than one. They already sit on opposite sides of the axis. The
// offset has to clear the dot diameter (r=5) or the pair merges into one blob —
// +/-7 leaves them touching but plainly two, which is the truth of the schedule.
const DODGE = { 'ch1-sample': -7, 'ch2-workshop': 7 }

const milestones = RAW.map((m) => {
  const slot = SLOTS[`${m.side}-${m.tier}`]
  const blockH = DATE_H + LINE_H * m.label.length + 3
  const top = m.side === 'above' ? slot.edge - blockH : slot.edge
  return {
    ...m,
    x: AXIS_L + (m.month / SPAN) * AXIS_W + (DODGE[m.id] || 0),
    stemEnd: slot.stemEnd,
    stemLen: Math.abs(AXIS_Y - slot.stemEnd),
    dateY: top + DATE_H,
    descY: m.label.map((_, i) => top + DATE_H + LINE_H * (i + 1)),
    reveal: REVEAL[m.chapter],
    // position within its own reveal group, for the stagger
    order: RAW.filter((o) => o.chapter === m.chapter).findIndex((o) => o.id === m.id),
  }
})

const legend = [
  { chapter: 1, label: 'Chapter 1' },
  { chapter: 2, label: 'Chapter 2' },
  { chapter: 3, label: 'Chapter 3' },
  { chapter: 0, label: 'Thesis' },
]

const legendX = (i) => 268 + i * 96

// Stages 2-4 light one chapter card; 0, 1 and 5 leave all three neutral.
const activeChapter = computed(() =>
  props.stage >= 2 && props.stage <= 4 ? props.stage - 1 : 0,
)

// Stagger only on the way IN. Delaying the exit as well makes stepping backwards
// feel broken, so the hidden state always transitions at 0ms.
function delay(m, offset) {
  return props.stage >= m.reveal ? `${m.order * 200 + offset}ms` : '0ms'
}
</script>

<style scoped>
.tt {
  position: relative;
  height: 414px;
  width: 100%;
}

/* The compression. Animating the slot's height (not the cards' scale) keeps all
   card type at its authored size — the cards lose the question text instead of
   shrinking. 414px -> 96px reads as the block riding up to make room. */
.cards-slot {
  height: 414px;
  display: flex;
  align-items: center;
  transition: height 600ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.is-open .cards-slot {
  height: 96px;
}

.tl {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: visible;
}

/* ---- axis ---- */
.axis {
  stroke: #c8ccd3;
  stroke-width: 1.5;
  stroke-dasharray: var(--axis-len);
  stroke-dashoffset: var(--axis-len);
  transition: stroke-dashoffset 700ms ease 250ms;
}

.is-open .axis {
  stroke-dashoffset: 0;
}

.year {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.07em;
  fill: #9aa0ab;
  opacity: 0;
  transition: opacity 400ms ease 600ms;
}

.is-open .year {
  opacity: 1;
}

/* ---- milestones ----
   Chapter hues are ChapterMap's own pastels. Text needs a darker companion —
   11px of #e8bd8a on white is unreadable — so each gets a deepened tone, the
   same move VennJoin makes with its lobe strokes. */
.c1 { --hue: #9b8ec4; --ink: #6d5f9e; }
.c2 { --hue: #d09aa4; --ink: #a86b78; }
.c3 { --hue: #e8bd8a; --ink: #b3813f; }
.c0 { --hue: #8b919b; --ink: #5f6874; }

/* The white keyline is what separates the two Sep 2026 dots where they touch. */
.dot {
  fill: var(--hue);
  stroke: #ffffff;
  stroke-width: 1.5;
  transform: scale(0);
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ms.is-on .dot {
  transform: scale(1);
}

.is-emph .dot {
  stroke-width: 2;
}

/* One dash the length of the whole stem, offset out of view, so the stem draws
   from the dot outward — every stem's x1,y1 is the axis end. */
.stem {
  stroke: var(--hue);
  stroke-width: 1;
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  opacity: 0.75;
  transition: stroke-dashoffset 320ms ease;
}

.ms.is-on .stem {
  stroke-dashoffset: 0;
}

.label {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 320ms ease, transform 320ms ease;
}

.ms.is-on .label {
  opacity: 1;
  transform: translateY(0);
}

.ms-date {
  font-family: 'Inter', sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  fill: var(--ink);
}

.ms-desc {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  fill: #7c848f;
}

.is-emph .ms-date {
  font-size: 12.5px;
  font-weight: 700;
}

.is-emph .ms-desc {
  font-weight: 600;
  fill: #4a5568;
}

/* One scale-out, no loop. */
.pulse {
  fill: none;
  stroke: var(--hue);
  stroke-width: 2;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}

.ms.is-on .pulse {
  animation: pulse-once 900ms ease-out 500ms 1;
}

@keyframes pulse-once {
  0%   { opacity: 0.7; transform: scale(1); }
  100% { opacity: 0;   transform: scale(2.6); }
}

/* ---- legend ---- */
.legend {
  opacity: 0;
  transition: opacity 400ms ease 700ms;
}

.legend.is-on {
  opacity: 1;
}

.lg-dot {
  fill: var(--hue);
}

.lg-label {
  font-family: 'Inter', sans-serif;
  font-size: 10.5px;
  font-weight: 400;
  fill: #8b919b;
}

@media (prefers-reduced-motion: reduce) {
  .cards-slot,
  .axis,
  .year,
  .dot,
  .stem,
  .label,
  .legend {
    transition-duration: 150ms !important;
    transition-delay: 0ms !important;
  }

  /* Everything still appears on the same clicks; only the movement goes away.
     Each element swaps its drawing/scaling reveal for a plain opacity fade. */
  .cards-slot { transition-property: height; }

  .axis { stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; transition-property: opacity; }
  .is-open .axis { opacity: 1; }

  .stem { stroke-dasharray: none; stroke-dashoffset: 0; opacity: 0; transition-property: opacity; }
  .ms.is-on .stem { opacity: 0.75; }

  .dot { transform: scale(1); opacity: 0; transition-property: opacity; }
  .ms.is-on .dot { opacity: 1; }

  .label { transform: none; transition-property: opacity; }
  .ms.is-on .label { transform: none; }

  .ms.is-on .pulse { animation: none; }
}
</style>
