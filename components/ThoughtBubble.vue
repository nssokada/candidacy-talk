<template>
  <div class="bubble" :style="{ width: `${width}px`, height: `${height}px` }">
    <svg class="cloud" :viewBox="`0 0 ${width} ${height}`" :width="width" :height="height">
      <path :d="path" fill="#ffffff" :stroke="color" stroke-width="2" stroke-linejoin="round" />
    </svg>
    <div class="content">
      <div v-if="label" class="label" :style="{ color }">{{ label }}</div>
      <div class="body"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/*
  A cloud-shaped thought bubble: scalloped lobes around an ellipse, white fill,
  2px coloured stroke — the same stroke weight as the ThoughtTail puffs, so the
  bubble and its tail read as one object.

  Drawn as ONE closed path of arcs rather than a pile of overlapping circles;
  overlapping circles leave interior strokes that have to be covered up.
*/
const props = defineProps({
  width: { type: Number, default: 296 },
  height: { type: Number, default: 176 },
  color: { type: String, default: '#9aa0ab' },
  label: { type: String, default: '' },
  // number of scallops around the rim
  lobes: { type: Number, default: 11 },
})

const path = computed(() => {
  const cx = props.width / 2
  const cy = props.height / 2
  // inner ellipse the lobe centres sit on; the lobes bulge out to the full box
  const rx = cx * 0.87
  const ry = cy * 0.82
  const n = props.lobes

  const pts = Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n - Math.PI / 2
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
  })

  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % n]
    // radius > half the chord, so the arc bulges outward into a rounded lobe
    const r = (Math.hypot(x2 - x1, y2 - y1) / 2) * 1.22
    d += ` A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
  }
  return d + ' Z'
})
</script>

<style scoped>
/* Always positions relative to itself — place it on the slide by wrapping it in
   an absolutely-positioned div, not by putting `absolute` on the component. */
.bubble {
  position: relative;
}

.cloud {
  position: absolute;
  inset: 0;
}

/* The content sits inside the ellipse the lobes are built on, so nothing
   collides with a scallop. */
.content {
  position: absolute;
  left: 14%;
  right: 14%;
  top: 13%;
  bottom: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

/* Deliberately over-specific: style.css forces the light sans body font onto
   every div via `.slidev-layout div:not(...):not(...) { ... !important }`, so
   the label needs both !important and a higher specificity to stay serif. */
.bubble .content .label {
  font-family: 'Crimson Pro', Georgia, serif !important;
  font-weight: 700 !important;
  font-size: 1.35rem;
  line-height: 1.1 !important;
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
