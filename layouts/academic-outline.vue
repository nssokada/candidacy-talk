<template>
  <div class="slidev-layout academic-outline">
    <div class="content-container">
      <slot />
    </div>
    
    <!-- Bottom section with delimiter and references -->
    <div class="bottom-section">
      <div class="section-delimiter">
        <strong>{{ $props.section || 'OUTLINE' }}</strong>
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
    default: 'OUTLINE'
  }
})
</script>

<style scoped>
.academic-outline {
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
  padding-bottom: 4rem; /* Account for bottom section */
}

/* Decorative line for h1 titles */
.academic-outline :deep(h1) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2rem;
  line-height: 1.2;
  position: relative;
  padding-right: 2rem;
  text-align: left;
}

.academic-outline :deep(h1::after) {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: calc(100% - 2rem);
  height: 0.8px;
  background: linear-gradient(to right, #374151, #1f2937);
  max-width: 300px;
}

/* Specialized outline list styling */
.academic-outline :deep(ol) {
  font-family: 'Inter', sans-serif;
  counter-reset: outline-counter;
  list-style: none;
  padding-left: 0;
  max-width: 800px;
  margin: 1rem 0 0 0;
}

.academic-outline :deep(ol li) {
  counter-increment: outline-counter;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 3rem;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #2d3748;
}

.academic-outline :deep(ol li::before) {
  content: counter(outline-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #374151, #1f2937);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(55, 65, 81, 0.2);
}

/* Bold text in outline items */
.academic-outline :deep(ol li strong) {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.1rem;
}

/* Regular text after the colon */
.academic-outline :deep(ol li) {
  font-weight: 300;
}

/* Typography hierarchy for other elements */
.academic-outline :deep(h2) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.academic-outline :deep(p) {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #2d3748;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  text-align: center;
}

/* Bottom section layout */
.bottom-section {
  @apply absolute bottom-6 left-12 right-8 flex justify-between items-baseline;
}

.section-delimiter {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.875rem !important;
  font-weight: 700 !important;
  color: #374151 !important;
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
  margin-right: 4rem;
}

/* More specific selectors for nested content */
.academic-outline .section-delimiter strong {
  color: #374151 !important;
  font-weight: 700 !important;
}

.academic-outline .references-area * {
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