<template>
  <div class="venn-wrap">
    <svg class="venn" viewBox="0 0 760 170" role="img"
         aria-label="Effort and threat as two literatures that overlap in this work">
      <defs>
        <clipPath id="clip-effort">
          <circle :cx="effortX" cy="85" r="75" />
        </clipPath>
      </defs>

      <!-- EFFORT -->
      <g class="lobe" :class="{ 'is-on': stage >= 0 }">
        <circle :cx="effortX" cy="85" r="75" fill="#8fa9c9" fill-opacity="0.30"
                stroke="#5b7fa6" stroke-width="2" />
        <text :x="effortLabelX" y="92" class="lobe-label">EFFORT</text>
      </g>

      <!-- THREAT -->
      <g class="lobe" :class="{ 'is-on': stage >= 1 }">
        <circle :cx="threatX" cy="85" r="75" fill="#d09aa4" fill-opacity="0.30"
                stroke="#a86b78" stroke-width="2" />
        <text :x="threatLabelX" y="92" class="lobe-label">THREAT</text>
      </g>

      <!-- the lens: circle B clipped by circle A -->
      <g class="lens" :class="{ 'is-on': stage >= 2 }">
        <circle :cx="threatX" cy="85" r="75" fill="#4a5568" fill-opacity="0.62"
                clip-path="url(#clip-effort)" />
        <text x="380" y="100" class="lens-q">?</text>
      </g>
    </svg>

    <div class="cols">
      <div class="col" :class="{ 'is-on': stage >= 0 }">
        <div class="col-h col-h-effort">apathy · effort</div>
        <div v-for="f in effortFindings" :key="f.text" class="finding">
          <span class="tag">{{ f.tag }} —</span>{{ f.text }}<span class="cite">{{ f.cite }}</span>
        </div>
      </div>
      <div class="col" :class="{ 'is-on': stage >= 1 }">
        <div class="col-h col-h-threat">anxiety · threat</div>
        <div v-for="f in threatFindings" :key="f.text" class="finding">
          <span class="tag">{{ f.tag }} —</span>{{ f.text }}<span class="cite">{{ f.cite }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 0 = effort only · 1 = both, apart · 2 = joined, intersection lit
  stage: { type: Number, default: 0 },
})

/*
  Content set by the author (2026-08-16): three lines per column, topic-tagged.

  ⚠ CITATION PROVENANCE — no longer uniformly verified against
  review/bib/references.bib. In the bib as of this edit:
    pessiglione2018motivation · husain2018apathy · leheron2018apathy ·
    mobbs2020spacetime · bach2015inhibition
  NOT in the bib, and needing entries before this deck's references are complete:
    Le Bouc+ 2016 · Grillon 2008 · Aylward+ 2020 · Charpentier+ 2017 ·
    Bonnelle+ 2015 (the bib holds bonnelle2016apathy, a different paper) ·
    Yamamori & Robinson 2023 (the bib holds yamamori2023approach, the
    three-author Yamamori/Robinson/Roiser eLife paper)
*/
const effortFindings = [
  { tag: 'EFFORT-BASED VALUATION',
    text: 'Effort costs discount prospective reward',
    cite: 'Pessiglione et al., 2018; Husain & Roiser, 2018' },
  { tag: 'REDUCED EFFORT ALLOCATION',
    text: 'Apathy predicts lower willingness to exert effort for reward',
    cite: 'Le Heron et al., 2018; Bonnelle et al., 2015' },
  { tag: 'COMPUTATIONAL MECHANISMS',
    text: 'Motivational deficits reflect altered reward–effort weighting',
    cite: 'Pessiglione et al., 2018; Le Bouc et al., 2016' },
]

const threatFindings = [
  { tag: 'UNCERTAIN THREAT',
    text: 'Anxiety is linked to distal and uncertain threat',
    cite: 'Grillon, 2008; Mobbs et al., 2020' },
  { tag: 'NEGATIVE EXPECTATIONS',
    text: 'Anxiety biases expectations toward adverse outcomes',
    cite: 'Aylward et al., 2020; Charpentier et al., 2017' },
  { tag: 'APPROACH–AVOIDANCE',
    text: 'Increasing threat shifts behavior toward avoidance',
    cite: 'Bach, 2015; Yamamori & Robinson, 2023' },
]

const joined = computed(() => props.stage >= 2)
/*
  r = 75, centres 84 apart when joined. That leaves an 84px-wide crescent on each
  side and a 66px lens, so EFFORT/THREAT sit centred in their own crescent with
  ~10px clear of both the circle edge and the lens — rather than jammed against
  the outer rim. The sub-labels moved out to the column headers to buy that room.
*/
const effortX = computed(() => (joined.value ? 338 : 215))
const threatX = computed(() => (joined.value ? 422 : 545))
const effortLabelX = computed(() => (joined.value ? 305 : 215))
const threatLabelX = computed(() => (joined.value ? 455 : 545))
</script>

<style scoped>
.venn-wrap {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.venn {
  width: 90%;
  align-self: center;
  flex: none;
}

circle,
text {
  transition: cx 700ms cubic-bezier(0.4, 0, 0.2, 1),
    x 700ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease;
}

.lobe,
.lens,
.col {
  opacity: 0;
  transition: opacity 400ms ease;
}

.lobe.is-on,
.lens.is-on,
.col.is-on {
  opacity: 1;
}

.lobe-label {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.08em;
  fill: #1f2937;
  text-anchor: middle;
}

.lens-q {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 40px;
  font-weight: 600;
  fill: #ffffff;
  text-anchor: middle;
}

/* ---------- the two evidence columns ---------- */
.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.2rem;
  margin-top: 0.2rem;
}

.col-h {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  padding-bottom: 0.22rem;
  border-bottom: 1.5px solid currentColor;
}

.col-h-effort { color: #5b7fa6; }
.col-h-threat { color: #a86b78; }

/*
  Three lines per column, not four — the sizes below are set a notch up from the
  four-line version so the columns fill their box rather than reading as sparse.
*/
.finding {
  font-size: 0.78rem;
  font-weight: 300;
  line-height: 1.3;
  color: #2d3748;
  padding-left: 0.7rem;
  margin-bottom: 0.62rem;
  position: relative;
}

/* the structural label — ON THE COST TERM / OFF IT, BELIEF / PREFERENCE */
.tag {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-right: 0.4rem;
  white-space: nowrap;
}

.col:first-child .tag { color: #5b7fa6; }
.col:last-child .tag { color: #a86b78; }

.finding::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.42em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #b6bbc3;
}

.col:first-child .finding::before {
  background: #5b7fa6;
}

.col:last-child .finding::before {
  background: #a86b78;
}

.cite {
  display: block;
  font-size: 0.66rem;
  font-style: italic;
  color: #8b919b;
}
</style>
