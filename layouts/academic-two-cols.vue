<template>
  <div class="slidev-layout academic-two-cols">
    <div class="content-container">
      <div class="grid grid-cols-2 gap-12 h-full">
        <div class="left-column">
          <slot name="default" />
        </div>
        <div class="right-column">
          <slot name="right" />
        </div>
      </div>
    </div>
    
    <!-- Page number -->
    <div class="page-number">
      {{ $slidev.nav.currentPage }}
    </div>
  </div>
</template>

<style scoped>
.academic-two-cols {
  @apply h-full px-12 py-8;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content-container {
  @apply flex-1 max-w-5xl mx-auto w-full;
  min-height: 0;
}

.left-column,
.right-column {
  @apply flex flex-col justify-center;
  min-height: 0;
}

/* Typography for both columns */
.academic-two-cols :deep(h1) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.academic-two-cols :deep(h2) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.academic-two-cols :deep(h3) {
  font-family: 'Crimson Pro', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.academic-two-cols :deep(p) {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #2d3748;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.academic-two-cols :deep(ul),
.academic-two-cols :deep(ol) {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #2d3748;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  padding-left: 1.25rem;
}

.academic-two-cols :deep(li) {
  margin-bottom: 0.25rem;
}

.academic-two-cols :deep(strong),
.academic-two-cols :deep(b) {
  font-weight: 600;
  color: #1a1a1a;
}

/* Page number */
.page-number {
  @apply absolute bottom-6 right-8 text-sm;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #6b7280;
}
</style>