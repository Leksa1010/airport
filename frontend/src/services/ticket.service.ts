import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    validateStatus: (status) => {
        return status == 200 || status == 204
    }
})

export class TicketService {
    static async getAllTickets() {
        return await client.get("/ticket");
    }

    static async getFlightById(id: number) {
        return await client.get("/flight/" + id);
    }
}