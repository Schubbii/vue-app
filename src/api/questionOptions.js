// Wiederkehrende Fragen (Building Block). `param` sagt, welchen
// API-Filter die Antwort steuert; value null = "Egal" (kein Filter).
export const questions = [
  {
    id: 'diet',
    label: 'Wie soll es sein?',
    param: 'category',
    options: [
      { label: 'Vegetarisch', value: 'Vegetarian' },
      { label: 'Vegan', value: 'Vegan' },
      { label: 'Fleisch', value: 'Beef' },
      { label: 'Hähnchen', value: 'Chicken' },
      { label: 'Egal', value: null },
    ],
  },
  {
    id: 'cuisine',
    label: 'Worauf hast du Lust?',
    param: 'area',
    options: [
      { label: 'Italienisch', value: 'Italian' },
      { label: 'Asiatisch', value: 'Japanese' },
      { label: 'Amerikanisch', value: 'American' },
      { label: 'Egal', value: null },
    ],
  },
]