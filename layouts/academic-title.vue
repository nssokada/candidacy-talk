<template>
  <div class="slidev-layout academic-title">
    <div class="content-container" :class="{ 'has-figure': $slots.figure }">
      <div class="text-content">
        <slot />
      </div>
      <div v-if="$slots.figure" class="figure-area">
        <slot name="figure" />
      </div>
    </div>
    
    <!-- Page number -->
    <div class="page-number">
      {{ $slidev.nav.currentPage }}
    </div>
  </div>
</template>

<style scoped>
.academic-title {
  @apply h-full px-12 py-16;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.content-container {
  @apply flex-1 flex flex-col justify-center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* When there's a figure, use grid layout */
.content-container.has-figure {
  @apply grid grid-cols-2 gap-16 items-center;
}

.text-content {
  @apply flex flex-col justify-center;
}

.figure-area {
  @apply flex justify-center items-center;
  min-height: 300px;
}

/* Title styling - left aligned, full width */
.academic-title :deep(h1) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: left;
  max-width: 100%;
}

/* When there's a figure, make title smaller */
.content-container.has-figure .text-content :deep(h1) {
  font-size: 1.75rem;
}

/* Subtitle - sits under the title, above the divider */
.academic-title :deep(.subtitle) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;
  color: #4a5568;
  text-align: left;
  margin-top: -1.5rem;
  margin-bottom: 2rem;
}

/* Divider line styling */
.academic-title :deep(.divider) {
  @apply w-100 h-px bg-gray-400 mb-8;
  margin-left: 0;
  margin-right: auto;
}

/* Author info container - grouped together */
.academic-title :deep(.author-info) {
  @apply space-y-1;
}

/* Author name styling */
.academic-title :deep(.author-name) {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: left;
}

/* Venue and date styling */
.academic-title :deep(.venue),
.academic-title :deep(.date) {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 200;
  color: #4a5568;
  text-align: left;
}

/* Figure styling */
.academic-title :deep(.figure) {
  @apply w-full h-full flex justify-center items-center;
}

.academic-title :deep(.figure img) {
  @apply max-w-full max-h-full object-contain;
}

.academic-title :deep(.figure svg) {
  @apply max-w-full max-h-full;
}

/* Page number */
.page-number {
  @apply absolute bottom-6 right-8 text-sm;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #6b7280;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .content-grid {
    @apply grid-cols-1 gap-8;
  }
  
  .figure-area {
    @apply order-first;
    min-height: 200px;
  }
}
</style>