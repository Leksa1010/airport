<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {PageModel} from "@/models/page.model.ts";
import type {FlightModel} from "@/models/flight.model.ts";
import {FlightService} from "@/services/flight.service.ts";

const input = ref<string>()
const flights = ref<PageModel<FlightModel>>()

function retrieveData(page = 0) {
  if (input.value != undefined && input.value != '') {
    FlightService.getFlightsByDestination(input.value, page)
        .then(rsp => flights.value = rsp.data)
    return
  }
  FlightService.getAllFlights(page)
      .then(rsp => flights.value = rsp.data)
}

function first() {
  if (flights.value == undefined) return
  if (flights.value.first) return
  retrieveData(0)
}

function previous() {
  if (flights.value == undefined) return
  if (flights.value.first) return
  retrieveData(flights.value.number - 1)
}

function next() {
  if (flights.value == undefined) return
  if (flights.value.last) return
  retrieveData(flights.value.number + 1)
}

function last() {
  if (flights.value == undefined) return
  if (flights.value.first) return
  retrieveData(flights.value.totalPages - 1)
}

onMounted(() => retrieveData())

function search() {
  if (input.value != undefined) {
    retrieveData()
  }
}

</script>

<template>

  <div class="container" id="Home">
    <h1 class="container text-center"><i class="fa-solid fa-paper-plane"></i> Svi letovi</h1>
    <div class="input-group">
      <span class="input-group-text" id="search">
        <i class="bi bi-search"></i>
      </span>
      <input type="text" class="form-control" aria-describedby="search" v-model="input" @keyup="search"
             placeholder="Pretražite odredišta">
    </div>
    <hr>
    <div v-if="flights">
      <table class="table table-striped table-hover text-center">
        <thead>
        <tr>
          <th scope="col"><i class="fa-solid fa-hashtag"></i> Broj leta</th>
          <th scope="col"><i class="fa-solid fa-map-pin"></i> Odredište</th>
          <th scope="col"><i class="fa-solid fa-plane-circle-exclamation"></i> Tip (odlazni/dolazni)</th>
          <th scope="col"><i class="fa-solid fa-person-walking-luggage"></i> Izlaz</th>
          <th scope="col"><i class="fa-solid fa-clock"></i> Planirano vreme</th>
          <th scope="col"><i class="fa-solid fa-clock"></i> Procenjeno vreme</th>
          <th scope="col"><i class="bi bi-hand-index-thumb"></i> Akcije</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="flight in flights.content" :flight-id="flight.id">
          <th scope="row">{{ flight.flightNumber }}</th>
          <td>{{ flight.destination }}</td>
          <td v-if="flight.type.name === 'DEPARTURE'"><i class="fa-solid fa-plane-departure"></i> Odlazni</td>
          <td v-else><i class="fa-solid fa-plane-arrival"></i> Dolazni</td>
          <td>{{ (flight.gate) ? flight.gate : "N/A" }}</td>
          <td>{{ new Date(flight.scheduledAt).toLocaleString('sr') }}</td>
          <td>{{ flight.estimatedAt ? new Date(flight.estimatedAt).toLocaleString('sr') : 'N/A' }}</td>
          <td>
            <div class="btn-group">
              <RouterLink class="btn btn-outline-info mx-1" :to="'/flight/' + flight.id" title="Detalji"><i
                  class="fa-solid fa-circle-info"></i></RouterLink>
              <RouterLink class="btn btn-outline-success mx-1" :to="'/flight/' + flight.id + '/book'" title="Rezervacija"><i
                  class="fa-solid fa-cart-shopping"></i></RouterLink>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <nav>
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <button type="button" class="page-link" @click="first">Prva</button>
            </li>
            <li class="page-item">
              <button type="button" class="page-link" @click="previous">Prethodna</button>
            </li>
            <li class="page-item">
              <button type="button" class="page-link">{{ flights.number + 1 }}</button>
            </li>
            <li class="page-item">
              <button type="button" class="page-link" @click="next">Sledeća</button>
            </li>
            <li class="page-item">
              <button type="button" class="page-link" @click="last">Poslednja</button>
            </li>
          </ul>
        </nav>
      </nav>
    </div>
  </div>
</template>

