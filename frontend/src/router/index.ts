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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/arrivals',
      name: 'arrivals',
      component: () => import('../views/ArrivalsView.vue'),
    },
    {
      path: '/departures',
      name: 'departures',
      component: () => import('../views/DeparturesView.vue'),
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: () => import('../views/DestinationsView.vue'),
    },
    {
      path: '/destination/:destination',
      name: 'destinationbrowser',
      component: () => import('../views/DestinationBrowserView.vue'),
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: () => import('../views/FlightView.vue'),
    }
  ],
})

export default router
