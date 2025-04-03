<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";
import type {PageModel} from "@/models/page.model.ts";
import type {FlightModel} from "@/models/flight.model.ts";
import {FlightService} from "@/services/FlightService.ts";

const flights = ref<PageModel<FlightModel>>()
FlightService.getArrivals()
    .then(rsp => flights.value = rsp.data)
</script>

<template>

  <div id="Departures">
<!--    {{ flights }}-->
    <h1 class="container text-center"><i class="fa-solid fa-plane-arrival"></i> Dolasci</h1>
    <hr>
    <div class="container" v-if="flights">
      <table class="table table-striped table-hover text-center">
        <thead>
        <tr>
          <th scope="col"><i class="fa-solid fa-hashtag"></i> Broj leta</th>
          <th scope="col"><i class="fa-solid fa-map-pin"></i> Odredište</th>
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
          <td>{{ (flight.gate)? flight.gate : "N/A" }}</td>
          <td>{{ new Date(flight.scheduledAt).toLocaleString('sr') }}</td>
          <td>{{ flight.estimatedAt ? new Date(flight.estimatedAt).toLocaleString('sr') : 'N/A' }}</td>
          <td>
            <button type="button" class="btn btn-outline-info mx-1"><i class="fa-solid fa-circle-info"></i></button>
            <button type="button" class="btn btn-outline-success mx-1"><i class="fa-solid fa-cart-shopping"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>