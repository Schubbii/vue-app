<script setup>
// Building Block: a recipe preview card that links to the detail page.
// Works with both MealPreview ({ idMeal, strMeal, strMealThumb })
// and full Meal objects – category/area are shown only when present.
import { RouterLink } from 'vue-router'
import BuildingBlockCard from './BuildingBlockCard.vue'

defineProps({
  meal: { type: Object, required: true },
})
</script>

<template>
  <RouterLink
    class="recipe-card"
    :to="{ name: 'recipe-detail', params: { id: meal.idMeal } }"
  >
    <BuildingBlockCard interactive>
      <template #image>
        <!-- /preview = small thumbnail, saves bandwidth in lists -->
        <img :src="`${meal.strMealThumb}/preview`" :alt="meal.strMeal" loading="lazy" />
      </template>

      <template #title>{{ meal.strMeal }}</template>

      <div v-if="meal.strCategory || meal.strArea" class="tags">
        <span v-if="meal.strCategory" class="tag">{{ meal.strCategory }}</span>
        <span v-if="meal.strArea" class="tag">{{ meal.strArea }}</span>
      </div>

      <template #footer>
        <span class="cta">View recipe →</span>
      </template>
    </BuildingBlockCard>
  </RouterLink>
</template>

<style scoped>
.recipe-card {
  display: block;
  height: 100%;
  color: inherit;
}

.recipe-card:hover {
  text-decoration: none;
}

.recipe-card:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-lg);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 600;
}

.cta {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
}
</style>
