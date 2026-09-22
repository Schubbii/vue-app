// Recurring questions (Building Block). `param` tells which API filter
// the answer controls; value null = "Any" (no filter).
export const questions = [
  {
    id: 'diet',
    label: 'What kind of dish?',
    param: 'category',
    options: [
      { label: 'Vegetarian', value: 'Vegetarian' },
      { label: 'Vegan', value: 'Vegan' },
      { label: 'Beef', value: 'Beef' },
      { label: 'Chicken', value: 'Chicken' },
      { label: 'Any', value: null },
    ],
  },
  {
    id: 'cuisine',
    label: 'What are you craving?',
    param: 'area',
    options: [
      { label: 'Italian', value: 'Italian' },
      { label: 'Japanese', value: 'Japanese' },
      { label: 'American', value: 'American' },
      { label: 'Any', value: null },
    ],
  },
]
