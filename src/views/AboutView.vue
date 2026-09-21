<template>
  <main class="about">
    <h1>Über das Projekt</h1>
    <p>
      Jeden Abend stellt sich die Frage: Was kochen wir heute? Damit wir nicht bei
      McDonalds und Co landen, nimmt uns <strong>Die 15 Minuten</strong> die
      Entscheidung ab und schlägt schnelle, einfache und leckere Gerichte vor.
    </p>
    <p>
      Ein Projekt vom Team <strong>Building Blocks</strong>: Silas, Richard, Levin und Kira.
    </p>
  </main>
</template>

<style scoped>
.about {
  padding-top: 3rem;
  max-width: 40rem;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

p + p {
  margin-top: 1rem;
}
</style>
