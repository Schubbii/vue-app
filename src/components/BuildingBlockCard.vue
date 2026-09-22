<script setup>
// Base Building Block: a card shell with image / title / body / footer slots.
// It has no own content – QuestionCardContent, RecipeCardContent etc. fill it.
defineProps({
  // Makes the whole card look clickable (hover lift + pointer)
  interactive: { type: Boolean, default: false },
  // Highlighted state, e.g. the selected answer
  active: { type: Boolean, default: false },
})
</script>

<template>
  <div class="building-block-card" :class="{ interactive, active }">
    <div v-if="$slots.image" class="card-image">
      <slot name="image"></slot>
    </div>

    <div class="card-content">
      <div v-if="$slots.title" class="card-title">
        <slot name="title"></slot>
      </div>

      <div v-if="$slots.default" class="card-body">
        <slot></slot>
      </div>

      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.building-block-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-background-soft);
  box-shadow: var(--shadow-card);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.building-block-card.interactive {
  cursor: pointer;
}

.building-block-card.interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-hover);
}

.building-block-card.active {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.card-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--color-background-mute);
}

.card-image :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.building-block-card.interactive:hover .card-image :deep(img) {
  transform: scale(1.04);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.15rem 1.15rem;
  flex: 1;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
}

.card-body {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.card-footer {
  margin-top: auto;
  padding-top: 0.75rem;
}
</style>
