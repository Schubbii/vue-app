<script setup>
import { computed } from 'vue'

const props = defineProps({
  meal: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

const ingredients = computed(() => {
  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1

    const ingredient = props.meal[`strIngredient${number}`]?.trim()
    const measure = props.meal[`strMeasure${number}`]?.trim()

    if (!ingredient) {
      return null
    }

    return {
      ingredient,
      measure: measure || ''
    }
  }).filter(Boolean)
})
</script>

<template>
  <article class="recipe-detail-card">
    <button
      class="back-button"
      type="button"
      @click="emit('back')"
    >
      ← Zurück zu den Rezepten
    </button>

    <img
      class="recipe-detail-card__image"
      :src="meal.strMealThumb"
      :alt="`Bild von ${meal.strMeal}`"
    />

    <div class="recipe-detail-card__content">
      <div class="recipe-detail-card__tags">
        <span v-if="meal.strCategory" class="tag">
          {{ meal.strCategory }}
        </span>

        <span v-if="meal.strArea" class="tag">
          {{ meal.strArea }}
        </span>
      </div>

      <h1 class="recipe-detail-card__title">
        {{ meal.strMeal }}
      </h1>

      <div class="recipe-detail-card__grid">
        <section class="recipe-detail-card__section">
          <h2>Zutaten</h2>

          <ul class="ingredients-list">
            <li
              v-for="item in ingredients"
              :key="item.ingredient"
            >
              <span class="ingredients-list__measure">
                {{ item.measure }}
              </span>

              <span>{{ item.ingredient }}</span>
            </li>
          </ul>
        </section>

        <section class="recipe-detail-card__section">
          <h2>Zubereitung</h2>

          <p class="instructions">
            {{ meal.strInstructions }}
          </p>
        </section>
      </div>

      <a
        v-if="meal.strYoutube"
        class="video-button"
        :href="meal.strYoutube"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Video-Anleitung ansehen
      </a>
    </div>
  </article>
</template>

<style scoped>
.recipe-detail-card {
  width: min(100%, 1100px);
  overflow: hidden;
  border: 1px solid #d8e1e3;
  border-radius: 1.5rem;
  background: #ffffff;
  color: #264653;
  box-shadow: 0 14px 35px rgb(38 70 83 / 12%);
}

.back-button {
  margin: 1.25rem 1.25rem 0;
  border: 0;
  background: transparent;
  color: #17756b;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.back-button:hover {
  color: #e76f51;
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
  gap: 0.65rem;
}

.tag {
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  background: #e9f5f3;
  color: #17756b;
  font-size: 0.85rem;
  font-weight: 800;
}

.recipe-detail-card__title {
  margin: 1rem 0 2rem;
  color: #264653;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.1;
}

.recipe-detail-card__grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.5fr);
  gap: 3rem;
}

.recipe-detail-card__section h2 {
  margin: 0 0 1rem;
  color: #264653;
  font-size: 1.35rem;
}

.ingredients-list {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ingredients-list li {
  display: grid;
  grid-template-columns: minmax(85px, auto) 1fr;
  gap: 0.5rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid #e5ecee;
  color: #52656b;
}

.ingredients-list__measure {
  color: #264653;
  font-weight: 800;
}

.instructions {
  margin: 0;
  color: #52656b;
  line-height: 1.8;
  white-space: pre-line;
}

.video-button {
  display: inline-block;
  margin-top: 2rem;
  border-radius: 0.75rem;
  padding: 0.9rem 1.1rem;
  background: #e76f51;
  color: #ffffff;
  font-weight: 800;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.video-button:hover {
  background: #d95d3f;
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