<template>
  <div class="slidev-layout academic-question">
    <div class="question-container">
      <slot />
    </div>

    <!-- Bottom section: label left, page number right -->
    <div class="bottom-section">
      <div class="section-delimiter">
        <strong>{{ $props.section || 'QUESTION' }}</strong>
      </div>
      <div class="references-area">
        <slot name="references" />
      </div>
    </div>

    <!-- Page number -->
    <div class="page-number">
      {{ $slidev.nav.currentPage }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  section: {
    type: String,
    default: 'QUESTION'
  }
})
</script>

<style scoped>
.academic-question {
  @apply h-full px-12 py-8;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Vertically centred, left-aligned — the question sits on the optical middle
   of the slide rather than at the top like academic-content. */
.question-container {
  @apply flex-1 w-full;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  padding-bottom: 3rem; /* offsets the bottom furniture so it reads centred */
}

/* IDENTICAL to academic-content's h1 — same family, weight, size, and colour —
   so the question slide's title reads as the same typographic object as every
   other title in the deck. Only the rule's min-width differs (below).

   ⚠️ h1 is a FLEX CONTAINER, so every element child becomes its own flex item.
   Inline <strong> would therefore break the sentence into side-by-side boxes.
   Wrap the question text in <span class="q"> so the h1 has exactly one child
   plus the ::after rule. See slide 5 for the pattern. */
.academic-question :deep(h1) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.25;
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

/* The single wrapping child. min-width: 0 lets it shrink and wrap instead of
   forcing the rule off the slide. */
.academic-question :deep(h1 > .q) {
  min-width: 0;
}

/* ⚠️ THE SPANS MUST BE GIVEN THE TITLE FONT BACK EXPLICITLY. Do not delete.

   style.css sets, on EVERY span in the deck:
       p, li, span, div, .slidev-layout {
         font-family: var(--slidev-font-family-text) !important;   -- Inter
         font-weight: 300;
         line-height: 1.6;
       }
   Every OTHER h1 in the deck (64 of 65) is bare text, so it never meets that
   rule. This one cannot be: the .q wrapper is required to stop the flex h1
   fragmenting, and the .u spans are what carry the underlined phrases. So the
   h1 was correctly Crimson Pro while every glyph inside it rendered Inter
   Light at 1.6 leading — sans, too light, and too loosely leaded.

   Fixed by SPECIFICITY, not ordering — the same approach as the KaTeX block in
   style.css. Both declarations are !important, so the more specific selector
   wins: `.academic-question[data-v-*] h1 span` far outranks the bare `span`.
   The descendant selector covers the nested .u spans as well.

   line-height is re-asserted HERE, not only on the h1, because an inline span's
   own line-height sets its line boxes regardless of the parent's value. */
.academic-question :deep(h1),
.academic-question :deep(h1 span) {
  font-family: 'Crimson Pro', Georgia, serif !important;
  font-weight: 600 !important;
  line-height: 1.25 !important;
}

/* Emphasis is a RED UNDERLINE, not colour and not weight (changed at request,
   2026-08-16 — the keywords were previously set in three different colours).

   The whole question now sits in one ink colour and the underline is the only
   emphasis. That is strictly more accessible than the colour scheme it replaced:
   the mark is a shape rather than a hue, so it survives projection, greyscale
   handouts, and colour-blind viewers, none of which the old three-colour version
   did reliably. Weight is unavailable as a signal anyway — the deck loads only
   200/400/600 and the title is already at 600.

   TWO MARKS, and the second one deliberately SPANS THE "AND":
       affective states          — one mark
       effort and threat         — one mark, not two
   The joint mark is the point of the slide: effort and threat are one
   computation, not two costs that happen to be named together. Underlining them
   separately would say the opposite. Do not split it.

   ⚠️ THE SEMANTIC CARRY-OVER IS GONE, KNOWINGLY. The old colours were the deck's
   own assignments — effort #5b7fa6 and threat #a86b78 from VennJoin.vue on the
   preceding slide, affect #d81b60 from the TrialTimeline probe. Those links are
   no longer made typographically here; the preceding slide still teaches them,
   and this slide now leans on position and the underline instead.

   #c53030 is the deck's existing red (the threat channel on the model-equation
   slide), reused rather than introducing a fourth red. em units so the mark
   scales with the title if the font-size ever changes. No !important needed —
   style.css sets font-family/weight/line-height on spans but never
   text-decoration, so nothing competes with these declarations. */
.academic-question :deep(h1 strong),
.academic-question :deep(h1 b) {
  font-weight: 600;
  color: inherit;
}

.academic-question :deep(h1 .u) {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: #c53030;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.16em;
}

/* The rule. min-width forces the question to wrap in the left half, which is
   what gives the reference layout its shape. */
.academic-question :deep(h1::after) {
  content: '';
  flex: 1;
  height: 0.8px;
  background: linear-gradient(to right, #374151, #1f2937);
  min-width: 38%;
}

/* Optional supporting line under the question. */
.academic-question :deep(.subtitle) {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 300;
  color: #4a5568;
  margin-top: 1.75rem;
  max-width: 60%;
}

.bottom-section {
  @apply absolute bottom-6 left-12 right-8 flex justify-between items-baseline;
}

.section-delimiter {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.875rem !important;
  font-weight: 700 !important;
  color: #6f6f6f !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
}

.academic-question .section-delimiter strong {
  color: #959aa4 !important;
  font-weight: 700 !important;
}

.references-area {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.75rem !important;
  font-weight: 300 !important;
  color: #6b7280 !important;
  text-align: right !important;
  max-width: 300px;
  line-height: 1.3;
  margin-right: 4rem;
}

.page-number {
  @apply absolute bottom-6 right-8 text-sm;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #6b7280;
}
</style>
