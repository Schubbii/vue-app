<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RecipeDetailCard from '../components/RecipeDetailCard.vue'
import { getMealById } from '../api/mealApi'

const route = useRoute()
const router = useRouter()

const meal = ref(null)
const loading = ref(false)
const error = ref(null)

async function loadMeal(id) {
  loading.value = true
  error.value = null
  meal.value = null
  try {
    meal.value = await getMealById(id)
    if (!meal.value) error.value = 'This recipe does not exist.'
  } catch (e) {
    error.value = 'Could not load the recipe. Please try again.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

function goBack() {
  // Go back in history if we came from inside the app, otherwise to the list
  if (window.history.state?.back) router.back()
  else router.push({ name: 'recipes' })
}

// immediate: true → runs on first render; re-runs when /recipes/:id changes
watch(() => route.params.id, loadMeal, { immediate: true })
</script>

<template>
  <main class="recipe-detail">
    <p v-if="loading" class="status">Loading recipe…</p>

    <div v-else-if="error" class="status error">
      <p>{{ error }}</p>
      <button type="button" class="link-button" @click="goBack">← Back to recipes</button>
    </div>

    <RecipeDetailCard v-else-if="meal" :meal="meal" @back="goBack" />
  </main>
</template>

<style scoped>
.recipe-detail {
  padding-top: 2rem;
}

.status {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--color-text-muted);
}

.error {
  color: #c0392b;
}

.link-button {
  margin-top: 1rem;
  border: 0;
  background: none;
  font: inherit;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
}
</style>
