<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <section class="hero">
      <p class="eyebrow">The 15 Minutes</p>
      <h1>What should I cook today?</h1>
      <p class="lead">
        Every evening the same question. Answer two quick ones instead and get
        a simple, tasty dish suggested – no more ending up at the drive-through.
      </p>
      <div class="actions">
        <RouterLink to="/questions" class="btn btn-primary">Let's find a dish</RouterLink>
        <RouterLink to="/recipes" class="btn btn-ghost">Browse recipes</RouterLink>
      </div>
    </section>

    <section class="steps">
      <div class="step">
        <span class="step-number">1</span>
        <h2>Pick a cuisine</h2>
        <p>Italian, Thai, Mexican – or let us surprise you.</p>
      </div>
      <div class="step">
        <span class="step-number">2</span>
        <h2>Pick a type</h2>
        <p>Vegetarian, chicken, seafood, pasta …</p>
      </div>
      <div class="step">
        <span class="step-number">3</span>
        <h2>Start cooking</h2>
        <p>Get matching recipes with ingredients and steps.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 4rem;
}

.eyebrow {
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

h1 {
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-heading);
  margin-top: 0.5rem;
}

.lead {
  max-width: 38rem;
  margin-top: 1rem;
  font-size: 1.15rem;
  color: var(--color-text-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  transition: 0.2s;
}

.btn:hover {
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-accent);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
}

.btn-ghost {
  border: 1px solid var(--color-border-hover);
  color: var(--color-text);
}

.btn-ghost:hover {
  background-color: var(--color-background-soft);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.step {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-background-soft);
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: white;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.step h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
}

.step p {
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}
</style>
