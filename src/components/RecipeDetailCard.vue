<script setup>
// Building Block: full recipe view (image, tags, ingredients, steps, video).
import { computed } from 'vue'
import { getIngredients, getInstructionSteps } from '../api/mealHelper'

const props = defineProps({
  meal: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['back'])

const ingredients = computed(() => getIngredients(props.meal))
const steps = computed(() => getInstructionSteps(props.meal))
</script>

<template>
  <article class="recipe-detail-card">
    <button class="back-button" type="button" @click="emit('back')">
      ← Back to recipes
    </button>

    <img
      class="recipe-detail-card__image"
      :src="meal.strMealThumb"
      :alt="meal.strMeal"
    />

    <div class="recipe-detail-card__content">
      <div class="recipe-detail-card__tags">
        <span v-if="meal.strCategory" class="tag">{{ meal.strCategory }}</span>
        <span v-if="meal.strArea" class="tag">{{ meal.strArea }}</span>
      </div>

      <h1 class="recipe-detail-card__title">{{ meal.strMeal }}</h1>

      <div class="recipe-detail-card__grid">
        <section class="recipe-detail-card__section">
          <h2>Ingredients</h2>

          <ul class="ingredients-list">
            <li v-for="item in ingredients" :key="item.ingredient">
              <span class="ingredients-list__measure">{{ item.measure }}</span>
              <span>{{ item.ingredient }}</span>
            </li>
          </ul>
        </section>

        <section class="recipe-detail-card__section">
          <h2>Instructions</h2>

          <ol class="steps-list">
            <li v-for="(step, index) in steps" :key="index">{{ step }}</li>
          </ol>
        </section>
      </div>

      <a
        v-if="meal.strYoutube"
        class="video-button"
        :href="meal.strYoutube"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch video
      </a>
    </div>
  </article>
</template>

<style scoped>
.recipe-detail-card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-background-soft);
  box-shadow: var(--shadow-card);
}

.back-button {
  margin: 1.25rem 1.5rem 0;
  border: 0;
  background: transparent;
  color: var(--color-accent);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.back-button:hover {
  text-decoration: underline;
}

.recipe-detail-card__image {
  display: block;
  width: 100%;
  max-height: 440px;
  margin-top: 1rem;
  object-fit: cover;
}

.recipe-detail-card__content {
  padding: 2rem;
}

.recipe-detail-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.recipe-detail-card__title {
  margin: 1rem 0 2rem;
  color: var(--color-heading);
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
}

.recipe-detail-card__grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.5fr);
  gap: 3rem;
}

.recipe-detail-card__section h2 {
  margin: 0 0 1rem;
  color: var(--color-heading);
  font-size: 1.25rem;
  font-weight: 700;
}

.ingredients-list {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ingredients-list li {
  display: grid;
  grid-template-columns: minmax(85px, auto) 1fr;
  gap: 0.5rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--color-border);
}

.ingredients-list__measure {
  color: var(--color-heading);
  font-weight: 600;
}

.steps-list {
  margin: 0;
  padding-left: 1.5rem;
  line-height: 1.7;
}

.steps-list li + li {
  margin-top: 0.75rem;
}

.steps-list li::marker {
  color: var(--color-accent);
  font-weight: 700;
}

.video-button {
  display: inline-block;
  margin-top: 2rem;
  border-radius: 999px;
  padding: 0.8rem 1.4rem;
  background-color: var(--color-accent);
  color: #ffffff;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.video-button:hover {
  background-color: var(--color-accent-hover);
  text-decoration: none;
  transform: translateY(-2px);
}

@media (max-width: 720px) {
  .recipe-detail-card__content {
    padding: 1.25rem;
  }

  .recipe-detail-card__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
