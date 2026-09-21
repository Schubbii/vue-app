<script setup>
defineProps({
  step: { type: Number, required: true },
  label: { type: String, required: true },
  options: { type: Array, required: true },
  selected: { type: String, default: null },
})

defineEmits(['select'])
</script>

<template>
  <div class="question">
    <p class="question-label">
      <span class="step">{{ step }}</span>
      {{ label }}
    </p>
    <div class="options">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        class="option"
        :class="{ active: option === selected }"
        @click="$emit('select', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.question-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
}

.step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: white;
  font-size: 0.9rem;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--color-border-hover);
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: 0.2s;
}

.option:hover {
  background-color: var(--color-background-soft);
}

.option.active {
  background-color: var(--color-accent-soft);
  border-color: var(--color-accent);
  color: var(--color-accent);
  font-weight: 600;
}
</style>
