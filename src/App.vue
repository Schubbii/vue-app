<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="brand">
      <span class="brand-icon">🍳</span>
      <span class="brand-name">Food Finder</span>
    </RouterLink>

    <nav class="site-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/questions">Questions</RouterLink>
      <RouterLink to="/recipes">Recipes</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />

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

.site-nav {
  display: flex;
  gap: 0.25rem;
}

.site-nav a {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  color: var(--color-text);
}

.site-nav a:hover {
  text-decoration: none;
  background-color: var(--color-background-soft);
}

/* "/recipes" stays highlighted on "/recipes/123", but "/" only on exact match */
.site-nav a.router-link-active:not([href='/']),
.site-nav a.router-link-exact-active {
  background-color: var(--color-accent-soft);
  color: var(--color-accent);
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

@media (max-width: 600px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav {
    flex-wrap: wrap;
  }
}
</style>
