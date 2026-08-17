<template>
  <div class="tail" :style="{ left: `${x}px`, top: `${y}px` }">
    <span
      v-for="(c, i) in circles"
      :key="i"
      class="puff"
      :style="{
        width: `${c.r * 2}px`,
        height: `${c.r * 2}px`,
        left: `${c.dx - c.r}px`,
        top: `${c.dy - c.r}px`,
        borderColor: color,
      }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

/*
  The trailing puffs that turn a rounded card into a thought bubble. They shrink
  as they approach the thinker, which is the convention that makes it read as
  "thinking" rather than "speaking".

  Positioned in the same absolute coordinate space as the images on the slide:
  (x, y) is where the largest puff sits, next to the card's inner edge.
*/
const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  color: { type: String, default: '#9aa0ab' },
  // where the tail points — the thinker's head, in the same coordinate space
  tx: { type: Number, required: true },
  ty: { type: Number, required: true },
})

/*
  Four puffs spaced along the straight line from (x, y) to (tx, ty), shrinking
  toward the target. Taking an explicit target rather than a direction keeps the
  two tails aimed at the same point even though the card distances differ.
*/
const circles = computed(() => {
  const dx = props.tx - props.x
  const dy = props.ty - props.y
  return [
    { t: 0, r: 11 },
    { t: 0.36, r: 8 },
    { t: 0.68, r: 5.5 },
    { t: 1, r: 3.5 },
  ].map(c => ({ dx: dx * c.t, dy: dy * c.t, r: c.r }))
})
</script>

<style scoped>
.tail {
  position: absolute;
  width: 0;
  height: 0;
}

.puff {
  position: absolute;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid;
  box-sizing: border-box;
}
</style>
