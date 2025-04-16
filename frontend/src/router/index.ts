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
    routes
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
