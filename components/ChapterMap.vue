<template>
  <div class="chapters" :class="{ 'is-compact': compact }">
    <div
      v-for="c in chapters"
      :key="c.n"
      class="chapter"
      :class="{ 'is-active': active === c.n, 'is-dim': active && active !== c.n }"
    >
      <div class="banner" :style="{ background: active && active !== c.n ? '#c8ccd3' : c.color }">
        Chapter {{ c.n }}
      </div>
      <div class="ch-title">{{ c.title }}</div>
      <div class="ch-q">{{ c.question }}</div>
      <div class="ch-status">
        <span class="dot" :style="{ background: c.color }"></span>{{ c.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
// 0 = the neutral proposal overview · 1|2|3 = that chapter lit, the others dimmed
defineProps({
  active: { type: Number, default: 0 },
  // Drop the question text and tighten the cards to a header strip. Used by
  // ThesisTimeline, where the cards have already been read and the timeline
  // below them is the thing being looked at. Defaults off, so the standalone
  // proposal slide is untouched.
  compact: { type: Boolean, default: false },
})

const chapters = [
  {
    n: 1,
    title: 'Online Sample',
    color: '#9b8ec4',
    question:
      'Do effort and threat enter one value computation — and does apathy or anxiety reshape it?',
    status: 'Replicating',
  },
  {
    n: 2,
    title: 'Language Models',
    color: '#d09aa4',
    question:
      'Can manipulating an affective representation shift defensive choices in artificial agents?',
    status: 'Pilot',
  },
  {
    n: 3,
    title: 'Virtual Reality',
    color: '#e8bd8a',
    question:
      'Does that computation carry an autonomic signature when effort and threat are embodied?',
    status: 'Development',
  },
]
</script>

<style scoped>
.chapters {
  font-family: 'Inter', sans-serif;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

.chapter {
  padding: 0 0.55rem 0.55rem;
  border-radius: 4px;
  transition: opacity 300ms ease, transform 300ms ease, box-shadow 300ms ease;
}

.chapter.is-dim {
  opacity: 0.34;
}

.chapter.is-active {
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(31, 41, 55, 0.10);
  transform: translateY(-4px);
}

.banner {
  margin: 0 -0.55rem;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  padding: 0.4rem 0.3rem;
  border-radius: 3px;
}

.ch-title {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0.6rem 0 0.5rem;
  text-align: center;
  transition: margin 520ms cubic-bezier(0.16, 0.84, 0.44, 1);
}

.ch-q {
  font-size: 0.74rem;
  font-weight: 300;
  line-height: 1.4;
  color: #7c848f;
  text-align: left;
  text-wrap: pretty;
  min-height: 3.6rem;
  overflow: hidden;
  transition: min-height 520ms cubic-bezier(0.16, 0.84, 0.44, 1),
              max-height 520ms cubic-bezier(0.16, 0.84, 0.44, 1),
              opacity 260ms ease;
  max-height: 6rem;
}

/* Compact: shed the question rather than scaling the whole card down — the
   question is the part that has already been read, and scaling would push the
   0.74rem body copy below legibility. `min-height` has to go to 0 as well:
   min-height beats max-height in the cascade, so collapsing max-height alone
   would do nothing. */
.is-compact .ch-q {
  min-height: 0;
  max-height: 0;
  opacity: 0;
}

.is-compact .ch-title {
  margin: 0.45rem 0 0.4rem;
}

.ch-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4a5568;
  border-top: 1px solid #e4e6ea;
  padding-top: 0.4rem;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex: none;
}
</style>
