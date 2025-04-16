<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import {MainService} from "@/models/main.service.ts";

const email = ref<string>()
const password = ref<string>()
const repeat = ref<string>()
const router = useRouter()

async function doRegister() {
  if (email.value == undefined || email.value == "") {
    alert('Polje ne sme biti prazno!')
    return
  }

  if (password.value == undefined || email.value == "") {
    alert("Niste uneli lozinku!");
    return;
  }

  if (repeat.value != password.value) {
    alert("Lozinke se ne podudaraju!")
    return;
  }

  try {
    const rsp = await MainService.register(email.value, password.value);
    router.push({
      path: '/login'
    })
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>

</template>