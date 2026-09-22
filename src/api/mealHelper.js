/**
 * Builds a list from strIngredient1..20 / strMeasure1..20:
 * [{ ingredient: "Egg", measure: "2 medium" }, …]
 */
export function getIngredients(meal) {
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim() ?? ''
    if (ingredient) {
      list.push({ ingredient, measure })
    }
  }
  return list
}

/**
 * Splits strInstructions into single steps (at line breaks).
 * Leading numbers like "2." or "3)" are stripped – some meals already
 * contain them, which would double up with an <ol>.
 */
export function getInstructionSteps(meal) {
  return (meal.strInstructions ?? '')
    .split(/\r?\n+/)
    .map((step) => step.trim().replace(/^\d+[.)]\s*/, ''))
    .filter((step) => step.length > 0)
}