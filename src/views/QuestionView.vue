<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import QuestionCardContent from '../components/QuestionCardContent.vue'
import { questions } from '../api/questionOptions'

const router = useRouter()

const stepIndex = ref(0)
const answers = ref({}) // e.g. { area: 'Italian', category: null }

const currentQuestion = computed(() => questions[stepIndex.value])
const isLastStep = computed(() => stepIndex.value === questions.length - 1)

function select(value) {
  answers.value = { ...answers.value, [currentQuestion.value.param]: value }

  if (isLastStep.value) {
    finish()
  } else {
    stepIndex.value++
  }
}

function back() {
  if (stepIndex.value > 0) stepIndex.value--
}

function finish() {
  // Only pass filters that are actually set → clean URLs like /recipes?area=Italian
  const query = Object.fromEntries(
    Object.entries(answers.value).filter(([, value]) => value != null),
  )
  router.push({ name: 'recipes', query })
}
</script>

<template>
  <main class="question-view">
    <header class="question-header">
      <p class="progress">Question {{ stepIndex + 1 }} of {{ questions.length }}</p>
      <h1>{{ currentQuestion.label }}</h1>
    </header>

    <div class="card-grid">
      <QuestionCardContent
        v-for="option in currentQuestion.options"
        :key="option.label"
        :title="option.label"
        :image="option.image"
        :description="option.description"
        :active="answers[currentQuestion.param] === option.value"
        @select="select(option.value)"
      />
    </div>

    <div class="question-footer">
      <button v-if="stepIndex > 0" type="button" class="link-button" @click="back">
        ← Back
      </button>
    </div>
  </main>
</template>

<style scoped>
.question-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 3rem;
}

.progress {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-heading);
  margin-top: 0.25rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}

.link-button {
  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
}

.link-button:hover {
  text-decoration: underline;
}
</style>
