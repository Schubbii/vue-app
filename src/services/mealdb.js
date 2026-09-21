// Zugriff auf die kostenlose TheMealDB-API (https://www.themealdb.com/api.php)
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

async function request(path) {
  const response = await fetch(`${BASE_URL}/${path}`)
  if (!response.ok) {
    throw new Error(`TheMealDB request failed: ${response.status}`)
  }
  return response.json()
}

/** Liefert ein zufälliges Gericht. */
export async function getRandomMeal() {
  const data = await request('random.php')
  return data.meals?.[0] ?? null
}

/** Liefert ein Gericht anhand seiner ID. */
export async function getMealById(id) {
  const data = await request(`lookup.php?i=${id}`)
  return data.meals?.[0] ?? null
}

/** Filtert Gerichte nach Kategorie (z. B. "Vegetarian", "Seafood"). */
export async function filterByCategory(category) {
  const data = await request(`filter.php?c=${encodeURIComponent(category)}`)
  return data.meals ?? []
}

/** Filtert Gerichte nach Herkunft (z. B. "Italian", "Japanese"). */
export async function filterByArea(area) {
  const data = await request(`filter.php?a=${encodeURIComponent(area)}`)
  return data.meals ?? []
}
