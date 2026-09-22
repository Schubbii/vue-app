<script setup>
import { ref } from "vue";
import QuestionView from "./views/QuestionView.vue";
import RecipeView from "./views/RecipeView.vue";
import RecipeDetailView from "./views/RecipeDetailView.vue";

const currentView = ref(QuestionView);
const selectedCuisine = ref(null);
const selectedType = ref(null);

function finishQuestions(data) {
  selectedCuisine.value = data.cuisine;
  selectedType.value = data.type;
  currentView.value = RecipeView;
}
</script>

<template>
  <header class="site-header">
    <div class="brand">
      <span class="brand-icon">🍳</span>
      <span class="brand-name">The 15 Minutes</span>
    </RouterLink>

    <nav class="site-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/questions">Questions</RouterLink>
      <RouterLink to="/recipes">Recipes</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main>
    <KeepAlive>
      <component
        :is="currentView"
        :cuisine="selectedCuisine"
        :type="selectedType"
        @finished="finishQuestions"
      />
    </KeepAlive>
  </main>

  <footer class="site-footer">
    <p>Team Building Blocks · Silas, Richard, Levin, Kira</p>
    <p>
      Recipe data by
      <a href="https://www.themealdb.com/" target="_blank" rel="noopener">TheMealDB</a>
    </p>
  </footer>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
}

.brand:hover {
  text-decoration: none;
}

.brand-icon {
  font-size: 1.5rem;
}

.site-footer {
  margin-top: 4rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-border);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
