<script setup lang="ts">

export interface NavbarLinkProps {
  to: string;
  name: string;
}

const props = defineProps<NavbarLinkProps>()

</script>

<template>
  <li class="nav-item">
    <RouterLink class="nav-link active" :to="props.to">{{ props.name }}</RouterLink>
  </li>
</template>