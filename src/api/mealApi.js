// Access to TheMealDB (https://www.themealdb.com/api.php)
// The test key "1" is part of the URL – no header, no token needed.
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

async function request(path) {
  const response = await fetch(`${BASE_URL}/${path}`)
  if (!response.ok) {
    throw new Error(`TheMealDB: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  // On "not found" the API returns meals: null – normalize to []
  return data.meals ?? []
}

/** A random meal (full details). */
export async function getRandomMeal() {
  const meals = await request('random.php')
  return meals[0] ?? null
}

/** A meal by ID (full details incl. ingredients + instructions). */
export async function getMealById(id) {
  const meals = await request(`lookup.php?i=${encodeURIComponent(id)}`)
  return meals[0] ?? null
}

/** Search by name – list of full meals. */
export async function searchMeals(query) {
  return request(`search.php?s=${encodeURIComponent(query)}`)
}

/** Filter by category – list with ONLY idMeal, strMeal, strMealThumb. */
export async function filterByCategory(category) {
  return request(`filter.php?c=${encodeURIComponent(category)}`)
}

/** Filter by area – list with ONLY idMeal, strMeal, strMealThumb. */
export async function filterByArea(area) {
  return request(`filter.php?a=${encodeURIComponent(area)}`)
}

/** All categories as an array of strings, e.g. ["Beef", "Vegetarian", …]. */
export async function listCategories() {
  const items = await request('list.php?c=list')
  return items.map((item) => item.strCategory)
}

/** All areas as an array of strings, e.g. ["Italian", "Japanese", …]. */
export async function listAreas() {
  const items = await request('list.php?a=list')
  return items.map((item) => item.strArea)
}