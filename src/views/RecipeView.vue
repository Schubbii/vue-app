<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import RecipeCardContent from '../components/RecipeCardContent.vue'
import { findMeals } from '../api/mealApi'

const route = useRoute()

const meals = ref([])
const loading = ref(false)
const error = ref(null)

// Filters come from the URL (?area=Italian&category=Pasta), so the list is
// shareable and the browser back button works after the question flow.
const filters = computed(() => ({
  area: route.query.area ?? null,
  category: route.query.category ?? null,
}))

const activeFilters = computed(() =>
  Object.values(filters.value).filter((value) => value != null),
)

async function load() {
  loading.value = true
  error.value = null
  try {
    meals.value = await findMeals(filters.value)
  } catch (e) {
    error.value = 'Could not load recipes. Please try again.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

watch(filters, load, { immediate: true })
</script>

<template>
  <main class="recipes">
    <header class="recipes-header">
      <div>
        <h1>Recipes</h1>
        <p v-if="activeFilters.length" class="filter-summary">
          <span v-for="filter in activeFilters" :key="filter" class="chip">{{ filter }}</span>
        </p>
        <p v-else class="filter-summary muted">A selection of dishes to browse</p>
      </div>
      <RouterLink to="/questions" class="link">
        {{ activeFilters.length ? 'Change answers' : 'Answer questions' }} →
      </RouterLink>
    </header>

    <p v-if="loading" class="status">Loading recipes…</p>

    <p v-else-if="error" class="status error">{{ error }}</p>

    <div v-else-if="meals.length === 0" class="status empty">
      <p>No recipes found for this combination.</p>
      <RouterLink to="/questions" class="link">Try different answers →</RouterLink>
    </div>

    <div v-else class="card-grid">
      <RecipeCardContent v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </main>
</template>

<style scoped>
.recipes {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 3rem;
}

.recipes-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

h1 {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 800;
  color: var(--color-heading);
}

.filter-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.muted {
  color: var(--color-text-muted);
}

.chip {
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.link {
  font-weight: 600;
  color: var(--color-accent);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.status {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--color-text-muted);
}

.status.empty {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
}

.error {
  color: #c0392b;
}
</style>
