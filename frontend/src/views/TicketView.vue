<script setup lang="ts">
import { TicketService } from '@/services/ticket.service';
import { ref } from 'vue'

const tickets = ref<any>()
TicketService.getAllTickets().then(rsp => {
  tickets.value = rsp.data
  tickets.value.forEach((ticket: any) => {
    TicketService.getFlightById(ticket.flightId).then(frsp => {
      ticket.flight = frsp.data
    })
  })
})
</script>

<template>

  <div class="container" v-if="tickets">
    <h1 class="container text-center"><i class="bi bi-ticket-detailed"></i> Karte</h1>
    <hr>
    <table class="table table-striped table-hover text-center">
      <thead>
      <tr>
        <th scope="col"><i class="fa-solid fa-hashtag"></i> Broj leta</th>
        <th scope="col"><i class="fa-solid fa-map-pin"></i> Odredište</th>
        <th scope="col"><i class="fa-solid fa-clock"></i> Datum rezervacije</th>
        <th scope="col"><i class="fa-solid fa-plane-circle-exclamation"></i> Tip (odlazni/dolazni)</th>
        <th scope="col"><i class="fa-solid fa-person-walking-luggage"></i> Izlaz</th>
        <th scope="col"><i class="fa-solid fa-clock"></i> Planirano vreme</th>
        <th scope="col"><i class="fa-solid fa-clock"></i> Procenjeno vreme</th>
        <th scope="col"><i class="bi bi-hand-index-thumb"></i> Akcije</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ticket in tickets" :ticket-id="ticket.id" :key="ticket.ticketId">
        <th scope="row">{{ ticket.flight.flightNumber }}</th>
        <td>{{ ticket.flight.destination }}</td>
        <td>{{ new Date(ticket.createdAt).toLocaleString('sr')}}</td>
        <td v-if="ticket.flight.type.name === 'DEPARTURE'"><i class="fa-solid fa-plane-departure"></i> Odlazni</td>
        <td v-else><i class="fa-solid fa-plane-arrival"></i> Dolazni</td>
        <td>{{ (ticket.flight.gate) ? ticket.flight.gate : "N/A" }}</td>
        <td>{{ new Date(ticket.flight.scheduledAt).toLocaleString('sr') }}</td>
        <td>{{ ticket.flight.estimatedAt ? new Date(ticket.flight.estimatedAt).toLocaleString('sr') : 'N/A' }}</td>
        <td>
          <div class="btn-group">
            <RouterLink class="btn btn-outline-info mx-1" :to="'/flight/' + ticket.flight.id" title="Detalji"><i
                class="fa-solid fa-circle-info"></i></RouterLink>
            <RouterLink class="btn btn-outline-success mx-1" :to="'/flight/' + ticket.flight.id + '/book'" title="Rezervacija"><i
                class="fa-solid fa-cart-shopping"></i></RouterLink>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
