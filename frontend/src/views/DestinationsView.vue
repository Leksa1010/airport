<script setup lang="ts">
import {FlightModel} from '@/models/flight.model';
import {FlightService} from '@/services/FlightService';
import {onMounted, ref} from "vue";
import type {PageModel} from "@/models/page.model.ts"

const flights = ref<PageModel<FlightModel>>()

// function destImg() {
//   return 'https://img.pequla.com/destination/' + flight.value.destination.toLowerCase().split(' ')[0] + '.jpg'
// }

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
  <br>
  <div class="row px-5" v-if="flights">
    <div class="card col-4 p-3 md-auto" v-for="flight in flights.content">
      <img :src="toImg(flight.destination)" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text">{{ flight.destination }}</p>
      </div>
    </div>
  </div>

</template>