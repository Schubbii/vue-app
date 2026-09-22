<template>
  <main class="about">
    <h1>About</h1>
    <p class="lead">
      Every evening the same question: what should we cook? To avoid ending up at
      the drive-through, <strong></strong> takes the decision off your
      hands and suggests quick, simple and tasty dishes.
    </p>
    <p class="lead">
      A project by team <strong>Building Blocks</strong> – Silas, Richard, Levin and Kira.
      Recipe data comes from the free
      <a href="https://www.themealdb.com/" target="_blank" rel="noopener">TheMealDB</a> API.
    </p>
  </main>
</template>

<style scoped>
.about {
  max-width: 40rem;
  padding-top: 3rem;
}

.lead {
  margin-top: 1rem;
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-heading);
}
</style>
