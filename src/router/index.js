import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/QuestionView.vue'),
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/RecipeView.vue'),
    },
    {
      path: '/recipes/:id',
      name: 'recipe-detail',
      component: () => import('../views/RecipeDetailView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
