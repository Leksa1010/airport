<script setup lang="ts">
import type {FlightModel} from '@/models/flight.model';
import {FlightService} from '@/services/FlightService';
import {onMounted, ref} from "vue";
import type {PageModel} from "@/models/page.model.ts"

const flights = ref<PageModel<FlightModel>>()

function toImg(destination: string) {
  return 'https://img.pequla.com/destination/' + destination.toLowerCase().split(' ')[0] + '.jpg'
}

function retrieveData(page = 0) {
  FlightService.getAllFlights(0)
      .then(rsp => flights.value = rsp.data)
}

onMounted(() => retrieveData())

</script>

<template>
  <div class="container px-4" id="Destinations">
    <h1 class="text-center"><i class="fa-solid fa-map-pin"></i> Destinacije</h1>
    <div class="row gx-5" v-if="flights">
      <div class="card col-3 p-3 md-auto" v-for="flight in flights.content">
        <img :src="toImg(flight.destination)" class="card-img-top" alt="...">
        <div class="card-body">
          <h2 class="card-title"></h2>
          <h5 class="card-text text-center">{{ flight.destination }}</h5>
          <div class="container">

            <div class="d-flex justify-content-between">
                <!-- Odlazni letovi -->
                <div class="text-center" v-if="flights">
                  <h6>Pretraži letove za destinaciju</h6>
                  <RouterLink class="btn btn-outline-info" :to="'/destination/' + flight.destination" title="Pretraga">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </RouterLink>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <br>

</template>