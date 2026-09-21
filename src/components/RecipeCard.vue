<script setup>
// Rezept-"Template" (Building Block): stellt ein Gericht aus TheMealDB einheitlich dar.
import { computed } from 'vue'

const props = defineProps({
  meal: { type: Object, required: true },
})

// TheMealDB liefert Zutaten als strIngredient1..20 + strMeasure1..20
const ingredients = computed(() => {
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = props.meal[`strIngredient${i}`]
    const measure = props.meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient: ingredient.trim(), measure: (measure || '').trim() })
    }
  }
  return list
})
</script>

<template>
  <article class="recipe">
    <img v-if="meal.strMealThumb" :src="meal.strMealThumb" :alt="meal.strMeal" class="recipe-image" />

    <div class="recipe-body">
      <div class="recipe-tags">
        <span v-if="meal.strCategory" class="tag">{{ meal.strCategory }}</span>
        <span v-if="meal.strArea" class="tag">{{ meal.strArea }}</span>
      </div>

      <h2>{{ meal.strMeal }}</h2>

      <h3>Zutaten</h3>
      <ul class="ingredients">
        <li v-for="item in ingredients" :key="item.ingredient">
          <span class="measure">{{ item.measure }}</span> {{ item.ingredient }}
        </li>
      </ul>

      <h3>Zubereitung</h3>
      <p class="instructions">{{ meal.strInstructions }}</p>
    </div>
  </article>
</template>

<style scoped>
.recipe {
  display: grid;
  gap: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--color-background-soft);
}

.recipe-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.recipe-body {
  padding: 0 1.5rem 1.5rem;
}

.recipe-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 600;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 1.25rem 0 0.5rem;
}

.ingredients {
  padding-left: 1.25rem;
  columns: 2;
  column-gap: 2rem;
}

.measure {
  color: var(--color-text-muted);
}

.instructions {
  white-space: pre-line;
}

@media (min-width: 768px) {
  .recipe {
    grid-template-columns: 2fr 3fr;
  }

  .recipe-image {
    height: 100%;
    aspect-ratio: auto;
  }

  .recipe-body {
    padding: 1.5rem 1.5rem 1.5rem 0;
  }
}
</style>
