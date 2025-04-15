import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import TicketView from "@/views/TicketView.vue";
import ArrivalsView from "@/views/ArrivalsView.vue";
import DeparturesView from "@/views/DeparturesView.vue";
import DestinationsView from "@/views/DestinationsView.vue";
import DestinationBrowserView from "@/views/DestinationBrowserView.vue";
import FlightView from "@/views/FlightView.vue";
import BookView from "@/views/BookView.vue";
import {AuthService} from "@/services/auth.service.ts";

const routes = [
    {path: '/', component: HomeView, name: 'home'},
    {path: '/login', component: LoginView},
    {path: '/ticket', component: TicketView, meta: {requiresAuth: true},},
    {path: '/arrivals', component: ArrivalsView, name: 'arrivals'},
    {path: '/departures', component: DeparturesView, name: 'departures'},
    {path: '/destinations', component: DestinationsView, name: 'destinations'},
    {path: '/destination/:id', component: DestinationBrowserView, name: 'destinationbrowser'},
    {path: '/flight/:id', component: FlightView, name: 'flight'},
    {path: '/flight/:id/book', component: BookView, name: 'book'},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, /*: [
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
            path: '/destination/:id',
            name: 'destinationbrowser',
            component: () => import('../views/DestinationBrowserView.vue'),
        },
        {
            path: '/flight/:id',
            name: 'flight',
            component: () => import('../views/FlightView.vue'),
        },
        {
            path: '/flight/:id/book',
            name: 'book',
            component: () => import('../views/BookView.vue'),
        },
        {
            path: '/ticket',
            name: 'ticket',
            component: () => import('../views/TicketView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        }
    ],*/
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = AuthService.hasAuth()

    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router
