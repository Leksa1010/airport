<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { FlightService } from '@/services/FlightService';
import router from '@/router';
import type {PageModel} from "@/models/page.model.ts";

const route = useRoute();
const dest = route.params.id as string
const flights = ref<PageModel<FlightModel>>()

function retrieveData(page = 0) {
FlightService.getFlightsByDestination(dest, 0)
    .then(rsp => flights.value = rsp.data)
    .catch(e => router.push({
      path:'/destinations'
    }))
}

onMounted(() => retrieveData())

</script>

<template>
  <div class="container mx-auto">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Početna</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/destinations">Destinacije</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ dest }}
        </li>
      </ol>
    </nav>
    <div v-if="flights">
      <h1 class="text-center">Letovi za odredište: {{ dest }}</h1>
      <hr>
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
          <td>{{ (flight.gate)? flight.gate : "N/A" }}</td>
          <td>{{ new Date(flight.scheduledAt).toLocaleString('sr') }}</td>
          <td>{{ flight.estimatedAt ? new Date(flight.estimatedAt).toLocaleString('sr') : 'N/A' }}</td>
          <td>
            <div class="btn-group">
              <RouterLink class="btn btn-outline-info mx-1" :to="'/flight/' + flight.id" title="Detalji"><i
                  class="fa-solid fa-circle-info"></i></RouterLink>
              <button type="button" class="btn btn-outline-success mx-1"><i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
