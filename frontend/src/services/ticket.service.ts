import {MainService} from "@/models/main.service.ts";


export class TicketService {

    static async getAllTickets() {
        return await MainService.useAxios('/ticket')
    }

    static async getFlightById(id: number) {
        return await MainService.useAxios(`/flight/${id}`)
    }

    static async getAllAirlines() {
        return await MainService.useAxios('/airline')
    }

    static async createTicket(payload: any) {
        return await MainService.useAxios('/ticket', 'POST', payload)
    }

    static async deleteTicket(id: number) {
        return await MainService.useAxios(`/ticket/${id}`, 'DELETE')
    }
}