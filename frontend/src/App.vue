<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>


  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterView />

  <footer class="mx-auto text-center">&copy; Aleksa Petrović za Univerzitet Singidunum 2025</footer>
</template>

