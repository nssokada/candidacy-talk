<template>
  <div class="tt-wrap">
    <svg class="tt" :class="{ 'probes-on': stage >= 3 }" viewBox="0 0 660 190" role="img"
         aria-label="81 trials in three blocks of 27, with 6 anxiety and 6 confidence probe trials per block and questionnaires between blocks">

      <!-- ── blocks ────────────────────────────────────────────── -->
      <g v-for="(blk, bi) in blocks" :key="'b' + bi">
        <text :x="blk.x + 85.5" y="30" class="blk-label">Block {{ bi + 1 }}</text>
        <text :x="blk.x + 85.5" y="43" class="blk-sub">27 trials</text>

        <circle
          v-for="i in 27" :key="'d' + bi + '-' + i"
          :cx="blk.x + 9.5 + ((i - 1) % 9) * 19"
          :cy="56 + Math.floor((i - 1) / 9) * 19"
          r="6"
          class="dot"
          :class="dotClass(bi, i - 1)"
        />
      </g>

      <!-- ── questionnaire interstitials ───────────────────────── -->
      <g v-for="(qx, qi) in questionnaireX" :key="'q' + qi"
         class="quest" :class="{ 'is-on': stage >= 1 }">
        <rect :x="qx" y="38" width="44" height="76" rx="5" />
        <!-- textLength pins the word to the band height so it can never spill out,
             lengthAdjust="spacing" tracks the letters rather than distorting them -->
        <text :x="qx + 22" y="76" class="quest-label"
              textLength="64" lengthAdjust="spacing"
              :transform="`rotate(-90 ${qx + 22} 76)`">QUESTIONNAIRES</text>
      </g>

      <!-- ── callouts ─────────────────────────────────────────── -->
      <g class="callout callout-anx" :class="{ 'is-on': stage >= 3 }">
        <path d="M 80.5 99 C 80.5 112, 96 114, 104 126" />
        <rect x="26" y="126" width="250" height="34" rx="4" />
        <text x="42" y="148">
          <tspan class="co-key">ANXIETY</tspan><tspan class="co-rest" dx="8">6 per block · 18 total</tspan>
        </text>
      </g>

      <g class="callout callout-conf" :class="{ 'is-on': stage >= 3 }">
        <path d="M 553.5 99 C 553.5 112, 546 114, 540 126" />
        <rect x="384" y="126" width="250" height="34" rx="4" />
        <text x="400" y="148">
          <tspan class="co-key">CONFIDENCE</tspan><tspan class="co-rest" dx="8">6 per block · 18 total</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  // Build order, paired with the slide text:
  //   0 = 81 trials only
  //   1 = questionnaire interstitials lit   → 2 = questionnaire text appears
  //   3 = probe trials coloured + callouts  → 4 = probe question text appears
  stage: { type: Number, default: 0 },
})

// Block origins on the x axis: 171px of dots, then a 56px questionnaire gap.
const blocks = [{ x: 14 }, { x: 241 }, { x: 468 }]
const questionnaireX = [191, 418]

// Probe positions are FIXED, not randomised at render time — the layout must not
// reshuffle between rehearsals. Six anxiety + six confidence per block of 27,
// per okada2026effortthreat text.md:535-537. Disjoint within each block.
const ANX = [
  [2, 6, 11, 17, 21, 25],
  [1, 5, 12, 16, 22, 26],
  [0, 7, 13, 18, 20, 24],
]
const CONF = [
  [0, 4, 9, 14, 19, 23],
  [3, 8, 10, 15, 20, 24],
  [2, 5, 11, 16, 22, 26],
]

function dotClass(block, i) {
  if (ANX[block].includes(i)) return 'is-anx'
  if (CONF[block].includes(i)) return 'is-conf'
  return ''
}
</script>

<style scoped>
.tt-wrap { width: 100%; display: flex; justify-content: center; }
.tt { width: 100%; height: 100%; font-family: 'Inter', sans-serif; }

/* ── blocks ── */
.blk-label {
  text-anchor: middle;
  font-size: 13px;
  font-weight: 600;
  fill: #1a1a1a;
  letter-spacing: 0.02em;
}
.blk-sub {
  text-anchor: middle;
  font-size: 10px;
  font-weight: 300;
  fill: #8b93a1;
}

/* ── trial dots ── */
.dot {
  fill: #d5d9e0;
  transition: fill 420ms ease, r 420ms ease;
}
/* Colours track the appraisal figure (fig4A_lines.png): crimson = anxiety,
   slate-blue = confidence. One colour per dimension, deck-wide. */
.tt.probes-on .is-anx  { fill: #d81b60; }
.tt.probes-on .is-conf { fill: #4a6d94; }

/* ── questionnaire interstitials ── */
.quest rect {
  fill: #f1f3f6;
  stroke: #d5d9e0;
  stroke-width: 1;
  transition: fill 420ms ease, stroke 420ms ease;
}
.quest-label {
  text-anchor: middle;
  font-size: 8px;
  font-weight: 600;
  fill: #a8aebb;
  transition: fill 420ms ease;
}
.quest.is-on rect { fill: #e8ecf2; stroke: #9aa3b2; }
.quest.is-on .quest-label { fill: #4a5568; }

/* ── callouts ── */
.callout {
  opacity: 0;
  transition: opacity 380ms ease;
}
.callout.is-on { opacity: 1; }
.callout path { fill: none; stroke-width: 1.2; }
.callout rect { fill: #fff; stroke-width: 1.2; }
.callout text { font-size: 12.5px; }
.co-key { font-weight: 700; letter-spacing: 0.06em; }
.co-rest { font-weight: 300; fill: #4a5568; }

.callout-anx path, .callout-anx rect { stroke: #d81b60; }
.callout-anx .co-key { fill: #d81b60; }
.callout-conf path, .callout-conf rect { stroke: #4a6d94; }
.callout-conf .co-key { fill: #4a6d94; }

@media (prefers-reduced-motion: reduce) {
  .dot, .callout, .quest rect, .quest-label { transition: none; }
}
</style>
