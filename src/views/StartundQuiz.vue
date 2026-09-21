<script setup>
import { ref } from 'vue'
import QuestionStep from '../components/QuestionStep.vue'
import RecipeCard from '../components/RecipeCard.vue'
import { getRandomMeal } from '../services/mealdb'

// Wiederkehrende Fragen (Building Block), die zur Rezeptentscheidung führen.
// Die Antworten werden später als Filter für die API-Suche genutzt.
const questions = [
  {
    id: 'time',
    label: 'Wie viel Zeit hast du?',
    options: ['15 Minuten', '30 Minuten', 'Egal'],
  },
  {
    id: 'diet',
    label: 'Wie soll es sein?',
    options: ['Vegetarisch', 'Mit Fleisch', 'Egal'],
  },
  {
    id: 'cuisine',
    label: 'Worauf hast du Lust?',
    options: ['Italienisch', 'Asiatisch', 'Deutsch', 'Egal'],
  },
]

const answers = ref({})
const meal = ref(null)
const loading = ref(false)
const error = ref(null)

function selectAnswer(questionId, option) {
  answers.value = { ...answers.value, [questionId]: option }
}

async function suggestMeal() {
  loading.value = true
  error.value = null
  try {
    meal.value = await getRandomMeal()
  } catch (e) {
    error.value = 'Rezept konnte nicht geladen werden. Bitte versuch es nochmal.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="home">
    <section class="hero">
      <h1>Was koche ich heute?</h1>
      <p class="lead">
        Schluss mit der täglichen 15-Minuten-Frage. Beantworte drei kurze Fragen
        und wir schlagen dir ein schnelles, einfaches und leckeres Gericht vor.
      </p>
    </section>

    <section class="questions">
      <QuestionStep
        v-for="(question, index) in questions"
        :key="question.id"
        :step="index + 1"
        :label="question.label"
        :options="question.options"
        :selected="answers[question.id]"
        @select="selectAnswer(question.id, $event)"
      />

      <div class="actions">
        <button class="btn btn-primary" :disabled="loading" @click="suggestMeal">
          {{ loading ? 'Suche Rezept…' : 'Gericht vorschlagen' }}
        </button>
        <button class="btn btn-ghost" :disabled="loading" @click="suggestMeal">
          Überrasch mich
        </button>
      </div>
    </section>

    <section class="result">
      <p v-if="error" class="error">{{ error }}</p>
      <RecipeCard v-else-if="meal" :meal="meal" />
      <div v-else class="placeholder">
        <p>Hier erscheint dein Rezeptvorschlag.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-heading);
}

.lead {
  max-width: 40rem;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.btn-primary {
  background-color: var(--color-accent);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.btn-ghost {
  background: transparent;
  border-color: var(--color-border-hover);
  color: var(--color-text);
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-background-soft);
}

.placeholder {
  padding: 3rem;
  border: 2px dashed var(--color-border);
  border-radius: 1rem;
  text-align: center;
  color: var(--color-text-muted);
}

.error {
  color: #c0392b;
}
</style>
