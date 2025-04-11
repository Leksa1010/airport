<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavbarLink from "@/components/NavbarLink.vue";


</script>

<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #0f3460;">
    <div class="container">
      <a class="navbar-brand" href="/">
        <i class="fa-solid fa-plane-up"></i> Aerodrom</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <NavbarLink to="/destinations" name="Destinacije"/>
          <NavbarLink to="/departures" name="Odlazni letovi" />
          <NavbarLink to="/arrivals" name="Dolazni letovi" />
          <NavbarLink to="/ticket" name="Karte" />

        </ul>
        <div class="navbar-text">
          Korisnik
        </div>
      </div>
    </div>
  </nav>

  <RouterView />

  <footer class="mx-auto text-center">&copy; Aleksa Petrović za Univerzitet Singidunum 2025</footer>
</template>

