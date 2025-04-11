<script setup lang="ts">

import type {FlightModel} from '@/models/flight.model';
import {FlightService} from "@/services/flight.service.ts";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import type {AirlineModel} from "@/models/airline.model.ts";
import {TicketService} from "@/services/ticket.service.ts";

const route = useRoute()
const router = useRouter()
const ticket = {
  flightId: 0,
  airlineId: 0,
  return: true
}

const id = Number.parseInt(route.params.id as string)
const flight = ref<FlightModel>()
const airlines = ref<AirlineModel>()

FlightService.getFlightById(id)
    .then(rsp => {
      flight.value = rsp.data
      ticket.flightId = rsp.data.id
    })
    .catch(e => router.push({
      path: '/'
    }))

TicketService.getAllAirlines()
    .then(rsp => {
      airlines.value = rsp.data
      ticket.airlineId = rsp.data[0].airlineId
    })
    .catch(e => router.push({
      path: '/'
    }))

function destImg() {
  if (flight.value == undefined) return
  return 'https://img.pequla.com/destination/' + flight.value.destination.toLowerCase().split(' ')[0] + '.jpg'
}
</script>

<template>
  <div class="container">
    <div classs="book" v-if="flight">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/">Početna</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink v-if="flight.type.name === 'DEPARTURE'" to="/departures">Odlasci</RouterLink>
            <RouterLink v-else to="/arrivals">Dolasci</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <RouterLink to="#" @click.prevent="$router.back()">
              {{ flight.destination }} {{ flight.flightNumber }}
            </RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Rezervacija
          </li>
        </ol>
      </nav>
      <h1 class="container text-center"><i class="bi bi-bookmark-plus-fill"></i> Rezervacija karte za
        {{ flight.destination }}</h1>
      <hr>
      <div class="d-flex justify-content-center align-items-center">
        <form class="text-center">
          <div class="form-group mb-3">
            <label for="flight">Broj leta</label>
            <input type="text" class="form-control" id="flight" aria-describedby="flight-help"
                   v-model="flight.flightNumber" disabled>
          </div>
          <div class="form-group mb-3">
            <label for="destination">Odredište</label>
            <input type="text" class="form-control" id="destination" v-model="flight.destination" disabled>
          </div>
          <div class="form-group mb-3" v-if="airlines">
            <label for="airlines">Avio kompanija</label>
            <select class="form-control" id="airlines" v-model="ticket.airlineId">
              <option v-for="airline in airlines" :value="airlines.airlineId"> {{ airline.name }}</option>
            </select>
          </div>
        </form>
      </div>
      <img :src="destImg()" :alt="flight?.destination" class="card-img-top"/>
    </div>
  </div>
</template>
