<template>
  <div class="slidev-layout academic-content">
    <div class="content-container">
      <slot />
    </div>
    
    <!-- Bottom section with delimiter and references -->
    <div class="bottom-section">
      <div class="section-delimiter">
        <strong>{{ $props.section || 'CONTENT' }}</strong>
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
// Allow section prop to be passed to the layout
defineProps({
  section: {
    type: String,
    default: 'CONTENT'
  }
})
</script>

<style scoped>
.academic-content {
  @apply h-full px-12 py-8;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content-container {
  @apply flex-1 max-w-4xl mx-auto w-full;
  min-height: 0;
  position: relative;
}

/* Decorative line for h1 titles - now dynamic */
.academic-content :deep(h1) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
  line-height: 1.2;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.academic-content :deep(h1::after) {
  content: '';
  flex: 1;
  height: 0.8px;
  background: linear-gradient(to right, #374151, #1f2937);
  min-width: 2rem; /* Minimum line length */
}

/* Typography hierarchy */
.academic-content :deep(h2) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.academic-content :deep(h3) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

/* Body text */
.academic-content :deep(p) {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #2d3748;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

/* Lists */
.academic-content :deep(ul),
.academic-content :deep(ol) {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #2d3748;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  padding-left: 1.25rem;
}

.academic-content :deep(li) {
  margin-bottom: 0.25rem;
}

/* Bold text */
.academic-content :deep(strong),
.academic-content :deep(b) {
  font-weight: 600;
  color: #1a1a1a;
}

/* Emphasis boxes */
.academic-content :deep(.callout) {
  @apply mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400;
  font-size: 0.9rem;
}

.academic-content :deep(.callout p) {
  margin-bottom: 0;
  font-size: 0.9rem;
}

/* Bottom section layout */
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

.references-area {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.75rem !important;
  font-weight: 300 !important;
  color: #6b7280 !important;
  text-align: right !important;
  max-width: 300px;
  line-height: 1.3;
  margin-right: 4rem; /* Space for page number */
}

/* More specific selectors for nested content */
.academic-content .section-delimiter strong {
  color: #959aa4 !important;
  font-weight: 500 !important;
}

.academic-content .references-area * {
  color: #6b7280 !important;
}

/* Page number */
.page-number {
  @apply absolute bottom-6 right-8 text-sm;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #6b7280;
}
</style>