import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Accept": "application/json"
    },
    validateStatus: (status) => {
        return status === 200 || status === 204
    }
})

export class TicketService {
    static async getAllTickets() {
        return await client.get('/ticket')
    }

    static async getFlightById(id: number) {
        return await client.get('/flight/' + id)
    }

    static async getAllAirlines() {
        return await client.get('/airline')
    }

    static async createTicket(payload: any) {
        return await client.request({
            method: 'post',
            url: '/ticket',
            data: payload
        })
    }

    static async deleteTicket(id: number) {
        return await client.request({
            method: 'delete',
            url: '/ticket/' + id
        })
    }
}