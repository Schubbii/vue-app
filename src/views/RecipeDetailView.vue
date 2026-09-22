<script setup>
import { onMounted, ref } from 'vue'
import RecipeDetailCard from '../components/RecipeDetailCard.vue'

const meal = ref(null)
const loading = ref(false)
const error = ref('')

async function loadRandomMeal() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    )

    if (!response.ok) {
      throw new Error('Die Rezept-API konnte nicht erreicht werden.')
    }

    const data = await response.json()

    meal.value = data.meals?.[0] ?? null

    if (!meal.value) {
      throw new Error('Es wurde kein Rezept gefunden.')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRandomMeal()
})
</script>

<template>
  <main class="home-view">
    <header class="home-view__header">
      <p class="home-view__eyebrow">Die 15-Minuten-Entscheidung</p>

      <h1>Was kochen wir heute?</h1>

      <p class="home-view__description">
        Lass dich inspirieren und entdecke ein Rezept aus unserer Datenbank.
      </p>
    </header>

    <p v-if="loading" class="status">
      Rezept wird geladen ...
    </p>

    <p v-else-if="error" class="status status--error">
      {{ error }}
    </p>

    <RecipeDetailCard
      v-else-if="meal"
      :meal="meal"
    />

    <button
      class="new-recipe-button"
      type="button"
      :disabled="loading"
      @click="loadRandomMeal"
    >
      {{ loading ? 'Suche Rezept ...' : 'Neues Rezept finden' }}
    </button>
  </main>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  padding: 2rem;
  background: #fff8ef;
}

.home-view__header {
  width: min(100%, 1100px);
  margin: 0 auto 2rem;
}

.home-view__eyebrow {
  margin: 0;
  color: #e76f51;
  font-weight: 800;
}

h1 {
  margin: 0.4rem 0 0.8rem;
  color: #264653;
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.1;
}

.home-view__description {
  margin: 0;
  color: #52656b;
  font-size: 1.1rem;
  line-height: 1.6;
}

.status {
  width: min(100%, 1100px);
  margin: 3rem auto;
  color: #52656b;
  text-align: center;
  font-size: 1.1rem;
}

.status--error {
  color: #c0392b;
}

.home-view :deep(.recipe-detail-card) {
  margin: 0 auto;
}

.new-recipe-button {
  display: block;
  margin: 2rem auto;
  border: 0;
  border-radius: 0.75rem;
  padding: 0.9rem 1.2rem;
  background: #e76f51;
  color: #ffffff;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.new-recipe-button:hover:not(:disabled) {
  background: #d95d3f;
}

.new-recipe-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>