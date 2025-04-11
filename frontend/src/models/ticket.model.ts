import type { AirlineModel } from "./airline.model"
import type { FlightModel } from "./flight.model"

export interface TicketModel {
    ticketId: number
    flightId: number
    airlineId: number
    return: boolean
    createdAt: string
    flight: FlightModel
    airline: AirlineModel
}