<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import {MainService} from "@/services/main.service.ts";

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
  <div class="container">
    <h1 class="container text-center"><i class="fa-solid fa-user-plus"></i> Registrujte se</h1>
    <hr>
    <div class="d-flex justify-content-center align-items-center">
      <form v-on:submit.prevent="doRegister">
        <div class="mb-3">
          <label for="email" class="form-label">Email adresa</label>
          <input type="email" class="form-control" id="email" aria-describedby="help" v-model="email" placeholder="vasa@mejl.adresa" required>
          <div id="help" class="form-text">
          <p>Ukoliko imate nalog, nepohodno je da se <RouterLink class="btn btn-outline-light me-3" to="/login">prijavite</RouterLink> </p>
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Lozinka</label>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Unesite Vašu lozinku" required>
        </div>
        <div class="mb-3">
          <label for="repeat" class="form-label">Ponovo unesite lozinku</label>
          <input type="password" class="form-control" id="repeat" v-model="repeat" placeholder="Ponovite Vašu lozinku" required>
        </div>
        <button type="submit" class="btn btn-outline-primary"><i class="fa-solid fa-user-plus"></i> Registracija</button>
      </form>
    </div>
    <br>
  </div>
</template>