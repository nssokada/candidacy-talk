<template>
  <div
    class="cb"
    :class="{ 'is-open': stage >= 1, 'is-resolved': stage >= 4 }"
    :style="{ '--cb-h': `${height}px` }"
  >
    <!-- Stage 0 is the proposal view: the full slot with the cards dead centre
         and their questions on. From stage 1 the slot collapses to a header
         strip, exactly as ThesisTimeline does it, and the progression below
         moves into the space it vacates. -->
    <div class="cards-slot">
      <ChapterMap :active="activeChapter" :compact="stage >= 1" />
    </div>

    <div class="lower">
      <!-- The arrow strip. SVG rather than HTML because style.css forces
           `font-weight: 300 !important` onto every div/p/li inside
           .slidev-layout; SVG text is outside those selectors, so the 600/700
           weights hold without an !important war. -->
      <svg
        class="strip"
        :viewBox="`0 0 ${VB_W} ${STRIP_H}`"
        role="img"
        aria-label="Progression across the three chapters: infer the computation, then intervene on the representation, then embody the computation"
      >
        <g
          v-for="a in arrows"
          :key="a.from"
          class="arrow"
          :class="{ 'is-on': stage >= a.reveal }"
        >
          <line
            class="shaft"
            :x1="a.x1" :y1="STRIP_MID" :x2="a.x2" :y2="STRIP_MID"
            :style="{ '--len': a.x2 - a.x1 }"
          />
          <polyline
            class="head"
            :points="`${a.x2 - 5},${STRIP_MID - 3.5} ${a.x2},${STRIP_MID} ${a.x2 - 5},${STRIP_MID + 3.5}`"
          />
        </g>

        <text
          v-for="c in columns"
          :key="`tag-${c.n}`"
          class="tagline"
          :class="[`c${c.n}`, { 'is-on': stage >= c.n }]"
          :x="c.cx"
          :y="STRIP_MID + 4"
          text-anchor="middle"
          :style="{ transitionDelay: tagDelay(c.n) }"
        >{{ c.tagline }}</text>
      </svg>

      <!-- Bullets. Same grid and side padding as ChapterMap, so a marker sits
           flush under the left edge of its card's text column rather than being
           nudged into place by hand. -->
      <div class="cols">
        <div v-for="c in columns" :key="`col-${c.n}`" class="col" :class="`c${c.n}`">
          <div
            v-for="(b, i) in c.bullets"
            :key="b.text"
            class="bullet"
            :class="{ 'is-gap': b.gap, 'is-on': stage >= c.n }"
            :style="{ transitionDelay: bulletDelay(c.n, i) }"
          >
            <span
              class="marker"
              :class="{ 'is-ring': b.gap }"
              :style="{ transitionDelay: markerDelay(c.n, i) }"
            ></span>
            <span class="btext">{{ b.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChapterMap from './ChapterMap.vue'

// stage = $clicks (0-4). Every visible state below is a pure function of it, so
// stepping backwards restores the previous state for free. Nothing here is
// imperative, and nothing an earlier stage revealed is ever taken away — only
// the resolve stage changes an already-visible element (the gap lines dim).
const props = defineProps({
  stage: { type: Number, default: 0 },
  // Height of the region the slide reserves for this component, and the height
  // the card slot opens to at stage 0. 414 is the deck's full content region;
  // the synthesis slide runs 330 because the central question sits above it.
  // The strip and bullets are parked at a fixed offset below the compressed
  // cards, so only the stage-0 centring moves with this.
  height: { type: Number, default: 414 },
})

/* -------------------------------------------------------------------------
   Geometry. The deck's canvas is 980px wide and academic-content pads it by
   px-12, leaving an 884px content column — the same number ThesisTimeline is
   authored against, so the strip's viewBox maps 1:1 to CSS pixels.

   ChapterMap is `repeat(3, 1fr)` with a 1rem gap, so at 884px each column is
   284px and their centres land on 142 / 442 / 742.
   ------------------------------------------------------------------------- */
const VB_W = 884
const STRIP_H = 40
const STRIP_MID = 20
const COL_CX = [142, 442, 742]

// Arrows live in the space between tagline blocks. The widest tagline
// ("Intervene on the representation") measures ~205px at 11.5px/600, so a
// 230px reserved box per column is the conservative bound; these endpoints sit
// inside the 70px that leaves, with clearance at both ends.
const arrows = [
  { from: 1, x1: 262, x2: 322, reveal: 2 },
  { from: 2, x1: 562, x2: 622, reveal: 3 },
]

const columns = [
  {
    n: 1,
    cx: COL_CX[0],
    tagline: 'Infer the computation',
    bullets: [
      { text: 'Unified model of effort and threat valuation' },
      { text: 'Choice and vigor dissociate, tracking apathy and anxiety' },
      { text: 'But the state is only inferred from behavior', gap: true },
    ],
  },
  {
    n: 2,
    cx: COL_CX[1],
    tagline: 'Intervene on the representation',
    bullets: [
      { text: 'Affective representations found inside an agent' },
      { text: 'Manipulating them shifts danger judgments and choice' },
      { text: 'But embodied costs are not physically represented', gap: true },
    ],
  },
  {
    n: 3,
    cx: COL_CX[2],
    tagline: 'Embody the computation',
    bullets: [
      { text: 'Effort becomes metabolic work; threat becomes real consequence' },
      { text: 'Renders safety seeking and movement vigor as continuous behavioral decisions' },
      { text: 'Autonomic physiology couples valuation to bodily state' },
    ],
  },
]

// Chapter 3 deliberately carries no gap line: its three bullets ARE the answers
// to the two gaps above, which is the whole argument of the slide.

// Stages 1-3 light one card; 0 and 4 leave all three at full strength.
const activeChapter = computed(() =>
  props.stage >= 1 && props.stage <= 3 ? props.stage : 0,
)

// Chapter 1 has no arrow to wait for, so its tagline lands 50ms earlier.
const TAG_IN = { 1: 250, 2: 300, 3: 300 }

// Stagger only on the way IN. Delaying the exit as well makes stepping
// backwards feel broken, so the hidden state always transitions at 0ms.
const tagDelay = (n) => (props.stage >= n ? `${TAG_IN[n]}ms` : '0ms')
const bulletDelay = (n, i) =>
  props.stage >= n ? `${TAG_IN[n] + 150 + i * 120}ms` : '0ms'
const markerDelay = (n, i) =>
  props.stage >= n ? `${TAG_IN[n] + 120 + i * 120}ms` : '0ms'
</script>

<style scoped>
.cb {
  position: relative;
  height: var(--cb-h, 414px);
  width: 100%;
  font-family: 'Inter', sans-serif;
}

/* The compression, lifted from ThesisTimeline so the two slides read as
   siblings: animate the slot's height, not the cards' scale, so all card type
   stays at its authored size and the cards shed their questions instead of
   shrinking. */
.cards-slot {
  height: var(--cb-h, 414px);
  display: flex;
  align-items: center;
  transition: height 600ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.is-open .cards-slot {
  height: 96px;
}

/* Parked below the compressed card strip: 96px of cards, a 10px gap, then the
   strip and the bullet region. Absolute so stage 0 keeps the cards centred in
   the full region without this block pushing the slide taller, and so the
   offset stays fixed however tall that region is. */
.lower {
  position: absolute;
  top: 106px;
  left: 0;
  right: 0;
}

/* ---- arrow strip ---- */
.strip {
  display: block;
  width: 100%;
  height: 40px;
  overflow: visible;
}

/* Chapter hues, matching ChapterMap's pastels and ThesisTimeline's deepened
   companions. 11.5px of #e8bd8a on white is unreadable, so the strip resolves
   to the --ink tone rather than the card tone. */
.c1 { --hue: #9b8ec4; --ink: #6d5f9e; }
.c2 { --hue: #d09aa4; --ink: #a86b78; }
.c3 { --hue: #e8bd8a; --ink: #b3813f; }

.tagline {
  font-family: 'Inter', sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  fill: #8b919b;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 320ms ease, transform 320ms ease, fill 400ms ease,
              font-weight 400ms ease;
}

.tagline.is-on {
  opacity: 1;
  transform: translateY(0);
}

/* Resolve: the progression takes the emphasis, so the taglines deepen into
   their own chapter tones and the arrows thicken. One quiet state change. */
.is-resolved .tagline.is-on {
  fill: var(--ink);
  font-weight: 700;
}

/* One dash the length of the whole shaft, offset out of view, so the arrow
   draws left to right. */
.shaft {
  stroke: #c8ccd3;
  stroke-width: 1;
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  transition: stroke-dashoffset 300ms ease, stroke-width 400ms ease;
}

.arrow.is-on .shaft {
  stroke-dashoffset: 0;
}

.head {
  fill: none;
  stroke: #c8ccd3;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transition: opacity 220ms ease 260ms, stroke-width 400ms ease;
}

.arrow.is-on .head {
  opacity: 1;
}

.is-resolved .arrow.is-on .shaft,
.is-resolved .arrow.is-on .head {
  stroke-width: 1.5;
}

/* ---- bullets ---- */
.cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 18px;
}

/* 0.55rem matches ChapterMap's own card padding, so the markers line up with
   the left edge of the card text above them. */
.col {
  padding: 0 0.55rem;
}

.bullet {
  display: grid;
  grid-template-columns: 14px 1fr;
  align-items: start;
  margin-bottom: 14px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 320ms ease, transform 320ms ease;
}

.bullet.is-on {
  opacity: 1;
  transform: translateY(0);
}

/* Resolve: the two gap lines step back so the eye lands on the progression and
   on Chapter 3's answers. */
.is-resolved .bullet.is-gap.is-on {
  opacity: 0.6;
}

/* Filled dot = established, open ring = still missing. Two quiet signals, no
   red and no icons. Drawn rather than typed, so it cannot inherit the wrong
   font weight from style.css. 6px rather than the spec's 3px: at 3px an open
   ring has no visible hole, and the filled/open distinction has to survive
   presentation distance. */
.marker {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--hue);
  margin-top: 5px;
  transform: scale(0);
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.marker.is-ring {
  background: transparent;
  border: 1.5px solid var(--hue);
}

.bullet.is-on .marker {
  transform: scale(1);
}

/* The weight and colour live on the span: style.css forces
   `font-weight: 300 !important` on every p, li and div inside .slidev-layout,
   and span is not in that selector list. */
.btext {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.45;
  color: #7c848f;
  text-wrap: pretty;
}

.bullet.is-gap .btext {
  font-style: italic;
  color: #9aa0ab;
}

@media (prefers-reduced-motion: reduce) {
  .cards-slot,
  .tagline,
  .shaft,
  .head,
  .bullet,
  .marker {
    transition-duration: 150ms !important;
    transition-delay: 0ms !important;
  }

  /* Everything still appears on the same clicks; only the movement goes away,
     and the final stage renders identically to the normal-motion one. */
  .cards-slot { transition-property: height; }

  .tagline { transform: none; }
  .tagline.is-on { transform: none; }

  .shaft {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    opacity: 0;
    transition-property: opacity, stroke-width;
  }
  .arrow.is-on .shaft { opacity: 1; }

  .bullet { transform: none; }
  .bullet.is-on { transform: none; }

  .marker { transform: scale(1); opacity: 0; transition-property: opacity; }
  .bullet.is-on .marker { opacity: 1; }
}
</style>
