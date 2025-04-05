<script setup lang="ts">
import {FlightModel} from '@/models/flight.model';
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
  <br>
  <div class="container px-4">
    <div class="row gx-5" v-if="flights">
      <div class="card col-3 p-3 md-auto" v-for="flight in flights.content">
        <img :src="toImg(flight.destination)" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title"></h3>
          <p class="card-text text-center">{{ flight.destination }}</p>
          <div class="container">

            <div class="d-flex justify-content-between">
                <!-- Odlazni letovi -->
                <div class="flex-column" v-if="flights">
                  <h6>Odlazni letovi</h6>
                </div>

              <!-- Dolazni letovi -->
              <div class="flex-column">
                <h6>Dolazni letovi</h6>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>