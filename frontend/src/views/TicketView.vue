<script setup lang="ts">
import {TicketService} from '@/services/ticket.service';
import {ref} from 'vue'
import type {TicketModel} from "@/models/ticket.model.ts";

const tickets = ref<any>()
TicketService.getAllTickets().then(rsp => {
  tickets.value = rsp.data
  tickets.value.forEach((ticket: any) => {
    TicketService.getFlightById(ticket.flightId).then(frsp => {
      ticket.flight = frsp.data
    })
  })
})

function remove(ticket: TicketModel) {
  if (confirm(`Da li ste sigurni da želite da obrišete kartu za ${ticket.flight.destination}?`)) {
    TicketService.deleteTicket(ticket.ticketId)
        .then(rsp => {
          tickets.value = tickets.value?.filter(t => ticket.ticketId != t.ticketId)
        })
  }
}

</script>

<template>

  <div class="container">
    <h1 class="container text-center"><i class="bi bi-ticket-detailed"></i> Karte</h1>
    <hr>

    <div v-if="tickets">
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
          <td>{{ new Date(ticket.createdAt).toLocaleString('sr') }}</td>
          <td v-if="ticket.flight.type.name === 'DEPARTURE'"><i class="fa-solid fa-plane-departure"></i> Odlazni</td>
          <td v-else><i class="fa-solid fa-plane-arrival"></i> Dolazni</td>
          <td>{{ (ticket.flight.gate) ? ticket.flight.gate : "N/A" }}</td>
          <td>{{ new Date(ticket.flight.scheduledAt).toLocaleString('sr') }}</td>
          <td>{{ ticket.flight.estimatedAt ? new Date(ticket.flight.estimatedAt).toLocaleString('sr') : 'N/A' }}</td>
          <td>
            <div class="btn-group">
              <RouterLink class="btn btn-outline-info mx-1" :to="'/flight/' + ticket.flight.id" title="Detalji"><i
                  class="fa-solid fa-circle-info"></i></RouterLink>
              <button type="button" class="btn btn-outline-danger" title="Obriši" @click="remove(ticket)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
