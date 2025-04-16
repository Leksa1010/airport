<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import {useRouter, RouterView, RouterLink} from 'vue-router'
import NavbarLink from '@/components/NavbarLink.vue'
import {AuthService} from '@/services/auth.service.ts'

const router = useRouter()

const isAuthenticated = ref(AuthService.hasAuth())
const userEmail = ref(AuthService.getUserEmail())

function logout() {
  AuthService.clearAuth()
  isAuthenticated.value = false
  userEmail.value = ''
  router.push('/')
}

watchEffect(() => {
  isAuthenticated.value = AuthService.hasAuth()
  userEmail.value = AuthService.getUserEmail()
})
</script>

<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #0f3460;">
    <div class="container">
      <a class="navbar-brand text-white" href="/">
        <i class="fa-solid fa-plane-up"></i> Aerodrom
      </a>

      <div class="collapse navbar-collapse w-100">
        <ul class="navbar-nav me-auto">
          <NavbarLink to="/destinations" name="Destinacije"/>
          <NavbarLink to="/departures" name="Odlazni letovi"/>
          <NavbarLink to="/arrivals" name="Dolazni letovi"/>
          <NavbarLink v-if="isAuthenticated" to="/ticket" name="Karte"/>
        </ul>

        <div class="d-flex align-items-center ms-auto">
          <div v-if="isAuthenticated" class="navbar-text text-white me-3">
            <i class="fa-solid fa-user"></i> {{ userEmail }}
          </div>
          <button v-if="isAuthenticated" class="btn btn-outline-light" @click="logout">
            <i class="fa-solid fa-person-through-window"></i> Odjavite se
          </button>
          <div v-else>
            <RouterLink class="btn btn-outline-light me-3" to="/login" title="Prijavite se">
              <i class="bi bi-box-arrow-in-right"></i> Prijavite se
            </RouterLink>
            <RouterLink class="btn btn-outline-warning me-3" to="/register" title="Registrujte se">
              <i class="fa-solid fa-user-plus"></i> Registrujte se
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <RouterView/>

  <footer class="mx-auto text-center mt-4 text-muted">
    &copy; Aleksa Petrović za Univerzitet Singidunum 2025
  </footer>
</template>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.25rem;
}
</style>
