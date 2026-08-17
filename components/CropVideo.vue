<template>
  <div class="crop">
    <video
      :style="videoStyle"
      controls
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="resolvedSrc" :type="type" />
    </video>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/*
  Shows only a sub-rectangle of a video, scaled to fill the frame — for screen
  recordings that captured window chrome (menu bar, tabs, URL bar) around the
  content you actually want.

  The four inset props are FRACTIONS OF THE SOURCE FRAME, measured from each
  edge. To re-measure: screenshot the slide, read the pixel bounds of the region
  you want, and divide by the rendered video's width/height.

  The cropped region should have the same aspect ratio as the slide (16:9), or
  the video will stretch — `object-fit: fill` is deliberate so the crop maps
  exactly onto the frame.
*/
const props = defineProps({
  src: { type: String, required: true },
  type: { type: String, default: 'video/mp4' },
  top: { type: Number, default: 0 },
  right: { type: Number, default: 0 },
  bottom: { type: Number, default: 0 },
  left: { type: Number, default: 0 },
})

/*
  Vite rewrites root-absolute asset paths in markdown and plain HTML, but not in
  Vue component props — so a deployment under a sub-path (GitHub Pages project
  site) would request /figures/... instead of /<repo>/figures/... and 404.
  BASE_URL is '/' in dev, so this is a no-op locally.
*/
const resolvedSrc = computed(() => {
  const base = import.meta.env.BASE_URL || '/'
  return props.src.startsWith('/')
    ? base.replace(/\/$/, '') + props.src
    : props.src
})

const videoStyle = computed(() => {
  const w = 1 - props.left - props.right
  const h = 1 - props.top - props.bottom
  return {
    width: `${100 / w}%`,
    height: `${100 / h}%`,
    left: `${-(props.left / w) * 100}%`,
    top: `${-(props.top / h) * 100}%`,
  }
})
</script>

<style scoped>
.crop {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.crop video {
  position: absolute;
  object-fit: fill;
  max-width: none;
  max-height: none;
}
</style>
