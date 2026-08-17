<template>
  <div class="slidev-layout academic-section">
    <div class="section-container">
      <slot />
    </div>
    
    <!-- Page number -->
    <div class="page-number">
      {{ $slidev.nav.currentPage }}
    </div>
  </div>
</template>

<style scoped>
.academic-section {
  @apply h-full flex flex-col justify-center items-center text-center px-12;
  background: #ffffff;
}

.section-container {
  @apply max-w-3xl;
}

/* Section title styling */
.academic-section :deep(h1) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 2.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

/* Subtitle styling */
.academic-section :deep(.subtitle) {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  color: #4a5568;
  margin-top: 1.5rem;
}

/* Page number */
.page-number {
  @apply absolute bottom-6 right-8 text-sm;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #6b7280;
}
</style>