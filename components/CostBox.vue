<template>
  <div
    class="cost-box"
    :style="{ width: `${width}px`, height: `${height}px`, borderColor: color }"
  >
    <div class="content">
      <div v-if="label" class="label" :style="{ color }">{{ label }}</div>
      <div class="body"><slot /></div>
    </div>
  </div>
</template>

<script setup>
/*
  A clean bounded panel: square-ish box, hairline coloured border, no fill —
  the slide background shows through. Deliberately plain — the two boxes are
  read as the two currencies of the decision, so nothing about the container
  should compete with the art inside it.

  Replaces the earlier ThoughtBubble/ThoughtTail cloud treatment on slide 2;
  the connector is now a dashed line drawn in the slide itself.

  Always positions relative to itself — place it on the slide by wrapping it in
  an absolutely-positioned div, not by putting `absolute` on the component.
*/
defineProps({
  width: { type: Number, default: 300 },
  height: { type: Number, default: 140 },
  // border + label colour
  color: { type: String, default: '#9aa0ab' },
  label: { type: String, default: '' },
})
</script>

<style scoped>
.cost-box {
  position: relative;
  border: 1.5px solid;
  border-radius: 5px;
  box-sizing: border-box;
}

.content {
  position: absolute;
  inset: 10px 14px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

/* Deliberately over-specific: style.css forces the light sans body font onto
   every div via `.slidev-layout div:not(...):not(...) { ... !important }`, so
   the label needs both !important and a higher specificity to stay serif.

   Weight 600, not 700 — that is the deck's serif weight (h1 titles, ChapterMap
   titles, VennJoin labels all sit at 600). The old ThoughtBubble label was the
   one 700 in the deck and read as a heavier, different face beside the title. */
.cost-box .content .label {
  font-family: 'Crimson Pro', Georgia, serif !important;
  font-weight: 600 !important;
  font-size: 1.3rem;
  line-height: 1.2 !important;
}

.body {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
