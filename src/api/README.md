# API layer – TheMealDB

Everything that talks to https://www.themealdb.com lives in this folder.
**Components and views never build URLs or call `fetch` themselves** – they import from here.

| File | Purpose |
|---|---|
| `mealApi.js` | One function per endpoint. Returns meals / lists, never the raw `{ meals: … }` object. |
| `mealHelper.js` | Turns raw meal objects into something renderable (ingredient list, instruction steps). |
| `questionOptions.js` | Config for the question flow: which answer maps to which API filter. |

No API key, no `.env`, no headers – the free test key `1` is part of the base URL.

## Functions

```js
import {
  getRandomMeal,     // () => Meal | null
  getMealById,       // (id) => Meal | null
  searchMeals,       // (query) => Meal[]
  filterByCategory,  // (category) => MealPreview[]
  filterByArea,      // (area) => MealPreview[]
  listCategories,    // () => string[]   e.g. ["Beef", "Vegetarian", …]
  listAreas,         // () => string[]   e.g. ["Italian", "Japanese", …]
} from '@/api/mealApi'

import { getIngredients, getInstructionSteps } from '@/api/mealHelper'
import { questions } from '@/api/questionOptions'
```

All `mealApi` functions are `async` and throw on network/HTTP errors → always wrap in `try / catch`.

## Two shapes of meal – important!

**`Meal`** (full) – from `getRandomMeal`, `getMealById`, `searchMeals`:

```js
{
  idMeal: '52772',
  strMeal: 'Teriyaki Chicken Casserole',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
  strCategory: 'Chicken',
  strArea: 'Japanese',
  strInstructions: 'Preheat oven to 350° F.\r\nCombine …',
  strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
  strIngredient1: 'soy sauce', strMeasure1: '3/4 cup',
  // … up to strIngredient20 / strMeasure20 – use getIngredients() instead
}
```

**`MealPreview`** (short) – from `filterByCategory`, `filterByArea`:

```js
{ idMeal: '52772', strMeal: 'Teriyaki Chicken Casserole', strMealThumb: 'https://…' }
```

A preview has **no** ingredients, instructions, category or area.
To show details, call `getMealById(preview.idMeal)` afterwards.

## Usage in a view

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMealById } from '@/api/mealApi'

const route = useRoute()
const meal = ref(null)
const loading = ref(false)
const error = ref(null)

async function load(id) {
  loading.value = true
  error.value = null
  try {
    meal.value = await getMealById(id)
    if (!meal.value) error.value = 'This recipe does not exist.'
  } catch (e) {
    error.value = 'Could not load the recipe.'
  } finally {
    loading.value = false
  }
}

// runs on first render and whenever /recipes/:id changes
watch(() => route.params.id, load, { immediate: true })
</script>

<template>
  <p v-if="loading">Loading…</p>
  <p v-else-if="error">{{ error }}</p>
  <RecipeDetailContent v-else-if="meal" :meal="meal" />
</template>
```

## Usage in a component

```vue
<script setup>
import { computed } from 'vue'
import { getIngredients, getInstructionSteps } from '@/api/mealHelper'

const props = defineProps({ meal: { type: Object, required: true } })

const ingredients = computed(() => getIngredients(props.meal))
// → [{ ingredient: 'soy sauce', measure: '3/4 cup' }, …]

const steps = computed(() => getInstructionSteps(props.meal))
// → ['Preheat oven to 350° F.', 'Combine …', …]
</script>
```

## Question flow → API filter

`questionOptions.js` maps answers to filter values:

```js
{ id: 'diet',    param: 'category', options: [{ label: 'Vegetarian', value: 'Vegetarian' }, …] }
{ id: 'cuisine', param: 'area',     options: [{ label: 'Italian',    value: 'Italian' }, …] }
```

`value: null` means "Any" → no filter.

```js
// answers = { diet: 'Vegetarian', cuisine: null }
let candidates = []
if (answers.diet) candidates = await filterByCategory(answers.diet)
else if (answers.cuisine) candidates = await filterByArea(answers.cuisine)

const pick = candidates[Math.floor(Math.random() * candidates.length)]
router.push({ name: 'recipe-detail', params: { id: pick.idMeal } })
```

## Gotchas

- **v1 supports only one filter per request.** `filter.php?c=…&a=…` ignores the second one. Combine client-side if needed.
- **No cooking time** in the data. The "15 minutes" idea needs another solution.
- **Thumbnails:** append `/preview` to `strMealThumb` for a small image in lists.
- **Valid filter values:** check with `listCategories()` / `listAreas()` – or open
  https://www.themealdb.com/api/json/v1/1/list.php?c=list in the browser.
