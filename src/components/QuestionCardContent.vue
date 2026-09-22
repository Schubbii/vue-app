<script setup>
// Building Block: one selectable answer in the question flow.
import BuildingBlockCard from './BuildingBlockCard.vue'

defineProps({
  title: { type: String, required: true },
  image: { type: String, default: null },
  description: { type: String, default: '' },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])
</script>

<template>
  <button type="button" class="question-card" :aria-pressed="active" @click="emit('select')">
    <BuildingBlockCard interactive :active="active">
      <template #image>
        <img v-if="image" :src="image" :alt="title" loading="lazy" />
        <div v-else class="placeholder" aria-hidden="true">🎲</div>
      </template>

      <template #title>{{ title }}</template>

      <p v-if="description">{{ description }}</p>
    </BuildingBlockCard>
  </button>
</template>

<style scoped>
.question-card {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  text-align: left;
  font: inherit;
  color: inherit;
}

.question-card:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-lg);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--color-accent-soft), var(--color-background-mute));
}
</style>
