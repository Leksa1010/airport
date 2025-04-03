<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavbarLink from "@/components/NavbarLink.vue";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand" href="/">
        <i class="fa-solid fa-plane-up"></i> Aerodrom</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          
          <NavbarLink to="/destinations" name="Destinacije"/>
          <NavbarLink to="/departures" name="Odlazni letovi" />
          <NavbarLink to="/arrivals" name="Dolazni letovi" />

        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Pretražite letove" aria-label="Search">
          <button class="btn btn-success" type="submit">Pretraga</button>
        </form>
        <div class="navbar-text">
          Korisnik
        </div>
      </div>
    </div>
  </nav>

  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterView />

  <footer class="mx-auto text-center">&copy; Aleksa Petrović za Univerzitet Singidunum 2025</footer>
</template>

