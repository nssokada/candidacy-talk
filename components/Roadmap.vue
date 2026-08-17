<template>
  <div class="roadmap" :class="[full ? 'is-full' : 'is-strip']">
    <div
      v-for="s in studies"
      :key="s.n"
      class="rm-cell"
      :class="{ 'is-active': active === s.n, 'is-dim': active && active !== s.n }"
    >
      <div class="rm-head">
        <span class="rm-n">{{ full ? 'Study ' + s.n : 'S' + s.n }}</span>
        <span class="rm-res">{{ s.res }}</span>
      </div>
      <div class="rm-what">{{ s.what }}</div>
      <template v-if="full">
        <div class="rm-sees"><span class="rm-lbl">sees</span>{{ s.sees }}</div>
        <div class="rm-blind"><span class="rm-lbl">blind to</span>{{ s.blind }}</div>
        <div class="rm-diff">differentiated by <strong>{{ s.diff }}</strong></div>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // 1 | 2 | 3 — which study is currently being presented
  active: { type: Number, default: 0 },
  // full = the S1.4 / S5.2 spine diagram; false = the corner strip
  full: { type: Boolean, default: false },
})

const studies = [
  {
    n: 1,
    res: 'behavioral–parametric',
    what: 'Humans, 2D foraging',
    sees: 'generative model, large N, separable parameters',
    blind: 'mechanism — the brain is unreadable',
    diff: 'traits',
  },
  {
    n: 2,
    res: 'representational',
    what: 'LLM agent, flight task',
    sees: 'the danger variable is readable and writable',
    blind: 'no body, no consequences',
    diff: 'personas',
  },
  {
    n: 3,
    res: 'physical–physiological',
    what: 'Humans, VR',
    sees: 'metabolic effort, whole-body escape, autonomic readout',
    blind: 'cannot scale or read internals',
    diff: 'the body itself',
  },
]
</script>

<style scoped>
.roadmap {
  font-family: 'Inter', sans-serif;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

/* ---------- corner strip ---------- */
/* Kept narrow (7.5rem) so it clears the right end of the h1 rule, which
   stops at the edge of the layout's max-w-4xl container. */
.is-strip {
  position: absolute;
  top: 1rem;
  right: 2rem;
  width: 7.5rem;
  gap: 0.3rem;
  z-index: 10;
}

.is-strip .rm-cell {
  border-top: 2.5px solid #cbd0d8;
  padding-top: 0.25rem;
  text-align: center;
}

.is-strip .rm-n {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #b6bbc3;
  white-space: nowrap;
}

.is-strip .rm-res,
.is-strip .rm-what {
  display: none;
}

.is-strip .rm-cell.is-active {
  border-top-color: #1f2937;
}

.is-strip .rm-cell.is-active .rm-n {
  color: #1f2937;
}

/* ---------- full spine diagram ---------- */
.is-full {
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.is-full .rm-cell {
  border-top: 3px solid #374151;
  padding: 0.7rem 0.75rem 0.85rem;
  background: #ffffff;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 1px 3px rgba(31, 41, 55, 0.07);
}

.is-full .rm-cell.is-dim {
  opacity: 0.42;
}

.is-full .rm-n {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f2937;
  display: block;
}

.is-full .rm-res {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 0.95rem;
  font-style: italic;
  color: #4a5568;
  display: block;
  margin-bottom: 0.35rem;
}

.is-full .rm-what {
  font-size: 0.85rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.45rem;
}

.is-full .rm-sees,
.is-full .rm-blind {
  font-size: 0.72rem;
  font-weight: 300;
  line-height: 1.35;
  color: #2d3748;
  margin-bottom: 0.3rem;
}

.is-full .rm-blind {
  color: #8b919b;
}

.rm-lbl {
  display: block;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #9aa0ab;
}

.is-full .rm-diff {
  font-size: 0.72rem;
  font-weight: 300;
  color: #2d3748;
  border-top: 1px solid #e4e6ea;
  padding-top: 0.35rem;
  margin-top: 0.45rem;
}
</style>
