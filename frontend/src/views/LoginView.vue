<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import {MainService} from "@/models/main.service.ts";
import {AuthService} from "@/services/auth.service.ts";

const email = ref<string>();
const password = ref<string>();
const router = useRouter()


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
        router.push({
          path: "/"
        })
      })
      .catch(e => alert(e.response.data.message));
}
</script>

<template>

  <div class="container">
    <h1 class="container text-center"><i class="bi bi-box-arrow-in-right"></i> Prijavite se</h1>
    <form v-on:submit.prevent="doLogin">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email adresa</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Lozinka</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
