<template>
  <div class="slidev-layout full-bleed">
    <slot />
  </div>
</template>

<style scoped>
/* No padding, no furniture — for a video or figure that should fill the frame. */
.full-bleed {
  @apply h-full w-full p-0 m-0;
  background: #0f1115;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.full-bleed :deep(video),
.full-bleed :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
</style>
