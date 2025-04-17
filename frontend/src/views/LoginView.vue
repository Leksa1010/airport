<script setup lang="ts">

import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {MainService} from "@/services/main.service.ts";
import {AuthService} from "@/services/auth.service.ts";

const email = ref<string>();
const password = ref<string>();
const router = useRouter()
const route = useRoute()

function doLogin() {
  if (email.value == undefined || email.value == "") {
    alert("Molimo unesite Email adresu.");
    return;
  }

  if (password.value == undefined || email.value == "") {
    alert("Niste uneli lozinku!");
    return;
  }

  MainService.login(email.value, password.value)
      .then(rsp => {
        AuthService.saveAuth(rsp.data)
        const go = (route.query.go) ? route.query.go as string: '/';
        router.push({
          path: go
        })
      })
      .catch(e => alert(e.response.data.message));
}
</script>

<template>

  <div class="container">
    <h1 class="container text-center"><i class="bi bi-box-arrow-in-right"></i> Prijavite se</h1>
    <hr>
    <div class="d-flex justify-content-center align-items-center">
      <form v-on:submit.prevent="doLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email adresa</label>
          <input type="email" class="form-control" id="email" aria-describedby="help" v-model="email" placeholder="vasa@mejl.adresa" required>
          <div id="help" class="form-text">
            <p>Ukoliko nemate nalog, nepohodno je da se <RouterLink class="btn btn-outline-warning me-3" to="/register">registrujete</RouterLink> </p>
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Lozinka</label>
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Unesite Vašu lozinku" required>
        </div>
        <button type="submit" class="btn btn-outline-primary"><i class="bi bi-door-open-fill"></i> Prijava</button>
      </form>
    </div>
    <br>
  </div>
</template>
