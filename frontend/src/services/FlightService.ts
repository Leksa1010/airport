import axios from "axios";

const client = axios.create({
    baseURL: "https://flight.pequla.com/api/",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    validateStatus: (status) => status == 200
})

export class FlightService {
    static async getDepartures(page = 0) {
        return await client.get(`/flight?page=${page}&size=12&type=departure&sort=scheduledAt,asc`)
    }

    static async getArrivals(page = 0) {
        return await client.get(`/flight?page=${page}&size=12&type=arrivale&sort=scheduledAt,asc`)
    }

    static async getFlightById(id: number) {
        return await client.get(`/flight/${id}`)
    }

    static async getFlightsByDestination(dest: string, page: number) {
        return await client.get(`/flight/destination/${dest}?page=${page}&size=12&type=departure&sort=scheduledAt,asc`)
    }
}
