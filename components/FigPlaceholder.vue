<template>
  <div class="fig-placeholder" :style="{ height: h }">
    <div class="fig-id">
      {{ id }}
      <span v-if="status" class="fig-status" :class="'st-' + status.toLowerCase()">{{ status }}</span>
      <span v-if="pri" class="fig-pri">{{ pri }}</span>
    </div>
    <div class="fig-spec"><slot /></div>
    <div class="fig-note">figure not yet produced — see <code>talk/figures/</code></div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  status: { type: String, default: '' },
  pri: { type: String, default: '' },
  h: { type: String, default: '260px' },
})
</script>

<style scoped>
.fig-placeholder {
  @apply w-full flex flex-col justify-center items-center text-center;
  border: 1.5px dashed #b9bec7;
  border-radius: 6px;
  background: repeating-linear-gradient(
    45deg,
    #f2f3f5,
    #f2f3f5 10px,
    #eeeff2 10px,
    #eeeff2 20px
  );
  padding: 1rem 1.75rem;
}

.fig-id {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.fig-status,
.fig-pri {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  background: #dfe2e7;
  color: #4a5568;
}

.st-new { background: #dbe6f3; color: #2b4a6f; }
.st-remake { background: #f3e7d5; color: #7a5320; }
.st-new-analysis { background: #f0dada; color: #7a2f2f; }
.st-asset { background: #dde9dd; color: #2f5d34; }

.fig-spec {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.45;
  color: #2d3748;
  max-width: 46ch;
}

.fig-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 300;
  color: #8b919b;
  margin-top: 0.6rem;
}
</style>
