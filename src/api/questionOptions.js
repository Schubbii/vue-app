// Recurring questions (Building Block) for the question flow.
// `param` tells which API filter the answer controls; value null = "Any" (no filter).
// All values are verified against the free v1 API – some areas (e.g. American,
// Indian, French) return no meals there and are left out on purpose.
const THUMB = 'https://www.themealdb.com/images/media/meals'
const CATEGORY_IMG = 'https://www.themealdb.com/images/category'

export const questions = [
  {
    id: 'area',
    label: 'Which cuisine?',
    param: 'area',
    options: [
      {
        label: 'Italian',
        value: 'Italian',
        description: 'Pasta, risotto and gelato',
        image: `${THUMB}/0jv5gx1661040802.jpg/preview`,
      },
      {
        label: 'Chinese',
        value: 'Chinese',
        description: 'Wok, rice and dumplings',
        image: `${THUMB}/1529446352.jpg/preview`,
      },
      {
        label: 'Thai',
        value: 'Thai',
        description: 'Noodles, curry and lime',
        image: `${THUMB}/uuuspp1468263334.jpg/preview`,
      },
      {
        label: 'Spanish',
        value: 'Spanish',
        description: 'Tapas, paella and olive oil',
        image: `${THUMB}/jc6oub1763196663.jpg/preview`,
      },
      {
        label: 'Mexican',
        value: 'Mexican',
        description: 'Tacos, beans and chili',
        image: `${THUMB}/tvtxpq1511464705.jpg/preview`,
      },
      {
        label: 'British',
        value: 'British',
        description: 'Pies, roasts and puddings',
        image: `${THUMB}/1548772327.jpg/preview`,
      },
      {
        label: 'Surprise me',
        value: null,
        description: 'Any cuisine is fine',
        image: null,
      },
    ],
  },
  {
    id: 'category',
    label: 'What kind of dish?',
    param: 'category',
    options: [
      {
        label: 'Vegetarian',
        value: 'Vegetarian',
        description: 'Fresh veggies and plant-based',
        image: `${CATEGORY_IMG}/vegetarian.png`,
      },
      {
        label: 'Chicken',
        value: 'Chicken',
        description: 'Light and versatile',
        image: `${CATEGORY_IMG}/chicken.png`,
      },
      {
        label: 'Beef',
        value: 'Beef',
        description: 'Hearty and filling',
        image: `${CATEGORY_IMG}/beef.png`,
      },
      {
        label: 'Seafood',
        value: 'Seafood',
        description: 'Fish, shrimp and more',
        image: `${CATEGORY_IMG}/seafood.png`,
      },
      {
        label: 'Pasta',
        value: 'Pasta',
        description: 'Quick and comforting',
        image: `${CATEGORY_IMG}/pasta.png`,
      },
      {
        label: 'Surprise me',
        value: null,
        description: 'Anything goes',
        image: null,
      },
    ],
  },
]
