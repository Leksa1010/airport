<script setup lang="ts">
import {ref} from "vue";
import {TicketService} from "@/services/ticket.service.ts";

const tickets = ref<any>()
TicketService.getAllTickets().then(rsp => {
  tickets.value = rsp.data
  tickets.value.forEach((ticket: any) => {
    TicketService.getFlightById(ticket.flight_id).then(rsp => {
      ticket.flight = rsp.data;
    })
  })
})

</script>

<template>

</template>
